import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllQuestions } from "./quiz";
import {
  ASSESSMENT_POOL_VERSION,
  BEGINNER_TOPIC_MOVES,
  PROGRESS_MIGRATION_VERSION,
  QUIZ_POOL_VERSIONS,
} from "./curriculum";

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

// Write operations that must preserve existing records use strict reads.
// A transient storage error must never be mistaken for an empty object.
const readObjectStrict = async (key) => {
  const raw = await AsyncStorage.getItem(key);

  if (!raw) {
    return {};
  }

  const value = JSON.parse(raw);

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Stored value for " + key + " is not an object");
  }

  return value;
};

const readArrayStrict = async (key) => {
  const raw = await AsyncStorage.getItem(key);

  if (!raw) {
    return [];
  }

  const value = JSON.parse(raw);

  if (!Array.isArray(value)) {
    throw new Error("Stored value for " + key + " is not an array");
  }

  return value;
};

// ============================================================
// LESSON PROGRESS
// ============================================================

const migrationInFlight = new Map();

const runCurriculumProgressMigration = async (languageKey) => {
  const promotedIds = BEGINNER_TOPIC_MOVES[languageKey];

  if (!promotedIds?.length) {
    return true;
  }

  const markerKey = "curriculum_migration_" + languageKey;
  const progressKey = "progress_" + languageKey;

  try {
    // Read directly here so a storage read error cannot be mistaken for empty
    // progress and followed by a successful migration marker.
    const markerRaw = await AsyncStorage.getItem(markerKey);
    const completedVersion = markerRaw ? JSON.parse(markerRaw) : 0;

    if (completedVersion >= PROGRESS_MIGRATION_VERSION) {
      return true;
    }

    const progressRaw = await AsyncStorage.getItem(progressKey);
    const existing = progressRaw ? JSON.parse(progressRaw) : {};
    const promoted = new Set(promotedIds);
    const beginner = Array.isArray(existing.L1) ? existing.L1 : [];
    const intermediate = Array.isArray(existing.L2) ? existing.L2 : [];
    const nextBeginner = [
      ...new Set([...beginner, ...intermediate.filter((id) => promoted.has(id))]),
    ];
    const nextIntermediate = [
      ...new Set(intermediate.filter((id) => !promoted.has(id))),
    ];

    const next = {
      ...existing,
      L1: nextBeginner,
      L2: nextIntermediate,
    };

    if (JSON.stringify(next) !== JSON.stringify(existing)) {
      await AsyncStorage.setItem(progressKey, JSON.stringify(next));
    }

    // The marker is written only after the progress transformation succeeds.
    await AsyncStorage.setItem(
      markerKey,
      JSON.stringify(PROGRESS_MIGRATION_VERSION),
    );
    return true;
  } catch (error) {
    console.error("Error migrating curriculum progress:", error);
    return false;
  }
};

// Explicit entry point for tests and controlled migration workflows.
export const migrateCurriculumProgress = (languageKey) => {
  if (migrationInFlight.has(languageKey)) {
    return migrationInFlight.get(languageKey);
  }

  const migration = runCurriculumProgressMigration(languageKey).finally(() => {
    migrationInFlight.delete(languageKey);
  });

  migrationInFlight.set(languageKey, migration);
  return migration;
};

export const getProgress = async (languageKey) => {
  await migrateCurriculumProgress(languageKey);
  return read("progress_" + languageKey, {});
};

export const saveProgress = async (languageKey, level, topicId) => {
  if (!(await migrateCurriculumProgress(languageKey))) {
    return false;
  }

  try {
    const progressKey = "progress_" + languageKey;
    const existing = await readObjectStrict(progressKey);
    const completed = Array.isArray(existing[level]) ? existing[level] : [];

    if (!completed.includes(topicId)) {
      existing[level] = [...completed, topicId];
      return write(progressKey, existing);
    }

    return true;
  } catch (error) {
    console.error("Error updating lesson progress:", error);
    return false;
  }
};

export const isLevelComplete = async (languageKey, level, topics) => {
  const progress = await getProgress(languageKey);
  const completed = progress[level] || [];

  return topics.every((topic) => completed.includes(topic.id));
};

// ============================================================
// QUIZ PASSES
// ============================================================

const quizVersionKey = (languageKey) => "quiz_versions_" + languageKey;

export const getQuizProgress = async (languageKey) => {
  const [storedPasses, storedVersions] = await Promise.all([
    read("quiz_" + languageKey, {}),
    read(quizVersionKey(languageKey), {}),
  ]);
  const currentVersions = QUIZ_POOL_VERSIONS[languageKey] || {};
  const currentPasses = {};

  for (const [level, version] of Object.entries(currentVersions)) {
    currentPasses[level] =
      storedPasses[level] === true &&
      storedVersions[level] === version;
  }

  return currentPasses;
};

