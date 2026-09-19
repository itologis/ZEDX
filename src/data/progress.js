import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================================
// LESSON PROGRESS
// ============================================================

export const saveProgress = async (languageKey, level, topicId) => {
  try {
    const key = `progress_${languageKey}`;
    const existing = await getProgress(languageKey);

    if (!existing[level]) {
      existing[level] = [];
    }

    if (!existing[level].includes(topicId)) {
      existing[level].push(topicId);
      await AsyncStorage.setItem(key, JSON.stringify(existing));
    }

    return true;
  } catch (error) {
    console.error('Error saving progress:', error);
    return false;
  }
};

export const getProgress = async (languageKey) => {
  try {
    const key = `progress_${languageKey}`;
    const data = await AsyncStorage.getItem(key);

    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error getting progress:', error);
    return {};
  }
};

export const isLevelComplete = async (languageKey, level, topics) => {
  const progress = await getProgress(languageKey);
  const completedTopics = progress[level] || [];

  const levelTopicIds = topics.map(topic => topic.id);

  return levelTopicIds.every(id =>
    completedTopics.includes(id)
  );
};

// ============================================================
// LEVEL UNLOCKING
// ============================================================

// Quiz scores no longer control lesson progression.
// Completing the topics in a level is enough to unlock the next level.
export const isLevelFullyComplete = async (
  languageKey,
  level,
  topics
) => {
  return await isLevelComplete(languageKey, level, topics);
};

export const getUnlockedLevels = async (languageKey, levels) => {
  const unlocked = [];

  for (let i = 0; i < levels.length; i++) {
    if (i === 0) {
      unlocked.push(levels[i].level);
      continue;
    }

    const previousLevel = levels[i - 1];

    const previousComplete = await isLevelComplete(
      languageKey,
      previousLevel.level,
      previousLevel.topics
    );

    if (previousComplete) {
      unlocked.push(levels[i].level);
    } else {
      break;
    }
  }

  return unlocked;
};

export const getCompletedTopics = async (languageKey) => {
  const progress = await getProgress(languageKey);

  const completed = [];

  for (const level in progress) {
    completed.push(...progress[level]);
  }

  return completed;
};

// ============================================================
// QUIZ FUNCTIONS
// ============================================================

// Quizzes still exist.
// They are now separate from lesson unlocking.

export const saveQuizPassed = async (languageKey, level) => {
  try {
    const key = `quiz_${languageKey}`;

    const existing = await AsyncStorage.getItem(key);
    const passed = existing ? JSON.parse(existing) : {};

    passed[level] = true;

    await AsyncStorage.setItem(
      key,
      JSON.stringify(passed)
    );

    console.log(
      `Quiz passed saved for ${languageKey} - ${level}`
    );

    return true;
  } catch (error) {
    console.error('Error saving quiz:', error);
    return false;
  }
};

export const isQuizPassed = async (languageKey, level) => {
  try {
    const key = `quiz_${languageKey}`;

    const data = await AsyncStorage.getItem(key);
    const passed = data ? JSON.parse(data) : {};

    return passed[level] || false;
  } catch (error) {
    console.error('Error checking quiz:', error);
    return false;
  }
};

export const getQuizProgress = async (languageKey) => {
  try {
    const key = `quiz_${languageKey}`;

    const data = await AsyncStorage.getItem(key);

    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error getting quiz progress:', error);
    return {};
  }
};

export const resetQuizProgress = async (languageKey, level) => {
  try {
    const key = `quiz_${languageKey}`;

    const existing = await AsyncStorage.getItem(key);
    const passed = existing ? JSON.parse(existing) : {};

    delete passed[level];

    await AsyncStorage.setItem(
      key,
      JSON.stringify(passed)
    );

    return true;
  } catch (error) {
    console.error('Error resetting quiz:', error);
    return false;
  }
};

// ============================================================
// INITIAL ASSESSMENT
// ============================================================

export const saveAssessmentResult = async (results) => {
  try {
    await AsyncStorage.setItem(
      'initial_assessment',
      JSON.stringify({
        completed: true,
        results,
        completedAt: new Date().toISOString(),
      })
    );

    return true;
  } catch (error) {
    console.error(
      'Error saving assessment:',
      error
    );
    return false;
  }
};

export const getAssessmentResult = async () => {
  try {
    const data = await AsyncStorage.getItem(
      'initial_assessment'
    );

    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(
      'Error getting assessment:',
      error
    );
    return null;
  }
};

export const hasCompletedAssessment = async () => {
  try {
    const data = await AsyncStorage.getItem(
      'initial_assessment'
    );

    if (!data) {
      return false;
    }

    const assessment = JSON.parse(data);

    return assessment.completed === true;
  } catch (error) {
    console.error(
      'Error checking assessment:',
      error
    );
    return false;
  }
};

export const resetAssessment = async () => {
  try {
    await AsyncStorage.removeItem(
      'initial_assessment'
    );

    return true;
  } catch (error) {
    console.error(
      'Error resetting assessment:',
      error
    );
    return false;
  }
};

