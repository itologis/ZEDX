import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getProgress, getUnlockedLevels, isQuizPassed, saveProgress } from '../data/progress';

export default function LevelsScreen({ languageData, accentColor = '#89b4fa', onBack, onOpenTopic, onOpenQuiz, languageKey }) {
  const [progress, setProgress] = useState({});
  const [unlockedLevels, setUnlockedLevels] = useState([]);
  const [quizPassed, setQuizPassed] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const languageName = languageData.intro?.title || languageKey.toUpperCase();

  useEffect(() => { loadProgress(); }, []);

  const loadProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      const prog = await getProgress(languageKey);
      setProgress(prog);
      const unlocked = await getUnlockedLevels(languageKey, languageData.levels);
      setUnlockedLevels(unlocked);
      const quizStatus = {};
      for (const level of languageData.levels) {
        quizStatus[level.level] = await isQuizPassed(languageKey, level.level);
      }
      setQuizPassed(quizStatus);
      setLoading(false);
    } catch (err) {
      setError('Failed to load progress.');
      setLoading(false);
    }
  };

  const handleTopicPress = (level, topic) => {
    if (!unlockedLevels.includes(level.level)) {
      Alert.alert('🔒 Level Locked', `Complete all topics in ${getPreviousLevel(level.level)} and pass the quiz to unlock!`, [{ text: 'Got it!' }]);
      return;
    }
    onOpenTopic({ ...topic, _level: level.level, _onComplete: async () => { await saveProgress(languageKey, level.level, topic.id); loadProgress(); } });
  };

  const handleQuizPress = (level) => { onOpenQuiz(languageKey, level.level); };
  const getPreviousLevel = (currentLevel) => {
    const levels = languageData.levels;
    const index = levels.findIndex(l => l.level === currentLevel);
    return index > 0 ? levels[index - 1].label : '';
  };
  const isQuizAvailable = (level) => { return level.quiz && level.quiz.questions && level.quiz.questions.length > 0; };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={accentColor} />
          <Text style={styles.loadingText}>Loading your progress...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ {error}</Text>
          <TouchableOpacity style={[styles.retryButton, { backgroundColor: accentColor }]} onPress={loadProgress}>
            <Text style={styles.retryButtonText}>🔄 Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← {languageName}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>⚡ ZEDX</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>📊 Progress: {unlockedLevels.length} / {languageData.levels.length} levels unlocked</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(unlockedLevels.length / languageData.levels.length) * 100}%`, backgroundColor: accentColor }]} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {languageData.levels.map((level, index) => {
          const isUnlocked = unlockedLevels.includes(level.level);
          const levelTopics = level.topics;
          const completedCount = levelTopics.filter(t => progress[level.level] && progress[level.level].includes(t.id)).length;
          const isComplete = completedCount === levelTopics.length;
          const hasQuiz = isQuizAvailable(level);
          const quizPassedForLevel = quizPassed[level.level] || false;
          const isLevelAccessible = isUnlocked;
          const isLastLevel = index === languageData.levels.length - 1;

          return (
            <View key={level.level} style={styles.levelContainer}>
              <View style={styles.levelHeader}>
                <View style={styles.levelHeaderLeft}>
                  <Text style={[styles.levelNumber, { color: accentColor }]}>{level.level}</Text>
                  <Text style={[styles.levelLabel, { color: accentColor }]}>{level.label}</Text>
                </View>
                <View style={styles.levelStatus}>
                  {isUnlocked && !isComplete && <Text style={styles.levelProgressText}>📖 {completedCount}/{levelTopics.length}</Text>}
                  {isComplete && <Text style={styles.checkmark}>✅</Text>}
                  {quizPassedForLevel && <Text style={styles.trophy}>🏆</Text>}
                  {!isUnlocked && <Text style={styles.lockIcon}>🔒</Text>}
                </View>
              </View>

              {!isUnlocked && (
                <View style={[styles.lockMessage, { borderColor: accentColor }]}>
                  <Text style={styles.lockMessageText}>🔒 Complete all topics in {getPreviousLevel(level.level)} and pass the quiz to unlock</Text>
                </View>
              )}

              {levelTopics.map((topic) => {
                const isCompleted = progress[level.level] && progress[level.level].includes(topic.id);
                const isDisabled = !isLevelAccessible;
                return (
                  <TouchableOpacity key={topic.id} style={[styles.topicCard, isDisabled && styles.topicCardLocked, isCompleted && styles.topicCardCompleted, isCompleted && { borderLeftColor: accentColor }]} onPress={() => handleTopicPress(level, topic)} disabled={isDisabled}>
                    <View style={styles.topicRow}>
                      <View style={styles.topicLeft}><Text style={[styles.topicTitle, isDisabled && styles.topicTitleLocked, isCompleted && styles.topicTitleCompleted]}>{topic.title}</Text></View>
                      <View style={styles.topicRight}>{isCompleted && <Text style={styles.checkmark}>✅</Text>}{isDisabled && <Text style={styles.lockIcon}>🔒</Text>}</View>
                    </View>
                    <Text style={[styles.topicDescription, isDisabled && styles.topicDescriptionLocked]} numberOfLines={1}>{topic.description}</Text>
                  </TouchableOpacity>
                );
              })}

              {isComplete && hasQuiz && !quizPassedForLevel && (
                <TouchableOpacity style={[styles.quizButton, { backgroundColor: accentColor }]} onPress={() => handleQuizPress(level)}>
                  <Text style={styles.quizButtonText}>📝 Take Quiz to Unlock Next Level</Text>
                </TouchableOpacity>
              )}

              {isComplete && quizPassedForLevel && !isLastLevel && (
                <View style={[styles.quizPassedContainer, { borderColor: accentColor }]}>
                  <Text style={styles.quizPassedText}>🏆 Quiz Passed! Level Complete!</Text>
                </View>
              )}

              {isComplete && quizPassedForLevel && isLastLevel && (
                <View style={[styles.finalComplete, { backgroundColor: accentColor + '20', borderColor: accentColor }]}>
                  <Text style={styles.finalCompleteText}>🎉🏆 All Levels Complete! You're a {languageName} Master! 🏆🎉</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1b26' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#c0caf5', fontSize: 18, marginTop: 16 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: '#f38ba8', fontSize: 18, textAlign: 'center', marginBottom: 20 },
  retryButton: { paddingHorizontal: 30, paddingVertical: 12, borderRadius: 10 },
  retryButtonText: { color: '#1a1b26', fontSize: 16, fontWeight: 'bold' },
  header: { 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  paddingHorizontal: 16, 
  paddingTop: 24, 
  paddingBottom: 14, 
  borderBottomWidth: 1, 
  borderBottomColor: '#2c2e3e' 
},
backButton: { padding: 12, minWidth: 70, marginTop: 4 },
  backButton: { padding: 12, marginTop: 8, minWidth: 70 },
  backText: { color: '#89b4fa', fontSize: 15, fontWeight: '500' },
  headerTitle: { color: '#c0caf5', fontSize: 18, fontWeight: 'bold' },
  progressContainer: { 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: '#24273a', 
    marginHorizontal: 16, 
    marginTop: 12, 
    borderRadius: 10 
  },
  progressText: { color: '#c0caf5', fontSize: 13, marginBottom: 6 },
  progressBar: { height: 5, backgroundColor: '#2c2e3e', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  levelContainer: { marginBottom: 20 },
  levelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  levelHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  levelNumber: { fontSize: 12, fontWeight: 'bold', marginRight: 6 },
  levelLabel: { fontSize: 18, fontWeight: 'bold' },
  levelStatus: { flexDirection: 'row', alignItems: 'center' },
  levelProgressText: { color: '#9399b2', fontSize: 12, marginRight: 6 },
  lockIcon: { fontSize: 16 },
  checkmark: { fontSize: 14 },
  trophy: { fontSize: 14, marginLeft: 4 },
  lockMessage: { backgroundColor: '#2a2d3e', padding: 8, borderRadius: 6, marginTop: 4, marginBottom: 6, borderWidth: 1 },
  lockMessageText: { color: '#f9e2af', fontSize: 12, textAlign: 'center' },
  topicCard: { backgroundColor: '#24273a', padding: 12, borderRadius: 8, marginBottom: 6, borderLeftWidth: 4, borderLeftColor: 'transparent' },
  topicCardLocked: { opacity: 0.5 },
  topicCardCompleted: { borderLeftWidth: 4 },
  topicRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  topicLeft: { flex: 1 },
  topicRight: { flexDirection: 'row', alignItems: 'center' },
  topicTitle: { fontSize: 15, fontWeight: '600', color: '#c0caf5' },
  topicTitleLocked: { color: '#6c7086' },
  topicTitleCompleted: { color: '#a6e3a1' },
  topicDescription: { fontSize: 12, color: '#9399b2', marginTop: 3 },
  topicDescriptionLocked: { color: '#4c4f63' },
  quizButton: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
  quizButtonText: { color: '#1a1b26', fontSize: 14, fontWeight: 'bold' },
  quizPassedContainer: { backgroundColor: '#1e2a24', padding: 10, borderRadius: 8, marginTop: 6, borderWidth: 1 },
  quizPassedText: { color: '#a6e3a1', fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  finalComplete: { padding: 14, borderRadius: 10, marginTop: 6, borderWidth: 2, alignItems: 'center' },
  finalCompleteText: { fontSize: 14, fontWeight: 'bold', color: '#c0caf5', textAlign: 'center' },
});
