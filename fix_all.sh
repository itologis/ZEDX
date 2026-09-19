#!/bin/bash
echo "🔧 COMPLETE FIX FOR ALL FILES..."

# Fix QuizScreen.js
cat > src/screens/QuizScreen.js << 'QUIZEOF'
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { QUIZZES } from '../data/quiz';

export default function QuizScreen({ 
  languageKey, 
  levelId, 
  accentColor = '#89b4fa', 
  onBack, 
  onPass 
}) {
  const quizData = QUIZZES[languageKey]?.[levelId];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  if (!quizData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ No quiz available for this level</Text>
          <TouchableOpacity onPress={onBack} style={[styles.backButton, { backgroundColor: accentColor }]}>
            <Text style={styles.backButtonText}>← Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const questions = quizData.questions;
  const passingScore = quizData.passingScore || Math.ceil(questions.length * 0.6);

  if (!quizStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Quiz</Text>
          <View style={{ width: 60 }} />
        </View>
        <View style={[styles.startCard, { borderTopColor: accentColor }]}>
          <Text style={styles.startTitle}>📝 Level Quiz</Text>
          <Text style={styles.startSubtitle}>Test your knowledge!</Text>
          <View style={styles.startInfo}>
            <Text style={styles.startInfoText}>📚 {questions.length} questions</Text>
            <Text style={styles.startInfoText}>🎯 Passing score: {passingScore}/{questions.length}</Text>
            <Text style={styles.startInfoText}>⏱️ Take your time</Text>
          </View>
          <TouchableOpacity style={[styles.startButton, { backgroundColor: accentColor }]} onPress={() => setQuizStarted(true)}>
            <Text style={styles.startButtonText}>🚀 Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleOptionSelect = (optionIndex) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === questions[currentQuestion].correct;
    if (isCorrect) setScore(score + 1);
    setAnswers([...answers, { selected: optionIndex, correct: questions[currentQuestion].correct }]);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
      const passed = score >= passingScore;
      if (passed) {
        Alert.alert('🎉 Congratulations!', `You passed with ${score}/${questions.length}!`, [
          { text: 'Continue', onPress: () => { onPass(); onBack(); } }
        ]);
      } else {
        Alert.alert('😅 Almost There!', `You got ${score}/${questions.length}. Need ${passingScore} to pass.`, [
          { text: 'Retry', onPress: () => { setCurrentQuestion(0); setSelectedOption(null); setScore(0); setShowResult(false); setAnswers([]); } },
          { text: 'Review Topics', onPress: () => onBack() }
        ]);
      }
    }
  };

  if (showResult) {
    const passed = score >= passingScore;
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.resultCard, { borderTopColor: accentColor }]}>
          <Text style={styles.resultTitle}>{passed ? '🎉 Passed!' : '😅 Keep Learning!'}</Text>
          <Text style={[styles.resultScore, { color: passed ? '#a6e3a1' : '#f38ba8' }]}>{score} / {questions.length}</Text>
          <Text style={styles.resultMessage}>{passed ? 'Great job! Level unlocked! 🚀' : `Need ${passingScore} to pass. Try again! 💪`}</Text>
          {!passed && (
            <TouchableOpacity style={[styles.retryButton, { backgroundColor: accentColor }]} onPress={() => { setCurrentQuestion(0); setSelectedOption(null); setScore(0); setShowResult(false); setAnswers([]); }}>
              <Text style={styles.retryButtonText}>🔄 Retry Quiz</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.resultBackButton, { borderColor: accentColor }]} onPress={onBack}>
            <Text style={[styles.resultBackText, { color: accentColor }]}>← Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz</Text>
        <View style={{ width: 60 }} />
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Question {currentQuestion + 1} of {questions.length}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentQuestion + 1) / questions.length) * 100}%`, backgroundColor: accentColor }]} />
        </View>
        <Text style={styles.scoreText}>⭐ Score: {score}</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={[styles.questionCard, { borderTopColor: accentColor }]}>
          <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
          <View style={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = index === questions[currentQuestion].correct;
              const showCorrect = selectedOption !== null && isCorrect;
              const showWrong = selectedOption !== null && isSelected && !isCorrect;
              return (
                <TouchableOpacity key={index} style={[styles.optionButton, isSelected && styles.optionSelected, showCorrect && styles.optionCorrect, showWrong && styles.optionWrong]} onPress={() => handleOptionSelect(index)} disabled={selectedOption !== null}>
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected, showCorrect && styles.optionTextCorrect, showWrong && styles.optionTextWrong]}>
                    {option}{showCorrect && ' ✅'}{showWrong && ' ❌'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {selectedOption !== null && (
            <TouchableOpacity style={[styles.nextButton, { backgroundColor: accentColor }]} onPress={handleNext}>
              <Text style={styles.nextButtonText}>{currentQuestion === questions.length - 1 ? '📊 See Results' : '➡️ Next Question'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1b26' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#2c2e3e' },
  backButton: { padding: 8 },
  backText: { color: '#89b4fa', fontSize: 16, fontWeight: '500' },
  backButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  headerTitle: { color: '#c0caf5', fontSize: 20, fontWeight: 'bold' },
  startCard: { backgroundColor: '#24273a', margin: 20, padding: 30, borderRadius: 16, borderTopWidth: 4, alignItems: 'center' },
  startTitle: { fontSize: 32, fontWeight: 'bold', color: '#c0caf5', marginBottom: 8 },
  startSubtitle: { fontSize: 18, color: '#9399b2', marginBottom: 24 },
  startInfo: { width: '100%', backgroundColor: '#1a1b26', padding: 16, borderRadius: 12, marginBottom: 24 },
  startInfoText: { color: '#c0caf5', fontSize: 16, paddingVertical: 4 },
  startButton: { paddingHorizontal: 40, paddingVertical: 16, borderRadius: 12, alignItems: 'center', width: '100%' },
  startButtonText: { color: '#1a1b26', fontSize: 18, fontWeight: 'bold' },
  progressContainer: { paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#24273a', marginHorizontal: 16, marginTop: 16, borderRadius: 12 },
  progressText: { color: '#c0caf5', fontSize: 14, marginBottom: 8 },
  progressBar: { height: 6, backgroundColor: '#2c2e3e', borderRadius: 3, overflow: 'hidden', marginBottom: 8 },
  progressFill: { height: '100%', borderRadius: 3 },
  scoreText: { color: '#a6e3a1', fontSize: 14, fontWeight: 'bold' },
  content: { flex: 1 },
  questionCard: { backgroundColor: '#24273a', margin: 16, padding: 20, borderRadius: 12, borderTopWidth: 4 },
  questionText: { color: '#c0caf5', fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  optionsContainer: { marginBottom: 16 },
  optionButton: { backgroundColor: '#1a1b26', padding: 14, borderRadius: 10, marginBottom: 10, borderWidth: 2, borderColor: 'transparent' },
  optionSelected: { borderColor: '#89b4fa' },
  optionCorrect: { borderColor: '#a6e3a1', backgroundColor: '#1e2a24' },
  optionWrong: { borderColor: '#f38ba8', backgroundColor: '#2a1e1e' },
  optionText: { color: '#cdd6f4', fontSize: 16 },
  optionTextSelected: { color: '#89b4fa' },
  optionTextCorrect: { color: '#a6e3a1' },
  optionTextWrong: { color: '#f38ba8' },
  nextButton: { padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  nextButtonText: { color: '#1a1b26', fontSize: 16, fontWeight: 'bold' },
  resultCard: { backgroundColor: '#24273a', margin: 30, padding: 30, borderRadius: 16, borderTopWidth: 4, alignItems: 'center', justifyContent: 'center', flex: 1 },
  resultTitle: { fontSize: 36, fontWeight: 'bold', color: '#c0caf5', marginBottom: 16 },
  resultScore: { fontSize: 48, fontWeight: 'bold', marginBottom: 16 },
  resultMessage: { fontSize: 18, color: '#cdd6f4', textAlign: 'center', marginBottom: 24 },
  retryButton: { paddingHorizontal: 30, paddingVertical: 12, borderRadius: 10, marginBottom: 12, width: '100%', alignItems: 'center' },
  retryButtonText: { color: '#1a1b26', fontSize: 16, fontWeight: 'bold' },
  resultBackButton: { paddingHorizontal: 30, paddingVertical: 12, borderRadius: 10, borderWidth: 2, width: '100%', alignItems: 'center' },
  resultBackText: { fontSize: 16, fontWeight: 'bold' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: '#f38ba8', fontSize: 18, marginBottom: 20 },
});
QUIZEOF
echo "✅ QuizScreen.js fixed"

# Fix IntroScreen.js
cat > src/screens/IntroScreen.js << 'INTROEOF'
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

export default function IntroScreen({ intro, accentColor = '#89b4fa', onBack, onStart }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Introduction</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView style={styles.content}>
        <View style={[styles.card, { borderTopColor: accentColor }]}>
          <Text style={styles.title}>{intro.title}</Text>
          <Text style={styles.tagline}>{intro.tagline}</Text>
          <Text style={styles.description}>{intro.description}</Text>
          <Text style={styles.subtitle}>💡 Use Cases:</Text>
          {intro.useCases.map((useCase, index) => (
            <Text key={index} style={styles.useCase}>• {useCase}</Text>
          ))}
        </View>
        <TouchableOpacity style={[styles.startButton, { backgroundColor: accentColor }]} onPress={onStart}>
          <Text style={styles.startButtonText}>🚀 Start Learning</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1b26' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#2c2e3e' },
  backButton: { padding: 8 },
  backText: { color: '#89b4fa', fontSize: 16, fontWeight: '500' },
  headerTitle: { color: '#c0caf5', fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  card: { backgroundColor: '#24273a', padding: 20, borderRadius: 12, borderTopWidth: 4 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#c0caf5', marginBottom: 8 },
  tagline: { fontSize: 18, color: '#9399b2', marginBottom: 16 },
  description: { fontSize: 15, color: '#cdd6f4', lineHeight: 22, marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#c0caf5', marginTop: 8, marginBottom: 12 },
  useCase: { fontSize: 14, color: '#cdd6f4', marginVertical: 4, marginLeft: 8 },
  startButton: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20, marginBottom: 30 },
  startButtonText: { color: '#1a1b26', fontSize: 18, fontWeight: 'bold' },
});
INTROEOF
echo "✅ IntroScreen.js fixed"

# Fix LevelsScreen.js
cat > src/screens/LevelsScreen.js << 'LEVELSEOF'
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getProgress, getUnlockedLevels, isQuizPassed, saveProgress } from '../data/progress';

export default function LevelsScreen({ languageData, accentColor = '#89b4fa', onBack, onOpenTopic, onOpenQuiz, languageKey }) {
  const [progress, setProgress] = useState({});
  const [unlockedLevels, setUnlockedLevels] = useState([]);
  const [quizPassed, setQuizPassed] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <TouchableOpacity onPress={onBack} style={styles.backButton}><Text style={styles.backText}>← Back</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Levels</Text>
        <View style={{ width: 60 }} />
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>📚 Progress: {unlockedLevels.length} / {languageData.levels.length} levels unlocked</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(unlockedLevels.length / languageData.levels.length) * 100}%`, backgroundColor: accentColor }]} />
        </View>
      </View>
      <ScrollView style={styles.content}>
        {languageData.levels.map((level) => {
          const isUnlocked = unlockedLevels.includes(level.level);
          const levelTopics = level.topics;
          const completedCount = levelTopics.filter(t => progress[level.level] && progress[level.level].includes(t.id)).length;
          const isComplete = completedCount === levelTopics.length;
          const hasQuiz = isQuizAvailable(level);
          const quizPassedForLevel = quizPassed[level.level] || false;
          const isLevelAccessible = isUnlocked;

          return (
            <View key={level.level} style={styles.levelContainer}>
              <View style={styles.levelHeader}>
                <Text style={[styles.levelTitle, { color: accentColor }]}>
                  {level.label} ({level.level})
                  {isUnlocked && !isComplete && `  📖 ${completedCount}/${levelTopics.length}`}
                  {isComplete && '  ✅'}
                  {quizPassedForLevel && '  🏆'}
                </Text>
                {!isUnlocked && <Text style={styles.lockIcon}>🔒</Text>}
              </View>
              {levelTopics.map((topic) => {
                const isCompleted = progress[level.level] && progress[level.level].includes(topic.id);
                const isDisabled = !isLevelAccessible;
                return (
                  <TouchableOpacity key={topic.id} style={[styles.topicCard, isDisabled && styles.topicCardLocked, isCompleted && styles.topicCardCompleted, isCompleted && { borderLeftColor: accentColor }]} onPress={() => handleTopicPress(level, topic)} disabled={isDisabled}>
                    <View style={styles.topicRow}>
                      <Text style={[styles.topicTitle, isDisabled && styles.topicTitleLocked, isCompleted && styles.topicTitleCompleted]}>{topic.title}</Text>
                      {isCompleted && <Text style={styles.checkmark}>✅</Text>}
                      {isDisabled && <Text style={styles.lockIcon}>🔒</Text>}
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
              {isComplete && quizPassedForLevel && (
                <View style={styles.quizPassedContainer}><Text style={styles.quizPassedText}>🏆 Quiz Passed! Level Complete!</Text></View>
              )}
              {!isUnlocked && (
                <View style={styles.lockMessage}>
                  <Text style={styles.lockMessageText}>🔒 Complete all topics in {getPreviousLevel(level.level)} and pass the quiz to unlock</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#2c2e3e' },
  backButton: { padding: 8 },
  backText: { color: '#89b4fa', fontSize: 16, fontWeight: '500' },
  headerTitle: { color: '#c0caf5', fontSize: 20, fontWeight: 'bold' },
  progressContainer: { paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#24273a', marginHorizontal: 16, marginTop: 12, borderRadius: 12 },
  progressText: { color: '#c0caf5', fontSize: 14, marginBottom: 8 },
  progressBar: { height: 6, backgroundColor: '#2c2e3e', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  levelContainer: { marginBottom: 24 },
  levelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  levelTitle: { fontSize: 20, fontWeight: 'bold' },
  lockIcon: { fontSize: 18 },
  topicCard: { backgroundColor: '#24273a', padding: 14, borderRadius: 10, marginBottom: 8, borderLeftWidth: 4, borderLeftColor: 'transparent' },
  topicCardLocked: { opacity: 0.5 },
  topicCardCompleted: { borderLeftWidth: 4 },
  topicRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  topicTitle: { fontSize: 16, fontWeight: '600', color: '#c0caf5', flex: 1 },
  topicTitleLocked: { color: '#6c7086' },
  topicTitleCompleted: { color: '#a6e3a1' },
  topicDescription: { fontSize: 13, color: '#9399b2', marginTop: 4 },
  topicDescriptionLocked: { color: '#4c4f63' },
  checkmark: { marginLeft: 8, fontSize: 16 },
  lockMessage: { backgroundColor: '#2a2d3e', padding: 10, borderRadius: 8, marginTop: 8, borderWidth: 1, borderColor: '#f9e2af' },
  lockMessageText: { color: '#f9e2af', fontSize: 13, textAlign: 'center' },
  quizButton: { padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  quizButtonText: { color: '#1a1b26', fontSize: 16, fontWeight: 'bold' },
  quizPassedContainer: { backgroundColor: '#1e2a24', padding: 12, borderRadius: 10, marginTop: 8, borderWidth: 1, borderColor: '#a6e3a1' },
  quizPassedText: { color: '#a6e3a1', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});
LEVELSEOF
echo "✅ LevelsScreen.js fixed"

# Fix HomeScreen.js
cat > src/screens/HomeScreen.js << 'HOMEEOF'
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LANGUAGES = [
  { key: "html", label: "HTML", color: "#f38ba8", subtitle: "3 levels" },
  { key: "css", label: "CSS", color: "#89b4fa", subtitle: "3 levels" },
  { key: "java", label: "Java", color: "#fab387", subtitle: "3 levels" },
  { key: "python", label: "Python", color: "#a6e3a1", subtitle: "3 levels" },
];

export default function HomeScreen({ onSelectLanguage }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>Syntax Library</Text>
      <Text style={styles.appSubtitle}>Pick a language to browse the corresponding syntax</Text>
      <View style={styles.grid}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity key={lang.key} style={[styles.tile, { borderColor: lang.color }]} onPress={() => onSelectLanguage(lang.key)}>
            <Text style={[styles.tileTitle, { color: lang.color }]}>{lang.label}</Text>
            <Text style={styles.tileSubtitle}>{lang.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1b26', paddingHorizontal: 20, paddingTop: 40 },
  appTitle: { color: '#c0caf5', fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  appSubtitle: { color: '#9399b2', fontSize: 16, textAlign: 'center', marginBottom: 32 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tile: { width: '48%', backgroundColor: '#24273a', borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 2, alignItems: 'center' },
  tileTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  tileSubtitle: { color: '#9399b2', fontSize: 14 },
});
HOMEEOF
echo "✅ HomeScreen.js fixed"

echo ""
echo "🎉 ALL FILES FIXED!"
echo ""
echo "Now run: npx expo start --tunnel -c"
