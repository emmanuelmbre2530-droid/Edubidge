import 'dotenv/config';
import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { findFallbackLesson } from './src/constants/fallbackLessons';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn('GEMINI_API_KEY environment variable is not set. Gemini features will require the API key.');
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Helper to construct academic level context description
function buildAcademicContextString(level: string, subject: string, details?: any): string {
  if (!details) return `Level: ${level}, Subject: ${subject}`;

  const parts: string[] = [`Category: ${level}`];
  if (level === 'Secondary School') {
    if (details.subLevel) parts.push(`Class Group: ${details.subLevel} (Junior/Senior Secondary)`);
  } else if (level === 'WAEC/NECO Preparation') {
    if (details.examTarget) parts.push(`Target Examination: ${details.examTarget}`);
  } else if (level === 'ND/HND') {
    if (details.polyLevel) parts.push(`Polytechnic Level: ${details.polyLevel}`);
    if (details.polyProgramme) parts.push(`Programme / Department: ${details.polyProgramme}`);
    if (details.semester) parts.push(`Semester: ${details.semester}`);
  } else if (level === 'University') {
    if (details.universityDiscipline) parts.push(`Discipline / Course: ${details.universityDiscipline}`);
    if (details.universityYear) parts.push(`Academic Year: ${details.universityYear}`);
    if (details.semester) parts.push(`Semester: ${details.semester}`);
  }
  parts.push(`Subject / Course Unit: ${subject}`);
  return parts.join(' | ');
}

function getPedagogicalGuidance(level: string, details?: any): string {
  if (level === 'Secondary School') {
    const isJSS = details?.subLevel === 'JSS';
    if (isJSS) {
      return 'Target Junior Secondary School (JSS 1-3, age ~11-14). Use clear, foundational, engaging explanations, simple vocabulary, and relatable daily life analogies. Avoid complex university calculus or over-dense jargon.';
    }
    return 'Target Senior Secondary School (SSS 1-3, age ~15-18). Ground explanations in the Nigerian senior secondary curriculum, introducing formal definitions, fundamental equations, and scientific/commercial concepts clearly.';
  }
  if (level === 'WAEC/NECO Preparation') {
    return 'Target WAEC (WASSCE) and NECO (SSCE) candidates. Prioritize examination-oriented clarity: emphasize exact definitions examiners award marks for, highlight common candidate pitfalls in WAEC/NECO past questions, and structure answers in clear points.';
  }
  if (level === 'ND/HND') {
    return `Target Polytechnic students (${details?.polyLevel || 'ND/HND'}) following NBTE curricula in ${details?.polyProgramme || 'their department'}. Emphasize practical technical applications, laboratory/workshop methods, vocational clarity, and real-world industrial relevance in Nigeria.`;
  }
  if (level === 'University') {
    return `Target University undergraduate students (${details?.universityYear || 'Undergraduate'}) in ${details?.universityDiscipline || 'their discipline'}. Provide high academic rigor, deep theoretical principles, analytical models, mathematical derivations or conceptual depth aligned with Nigerian university benchmark minimum academic standards (NUC).`;
  }
  return 'Provide clear, accurate, and syllabus-aligned educational explanations.';
}

// Candidate models in prioritized order.
// gemini-3.1-flash-lite has active free-tier quota and high throughput;
// gemini-3.8-flash is the secondary fallback.
const CANDIDATE_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];

// Robust call helper with multi-model fallback and transient retry
async function generateContentWithFallback(aiClient: GoogleGenAI, baseParams: any): Promise<any> {
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    let attempt = 0;
    const maxRetries = 2;

    while (attempt <= maxRetries) {
      try {
        const response = await aiClient.models.generateContent({
          ...baseParams,
          model,
        });
        return response;
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || '';
        const isQuotaExceeded =
          errMsg.includes('429') ||
          errMsg.includes('quota') ||
          errMsg.includes('RESOURCE_EXHAUSTED') ||
          err?.status === 429;
        const isTransientDemand =
          errMsg.includes('503') ||
          errMsg.includes('high demand') ||
          errMsg.includes('UNAVAILABLE') ||
          err?.status === 503;

        if (isQuotaExceeded) {
          console.warn(`Model "${model}" quota reached (429). Falling back to next available model...`);
          break; // break retry loop, try next model in CANDIDATE_MODELS
        }

        if (isTransientDemand && attempt < maxRetries) {
          attempt++;
          console.warn(`Model "${model}" temporary spike (503). Retrying (attempt ${attempt}/${maxRetries})...`);
          await new Promise((resolve) => setTimeout(resolve, 1200 * attempt));
          continue;
        }

        break;
      }
    }
  }

  throw lastError;
}

