import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  RefreshCw,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import { ChatMessage, EducationLevel } from '../types';

interface FollowUpChatProps {
  topic: string;
  subject: string;
  level: EducationLevel;
  lessonSummary: string;
  messages: ChatMessage[];
  onSendMessage: (question: string) => Promise<void>;
  isLoading: boolean;
}

export const FollowUpChat: React.FC<FollowUpChatProps> = ({
  topic,
  subject,
  level,
  lessonSummary,
  messages,
  onSendMessage,
  isLoading,
}) => {
  const [inputQuestion, setInputQuestion] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    `Can you give another Nigerian everyday example for this?`,
    `How does WAEC or NECO usually test ${topic}?`,
    `What is the most common mistake students make in ${topic}?`,
    `Can you simplify the most difficult part of this topic?`,
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputQuestion.trim();
    if (!trimmed || isLoading) return;

    setErrorMsg('');
    setInputQuestion('');
    try {
      await onSendMessage(trimmed);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send message. Please try again.');
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputQuestion(prompt);
  };

  return (
    <div className="bg-white border border-emerald-950/10 rounded-2xl p-5 sm:p-7 shadow-sm flex flex-col h-[650px]">
      {/* Chat Header */}
      <div className="pb-4 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight font-serif flex items-center gap-2">
              Ask EduBridge Tutor
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Context Active
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Topic: <strong className="text-slate-700">{topic}</strong> ({subject} • {level})
            </p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-1">
              Have questions about {topic}?
            </h3>
            <p className="text-xs sm:text-sm max-w-md text-slate-500 mb-5">
              Ask anything you did not understand in the lesson, request additional examples, or ask how this topic appears in Nigerian exams.
            </p>

            {/* Starter Suggestion Pills */}
            <div className="w-full max-w-md space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Suggested Questions to Ask:
              </span>
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickPrompt(q)}
                  className="w-full text-left text-xs p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 transition-colors flex items-center gap-2"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{q}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-slate-800 text-white'
                      : 'bg-emerald-700 text-white shadow-xs'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-slate-900 text-white rounded-tr-none'
                      : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-none prose prose-slate max-w-none whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-[10px] mt-1.5 opacity-60 ${
                      isUser ? 'text-right text-slate-300' : 'text-left text-slate-400'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none p-4 text-xs sm:text-sm text-slate-600 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
              <span>EduBridge Tutor is crafting your answer...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error state */}
      {errorMsg && (
        <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center gap-2 mb-2 shrink-0">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Suggested chips row when conversation is ongoing */}
      {messages.length > 0 && !isLoading && (
        <div className="flex gap-2 overflow-x-auto py-1 mb-2 shrink-0 text-xs no-scrollbar">
          {suggestedQuestions.slice(0, 2).map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickPrompt(q)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 rounded-full border border-slate-200 transition-colors shrink-0"
            >
              + {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="pt-2 border-t border-slate-100 shrink-0 flex items-center gap-2">
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder={`Ask anything about ${topic}...`}
          disabled={isLoading}
          className="flex-1 py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-xs sm:text-sm transition-all"
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuestion.trim()}
          className="p-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-300 text-white rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
          title="Send Question"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
