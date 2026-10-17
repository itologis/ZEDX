import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AssessmentScreen from "./src/screens/AssessmentScreen";
import HomeScreen from "./src/screens/HomeScreen";
import IntroScreen from "./src/screens/IntroScreen";
import LevelsScreen from "./src/screens/LevelsScreen";
import QuizScreen from "./src/screens/QuizScreen";
import QuizzesScreen from "./src/screens/QuizzesScreen";
import SavedScreen from "./src/screens/SavedScreen";
import SearchScreen from "./src/screens/SearchScreen";
import TopicScreen from "./src/screens/TopicScreen";

import BottomNav from "./src/components/BottomNav";
import FadeIn from "./src/components/FadeIn";
import MoltenBackground from "./src/components/MoltenBackground";

import { LANGUAGES, findTopic } from "./src/data/languages";
import {
  getMissedQuestions,
  hasCompletedAssessment,
  resetAssessment,
  saveProgress,
  saveQuizPassed,
} from "./src/data/progress";
import { COLORS } from "./src/theme";

const SHOW_DEV_TOOLS = true;

// { html: { key, label, color, data }, css: {...}, ... }
const DATA_MAP = Object.fromEntries(LANGUAGES.map((l) => [l.key, l]));

export default function App() {
  const [screen, setScreen] = useState({ name: "home" });
  const [activeTab, setActiveTab] = useState("home");
  const [showDevTools, setShowDevTools] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");

  const handleNavigate = useCallback((tab) => {
    const next = tab === "learn" ? "home" : tab;
    setActiveTab(next);
    setScreen({ name: next });
  }, []);

  const goHome = useCallback(() => handleNavigate("home"), [handleNavigate]);
  const goQuizzes = useCallback(
    () => handleNavigate("quizzes"),
    [handleNavigate],
  );

  const goIntro = useCallback((languageKey) => {
    setScreen({ name: "intro", languageKey });
  }, []);

  const goLevels = useCallback((languageKey) => {
    setScreen({ name: "levels", languageKey });
  }, []);

  const goAssessment = useCallback((languageKey) => {
    setScreen({ name: "assessment", languageKey });
  }, []);

  // `topicOrId` is either a full topic object (from Levels) or a topic id
  // (from Home / Search / Saved). `from` decides where Back returns to.
  const goTopic = useCallback((languageKey, topicOrId, from = "levels") => {
    let topic = topicOrId;

    if (typeof topicOrId !== "object") {
      const found = findTopic(languageKey, topicOrId);
      if (!found) return;

      topic = {
        ...found.topic,
        _level: found.level,
        _onComplete: () =>
          saveProgress(languageKey, found.level, found.topic.id),
      };
    }

    setScreen({ name: "topic", languageKey, topic, from });
  }, []);

  const closeTopic = () => {
    if (screen.from === "levels") goLevels(screen.languageKey);
    else handleNavigate(screen.from);
  };

  const goQuiz = useCallback((languageKey, levelId, from = "levels") => {
    setScreen({ name: "quiz", languageKey, levelId, from });
  }, []);

  const goReview = useCallback(async () => {
    try {
      const questions = await getMissedQuestions();
      if (questions.length === 0) {
        Alert.alert(
          "Nothing to review",
          "Questions you miss in quizzes will show up here.",
        );
        return;
      }
      setScreen({ name: "review", questions });
    } catch (error) {
      console.error("Error loading missed questions:", error);
      Alert.alert(
        "Couldn't start review",
        "Your missed questions could not be loaded. Try again in a moment.",
      );
    }
  }, []);

  const handleStartLearning = async (languageKey) => {
    try {
      const completed = await hasCompletedAssessment(languageKey);
      if (completed) goLevels(languageKey);
      else goAssessment(languageKey);
    } catch (error) {
      console.error("Error checking assessment:", error);
      goAssessment(languageKey);
    }
  };

  const handleQuizPass = async (languageKey, levelId) => {
    try {
      await saveQuizPassed(languageKey, levelId);
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  };

  const openDevAssessment = (languageKey) => {
    setShowDevTools(false);
    goAssessment(languageKey);
  };

  const resetDevAssessment = async (languageKey) => {
    try {
      await resetAssessment(languageKey);
    } catch (error) {
      console.error("Error resetting assessment:", error);
    }
  };

  let content = null;
  const language = screen.languageKey ? DATA_MAP[screen.languageKey] : null;

  if (screen.name === "home") {
    content = (
      <HomeScreen
        onSelectLanguage={goIntro}
        onOpenTopic={(languageKey, topicId) =>
          goTopic(languageKey, topicId, "home")
        }
      />
    );
  } else if (screen.name === "search") {
    content = (
      <SearchScreen
        query={searchQuery}
        onQueryChange={setSearchQuery}
        filter={searchFilter}
        onFilterChange={setSearchFilter}
        onOpenTopic={(languageKey, topicId) =>
          goTopic(languageKey, topicId, "search")
        }
        onOpenLanguage={goIntro}
      />
    );
  } else if (screen.name === "saved") {
    content = (
      <SavedScreen
        onOpenTopic={(languageKey, topicId) =>
          goTopic(languageKey, topicId, "saved")
        }
      />
    );
  } else if (screen.name === "quizzes") {
    content = (
      <QuizzesScreen
        onOpenQuiz={(languageKey, levelId) =>
          goQuiz(languageKey, levelId, "quizzes")
        }
        onOpenReview={goReview}
      />
    );
  } else if (screen.name === "intro" && language) {
    content = (
      <IntroScreen
        intro={language.data.intro}
        accentColor={language.color}
        onBack={goHome}
        onStart={() => handleStartLearning(language.key)}
      />
    );
  } else if (screen.name === "assessment" && language) {
    content = (
      <AssessmentScreen
        languageKey={language.key}
        languageData={language.data}
        accentColor={language.color}
        onBack={() => goIntro(language.key)}
        onComplete={() => goLevels(language.key)}
      />
    );
  } else if (screen.name === "levels" && language) {
    content = (
      <LevelsScreen
        languageData={language.data}
        accentColor={language.color}
        languageKey={language.key}
        onBack={() => goIntro(language.key)}
        onOpenTopic={(topic) => goTopic(language.key, topic, "levels")}
        onOpenQuiz={(languageKey, levelId) =>
          goQuiz(languageKey || language.key, levelId, "levels")
        }
      />
    );
  } else if (screen.name === "topic" && language) {
    content = (
      <TopicScreen
        key={`${screen.languageKey}-${screen.topic.id}`}
        topic={screen.topic}
        languageKey={screen.languageKey}
        accentColor={language.color}
        onBack={closeTopic}
      />
    );
  } else if (screen.name === "quiz" && language) {
    content = (
      <QuizScreen
        key={`${language.key}-${screen.levelId}`}
        languageKey={language.key}
        levelId={screen.levelId}
        accentColor={language.color}
        onBack={() =>
          screen.from === "quizzes" ? goQuizzes() : goLevels(language.key)
        }
        onPass={() => handleQuizPass(language.key, screen.levelId)}
      />
    );
  } else if (screen.name === "review") {
    content = (
      <QuizScreen
        customQuestions={screen.questions}
        title="Review"
        accentColor={COLORS.ember}
        onBack={goQuizzes}
      />
    );
  }

  const showBottomNavigation = ["home", "search", "saved", "quizzes"].includes(
    screen.name,
  );
  const screenTransitionKey = [
    screen.name,
    screen.languageKey || "",
    screen.levelId || "",
    screen.topic?.id || "",
    screen.from || "",
  ].join(":");

  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      <MoltenBackground />
      <View style={styles.shell}>
        <FadeIn
          key={screenTransitionKey}
          style={styles.content}
          duration={260}
          from="up"
        >
          {content}
        </FadeIn>

        {showBottomNavigation && (
          <FadeIn key="bottom-navigation" duration={220} from="up">
            <BottomNav active={activeTab} onNavigate={handleNavigate} />
          </FadeIn>
        )}

        {SHOW_DEV_TOOLS && screen.name === "home" && (
          <>
            {showDevTools && (
              <View style={styles.devPanel}>
                <View style={styles.devHeader}>
                  <Text style={styles.devTitle}>DEV TOOLS</Text>
                  <TouchableOpacity
                    accessibilityRole="button"
                    onPress={() => setShowDevTools(false)}
                    style={styles.devClose}
                  >
                    <Text style={styles.devCloseText}>×</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.devSubtitle}>Assessment testing</Text>
                <Text style={styles.devLabel}>Open assessment</Text>

                {Object.entries(DATA_MAP).map(([languageKey, lang]) => (
                  <TouchableOpacity
                    key={languageKey}
                    style={[styles.devButton, { borderColor: lang.color }]}
                    onPress={() => openDevAssessment(languageKey)}
                  >
                    <Text style={[styles.devButtonText, { color: lang.color }]}>
                      Show {lang.data.intro?.title || languageKey} Assessment
                    </Text>
                  </TouchableOpacity>
                ))}

                <Text style={styles.devLabel}>Reset assessment data</Text>

                {Object.entries(DATA_MAP).map(([languageKey, lang]) => (
                  <TouchableOpacity
                    key={`reset-${languageKey}`}
                    style={styles.devResetButton}
                    onPress={() => resetDevAssessment(languageKey)}
                  >
                    <Text style={styles.devResetText}>
                      Reset {lang.data.intro?.title || languageKey}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {!showDevTools && (
              <TouchableOpacity
                style={styles.devToggle}
                onPress={() => setShowDevTools(true)}
              >
                <Text style={styles.devToggleText}>DEV</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: "#0f0f14" },
  shell: { flex: 1, width: "100%", maxWidth: 560, alignSelf: "center" },
  content: { flex: 1 },
  devToggle: {
    position: "absolute",
    right: 16,
    bottom: 96,
    backgroundColor: "#2c2e3e",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#45475a",
  },
  devToggleText: { color: "#f9e2af", fontSize: 12, fontWeight: "bold" },
  devPanel: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 96,
    backgroundColor: "#24273a",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#45475a",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  devHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  devTitle: { color: "#f9e2af", fontSize: 16, fontWeight: "bold" },
  devClose: { paddingHorizontal: 8, paddingVertical: 2 },
  devCloseText: { color: "#c0caf5", fontSize: 24 },
  devSubtitle: { color: "#9399b2", fontSize: 12, marginBottom: 14 },
  devLabel: {
    color: "#c0caf5",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 8,
  },
  devButton: {
    padding: 11,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 6,
    backgroundColor: "#0f0f14",
  },
  devButtonText: { fontSize: 13, fontWeight: "600" },
  devResetButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#2a1e1e",
    marginBottom: 5,
  },
  devResetText: { color: "#f38ba8", fontSize: 12, textAlign: "center" },
});