export const saveQuizPassed = async (languageKey, level) => {
  const version = QUIZ_POOL_VERSIONS[languageKey]?.[level];

  if (!version) {
    return false;
  }

  try {
    const [passed, versions] = await Promise.all([
      readObjectStrict("quiz_" + languageKey),
      readObjectStrict(quizVersionKey(languageKey)),
    ]);

    passed[level] = true;
    versions[level] = version;

    // Store the pass first. Without its matching current version it remains
    // invalid, so a failed version write cannot revive a stale legacy pass.
    const passSaved = await write("quiz_" + languageKey, passed);

    if (!passSaved) {
      return false;
    }

    return write(quizVersionKey(languageKey), versions);
  } catch (error) {
    console.error("Error saving quiz pass:", error);
    return false;
  }
};

export const isQuizPassed = async (languageKey, level) => {
  const passed = await getQuizProgress(languageKey);
  return passed[level] === true;
};

export const resetQuizProgress = async (languageKey, level) => {
  try {
    const [passed, versions] = await Promise.all([
      readObjectStrict("quiz_" + languageKey),
      readObjectStrict(quizVersionKey(languageKey)),
    ]);

    delete passed[level];
    delete versions[level];

    // Invalidate the version first. If clearing the pass fails afterward,
    // the old boolean can no longer count as a current pass.
    const versionsSaved = await write(quizVersionKey(languageKey), versions);

    if (!versionsSaved) {
      return false;
    }

    return write("quiz_" + languageKey, passed);
  } catch (error) {
    console.error("Error resetting quiz progress:", error);
    return false;
  }
};

// ============================================================
// INITIAL ASSESSMENT (per language)
// ============================================================

const assessmentKey = (languageKey) => `assessment_${languageKey}`;

export const saveAssessmentResult = (languageKey, results) =>
  write(assessmentKey(languageKey), {
    completed: true,
    ...results, // { scores, startingLevel }
    assessmentVersion: ASSESSMENT_POOL_VERSION,
    completedAt: new Date().toISOString(),
  });

export const getAssessmentResult = async (languageKey) => {
  const result = await read(assessmentKey(languageKey), null);

  if (!result) {
    return null;
  }

  // A skipped assessment contains no score and safely defaults to Beginner.
  if (result.skipped === true) {
    return result;
  }

  return result.assessmentVersion === ASSESSMENT_POOL_VERSION ? result : null;
};

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
  try {
    const list = await readArrayStrict("bookmarks");
    const exists = list.some(
      (bookmark) =>
        bookmark.languageKey === languageKey && bookmark.topicId === topicId,
    );
    const next = exists
      ? list.filter(
          (bookmark) =>
            !(bookmark.languageKey === languageKey && bookmark.topicId === topicId),
        )
      : [...list, { languageKey, topicId }];

    if (!(await write("bookmarks", next))) {
      throw new Error("Bookmark storage write failed");
    }

    return !exists;
  } catch (error) {
    console.error("Error updating bookmark:", error);
    throw error;
  }
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
  const key = "practice_" + languageKey;

  try {
    const done = await readArrayStrict(key);

    if (!done.includes(topicId)) {
      return write(key, [...done, topicId]);
    }

    return true;
  } catch (error) {
    console.error("Error saving practice completion:", error);
    return false;
  }
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

  try {
    const missed = await readArrayStrict("missed_questions");
    const has = missed.includes(key);

    if (!correct && !has) {
      return write("missed_questions", [...missed, key]);
    }

    if (correct && has) {
      return write(
        "missed_questions",
        missed.filter((item) => item !== key),
      );
    }

    return true;
  } catch (error) {
    console.error("Error recording quiz answer:", error);
    return false;
  }
};

export const getMissedQuestions = async () => {
  let storedKeys;

  try {
    storedKeys = await readArrayStrict("missed_questions");
  } catch (error) {
    console.error("Error loading missed questions:", error);
    return [];
  }

  const currentQuestions = getAllQuestions();
  const currentKeysByText = new Map();

  for (const item of currentQuestions) {
    const textKey = item._lang + "|" + item.question;
    const matches = currentKeysByText.get(textKey) || [];
    matches.push({
      level: item._level,
      key: questionKey(item._lang, item._level, item.question),
    });
    currentKeysByText.set(textKey, matches);
  }

  // Keep the original level when the wording still exists there. If it moved,
  // re-key only when that wording identifies exactly one current question.
  const currentKeys = [
    ...new Set(
      storedKeys.flatMap((storedKey) => {
        const [languageKey, oldLevel, ...questionParts] = storedKey.split("|");
        const question = questionParts.join("|");
        const matches = currentKeysByText.get(languageKey + "|" + question) || [];
        const sameLevel = matches.find((match) => match.level === oldLevel);

        if (sameLevel) return [sameLevel.key];
        return matches.length === 1 ? [matches[0].key] : [];
      }),
    ),
  ];

  if (
    currentKeys.length !== storedKeys.length ||
    currentKeys.some((key, index) => key !== storedKeys[index])
  ) {
    if (!(await write("missed_questions", currentKeys))) {
      return [];
    }
  }

  return currentQuestions.filter((item) =>
    currentKeys.includes(questionKey(item._lang, item._level, item.question)),
  );
};
