import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  FileQuestion,
  MessageSquare,
  Sparkles,
  AlertCircle,
  RefreshCw,
  History,
  GraduationCap,
  MapPin,
  HelpCircle,
  Award,
} from 'lucide-react';
import {
  EducationLevel,
  ExplanationStyle,
  LearningHistoryItem,
  QuizQuestion,
  SubjectOption,
  TopicExplanation,
  ChatMessage,
  StudentAcademicProfile,
} from './types';
import { WAEC_NECO_SUBJECTS, SSS_SUBJECTS, JSS_SUBJECTS, POLYTECHNIC_PROGRAMMES, UNIVERSITY_DISCIPLINES } from './constants/educationData';
import {
  checkServerHealth,
  requestExplanation,
  requestQuiz,
  requestFollowUp,
  AcademicDetails,
} from './services/api';
import {
  getStoredHistory,
  saveTopicToHistory,
  updateTopicQuizScore,
  deleteHistoryItem,
  clearAllHistory,
} from './utils/storage';
import { Header } from './components/Header';
import { StudentSetup } from './components/StudentSetup';
import { TopicSearch } from './components/TopicSearch';
import { ExplanationCard } from './components/ExplanationCard';
import { PracticeQuiz } from './components/PracticeQuiz';
import { FollowUpChat } from './components/FollowUpChat';
import { HistoryDrawer } from './components/HistoryDrawer';
import { DisclaimerBanner } from './components/DisclaimerBanner';