function sanitizeErrorMessage(err: any): { error: string; isQuotaExceeded: boolean } {
  const msg = err?.message || '';
  if (msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
    return {
      error: 'The Gemini free tier daily request limit has been reached. Please try one of our recommended topics (e.g. Photosynthesis, Fractions, Ohm’s Law) or try again later.',
      isQuotaExceeded: true,
    };
  }
  if (msg.includes('503') || msg.includes('high demand') || msg.includes('UNAVAILABLE')) {
    return {
      error: 'AI service is experiencing high temporary demand. Please retry in a few moments.',
      isQuotaExceeded: false,
    };
  }
  return {
    error: 'Failed to complete request. Please try again.',
    isQuotaExceeded: false,
  };
}

// Topic Explanation Endpoint
app.post('/api/explain', async (req: Request, res: Response) => {
  const { topic, level, subject, style, academicDetails } = req.body;

  try {
    if (!ai) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please ensure the secret is set in the AI Studio Secrets panel.',
      });
    }

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return res.status(400).json({ error: 'Please provide a valid topic to explain.' });
    }

    const educationLevel = level || 'Secondary School';
    const currentSubject = subject || 'General Studies';
    const currentStyle = style || 'Everyday Nigerian Examples';

    let styleGuidance = '';
    if (currentStyle === 'Everyday Nigerian Examples') {
      styleGuidance = 'Use relatable analogies, references, and vivid everyday real-life scenarios familiar to students in Akwa Ibom and Nigeria (such as local markets like Uyo/Itam, solar lanterns, power generator fuel ratios, afang soup preparation, farming, palm oil processing, traffic/keke trips, sharing snacks, etc.) to make the concept stick effortlessly.';
    } else if (currentStyle === 'Step-by-step') {
      styleGuidance = 'Explain in a strictly structured, sequential, step-by-step format with clear logical progression (Step 1, Step 2, Step 3...).';
    } else {
      styleGuidance = 'Use simple, direct English with clear vocabulary. Avoid unnecessary academic jargon; define any essential technical terms immediately in plain words.';
    }

    const academicContext = buildAcademicContextString(educationLevel, currentSubject, academicDetails);
    const pedagogicalGuidance = getPedagogicalGuidance(educationLevel, academicDetails);

    const systemInstruction = `You are EduBridge AI, an exceptional, encouraging educational tutor designed to help students in Akwa Ibom, Nigeria master challenging academic topics.
Student Academic Context: ${academicContext}.
Level & Pedagogy Guidance: ${pedagogicalGuidance}
Requested Explanation Style: ${currentStyle}.
Style Guidance: ${styleGuidance}.

Your goal is to make the topic clear, engaging, accurate, and strictly aligned with the student's academic level and syllabus expectations.`;

    const prompt = `Explain the topic: "${topic.trim()}".
Academic Context: ${academicContext}.
Target Level: ${educationLevel}.
Subject / Course: ${currentSubject}.
Style: ${currentStyle}.

Provide:
1. A concise overview summary (2-3 sentences).
2. A comprehensive, student-friendly explanation matching the student's exact academic depth (${educationLevel}).
3. A memorable relatable example tailored to the requested style (${currentStyle}).
4. Exactly three key exam/academic takeaways that the student should write down or memorize.
5. One quick comprehension check question with a helpful hint and the correct answer explained.`;

    const response = await generateContentWithFallback(ai, {
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: 'Clear, formatted title of the topic',
            },
            overview: {
              type: Type.STRING,
              description: 'A 2-3 sentence introductory overview',
            },
            explanation: {
              type: Type.STRING,
              description: 'The core educational explanation, structured with subheadings or bullet points where helpful',
            },
            relatableExample: {
              type: Type.STRING,
              description: 'A vivid real-world or everyday Nigerian analogy that clarifies the concept',
            },
            keyTakeaways: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Exactly 3 essential takeaways or exam notes',
            },
            comprehensionQuestion: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                hint: { type: Type.STRING },
                answer: { type: Type.STRING },
              },
              required: ['question', 'hint', 'answer'],
              description: 'A quick self-check question with hint and answer',
            },
          },
          required: [
            'title',
            'overview',
            'explanation',
            'relatableExample',
            'keyTakeaways',
            'comprehensionQuestion',
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Model did not return any text.');
    }

    const data = JSON.parse(text);
    return res.json(data);
  } catch (err: any) {
    console.error('Error in /api/explain:', err);

    // If quota or network issue, serve from curated fallback offline library if available
    const fallback = topic ? findFallbackLesson(topic) : null;
    if (fallback) {
      console.log(`Serving curated offline lesson for "${topic}"`);
      return res.json(fallback.explanation);
    }

    const sanitized = sanitizeErrorMessage(err);
    return res.status(sanitized.isQuotaExceeded ? 429 : 500).json({
      error: sanitized.error,
    });
  }
});

