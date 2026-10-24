import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Check,
  RefreshCw,
} from 'lucide-react';
import { QuizQuestion } from '../types';

interface PracticeQuizProps {
  topic: string;
  subject: string;
  questions: QuizQuestion[];
  onQuizComplete: (score: number, total: number, questions: QuizQuestion[]) => void;
  onRegenerateQuiz: () => void;
  isRegenerating: boolean;
  onBackToLesson: () => void;
  initialAnswers?: Record<number, number>;
  initialIsSubmitted?: boolean;
}

export const PracticeQuiz: React.FC<PracticeQuizProps> = ({
  topic,
  subject,
  questions,
  onQuizComplete,
  onRegenerateQuiz,
  isRegenerating,
  onBackToLesson,
  initialAnswers = {},
  initialIsSubmitted = false,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(initialAnswers);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(initialIsSubmitted);
  const [validationError, setValidationError] = useState<string>('');

  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return; // Locked once submitted
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
    if (validationError) setValidationError('');
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = questions.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answeredCount < totalQuestions) {
      const unansweredNumbers: number[] = [];
      for (let i = 0; i < totalQuestions; i++) {
        if (selectedAnswers[i] === undefined) {
          unansweredNumbers.push(i + 1);
        }
      }
      setValidationError(
        `Please answer all questions before submitting. Unanswered: Question ${unansweredNumbers.join(', ')}.`
      );
      return;
    }

    setValidationError('');
    setIsSubmitted(true);

    // Calculate score
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });

    onQuizComplete(score, totalQuestions, questions);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setValidationError('');
  };

  // Calculate current score if submitted
  const currentScore = questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const scorePercentage = Math.round((currentScore / totalQuestions) * 100);

  return (
    <div className="bg-white border border-emerald-950/10 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {subject} • Practice Assessment
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-serif">
            Practice Quiz: {topic}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Answer the 5 multiple-choice questions below. Correct answers and explanations are revealed after submission.
          </p>
        </div>

        {/* Progress tracker */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center sm:text-right shrink-0">
          <div className="text-xs text-slate-500 font-medium">Answered</div>
          <div className="text-lg font-bold text-slate-800">
            {answeredCount} <span className="text-slate-400 font-normal">/ {totalQuestions}</span>
          </div>
        </div>
      </div>

      {/* Results Banner (shown when submitted) */}
      {isSubmitted && (
        <div
          className={`p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs ${
            currentScore >= 4
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : currentScore === 3
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm shrink-0 ${
                currentScore >= 4
                  ? 'bg-emerald-600 text-white'
                  : currentScore === 3
                  ? 'bg-amber-600 text-white'
                  : 'bg-rose-600 text-white'
              }`}
            >
              {currentScore}/{totalQuestions}
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Award className="w-5 h-5 text-current" />
                <h3 className="font-extrabold text-lg sm:text-xl">
                  {currentScore === 5
                    ? 'Distinction! Perfect Score (100%)'
                    : currentScore === 4
                    ? 'Excellent Performance! (80%)'
                    : currentScore === 3
                    ? 'Good Effort! Credit Pass (60%)'
                    : 'Needs Revision. Keep Going!'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm opacity-90 mt-1">
                {currentScore >= 4
                  ? 'You demonstrated solid mastery of this topic. Review the explanations below to reinforce your knowledge.'
                  : currentScore === 3
                  ? 'You understand the basics well. Read through the detailed explanations below to clear up minor confusions.'
                  : 'Do not be discouraged! Review the detailed answers and explanations below, then try again.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleRetake}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-slate-600" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={onRegenerateQuiz}
              disabled={isRegenerating}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow-2xs flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>{isRegenerating ? 'Generating...' : 'New Questions'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Validation warning */}
      {validationError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Questions list */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, qIndex) => {
          const selectedOption = selectedAnswers[qIndex];
          const hasAnswered = selectedOption !== undefined;
          const isCorrect = isSubmitted && selectedOption === q.correctIndex;
          const isWrong = isSubmitted && selectedOption !== q.correctIndex;

          return (
            <div
              key={q.id || qIndex}
              className={`p-4 sm:p-6 rounded-2xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200/80 bg-white hover:border-slate-300'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-2.5">
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                        : hasAnswered
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {qIndex + 1}
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    {q.question}
                  </p>
                </div>

                {isSubmitted && (
                  <div className="shrink-0">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5" />
                        Incorrect
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* 4 Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-0 sm:pl-9 mt-3">
                {q.options.map((optionText, optIndex) => {
                  const isThisSelected = selectedOption === optIndex;
                  const isThisCorrect = isSubmitted && q.correctIndex === optIndex;
                  const isThisUserWrong = isSubmitted && isThisSelected && !isCorrect;

                  let optionStyle =
                    'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 text-slate-800';

                  if (!isSubmitted) {
                    if (isThisSelected) {
                      optionStyle =
                        'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20';
                    }
                  } else {
                    if (isThisCorrect) {
                      optionStyle =
                        'border-emerald-500 bg-emerald-100/70 text-emerald-950 font-medium ring-2 ring-emerald-500/30';
                    } else if (isThisUserWrong) {
                      optionStyle =
                        'border-rose-400 bg-rose-100/70 text-rose-950 line-through opacity-85';
                    } else {
                      optionStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      onClick={() => handleSelectOption(qIndex, optIndex)}
                      disabled={isSubmitted}
                      className={`text-left p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 transition-all cursor-pointer disabled:cursor-default ${optionStyle}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                          isThisCorrect
                            ? 'bg-emerald-600 text-white'
                            : isThisUserWrong
                            ? 'bg-rose-600 text-white'
                            : isThisSelected
                            ? 'bg-emerald-700 text-white'
                            : 'bg-white text-slate-600 border border-slate-300'
                        }`}
                      >
                        {optionLetters[optIndex]}
                      </span>
                      <span className="leading-snug flex-1">{optionText}</span>
                    </button>
                  );
                })}
              </div>

              {/* Detailed Explanation (Revealed only after submission) */}
              {isSubmitted && (
                <div className="mt-4 sm:ml-9 p-3.5 sm:p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs sm:text-sm text-slate-800">
                  <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      Correct Answer: Option {optionLetters[q.correctIndex]} ({q.options[q.correctIndex]})
                    </span>
                  </div>
                  <p className="leading-relaxed text-slate-700">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Submit Bar */}
        {!isSubmitted && (
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onBackToLesson}
              className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 font-medium px-4 py-2"
            >
              ← Back to Lesson Notes
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Submit & Check Score</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