export default function App() {
  // 1. Student Academic Profile State
  const [profile, setProfile] = useState<StudentAcademicProfile>({
    educationLevel: 'WAEC/NECO Preparation',
    explanationStyle: 'Everyday Nigerian Examples',
    examTarget: 'WAEC',
    subjectName: WAEC_NECO_SUBJECTS[2].name, // Biology (WAEC / NECO SSCE)
  });

  const [selectedSubjectOption, setSelectedSubjectOption] = useState<SubjectOption>(
    WAEC_NECO_SUBJECTS[2]
  );
  const [isSetupOpen, setIsSetupOpen] = useState(false);

  // 2. Active Topic State
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const [explanation, setExplanation] = useState<TopicExplanation | null>(null);
  const [isExplaining, setIsExplaining] = useState<boolean>(false);
  const [explainError, setExplainError] = useState<string | null>(null);

  // 3. Quiz State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[] | null>(null);
  const [isQuizLoading, setIsQuizLoading] = useState<boolean>(false);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [lastQuizScore, setLastQuizScore] = useState<{ score: number; total: number } | null>(null);

  // 4. Follow-up Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // 5. Active Tab
  const [activeTab, setActiveTab] = useState<'lesson' | 'quiz' | 'chat'>('lesson');

  // 6. History State
  const [history, setHistory] = useState<LearningHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);

  // 7. Server Health Check
  const [serverHealth, setServerHealth] = useState<{ status: string; hasApiKey: boolean }>({
    status: 'checking',
    hasApiKey: true,
  });

  // Load history & check server health on initial mount
  useEffect(() => {
    const loaded = getStoredHistory();
    setHistory(loaded);

    checkServerHealth().then((health) => {
      setServerHealth(health);
    });
  }, []);

  // Construct academic details payload for server
  const getAcademicDetailsPayload = (): AcademicDetails => {
    return {
      subLevel: profile.secondarySubLevel,
      examTarget: profile.examTarget,
      polyLevel: profile.polyLevel,
      polyProgramme: profile.polyProgramme,
      universityDiscipline: profile.universityDiscipline,
      universityYear: profile.universityYear,
      semester: profile.polySemester || profile.universitySemester,
      isCustomSubject: profile.isCustomSubject,
    };
  };

  // Helper string for display badge in header
  const getProfileSummary = (): string => {
    if (profile.educationLevel === 'Secondary School') {
      return `${profile.secondarySubLevel || 'Secondary'} • ${profile.subjectName}`;
    }
    if (profile.educationLevel === 'WAEC/NECO Preparation') {
      return `${profile.examTarget || 'WAEC'} Prep • ${profile.subjectName}`;
    }
    if (profile.educationLevel === 'ND/HND') {
      return `${profile.polyLevel || 'ND'} (${profile.polyProgramme || 'Poly'}) • ${profile.subjectName}`;
    }
    if (profile.educationLevel === 'University') {
      return `${profile.universityYear || 'Uni'} • ${profile.subjectName}`;
    }
    return `${profile.educationLevel} • ${profile.subjectName}`;
  };

  // Profile update handler
  const handleUpdateProfile = (
    updatedProfile: StudentAcademicProfile,
    newSubjectOption: SubjectOption
  ) => {
    setProfile(updatedProfile);
    setSelectedSubjectOption(newSubjectOption);
    setExplainError(null);
  };

  // Fetch Topic Explanation
  const handleExplainTopic = async (topicToExplain: string) => {
    if (!topicToExplain.trim()) return;

    setIsExplaining(true);
    setExplainError(null);
    setCurrentTopic(topicToExplain);
    setActiveTab('lesson');
    setQuizQuestions(null);
    setQuizError(null);
    setLastQuizScore(null);
    setChatMessages([]);

    const academicDetails = getAcademicDetailsPayload();

    try {
      const data = await requestExplanation({
        topic: topicToExplain,
        level: profile.educationLevel,
        subject: profile.subjectName,
        style: profile.explanationStyle,
        academicDetails,
      });

      setExplanation(data);

      // Save to local storage history
      const savedItem = saveTopicToHistory({
        topic: topicToExplain,
        subject: profile.subjectName,
        level: profile.educationLevel,
        style: profile.explanationStyle,
        explanation: data,
      });

      setActiveHistoryId(savedItem.id);
      setHistory(getStoredHistory());

      // Preload quiz in background for seamless transitions
      preloadQuiz(topicToExplain, data.overview, academicDetails);
    } catch (err: any) {
      let message = err.message || 'Failed to explain topic. Please try again.';
      if (message.includes('429') || message.includes('quota') || message.includes('RESOURCE_EXHAUSTED')) {
        message = 'The Gemini free tier daily request limit has been reached. Please try one of the recommended topics (such as Photosynthesis, Fractions, or Ohm’s Law) or try again in a little while.';
      } else if (message.includes('503') || message.includes('high demand')) {
        message = 'AI service is experiencing high temporary demand. Please click Retry in a moment.';
      }
      setExplainError(message);
    } finally {
      setIsExplaining(false);
    }
  };

  // Background or on-demand quiz generation
  const preloadQuiz = async (
    topic: string,
    overview?: string,
    academicDetails?: AcademicDetails
  ) => {
    try {
      setIsQuizLoading(true);
      const quizRes = await requestQuiz({
        topic,
        level: profile.educationLevel,
        subject: profile.subjectName,
        explanationContext: overview,
        academicDetails: academicDetails || getAcademicDetailsPayload(),
      });
      setQuizQuestions(quizRes.questions);
      setQuizError(null);
    } catch (err: any) {
      setQuizError(err.message || 'Failed to load quiz');
    } finally {
      setIsQuizLoading(false);
    }
  };

  const handleStartQuizTab = async () => {
    setActiveTab('quiz');
    if (!quizQuestions && currentTopic && !isQuizLoading) {
      preloadQuiz(currentTopic, explanation?.overview, getAcademicDetailsPayload());
    }
  };

  const handleRegenerateQuiz = async () => {
    if (!currentTopic) return;
    setIsQuizLoading(true);
    setQuizError(null);
    try {
      const quizRes = await requestQuiz({
        topic: currentTopic,
        level: profile.educationLevel,
        subject: profile.subjectName,
        explanationContext: explanation?.overview,
        academicDetails: getAcademicDetailsPayload(),
      });
      setQuizQuestions(quizRes.questions);
      setLastQuizScore(null);
    } catch (err: any) {
      setQuizError(err.message || 'Failed to generate new quiz questions.');
    } finally {
      setIsQuizLoading(false);
    }
  };

  const handleQuizComplete = (score: number, total: number, questions: QuizQuestion[]) => {
    setLastQuizScore({ score, total });
    if (activeHistoryId) {
      updateTopicQuizScore(activeHistoryId, { score, total }, questions);
      setHistory(getStoredHistory());
    }
  };

  // Follow-up chat send
  const handleSendFollowUp = async (userQuestion: string) => {
    const newUserMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      role: 'user',
      text: userQuestion,
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, newUserMsg]);
    setIsChatLoading(true);

    try {
      const res = await requestFollowUp({
        topic: currentTopic,
        level: profile.educationLevel,
        subject: profile.subjectName,
        lessonSummary: explanation?.overview || '',
        userQuestion,
        chatHistory: chatMessages.map((m) => ({ role: m.role, text: m.text })),
        academicDetails: getAcademicDetailsPayload(),
      });

      const newBotMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        role: 'assistant',
        text: res.reply,
        timestamp: new Date().toISOString(),
      };

      setChatMessages((prev) => [...prev, newBotMsg]);
    } catch (err: any) {
      throw new Error(err.message || 'Failed to get tutor answer.');
    } finally {
      setIsChatLoading(false);
    }
  };

  // Load a topic from history
  const handleSelectHistoryTopic = (item: LearningHistoryItem) => {
    setCurrentTopic(item.topic);
    setExplanation(item.explanation);

    setProfile((prev) => ({
      ...prev,
      educationLevel: item.level,
      explanationStyle: item.style,
      subjectName: item.subject,
    }));

    // Find matching subject option or create fallback
    const allKnown = [...WAEC_NECO_SUBJECTS, ...SSS_SUBJECTS, ...JSS_SUBJECTS];
    const foundSubject = allKnown.find((s) => s.name === item.subject) || {
      id: 'hist-sub',
      name: item.subject,
      popularTopics: ['Core Principles', 'Key Formulas', 'Exam Review'],
    };
    setSelectedSubjectOption(foundSubject);

    setActiveHistoryId(item.id);
    setActiveTab('lesson');
    setExplainError(null);
    setChatMessages([]);

    if (item.quizQuestions && item.quizQuestions.length > 0) {
      setQuizQuestions(item.quizQuestions);
      if (item.quizScore) {
        setLastQuizScore(item.quizScore);
      }
    } else {
      setQuizQuestions(null);
      preloadQuiz(item.topic, item.explanation.overview);
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = deleteHistoryItem(id);
    setHistory(updated);
    if (activeHistoryId === id) {
      setActiveHistoryId(null);
    }
  };

  const handleClearAllHistory = () => {
    clearAllHistory();
    setHistory([]);
    setActiveHistoryId(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans flex flex-col selection:bg-emerald-200">
      {/* Navigation Header */}
      <Header
        level={profile.educationLevel}
        subjectName={profile.subjectName}
        style={profile.explanationStyle}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onToggleSetup={() => setIsSetupOpen(!isSetupOpen)}
        isSetupOpen={isSetupOpen}
        profileSummary={getProfileSummary()}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Missing API Key Server Notification */}
        {!serverHealth.hasApiKey && serverHealth.status !== 'checking' && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-amber-950 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <div>
                <span className="font-bold">Gemini API Key Required: </span>
                Configure <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-900">GEMINI_API_KEY</code> in the AI Studio Secrets panel to enable real AI explanations and quizzes.
              </div>
            </div>
            <button
              onClick={() => checkServerHealth().then(setServerHealth)}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer"
            >
              Check Again
            </button>
          </div>
        )}

        {/* Dynamic Dependent Student Setup Drawer / Panel */}
        <StudentSetup
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          isOpen={isSetupOpen}
          onClose={() => setIsSetupOpen(false)}
        />

        {/* Topic Search and Preset Chips */}
        <TopicSearch
          onSearch={handleExplainTopic}
          isLoading={isExplaining}
          selectedSubject={selectedSubjectOption}
          selectedLevel={profile.educationLevel}
          selectedStyle={profile.explanationStyle}
          initialTopic={currentTopic}
        />

        {/* Error Notification */}
        {explainError && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{explainError}</span>
            </div>
            <button
              onClick={() => handleExplainTopic(currentTopic)}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shrink-0 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Active Lesson Content Tabs */}
        {explanation && !isExplaining && (
          <div className="space-y-4">
            {/* Tab navigation buttons */}
            <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2">
              <button
                onClick={() => setActiveTab('lesson')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'lesson'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Lesson Notes & Explanation</span>
              </button>

              <button
                onClick={handleStartQuizTab}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileQuestion className="w-4 h-4" />
                <span>Practice Quiz (5 Qs)</span>
                {lastQuizScore && (
                  <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black">
                    {lastQuizScore.score}/{lastQuizScore.total}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask Follow-up</span>
                {chatMessages.length > 0 && (
                  <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {chatMessages.length}
                  </span>
                )}
              </button>
            </div>

            {/* Tab 1: Lesson Notes */}
            {activeTab === 'lesson' && (
              <ExplanationCard
                explanation={explanation}
                topic={currentTopic}
                subject={profile.subjectName}
                level={profile.educationLevel}
                style={profile.explanationStyle}
                onStartQuiz={handleStartQuizTab}
                isQuizLoading={isQuizLoading}
              />
            )}

            {/* Tab 2: Practice Quiz */}
            {activeTab === 'quiz' && (
              <>
                {isQuizLoading && !quizQuestions ? (
                  <div className="bg-white border border-emerald-950/10 rounded-2xl p-12 text-center shadow-sm">
                    <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-3" />
                    <h3 className="font-bold text-slate-800 text-base">
                      Generating 5 Practice Questions for {currentTopic}...
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Formulating multiple-choice questions aligned with {profile.educationLevel} ({profile.subjectName}) standards.
                    </p>
                  </div>
                ) : quizError && !quizQuestions ? (
                  <div className="bg-white border border-rose-200 rounded-2xl p-8 text-center shadow-sm">
                    <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
                    <h3 className="font-bold text-slate-800 text-base mb-1">
                      Could not generate practice questions
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">{quizError}</p>
                    <button
                      onClick={handleRegenerateQuiz}
                      className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Try Again
                    </button>
                  </div>
                ) : quizQuestions ? (
                  <PracticeQuiz
                    topic={currentTopic}
                    subject={profile.subjectName}
                    questions={quizQuestions}
                    onQuizComplete={handleQuizComplete}
                    onRegenerateQuiz={handleRegenerateQuiz}
                    isRegenerating={isQuizLoading}
                    onBackToLesson={() => setActiveTab('lesson')}
                  />
                ) : null}
              </>
            )}

            {/* Tab 3: Contextual Follow-up Chat */}
            {activeTab === 'chat' && (
              <FollowUpChat
                topic={currentTopic}
                subject={profile.subjectName}
                level={profile.educationLevel}
                lessonSummary={explanation.overview}
                messages={chatMessages}
                onSendMessage={handleSendFollowUp}
                isLoading={isChatLoading}
              />
            )}
          </div>
        )}

        {/* Loading Skeleton during Topic Explanation */}
        {isExplaining && (
          <div className="bg-white border border-emerald-950/10 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-20 h-5 bg-emerald-100 rounded-full" />
              <div className="w-28 h-5 bg-slate-100 rounded-full" />
            </div>
            <div className="w-3/4 h-8 bg-slate-200 rounded-lg" />
            <div className="space-y-2">
              <div className="w-full h-4 bg-slate-100 rounded" />
              <div className="w-5/6 h-4 bg-slate-100 rounded" />
              <div className="w-2/3 h-4 bg-slate-100 rounded" />
            </div>
            <div className="p-5 bg-emerald-50 rounded-xl space-y-2">
              <div className="w-40 h-5 bg-emerald-200 rounded" />
              <div className="w-full h-4 bg-emerald-100/70 rounded" />
              <div className="w-4/5 h-4 bg-emerald-100/70 rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="h-24 bg-slate-100 rounded-xl" />
              <div className="h-24 bg-slate-100 rounded-xl" />
              <div className="h-24 bg-slate-100 rounded-xl" />
            </div>
            <div className="text-center text-xs text-slate-500 font-medium pt-2">
              EduBridge AI is calibrating explanation depth for {profile.educationLevel} ({profile.subjectName})...
            </div>
          </div>
        )}

        {/* Welcome Empty State */}
        {!explanation && !isExplaining && (
          <div className="bg-white border border-emerald-950/10 rounded-2xl p-6 sm:p-10 text-center shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-emerald-900/10">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-serif mb-2">
              Empowering Nigerian Students with Tailored AI Learning
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed mb-6">
              Tailored learning calibrated for <strong>Junior/Senior Secondary (JSS/SSS)</strong>, <strong>WAEC & NECO</strong> candidates, <strong>Polytechnic (ND/HND)</strong> students, and <strong>University</strong> undergraduates across Akwa Ibom State and Nigeria.
            </p>

            {/* 4 Distinct Level Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-left max-w-4xl mx-auto mb-8">
              <button
                type="button"
                onClick={() => {
                  setProfile((prev) => ({
                    ...prev,
                    educationLevel: 'Secondary School',
                    secondarySubLevel: 'JSS',
                    subjectName: JSS_SUBJECTS[0].name,
                  }));
                  setSelectedSubjectOption(JSS_SUBJECTS[0]);
                  setIsSetupOpen(true);
                }}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20 transition-all text-left cursor-pointer group"
              >
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md inline-block mb-2">
                  JSS & SSS
                </span>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                  Secondary School
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Basic Science, Basic Tech, Math, English, and senior department subjects.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfile((prev) => ({
                    ...prev,
                    educationLevel: 'WAEC/NECO Preparation',
                    examTarget: 'WAEC',
                    subjectName: WAEC_NECO_SUBJECTS[2].name,
                  }));
                  setSelectedSubjectOption(WAEC_NECO_SUBJECTS[2]);
                  setIsSetupOpen(true);
                }}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20 transition-all text-left cursor-pointer group"
              >
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md inline-block mb-2">
                  WAEC & NECO
                </span>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                  O-Level Exam Prep
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Exam-focused definitions, past-question format, and mark scheme emphasis.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfile((prev) => ({
                    ...prev,
                    educationLevel: 'ND/HND',
                    polyLevel: 'ND I',
                    polyProgramme: POLYTECHNIC_PROGRAMMES[0].name,
                    subjectName: POLYTECHNIC_PROGRAMMES[0].ndCourseUnits[0].name,
                  }));
                  setSelectedSubjectOption(POLYTECHNIC_PROGRAMMES[0].ndCourseUnits[0]);
                  setIsSetupOpen(true);
                }}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20 transition-all text-left cursor-pointer group"
              >
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md inline-block mb-2">
                  Polytechnic
                </span>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                  ND & HND Units
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Programmes in CS, Engineering, SLT, Accountancy, Mass Comm, etc.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfile((prev) => ({
                    ...prev,
                    educationLevel: 'University',
                    universityYear: '100 Level',
                    universityDiscipline: UNIVERSITY_DISCIPLINES[0].name,
                    subjectName: UNIVERSITY_DISCIPLINES[0].year100Units[0].name,
                  }));
                  setSelectedSubjectOption(UNIVERSITY_DISCIPLINES[0].year100Units[0]);
                  setIsSetupOpen(true);
                }}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20 transition-all text-left cursor-pointer group"
              >
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md inline-block mb-2">
                  Higher Ed (NUC)
                </span>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                  University Degrees
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  From 100L general foundation to 500L advanced departmental coursework.
                </p>
              </button>
            </div>

            {/* Quick try chips based on active subject */}
            <div className="inline-flex items-center gap-2 flex-wrap justify-center">
              <span className="text-xs text-slate-400">Quick start in {profile.subjectName}:</span>
              {(selectedSubjectOption.popularTopics?.slice(0, 3) || ['Photosynthesis', 'Quadratic Equations']).map(
                (topic) => (
                  <button
                    key={topic}
                    onClick={() => handleExplainTopic(topic)}
                    className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    ✨ {topic}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Disclaimer Banner */}
        <DisclaimerBanner />
      </main>

      {/* History Slide-over Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectTopic={handleSelectHistoryTopic}
        onDeleteItem={handleDeleteHistoryItem}
        onClearAll={handleClearAllHistory}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/70 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 font-serif">EduBridge AI</span>
            <span>—</span>
            <span>Learn smarter. Understand better.</span>
          </div>
          <div className="text-slate-400">
            Dedicated to academic excellence across Secondary, Polytechnic, and University education in Akwa Ibom State and Nigeria 🇳🇬
          </div>
        </div>
      </footer>
    </div>
  );
}