// Practice Quiz Endpoint
app.post('/api/quiz', async (req: Request, res: Response) => {
  const { topic, level, subject, explanationContext, academicDetails } = req.body;

  try {
    if (!ai) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please ensure the secret is set in the AI Studio Secrets panel.',
      });
    }

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return res.status(400).json({ error: 'Please provide a valid topic for the quiz.' });
    }

    const educationLevel = level || 'Secondary School';
    const currentSubject = subject || 'General Science';
    const academicContext = buildAcademicContextString(educationLevel, currentSubject, academicDetails);
    const pedagogicalGuidance = getPedagogicalGuidance(educationLevel, academicDetails);

    const systemInstruction = `You are EduBridge AI, an expert educational assessor creating a 5-question multiple choice test for a student in Akwa Ibom, Nigeria.
Student Academic Profile: ${academicContext}.
Pedagogical Standards: ${pedagogicalGuidance}
Topic: ${topic}.
${explanationContext ? `Context from the lesson: ${explanationContext}` : ''}

Rules:
- Generate EXACTLY 5 multiple-choice questions matching the difficulty of ${educationLevel} (${currentSubject}).
- Each question must have EXACTLY 4 distinct, plausible options (index 0, 1, 2, 3).
- Exactly ONE option must be correct. Specify 'correctIndex' as an integer between 0 and 3.
- Provide a clear, educational explanation for why that option is correct and why other common distractors are mistaken.
- Questions should test understanding, application, and syllabus concepts appropriate for this specific level.
- For WAEC/NECO, format questions in authentic SSCE examination style. For ND/HND, test technical and vocational understanding. For University, test analytical and theoretical rigor.`;

    const prompt = `Create a 5-question multiple choice quiz on the topic "${topic}" for ${academicContext}.`;

    const response = await generateContentWithFallback(ai, {
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: 'Question unique identifier, e.g. q1' },
                  question: { type: Type.STRING, description: 'The question text' },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Four multiple-choice options',
                  },
                  correctIndex: {
                    type: Type.INTEGER,
                    description: 'The 0-based index of the correct answer (0, 1, 2, or 3)',
                  },
                  explanation: {
                    type: Type.STRING,
                    description: 'Detailed explanation of why the correct option is right',
                  },
                },
                required: ['id', 'question', 'options', 'correctIndex', 'explanation'],
              },
            },
          },
          required: ['topic', 'questions'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Model did not return quiz content.');
    }

    const data = JSON.parse(text);
    return res.json(data);
  } catch (err: any) {
    console.error('Error in /api/quiz:', err);

    // Fallback offline quiz if available
    const fallback = topic ? findFallbackLesson(topic) : null;
    if (fallback) {
      console.log(`Serving curated offline quiz for "${topic}"`);
      return res.json({ topic, questions: fallback.quizQuestions });
    }

    const sanitized = sanitizeErrorMessage(err);
    return res.status(sanitized.isQuotaExceeded ? 429 : 500).json({
      error: sanitized.error,
    });
  }
});

// Follow-up Q&A Endpoint
app.post('/api/follow-up', async (req: Request, res: Response) => {
  try {
    if (!ai) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please ensure the secret is set in the AI Studio Secrets panel.',
      });
    }

    const { topic, level, subject, lessonSummary, userQuestion, chatHistory, academicDetails } = req.body;

    if (!userQuestion || typeof userQuestion !== 'string' || userQuestion.trim().length === 0) {
      return res.status(400).json({ error: 'Please provide a question.' });
    }

    const educationLevel = level || 'Secondary School';
    const currentSubject = subject || 'General Studies';
    const academicContext = buildAcademicContextString(educationLevel, currentSubject, academicDetails);
    const pedagogicalGuidance = getPedagogicalGuidance(educationLevel, academicDetails);

    const systemInstruction = `You are EduBridge AI, a helpful, patient tutor assisting a student in Akwa Ibom, Nigeria.
Topic being studied: "${topic}".
Academic Profile: ${academicContext}.
Pedagogical Standards: ${pedagogicalGuidance}.
${lessonSummary ? `Lesson background summary: ${lessonSummary}` : ''}

Respond directly and warmly to the student's question. Keep explanations crystal clear, encouraging, accurate, and tailored to the student's exact academic level. If useful, give a quick relatable analogy. Keep responses focused (typically 2-4 paragraphs).`;

    let historyContext = '';
    if (Array.isArray(chatHistory) && chatHistory.length > 0) {
      historyContext = '\nPrevious conversation:\n' + chatHistory.map((m: any) => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.text}`).join('\n');
    }

    const prompt = `${historyContext}\nStudent's new question: ${userQuestion.trim()}\nTutor's answer:`;

    const response = await generateContentWithFallback(ai, {
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Model returned an empty response.');
    }

    return res.json({ reply: text });
  } catch (err: any) {
    console.error('Error in /api/follow-up:', err);
    const sanitized = sanitizeErrorMessage(err);
    return res.status(sanitized.isQuotaExceeded ? 429 : 500).json({
      error: sanitized.error,
    });
  }
});

// Setup Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduBridge AI server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
