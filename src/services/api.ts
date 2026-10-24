import { EducationLevel, ExplanationStyle, QuizQuestion, TopicExplanation } from '../types';

export interface AcademicDetails {
  subLevel?: string;
  examTarget?: string;
  polyLevel?: string;
  polyProgramme?: string;
  universityDiscipline?: string;
  universityYear?: string;
  semester?: string;
  isCustomSubject?: boolean;
}

export interface ExplainRequestParams {
  topic: string;
  level: EducationLevel;
  subject: string;
  style: ExplanationStyle;
  academicDetails?: AcademicDetails;
}

export interface QuizRequestParams {
  topic: string;
  level: EducationLevel;
  subject: string;
  explanationContext?: string;
  academicDetails?: AcademicDetails;
}

export interface FollowUpRequestParams {
  topic: string;
  level: EducationLevel;
  subject: string;
  lessonSummary?: string;
  userQuestion: string;
  chatHistory?: Array<{ role: 'user' | 'assistant'; text: string }>;
  academicDetails?: AcademicDetails;
}

export async function checkServerHealth(): Promise<{ status: string; hasApiKey: boolean }> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch {
    return { status: 'error', hasApiKey: false };
  }
}

export async function requestExplanation(params: ExplainRequestParams): Promise<TopicExplanation> {
  const res = await fetch('/api/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to explain topic. Please try again.');
  }

  return data as TopicExplanation;
}

export async function requestQuiz(params: QuizRequestParams): Promise<{ topic: string; questions: QuizQuestion[] }> {
  const res = await fetch('/api/quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to generate practice quiz.');
  }

  return data;
}

export async function requestFollowUp(params: FollowUpRequestParams): Promise<{ reply: string }> {
  const res = await fetch('/api/follow-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to receive tutor answer.');
  }

  return data;
}
