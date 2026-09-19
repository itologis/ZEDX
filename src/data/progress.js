import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const levelTopicIds = topics.map(t => t.id);
  return levelTopicIds.every(id => completedTopics.includes(id));
};

export const isLevelFullyComplete = async (languageKey, level, topics) => {
  const topicsComplete = await isLevelComplete(languageKey, level, topics);
  const quizPassed = await isQuizPassed(languageKey, level);
  return topicsComplete && quizPassed;
};

export const getUnlockedLevels = async (languageKey, levels) => {
  const unlocked = [];
  for (let i = 0; i < levels.length; i++) {
    if (i === 0) {
      unlocked.push(levels[i].level);
    } else {
      const prevLevel = levels[i - 1];
      const prevFullyComplete = await isLevelFullyComplete(languageKey, prevLevel.level, prevLevel.topics);
      if (prevFullyComplete) {
        unlocked.push(levels[i].level);
      } else {
        break;
      }
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

// ============= QUIZ FUNCTIONS =============

export const saveQuizPassed = async (languageKey, level) => {
  try {
    const key = `quiz_${languageKey}`;
    const existing = await AsyncStorage.getItem(key);
    const passed = existing ? JSON.parse(existing) : {};
    passed[level] = true;
    await AsyncStorage.setItem(key, JSON.stringify(passed));
    console.log(`✅ Quiz passed saved for ${languageKey} - ${level}`);
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
    const result = passed[level] || false;
    console.log(`🔍 Quiz status for ${languageKey} - ${level}:`, result);
    return result;
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
    await AsyncStorage.setItem(key, JSON.stringify(passed));
    return true;
  } catch (error) {
    console.error('Error resetting quiz:', error);
    return false;
  }
};