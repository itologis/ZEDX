import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AssessmentScreen from "./src/screens/AssessmentScreen";
import HomeScreen from "./src/screens/HomeScreen";
import IntroScreen from "./src/screens/IntroScreen";
import LevelsScreen from "./src/screens/LevelsScreen";
import QuizScreen from "./src/screens/QuizScreen";
import QuizzesScreen from "./src/screens/QuizzesScreen";
import SavedScreen from "./src/screens/SavedScreen";
import SearchScreen from "./src/screens/SearchScreen";
import TopicScreen from "./src/screens/TopicScreen";

import cssData from "./src/data/css";
import htmlData from "./src/data/html";
import javaData from "./src/data/java";
import pythonData from "./src/data/python";

import {
  hasCompletedAssessment,
  resetAssessment,
  saveQuizPassed,
} from "./src/data/progress";

const SHOW_DEV_TOOLS = true;

const DATA_MAP = {
  html: {
    data: htmlData,
    color: "#f38ba8",
    key: "html",
  },
  css: {
    data: cssData,
    color: "#89b4fa",
    key: "css",
  },
  java: {
    data: javaData,
    color: "#fab387",
    key: "java",
  },
  python: {
    data: pythonData,
    color: "#a6e3a1",
    key: "python",
  },
};

export default function App() {
  const [screen, setScreen] = useState({
    name: "home",
  });

  const [activeTab, setActiveTab] = useState("learn");
  const [showDevTools, setShowDevTools] = useState(false);

  const goHome = useCallback(() => {
    setActiveTab("learn");
    setScreen({ name: "home" });
  }, []);

  const goIntro = useCallback((languageKey) => {
    setScreen({
      name: "intro",
      languageKey,
    });
  }, []);

  const goLevels = useCallback((languageKey) => {
    setScreen({
      name: "levels",
      languageKey,
    });
  }, []);

  const goAssessment = useCallback((languageKey) => {
    setScreen({
      name: "assessment",
      languageKey,
    });
  }, []);

  const goTopic = useCallback((languageKey, topic) => {
    setScreen({
      name: "topic",
      languageKey,
      topic,
    });
  }, []);

  const goQuiz = useCallback((languageKey, levelId, from = "levels") => {
    setScreen({
      name: "quiz",
      languageKey,
      levelId,
      from,
    });
  }, []);

  const goQuizzes = useCallback(() => {
    setActiveTab("quizzes");
    setScreen({ name: "quizzes" });
  }, []);

  const goSearch = useCallback(() => {
    setActiveTab("search");
    setScreen({ name: "search" });
  }, []);

  const goSaved = useCallback(() => {
    setActiveTab("saved");
    setScreen({ name: "saved" });
  }, []);

  const goQuizFromHub = useCallback(
    (languageKey, levelId) => {
      goQuiz(languageKey, levelId, "quizzes");
    },
    [goQuiz],
  );

  const handleStartLearning = async (languageKey) => {
    try {
      const completed = await hasCompletedAssessment(languageKey);

      if (completed) {
        goLevels(languageKey);
      } else {
        goAssessment(languageKey);
      }
    } catch (error) {
      console.error("Error checking assessment:", error);
      goAssessment(languageKey);
    }
  };

  const handleAssessmentComplete = (languageKey) => {
    goLevels(languageKey);
  };

  const handleQuizPass = async (languageKey, levelId) => {
    try {
      await saveQuizPassed(languageKey, levelId);
      console.log(`Quiz pass saved for ${languageKey} - ${levelId}`);
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
      console.log(`Assessment reset for ${languageKey}`);
    } catch (error) {
      console.error("Error resetting assessment:", error);
    }
  };

  const handleNavigate = (tab) => {
    setActiveTab(tab);

    if (tab === "learn") {
      setScreen({ name: "home" });
    } else if (tab === "search") {
      setScreen({ name: "search" });
    } else if (tab === "quizzes") {
      setScreen({ name: "quizzes" });
    } else if (tab === "saved") {
      setScreen({ name: "saved" });
    }
  };

  let content;

  if (screen.name === "home") {
    content = (
      <HomeScreen
        onSelectLanguage={goIntro}
        onOpenTopic={(languageKey, topic) => goTopic(languageKey, topic)}
        onOpenQuizzes={goQuizzes}
        onNavigate={handleNavigate}
      />
    );
  } else if (screen.name === "search") {
    content = (
      <SearchScreen
        onBack={goHome}
        onOpenTopic={(languageKey, topic) => goTopic(languageKey, topic)}
        onNavigate={handleNavigate}
      />
    );
  } else if (screen.name === "saved") {
    content = (
      <SavedScreen
        onBack={goHome}
        onOpenTopic={(languageKey, topic) => goTopic(languageKey, topic)}
        onNavigate={handleNavigate}
      />
    );
  } else if (screen.name === "quizzes") {
    content = (
      <QuizzesScreen
        onBack={goHome}
        onOpenQuiz={goQuizFromHub}
        onNavigate={handleNavigate}
      />
    );
  } else if (screen.name === "intro") {
    const language = DATA_MAP[screen.languageKey];

    if (language) {
      content = (
        <IntroScreen
          intro={language.data.intro}
          accentColor={language.color}
          onBack={goHome}
          onStart={() => handleStartLearning(screen.languageKey)}
        />
      );
    }
  } else if (screen.name === "assessment") {
    const language = DATA_MAP[screen.languageKey];

    if (language) {
      content = (
        <AssessmentScreen
          languageKey={language.key}
          languageData={language.data}
          accentColor={language.color}
          onBack={() => goIntro(screen.languageKey)}
          onComplete={() => handleAssessmentComplete(language.key)}
        />
      );
    }
  } else if (screen.name === "levels") {
    const language = DATA_MAP[screen.languageKey];

    if (language) {
      content = (
        <LevelsScreen
          languageData={language.data}
          accentColor={language.color}
          languageKey={language.key}
          onBack={() => goIntro(screen.languageKey)}
          onOpenTopic={(topic) => goTopic(screen.languageKey, topic)}
          onOpenQuiz={(languageKey, levelId) =>
            goQuiz(languageKey || screen.languageKey, levelId)
          }
        />
      );
    }
  } else if (screen.name === "topic") {
    const language = DATA_MAP[screen.languageKey];

    if (language) {
      content = (
        <TopicScreen
          topic={screen.topic}
          accentColor={language.color}
          onBack={() => goLevels(screen.languageKey)}
        />
      );
    }
  } else if (screen.name === "quiz") {
    const language = DATA_MAP[screen.languageKey];

    if (language) {
      content = (
        <QuizScreen
          languageKey={language.key}
          levelId={screen.levelId}
          accentColor={language.color}
          onBack={() => {
            if (screen.from === "quizzes") {
              goQuizzes();
            } else {
              goLevels(screen.languageKey);
            }
          }}
          onPass={() => handleQuizPass(language.key, screen.levelId)}
        />
      );
    }
  }

  const showBottomNavigation = ["home", "search", "saved", "quizzes"].includes(
    screen.name,
  );

  return (
    <View style={styles.app}>
      <StatusBar style="light" />

      <View style={styles.content}>{content}</View>

      {showBottomNavigation && (
        <View style={styles.bottomNavigation}>
          {[
            { key: "learn", label: "Learn" },
            { key: "search", label: "Search" },
            { key: "quizzes", label: "Quizzes" },
            { key: "saved", label: "Saved" },
          ].map((tab) => {
            const selected = activeTab === tab.key;

            return (
              <TouchableOpacity
                key={tab.key}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={[styles.navItem, selected && styles.navItemActive]}
                onPress={() => handleNavigate(tab.key)}
              >
                <Text
                  style={[styles.navLabel, selected && styles.navLabelActive]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {SHOW_DEV_TOOLS && screen.name === "home" && (
        <>
          {showDevTools && (
            <View style={styles.devPanel}>
              <View style={styles.devHeader}>
                <Text style={styles.devTitle}>DEV TOOLS</Text>

                <TouchableOpacity
                  onPress={() => setShowDevTools(false)}
                  style={styles.devClose}
                >
                  <Text style={styles.devCloseText}>×</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.devSubtitle}>Assessment testing</Text>

              <Text style={styles.devLabel}>Open assessment</Text>

              {Object.entries(DATA_MAP).map(([languageKey, language]) => (
                <TouchableOpacity
                  key={languageKey}
                  style={[styles.devButton, { borderColor: language.color }]}
                  onPress={() => openDevAssessment(languageKey)}
                >
                  <Text
                    style={[styles.devButtonText, { color: language.color }]}
                  >
                    Show {language.data.intro?.title || languageKey} Assessment
                  </Text>
                </TouchableOpacity>
              ))}

              <Text style={styles.devLabel}>Reset assessment data</Text>

              {Object.entries(DATA_MAP).map(([languageKey, language]) => (
                <TouchableOpacity
                  key={`reset-${languageKey}`}
                  style={styles.devResetButton}
                  onPress={() => resetDevAssessment(languageKey)}
                >
                  <Text style={styles.devResetText}>
                    Reset {language.data.intro?.title || languageKey}
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
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#1a1b26",
  },

  content: {
    flex: 1,
  },

  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: "#1a1b26",
    borderTopWidth: 1,
    borderTopColor: "#303347",
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginHorizontal: 3,
    borderRadius: 12,
  },

  navItemActive: {
    backgroundColor: "#303347",
  },

  navLabel: {
    color: "#9399b2",
    fontSize: 12,
    fontWeight: "500",
  },

  navLabelActive: {
    color: "#c0caf5",
    fontWeight: "700",
  },

  devToggle: {
    position: "absolute",
    right: 16,
    bottom: 80,
    backgroundColor: "#2c2e3e",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#45475a",
  },

  devToggleText: {
    color: "#f9e2af",
    fontSize: 12,
    fontWeight: "bold",
  },

  devPanel: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 80,
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

  devTitle: {
    color: "#f9e2af",
    fontSize: 16,
    fontWeight: "bold",
  },

  devClose: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  devCloseText: {
    color: "#c0caf5",
    fontSize: 24,
  },

  devSubtitle: {
    color: "#9399b2",
    fontSize: 12,
    marginBottom: 14,
  },

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
    backgroundColor: "#1a1b26",
  },

  devButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },

  devResetButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#2a1e1e",
    marginBottom: 5,
  },

  devResetText: {
    color: "#f38ba8",
    fontSize: 12,
    textAlign: "center",
  },
});
