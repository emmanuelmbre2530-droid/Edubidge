import { LearningHistoryItem, QuizQuestion } from '../types';

const STORAGE_KEY = 'edubridge_ai_learning_history_v1';

export function getStoredHistory(): LearningHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to parse history from localStorage', err);
    return [];
  }
}

export function saveTopicToHistory(
  item: Omit<LearningHistoryItem, 'id' | 'savedAt'>
): LearningHistoryItem {
  const history = getStoredHistory();
  const existingIndex = history.findIndex(
    (h) =>
      h.topic.toLowerCase().trim() === item.topic.toLowerCase().trim() &&
      h.subject.toLowerCase() === item.subject.toLowerCase()
  );

  const newItem: LearningHistoryItem = {
    ...item,
    id: existingIndex >= 0 ? history[existingIndex].id : 'hist_' + Date.now(),
    savedAt: new Date().toISOString(),
  };

  let updated: LearningHistoryItem[];
  if (existingIndex >= 0) {
    // Preserve existing quiz data if present
    if (!newItem.quizScore && history[existingIndex].quizScore) {
      newItem.quizScore = history[existingIndex].quizScore;
      newItem.quizQuestions = history[existingIndex].quizQuestions;
    }
    updated = [
      newItem,
      ...history.filter((_, idx) => idx !== existingIndex),
    ];
  } else {
    updated = [newItem, ...history];
  }

  // Keep up to 30 recent topics
  const capped = updated.slice(0, 30);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(capped));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }

  return newItem;
}

export function updateTopicQuizScore(
  id: string,
  quizScore: { score: number; total: number },
  quizQuestions?: QuizQuestion[]
): void {
  const history = getStoredHistory();
  const updated = history.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        quizScore,
        quizQuestions: quizQuestions || item.quizQuestions,
      };
    }
    return item;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update quiz score in localStorage', err);
  }
}

export function deleteHistoryItem(id: string): LearningHistoryItem[] {
  const history = getStoredHistory().filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (err) {
    console.error('Failed to delete history item', err);
  }
  return history;
}

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear history', err);
  }
}
