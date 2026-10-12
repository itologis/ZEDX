import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllQuestions } from "./quiz";

const read = async (key, fallback) => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return fallback;
  }
};

const write = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
    return false;
  }
};

// ============================================================
// LESSON PROGRESS
// ============================================================

export const getProgress = (languageKey) => read(`progress_${languageKey}`, {});

export const saveProgress = async (languageKey, level, topicId) => {
  const existing = await getProgress(languageKey);

  if (!existing[level]) {
    existing[level] = [];
  }

  if (!existing[level].includes(topicId)) {
    existing[level].push(topicId);
    return write(`progress_${languageKey}`, existing);
  }

  return true;
};

export const isLevelComplete = async (languageKey, level, topics) => {
  const progress = await getProgress(languageKey);
  const completed = progress[level] || [];

  return topics.every((topic) => completed.includes(topic.id));
};

// ============================================================
// QUIZ PASSES
// ============================================================

export const getQuizProgress = (languageKey) => read(`quiz_${languageKey}`, {});

export const saveQuizPassed = async (languageKey, level) => {
  const passed = await getQuizProgress(languageKey);
  passed[level] = true;
  return write(`quiz_${languageKey}`, passed);
};

export const isQuizPassed = async (languageKey, level) => {
  const passed = await getQuizProgress(languageKey);
  return passed[level] || false;
};

export const resetQuizProgress = async (languageKey, level) => {
  const passed = await getQuizProgress(languageKey);
  delete passed[level];
  return write(`quiz_${languageKey}`, passed);
};

// ============================================================
// INITIAL ASSESSMENT (per language)
// ============================================================

const assessmentKey = (languageKey) => `assessment_${languageKey}`;

export const saveAssessmentResult = (languageKey, results) =>
  write(assessmentKey(languageKey), {
    completed: true,
    ...results, // { scores, startingLevel }
    completedAt: new Date().toISOString(),
  });

export const getAssessmentResult = (languageKey) =>
  read(assessmentKey(languageKey), null);

export const hasCompletedAssessment = async (languageKey) => {
  const assessment = await getAssessmentResult(languageKey);
  return assessment?.completed === true;
};

export const resetAssessment = async (languageKey) => {
  try {
    await AsyncStorage.removeItem(assessmentKey(languageKey));
    return true;
  } catch (error) {
    console.error("Error resetting assessment:", error);
    return false;
  }
};

// ============================================================
// BOOKMARKS
// ============================================================

export const getBookmarks = () => read("bookmarks", []);

export const isBookmarked = async (languageKey, topicId) => {
  const list = await getBookmarks();
  return list.some(
    (b) => b.languageKey === languageKey && b.topicId === topicId,
  );
};

// Returns true if the topic is bookmarked after the toggle
export const toggleBookmark = async (languageKey, topicId) => {
  const list = await getBookmarks();
  const exists = list.some(
    (b) => b.languageKey === languageKey && b.topicId === topicId,
  );

  const next = exists
    ? list.filter(
        (b) => !(b.languageKey === languageKey && b.topicId === topicId),
      )
    : [...list, { languageKey, topicId }];

  await write("bookmarks", next);

  return !exists;
};

// ============================================================
// LAST TOPIC ("continue where you left off")
// ============================================================

export const saveLastTopic = (languageKey, topicId) =>
  write("last_topic", { languageKey, topicId });

export const getLastTopic = () => read("last_topic", null);

// ============================================================
// PRACTICE EXERCISES
// ============================================================

export const getPracticeDone = (languageKey) =>
  read(`practice_${languageKey}`, []);

export const savePracticeDone = async (languageKey, topicId) => {
  const done = await getPracticeDone(languageKey);

  if (!done.includes(topicId)) {
    return write(`practice_${languageKey}`, [...done, topicId]);
  }

  return true;
};

// ============================================================
// MISSED QUESTIONS (for review mode)
// ============================================================

export const questionKey = (languageKey, level, question) =>
  `${languageKey}|${level}|${question}`;

// A question is added when answered wrong and removed when answered right
export const recordQuizAnswer = async (
  languageKey,
  level,
  question,
  correct,
) => {
  const key = questionKey(languageKey, level, question);
  const missed = await read("missed_questions", []);
  const has = missed.includes(key);

  if (!correct && !has) {
    await write("missed_questions", [...missed, key]);
  }

  if (correct && has) {
    await write(
      "missed_questions",
      missed.filter((k) => k !== key),
    );
  }
};

export const getMissedQuestions = async () => {
  const keys = await read("missed_questions", []);

  return getAllQuestions().filter((item) =>
    keys.includes(questionKey(item._lang, item._level, item.question)),
  );
};
