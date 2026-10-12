import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AssessmentScreen from "./src/screens/AssessmentScreen";
import HomeScreen from "./src/screens/HomeScreen";
import IntroScreen from "./src/screens/IntroScreen";
import LevelsScreen from "./src/screens/LevelsScreen";
import QuizScreen from "./src/screens/QuizScreen";
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

  const [showDevTools, setShowDevTools] = useState(false);

  const goHome = () => {
    setScreen({
      name: "home",
    });
  };

  const goIntro = (languageKey) => {
    setScreen({
      name: "intro",
      languageKey,
    });
  };

  const goLevels = (languageKey) => {
    setScreen({
      name: "levels",
      languageKey,
    });
  };

  const goAssessment = (languageKey) => {
    setScreen({
      name: "assessment",
      languageKey,
    });
  };

  const goTopic = (languageKey, topic) => {
    setScreen({
      name: "topic",
      languageKey,
      topic,
    });
  };

  const goQuiz = (languageKey, levelId) => {
    setScreen({
      name: "quiz",
      languageKey,
      levelId,
    });
  };

  const handleStartLearning = async (languageKey) => {
    try {
      const completed =
        await hasCompletedAssessment(
          languageKey
        );

      if (completed) {
        goLevels(languageKey);
      } else {
        goAssessment(languageKey);
      }
    } catch (error) {
      console.error(
        "Error checking assessment:",
        error
      );

      goAssessment(languageKey);
    }
  };

  const handleAssessmentComplete = (
    languageKey
  ) => {
    goLevels(languageKey);
  };

  const handleQuizPass = async (
    languageKey,
    levelId
  ) => {
    console.log(
      `Quiz passed for ${languageKey} - ${levelId}, saving...`
    );

    await saveQuizPassed(
      languageKey,
      levelId
    );

    console.log(
      "Quiz result saved."
    );
  };

  const openDevAssessment = (
    languageKey
  ) => {
    setShowDevTools(false);
    goAssessment(languageKey);
  };

  const resetDevAssessment = async (
    languageKey
  ) => {
    await resetAssessment(languageKey);

    console.log(
      `Assessment reset for ${languageKey}`
    );
  };

  let content;

  if (screen.name === "home") {
    content = (
      <HomeScreen
        onSelectLanguage={goIntro}
      />
    );
  } else if (screen.name === "intro") {
    const {
      data,
      color,
    } = DATA_MAP[
      screen.languageKey
    ];

    content = (
      <IntroScreen
        intro={data.intro}
        accentColor={color}
        onBack={goHome}
        onStart={() =>
          handleStartLearning(
            screen.languageKey
          )
        }
      />
    );
  } else if (
    screen.name === "assessment"
  ) {
    const {
      data,
      color,
      key,
    } = DATA_MAP[
      screen.languageKey
    ];

    content = (
      <AssessmentScreen
        languageKey={key}
        languageData={data}
        accentColor={color}
        onBack={() =>
          goIntro(
            screen.languageKey
          )
        }
        onComplete={() =>
          handleAssessmentComplete(
            key
          )
        }
      />
    );
  } else if (
    screen.name === "levels"
  ) {
    const {
      data,
      color,
      key,
    } = DATA_MAP[
      screen.languageKey
    ];

    content = (
      <LevelsScreen
        languageData={data}
        accentColor={color}
        languageKey={key}
        onBack={() =>
          goIntro(
            screen.languageKey
          )
        }
        onOpenTopic={(topic) =>
          goTopic(
            screen.languageKey,
            topic
          )
        }
        onOpenQuiz={goQuiz}
      />
    );
  } else if (
    screen.name === "topic"
  ) {
    const {
      color,
    } = DATA_MAP[
      screen.languageKey
    ];

    content = (
      <TopicScreen
        topic={screen.topic}
        accentColor={color}
        onBack={() =>
          goLevels(
            screen.languageKey
          )
        }
      />
    );
  } else if (
    screen.name === "quiz"
  ) {
    const {
      color,
      key,
    } = DATA_MAP[
      screen.languageKey
    ];

    content = (
      <QuizScreen
        languageKey={key}
        levelId={screen.levelId}
        accentColor={color}
        onBack={() =>
          goLevels(
            screen.languageKey
          )
        }
        onPass={() =>
          handleQuizPass(
            key,
            screen.levelId
          )
        }
      />
    );
  }

  return (
    <View style={styles.app}>
      <StatusBar style="light" />

      {content}

      {SHOW_DEV_TOOLS &&
        screen.name === "home" && (
          <>
            {showDevTools && (
              <View style={styles.devPanel}>
                <View style={styles.devHeader}>
                  <Text style={styles.devTitle}>
                    DEV TOOLS
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      setShowDevTools(false)
                    }
                    style={styles.devClose}
                  >
                    <Text
                      style={
                        styles.devCloseText
                      }
                    >
                      ×
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.devSubtitle}>
                  Assessment testing
                </Text>

                <Text style={styles.devLabel}>
                  Open assessment
                </Text>

                {Object.entries(
                  DATA_MAP
                ).map(
                  ([
                    languageKey,
                    language,
                  ]) => (
                    <TouchableOpacity
                      key={languageKey}
                      style={[
                        styles.devButton,
                        {
                          borderColor:
                            language.color,
                        },
                      ]}
                      onPress={() =>
                        openDevAssessment(
                          languageKey
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.devButtonText,
                          {
                            color:
                              language.color,
                          },
                        ]}
                      >
                        Show{" "}
                        {language.data.intro
                          ?.title ||
                          languageKey}{" "}
                        Assessment
                      </Text>
                    </TouchableOpacity>
                  )
                )}

                <Text style={styles.devLabel}>
                  Reset assessment data
                </Text>

                {Object.entries(
                  DATA_MAP
                ).map(
                  ([
                    languageKey,
                    language,
                  ]) => (
                    <TouchableOpacity
                      key={`reset-${languageKey}`}
                      style={
                        styles.devResetButton
                      }
                      onPress={() =>
                        resetDevAssessment(
                          languageKey
                        )
                      }
                    >
                      <Text
                        style={
                          styles.devResetText
                        }
                      >
                        Reset{" "}
                        {language.data.intro
                          ?.title ||
                          languageKey}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            )}

            {!showDevTools && (
              <TouchableOpacity
                style={styles.devToggle}
                onPress={() =>
                  setShowDevTools(true)
                }
              >
                <Text
                  style={
                    styles.devToggleText
                  }
                >
                  DEV
                </Text>
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

  devToggle: {
    position: "absolute",
    right: 16,
    bottom: 16,
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
    bottom: 16,
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