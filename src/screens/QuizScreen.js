import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#2c2e3e' },
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
