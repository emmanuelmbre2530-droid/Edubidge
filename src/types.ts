export type EducationLevel =
  | 'Secondary School'
  | 'WAEC/NECO Preparation'
  | 'ND/HND'
  | 'University';

export type ExplanationStyle =
  | 'Everyday Nigerian Examples'
  | 'Step-by-step'
  | 'Simple English';

export type SecondarySubLevel = 'JSS' | 'SSS';
export type ExamTarget = 'WAEC' | 'NECO' | 'Both WAEC & NECO';
export type PolyLevel = 'ND I' | 'ND II' | 'HND I' | 'HND II';
export type UniversityYear =
  | '100 Level'
  | '200 Level'
  | '300 Level'
  | '400 Level'
  | '500 Level';
export type SemesterOption = 'First Semester' | 'Second Semester';

export interface StudentAcademicProfile {
  educationLevel: EducationLevel;
  explanationStyle: ExplanationStyle;

  // Secondary School specific
  secondarySubLevel?: SecondarySubLevel;
  secondaryClass?: string;

  // WAEC/NECO specific
  examTarget?: ExamTarget;

  // Polytechnic specific
  polyLevel?: PolyLevel;
  polyProgramme?: string;
  polySemester?: SemesterOption;

  // University specific
  universityFaculty?: string;
  universityDiscipline?: string;
  universityYear?: UniversityYear;
  universitySemester?: SemesterOption;

  // Subject / Course Unit selection
  subjectName: string;
  isCustomSubject?: boolean;
  customSubjectInput?: string;
}

export interface SubjectOption {
  id: string;
  name: string;
  code?: string;
  icon?: string;
  category?: string;
  popularTopics: string[];
}

export interface ComprehensionQuestion {
  question: string;
  hint: string;
  answer: string;
}

export interface TopicExplanation {
  title: string;
  overview: string;
  explanation: string;
  relatableExample: string;
  keyTakeaways: string[];
  comprehensionQuestion: ComprehensionQuestion;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  userAnswers: Record<number, number>; // index of question -> selected option index
  isSubmitted: boolean;
  score: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface LearningHistoryItem {
  id: string;
  topic: string;
  subject: string;
  level: EducationLevel;
  style: ExplanationStyle;
  savedAt: string;
  explanation: TopicExplanation;
  quizScore?: {
    score: number;
    total: number;
  };
  quizQuestions?: QuizQuestion[];
}
