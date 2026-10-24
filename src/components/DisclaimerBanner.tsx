import React from 'react';
import { AlertTriangle, BookCheck } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 sm:p-4 text-amber-900 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
      <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <span className="font-semibold text-amber-950">Educational AI Disclaimer: </span>
        EduBridge AI is built to make difficult academic topics accessible, but AI-generated explanations and quizzes may occasionally contain inaccuracies. Always cross-check definitions, formulas, and facts with your official teachers, NERDC/WAEC syllabus, or recommended Nigerian textbooks.
      </div>
    </div>
  );
};
