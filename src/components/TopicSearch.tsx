import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, BookOpen, X, RefreshCw } from 'lucide-react';
import { EducationLevel, ExplanationStyle, SubjectOption } from '../types';

interface TopicSearchProps {
  onSearch: (topic: string) => void;
  isLoading: boolean;
  selectedSubject: SubjectOption;
  selectedLevel: EducationLevel;
  selectedStyle: ExplanationStyle;
  initialTopic?: string;
}

export const TopicSearch: React.FC<TopicSearchProps> = ({
  onSearch,
  isLoading,
  selectedSubject,
  selectedLevel,
  selectedStyle,
  initialTopic = '',
}) => {
  const [topicInput, setTopicInput] = useState(initialTopic);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = topicInput.trim();
    if (!trimmed) {
      setValidationError('Please enter a topic to explain (e.g., Photosynthesis, Ohm’s Law, Fractions).');
      return;
    }
    if (trimmed.length < 2) {
      setValidationError('Topic name is too short. Please be a bit more specific.');
      return;
    }
    setValidationError('');
    onSearch(trimmed);
  };

  const handleChipClick = (topicName: string) => {
    setTopicInput(topicName);
    setValidationError('');
    onSearch(topicName);
  };

  return (
    <div className="bg-white border border-emerald-950/10 rounded-2xl p-5 sm:p-6 shadow-sm mb-6">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-serif">
          What difficult topic would you like to master today?
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          EduBridge AI breaks down complex curriculum concepts into intuitive explanations, local analogies, and WAEC-ready practice questions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={topicInput}
            onChange={(e) => {
              setTopicInput(e.target.value);
              if (validationError) setValidationError('');
            }}
            placeholder={`Enter a topic in ${selectedSubject.name} (e.g. ${selectedSubject.popularTopics[0] || 'Photosynthesis'})...`}
            className="w-full pl-12 pr-28 sm:pr-36 py-3.5 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-sm sm:text-base transition-all"
            disabled={isLoading}
          />
          {topicInput && !isLoading && (
            <button
              type="button"
              onClick={() => setTopicInput('')}
              className="absolute right-24 sm:right-32 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-medium rounded-lg text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Explaining...</span>
              </>
            ) : (
              <>
                <span>Explain</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {validationError && (
          <p className="text-red-600 text-xs mt-1.5 ml-1 font-medium">{validationError}</p>
        )}
      </form>

      {/* Suggested Topic Chips */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Recommended in {selectedSubject.name}:</span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {(selectedSubject.popularTopics && selectedSubject.popularTopics.length > 0
            ? selectedSubject.popularTopics
            : ['Core Principles', 'Key Formulas & Rules', 'Common Exam Questions', 'Practical Applications']
          ).map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => handleChipClick(topic)}
              disabled={isLoading}
              className="text-xs px-2.5 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-900 text-slate-700 rounded-lg border border-slate-200/60 hover:border-emerald-300 transition-colors disabled:opacity-50"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
