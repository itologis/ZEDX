#!/bin/bash
echo "🔧 FINAL FIX - Better Back Button + All Quizzes!"

# 1. FIX LEVELS SCREEN - Move back button down
cat > src/screens/LevelsScreen.js << 'LEVELSEOF'
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getProgress, getUnlockedLevels, isQuizPassed, saveProgress } from '../data/progress';

export default function LevelsScreen({ 
  languageData, 
  accentColor = '#89b4fa', 
  onBack, 
  onOpenTopic, 
  onOpenQuiz, 
  languageKey 
}) {
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
      {/* Header with better back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← {languageName}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📚 Levels</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          📊 Progress: {unlockedLevels.length} / {languageData.levels.length} levels unlocked
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { 
            width: `${(unlockedLevels.length / languageData.levels.length) * 100}%`,
            backgroundColor: accentColor 
          }]} />
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
              {/* Level Header */}
              <View style={styles.levelHeader}>
                <View style={styles.levelHeaderLeft}>
                  <Text style={[styles.levelNumber, { color: accentColor }]}>
                    {level.level}
                  </Text>
                  <Text style={[styles.levelLabel, { color: accentColor }]}>
                    {level.label}
                  </Text>
                </View>
                <View style={styles.levelStatus}>
                  {isUnlocked && !isComplete && (
                    <Text style={styles.levelProgressText}>
                      📖 {completedCount}/{levelTopics.length}
                    </Text>
                  )}
                  {isComplete && <Text style={styles.checkmark}>✅</Text>}
                  {quizPassedForLevel && <Text style={styles.trophy}>🏆</Text>}
                  {!isUnlocked && <Text style={styles.lockIcon}>🔒</Text>}
                </View>
              </View>

              {/* Lock Message for locked levels */}
              {!isUnlocked && (
                <View style={[styles.lockMessage, { borderColor: accentColor }]}>
                  <Text style={styles.lockMessageText}>
                    🔒 Complete all topics in {getPreviousLevel(level.level)} and pass the quiz to unlock
                  </Text>
                </View>
              )}

              {/* Topics */}
              {levelTopics.map((topic) => {
                const isCompleted = progress[level.level] && progress[level.level].includes(topic.id);
                const isDisabled = !isLevelAccessible;
                return (
                  <TouchableOpacity
                    key={topic.id}
                    style={[
                      styles.topicCard,
                      isDisabled && styles.topicCardLocked,
                      isCompleted && styles.topicCardCompleted,
                      isCompleted && { borderLeftColor: accentColor }
                    ]}
                    onPress={() => handleTopicPress(level, topic)}
                    disabled={isDisabled}
                  >
                    <View style={styles.topicRow}>
                      <View style={styles.topicLeft}>
                        <Text style={[
                          styles.topicTitle,
                          isDisabled && styles.topicTitleLocked,
                          isCompleted && styles.topicTitleCompleted
                        ]}>
                          {topic.title}
                        </Text>
                      </View>
                      <View style={styles.topicRight}>
                        {isCompleted && <Text style={styles.checkmark}>✅</Text>}
                        {isDisabled && <Text style={styles.lockIcon}>🔒</Text>}
                      </View>
                    </View>
                    <Text style={[
                      styles.topicDescription,
                      isDisabled && styles.topicDescriptionLocked
                    ]} numberOfLines={1}>
                      {topic.description}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              {/* Quiz Button */}
              {isComplete && hasQuiz && !quizPassedForLevel && (
                <TouchableOpacity 
                  style={[styles.quizButton, { backgroundColor: accentColor }]}
                  onPress={() => handleQuizPress(level)}
                >
                  <Text style={styles.quizButtonText}>📝 Take Quiz to Unlock Next Level</Text>
                </TouchableOpacity>
              )}

              {/* Quiz Passed Badge */}
              {isComplete && quizPassedForLevel && !isLastLevel && (
                <View style={[styles.quizPassedContainer, { borderColor: accentColor }]}>
                  <Text style={styles.quizPassedText}>🏆 Quiz Passed! Level Complete!</Text>
                </View>
              )}

              {/* Final Level Complete */}
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
    paddingTop: 8, 
    paddingBottom: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#2c2e3e' 
  },
  backButton: { padding: 6 },
  backText: { color: '#89b4fa', fontSize: 14, fontWeight: '500' },
  headerTitle: { color: '#c0caf5', fontSize: 18, fontWeight: 'bold' },
  progressContainer: { 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    backgroundColor: '#24273a', 
    marginHorizontal: 16, 
    marginTop: 10, 
    borderRadius: 10 
  },
  progressText: { color: '#c0caf5', fontSize: 13, marginBottom: 6 },
  progressBar: { height: 5, backgroundColor: '#2c2e3e', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  levelContainer: { marginBottom: 20 },
  levelHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  levelHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  levelNumber: { fontSize: 12, fontWeight: 'bold', marginRight: 6 },
  levelLabel: { fontSize: 18, fontWeight: 'bold' },
  levelStatus: { flexDirection: 'row', alignItems: 'center' },
  levelProgressText: { color: '#9399b2', fontSize: 12, marginRight: 6 },
  lockIcon: { fontSize: 16 },
  checkmark: { fontSize: 14 },
  trophy: { fontSize: 14, marginLeft: 4 },
  lockMessage: { 
    backgroundColor: '#2a2d3e', 
    padding: 8, 
    borderRadius: 6, 
    marginTop: 4, 
    marginBottom: 6,
    borderWidth: 1,
  },
  lockMessageText: { color: '#f9e2af', fontSize: 12, textAlign: 'center' },
  topicCard: { 
    backgroundColor: '#24273a', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 6, 
    borderLeftWidth: 4, 
    borderLeftColor: 'transparent' 
  },
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
  quizButton: { 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 6 
  },
  quizButtonText: { color: '#1a1b26', fontSize: 14, fontWeight: 'bold' },
  quizPassedContainer: { 
    backgroundColor: '#1e2a24', 
    padding: 10, 
    borderRadius: 8, 
    marginTop: 6, 
    borderWidth: 1 
  },
  quizPassedText: { color: '#a6e3a1', fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  finalComplete: { 
    padding: 14, 
    borderRadius: 10, 
    marginTop: 6, 
    borderWidth: 2,
    alignItems: 'center' 
  },
  finalCompleteText: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#c0caf5', 
    textAlign: 'center' 
  },
});
LEVELSEOF
echo "✅ LevelsScreen.js - Back button fixed!"

# 2. ADD QUIZZES TO ALL LANGUAGES
cat > src/data/quiz.js << 'QUIZEOF'
export const QUIZZES = {
  // CSS Quizzes
  css: {
    L1: {
      passingScore: 3,
      questions: [
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style System", "Creative Style Sheets", "Color Style Syntax"], correct: 0 },
        { question: "Which selector targets an element by its ID?", options: [".class", "#id", "*", "element"], correct: 1 },
        { question: "What property changes text color?", options: ["font-color", "text-color", "color", "background-color"], correct: 2 },
        { question: "Which unit is relative to the parent element's font size?", options: ["px", "em", "rem", "vw"], correct: 1 },
        { question: "What does 'cascading' mean in CSS?", options: ["Styles flow like water", "More specific rules override general ones", "CSS is only for waterfalls", "All styles are equal"], correct: 1 }
      ]
    },
    L2: {
      passingScore: 3,
      questions: [
        { question: "Which is NOT part of the Box Model?", options: ["Margin", "Padding", "Background", "Border"], correct: 2 },
        { question: "What does 'flex-direction: row' do?", options: ["Arranges items in a column", "Arranges items in a row", "Hides all items", "Makes items round"], correct: 1 },
        { question: "Which pseudo-class targets a hovered element?", options: ["a:visited", "a:active", "a:hover", "a:focus"], correct: 2 },
        { question: "What does 'box-sizing: border-box' do?", options: ["Includes padding and border in width/height", "Excludes padding from width/height", "Adds a shadow to the box", "Makes the box round"], correct: 0 },
        { question: "Which is NOT a valid CSS position value?", options: ["static", "relative", "absolute", "flexible"], correct: 3 }
      ]
    },
    L3: {
      passingScore: 3,
      questions: [
        { question: "What does 'grid-template-columns: 1fr 1fr 1fr' do?", options: ["Creates 3 equal columns", "Creates 1 column with 3 rows", "Creates 3 unequal columns", "Creates a single column"], correct: 0 },
        { question: "Which media query targets phones?", options: ["@media (min-width: 1024px)", "@media (max-width: 600px)", "@media (orientation: landscape)", "@media (print)"], correct: 1 },
        { question: "How do you define a CSS variable?", options: ["$color: blue;", "--color: blue;", "@color: blue;", "var(color: blue);"], correct: 1 },
        { question: "What does 'transform: scale(1.1)' do?", options: ["Moves the element", "Rotates the element", "Makes the element 10% bigger", "Makes the element 10% smaller"], correct: 2 },
        { question: "What is the 'gap' property used for?", options: ["Adds space between flex/grid items", "Adds space inside an element", "Adds a border around items", "Creates a gap in text"], correct: 0 }
      ]
    }
  },
  
  // HTML Quizzes
  html: {
    L1: {
      passingScore: 3,
      questions: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correct: 0 },
        { question: "Which tag creates a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
        { question: "What is the correct HTML tag for a paragraph?", options: ["<paragraph>", "<p>", "<text>", "<para>"], correct: 1 },
        { question: "Which tag is used for the largest heading?", options: ["<heading>", "<h1>", "<head>", "<h6>"], correct: 1 },
        { question: "What does the <br> tag do?", options: ["Creates bold text", "Creates a line break", "Creates a horizontal line", "Creates a paragraph"], correct: 1 }
      ]
    },
    L2: {
      passingScore: 3,
      questions: [
        { question: "Which tag is used for an unordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], correct: 0 },
        { question: "What does the <img> tag use for the image source?", options: ["src", "href", "link", "source"], correct: 0 },
        { question: "Which tag is used for a table row?", options: ["<td>", "<tr>", "<th>", "<table>"], correct: 1 },
        { question: "What does HTML5 stand for?", options: ["HTML version 5", "Hyper Text Markup Language 5", "Both A and B", "None of the above"], correct: 2 },
        { question: "Which tag is used for a division/container?", options: ["<div>", "<span>", "<section>", "<article>"], correct: 0 }
      ]
    },
    L3: {
      passingScore: 3,
      questions: [
        { question: "What is the purpose of the <canvas> tag?", options: ["Draw graphics", "Display images", "Play videos", "Create forms"], correct: 0 },
        { question: "Which attribute is used for inline CSS?", options: ["style", "class", "id", "css"], correct: 0 },
        { question: "What does the <meta> tag do?", options: ["Provides metadata", "Creates a link", "Adds an image", "Creates a table"], correct: 0 },
        { question: "Which tag is used for semantic meaning of a header?", options: ["<header>", "<head>", "<h1>", "<top>"], correct: 0 },
        { question: "What does the <nav> tag represent?", options: ["Navigation links", "Network settings", "New article", "Normal text"], correct: 0 }
      ]
    }
  },
  
  // Java Quizzes
  java: {
    L1: {
      passingScore: 3,
      questions: [
        { question: "What is the entry point of a Java program?", options: ["public static void main(String[] args)", "public void main()", "static void main()", "void main()"], correct: 0 },
        { question: "Which keyword is used to create a class?", options: ["class", "interface", "struct", "object"], correct: 0 },
        { question: "What is the size of an int in Java?", options: ["8 bits", "16 bits", "32 bits", "64 bits"], correct: 2 },
        { question: "Which keyword is used to inherit a class?", options: ["implements", "extends", "inherits", "super"], correct: 1 },
        { question: "What is a constructor in Java?", options: ["A method that returns a value", "A method that initializes an object", "A method that destroys an object", "A method that calculates values"], correct: 1 }
      ]
    },
    L2: {
      passingScore: 3,
      questions: [
        { question: "Which keyword is used to create a constant?", options: ["final", "static", "const", "constant"], correct: 0 },
        { question: "What is polymorphism in Java?", options: ["One interface, multiple implementations", "Multiple inheritance", "Data hiding", "Code reusability"], correct: 0 },
        { question: "Which keyword is used to catch exceptions?", options: ["try", "catch", "finally", "throw"], correct: 1 },
        { question: "What is the default value of a boolean in Java?", options: ["true", "false", "null", "0"], correct: 1 },
        { question: "Which collection is used for key-value pairs?", options: ["ArrayList", "HashMap", "LinkedList", "HashSet"], correct: 1 }
      ]
    },
    L3: {
      passingScore: 3,
      questions: [
        { question: "What is the purpose of the 'synchronized' keyword?", options: ["Thread safety", "Memory management", "Exception handling", "Performance optimization"], correct: 0 },
        { question: "Which design pattern is used for singleton?", options: ["Creational", "Structural", "Behavioral", "None"], correct: 0 },
        { question: "What is a lambda expression in Java?", options: ["An anonymous function", "A variable", "A class", "A method"], correct: 0 },
        { question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Variable Manager", "Java Validation Module", "Java Version Manager"], correct: 0 },
        { question: "Which framework is used for dependency injection?", options: ["Spring", "Hibernate", "Struts", "JSF"], correct: 0 }
      ]
    }
  },
  
  // Python Quizzes
  python: {
    L1: {
      passingScore: 3,
      questions: [
        { question: "How do you print in Python?", options: ["console.log()", "print()", "System.out.println()", "echo()"], correct: 1 },
        { question: "Which symbol is used for comments in Python?", options: ["//", "#", "/* */", "--"], correct: 1 },
        { question: "What is the correct way to create a list in Python?", options: ["list = []", "list = {}", "list = ()", "list = <>"], correct: 0 },
        { question: "Which keyword is used to define a function in Python?", options: ["function", "def", "fun", "define"], correct: 1 },
        { question: "What does len() do in Python?", options: ["Gets the length of an object", "Gets the last element", "Gets the first element", "Gets the data type"], correct: 0 }
      ]
    },
    L2: {
      passingScore: 3,
      questions: [
        { question: "What is a dictionary in Python?", options: ["Key-value pairs", "An ordered list", "A set of unique values", "A tuple of values"], correct: 0 },
        { question: "Which keyword is used for a for loop?", options: ["for", "while", "loop", "iterate"], correct: 0 },
        { question: "What is the output of 3 ** 2 in Python?", options: ["6", "9", "1", "5"], correct: 1 },
        { question: "Which function is used to read user input?", options: ["input()", "scan()", "read()", "get()"], correct: 0 },
        { question: "What is a tuple in Python?", options: ["An immutable sequence", "A mutable list", "A dictionary", "A set"], correct: 0 }
      ]
    },
    L3: {
      passingScore: 3,
      questions: [
        { question: "What is a decorator in Python?", options: ["A function that modifies another function", "A design pattern", "A data type", "An error handler"], correct: 0 },
        { question: "What does 'pip' stand for?", options: ["Pip Installs Packages", "Python Install Program", "Package Installer for Python", "All of the above"], correct: 0 },
        { question: "Which statement is used for exception handling?", options: ["try-except", "try-catch", "catch-except", "try-finally"], correct: 0 },
        { question: "What is a generator in Python?", options: ["An iterator that yields values", "A list with lazy evaluation", "A function that returns a list", "A data structure"], correct: 0 },
        { question: "What is the GIL in Python?", options: ["Global Interpreter Lock", "General Input/Output", "Graphics Interface Library", "Global Iteration Loop"], correct: 0 }
      ]
    }
  }
};
QUIZEOF
echo "✅ Quizzes added for all languages (HTML, Java, Python)!"

echo ""
echo "🎉 ALL FIXED!"
echo ""
echo "Now run: npx expo start --tunnel -c"
