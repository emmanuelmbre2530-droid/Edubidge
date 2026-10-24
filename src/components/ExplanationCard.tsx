import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Sparkles,
  ArrowRight,
  Printer,
  FileQuestion,
} from 'lucide-react';
import { EducationLevel, ExplanationStyle, TopicExplanation } from '../types';

interface ExplanationCardProps {
  explanation: TopicExplanation;
  topic: string;
  subject: string;
  level: EducationLevel;
  style: ExplanationStyle;
  onStartQuiz: () => void;
  isQuizLoading?: boolean;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  explanation,
  topic,
  subject,
  level,
  style,
  onStartQuiz,
  isQuizLoading = false,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // Web Speech API for Read Aloud
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported by your browser.');
      return;
    }

    if (isPlayingSpeech) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${explanation.title}. Overview: ${explanation.overview}. Explanation: ${explanation.explanation}. Real life example: ${explanation.relatableExample}. Key takeaways: ${explanation.keyTakeaways.join('. ')}.`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingSpeech(false);
      utterance.onerror = () => setIsPlayingSpeech(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingSpeech(true);
    }
  };

  const handleCopy = async () => {
    const fullText = `EduBridge AI Lesson: ${explanation.title}\nSubject: ${subject} | Level: ${level}\n\nOVERVIEW:\n${explanation.overview}\n\nEXPLANATION:\n${explanation.explanation}\n\nREAL-WORLD EXAMPLE:\n${explanation.relatableExample}\n\nKEY TAKEAWAYS:\n${explanation.keyTakeaways.map((k, i) => `${i + 1}. ${k}`).join('\n')}\n\nCOMPREHENSION CHECK:\nQ: ${explanation.comprehensionQuestion.question}\nA: ${explanation.comprehensionQuestion.answer}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-emerald-950/10 rounded-2xl p-5 sm:p-7 shadow-sm space-y-7">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              {subject}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
              {level}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
              {style}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
            {explanation.title}
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <button
            onClick={handleToggleSpeech}
            className={`p-2 sm:px-3 sm:py-2 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              isPlayingSpeech
                ? 'bg-emerald-700 text-white border-emerald-700 animate-pulse'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
            title={isPlayingSpeech ? 'Stop Audio' : 'Listen to this lesson'}
          >
            {isPlayingSpeech ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
            <span className="hidden sm:inline">{isPlayingSpeech ? 'Stop Audio' : 'Read Aloud'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-2 sm:px-3 sm:py-2 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
            title="Copy entire lesson notes"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span className="hidden sm:inline">{isCopied ? 'Copied!' : 'Copy Lesson'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 sm:px-3 sm:py-2 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* 1. Concise Overview */}
      <div className="bg-emerald-50/50 border-l-4 border-emerald-600 p-4 sm:p-5 rounded-r-xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1.5">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Quick Summary</span>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
          {explanation.overview}
        </p>
      </div>

      {/* 2. Detailed Explanation */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          Core Explanation & Key Principles
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-3 whitespace-pre-line">
          {explanation.explanation}
        </div>
      </div>

      {/* 3. Relatable Example (Nigerian / Real-World Context) */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50/60 border border-emerald-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2.5 mb-3 text-emerald-900">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-base text-emerald-950">
              Relatable Real-World Example
            </h4>
            <p className="text-xs text-emerald-700">
              {style === 'Everyday Nigerian Examples'
                ? 'Grounded in Akwa Ibom & Nigerian everyday life'
                : 'Practical, intuitive analogy'}
            </p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed bg-white/80 p-4 rounded-lg border border-emerald-100">
          {explanation.relatableExample}
        </p>
      </div>

      {/* 4. Three Key Takeaways */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-emerald-700" />
          3 Essential Exam Takeaways
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {explanation.keyTakeaways.map((takeaway, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  Takeaway {idx + 1}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {takeaway}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Comprehension Check Question */}
      <div className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base">
            <HelpCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Quick Self-Check</span>
          </div>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-amber-200 hover:border-emerald-300 transition-all cursor-pointer"
          >
            <span>{showAnswer ? 'Hide Answer' : 'Check Answer'}</span>
            {showAnswer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <p className="text-sm sm:text-base font-semibold text-slate-900 mb-2">
          {explanation.comprehensionQuestion.question}
        </p>

        {explanation.comprehensionQuestion.hint && !showAnswer && (
          <p className="text-xs text-amber-800 italic bg-amber-100/50 p-2.5 rounded-lg border border-amber-200/60 mb-2">
            💡 <strong>Hint:</strong> {explanation.comprehensionQuestion.hint}
          </p>
        )}

        {showAnswer && (
          <div className="mt-3 pt-3 border-t border-amber-200 text-xs sm:text-sm text-slate-800 bg-white p-3.5 rounded-lg border border-amber-200/60">
            <span className="font-bold text-emerald-800 block mb-1">
              Correct Answer & Reasoning:
            </span>
            <p className="leading-relaxed">{explanation.comprehensionQuestion.answer}</p>
          </div>
        )}
      </div>

      {/* Next Step / Quiz Call-to-action */}
      <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-900 text-white p-5 rounded-xl shadow-md">
        <div>
          <h4 className="font-bold text-base sm:text-lg flex items-center gap-2">
            <FileQuestion className="w-5 h-5 text-emerald-300" />
            Ready to test your understanding?
          </h4>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-0.5">
            Take a 5-question multiple choice quiz with detailed answers.
          </p>
        </div>
        <button
          onClick={onStartQuiz}
          disabled={isQuizLoading}
          className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-sm flex items-center justify-center gap-2 transition-all shrink-0 shadow-sm cursor-pointer disabled:opacity-50"
        >
          <span>{isQuizLoading ? 'Generating Quiz...' : 'Start Practice Quiz'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
