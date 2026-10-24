import React from 'react';
import { GraduationCap, History, Sparkles, SlidersHorizontal, MapPin } from 'lucide-react';
import { EducationLevel, ExplanationStyle } from '../types';

interface HeaderProps {
  level: EducationLevel;
  subjectName: string;
  style: ExplanationStyle;
  historyCount: number;
  onOpenHistory: () => void;
  onToggleSetup: () => void;
  isSetupOpen: boolean;
  profileSummary?: string;
}

export const Header: React.FC<HeaderProps> = ({
  level,
  subjectName,
  style,
  historyCount,
  onOpenHistory,
  onToggleSetup,
  isSetupOpen,
  profileSummary,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-emerald-950/10 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/10">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight font-serif">
                EduBridge <span className="text-emerald-700">AI</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                <MapPin className="w-3 h-3 text-emerald-600" />
                Akwa Ibom
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium tracking-wide">
              Learn smarter. Understand better.
            </p>
          </div>
        </div>

        {/* Current Student Profile & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleSetup}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors ${
              isSetupOpen
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
            }`}
            title="Adjust Education Level, Subject & Explanation Style"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700" />
            <span className="hidden md:inline text-slate-500 font-normal">Level:</span>
            <span className="truncate max-w-[150px] sm:max-w-[240px]">
              {profileSummary || `${subjectName} • ${level === 'WAEC/NECO Preparation' ? 'WAEC Prep' : level}`}
            </span>
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-white text-slate-700 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors shadow-2xs relative"
            title="View saved topics and practice quiz scores"
          >
            <History className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-emerald-600 text-white">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
