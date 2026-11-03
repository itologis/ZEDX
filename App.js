import { IBMPlexMono_400Regular } from "@expo-google-fonts/ibm-plex-mono/400Regular";
import { IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono/500Medium";
import { IBMPlexMono_600SemiBold } from "@expo-google-fonts/ibm-plex-mono/600SemiBold";
import { IBMPlexSans_400Regular } from "@expo-google-fonts/ibm-plex-sans/400Regular";
import { IBMPlexSans_500Medium } from "@expo-google-fonts/ibm-plex-sans/500Medium";
import { IBMPlexSans_600SemiBold } from "@expo-google-fonts/ibm-plex-sans/600SemiBold";
import { IBMPlexSans_700Bold } from "@expo-google-fonts/ibm-plex-sans/700Bold";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
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

import { LANGUAGES, findTopic } from "./src/data/languages";
import {
  getMissedQuestions,
  hasCompletedAssessment,
  resetAssessment,
  saveProgress,
  saveQuizPassed,
} from "./src/data/progress";
import { TYPO, ThemeProvider, useTheme } from "./src/theme";

SplashScreen.preventAutoHideAsync().catch(() => {});

const FONT_MAP = {
  IBMPlexSans_400Regular,
  IBMPlexSans_500Medium,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_700Bold,
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
};

const SHOW_DEV_TOOLS = true;

// { html: { key, label, data }, css: {...}, ... }
const DATA_MAP = Object.fromEntries(LANGUAGES.map((l) => [l.key, l]));

function Root() {
  const { colors, isDark } = useTheme();
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
        languageKey={language.key}
        languageLabel={language.label}
        languageData={language.data}
        onBack={() => handleNavigate("home")}
        onStart={() => handleStartLearning(language.key)}
      />
    );
  } else if (screen.name === "assessment" && language) {
    content = (
      <AssessmentScreen
        languageKey={language.key}
        languageData={language.data}
        languageLabel={language.label}
        onBack={() => goIntro(language.key)}
        onComplete={() => goLevels(language.key)}
      />
    );
  } else if (screen.name === "levels" && language) {
    content = (
      <LevelsScreen
        languageData={language.data}
        languageKey={language.key}
        languageLabel={language.label}
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
        languageLabel={language.label}
        onBack={closeTopic}
      />
    );
  } else if (screen.name === "quiz" && language) {
    content = (
      <QuizScreen
        key={`${language.key}-${screen.levelId}`}
        languageKey={language.key}
        levelId={screen.levelId}
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
    <View style={[styles.app, { backgroundColor: colors.paper }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={styles.shell}>
        <FadeIn
          key={screenTransitionKey}
          style={styles.content}
          duration={160}
          from="none"
        >
          {content}
        </FadeIn>

        {showBottomNavigation && (
          <FadeIn key="bottom-navigation" duration={140} from="none">
            <BottomNav active={activeTab} onNavigate={handleNavigate} />
          </FadeIn>
        )}

        {SHOW_DEV_TOOLS && screen.name === "home" && (
          <>
            {showDevTools && (
              <View
                style={[
                  styles.devPanel,
                  {
                    backgroundColor: colors.plate,
                    borderColor: colors.ruleStrong,
                  },
                ]}
              >
                <View style={styles.devHeader}>
                  <Text style={[TYPO.label, { color: colors.accent }]}>
                    Dev tools
                  </Text>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Close dev tools"
                    onPress={() => setShowDevTools(false)}
                    style={styles.devClose}
                  >
                    <Text style={[TYPO.label, { color: colors.ink }]}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={[TYPO.tiny, styles.devLabel, { color: colors.muted }]}>
                  Open assessment
                </Text>

                {Object.entries(DATA_MAP).map(([languageKey, lang]) => (
                  <TouchableOpacity
                    key={languageKey}
                    style={[styles.devButton, { borderColor: colors.rule }]}
                    onPress={() => openDevAssessment(languageKey)}
                  >
                    <Text style={[TYPO.small, { color: colors.ink }]}>
                      {lang.data.intro?.title || languageKey} assessment
                    </Text>
                  </TouchableOpacity>
                ))}

                <Text style={[TYPO.tiny, styles.devLabel, { color: colors.muted }]}>
                  Reset assessment data
                </Text>

                {Object.entries(DATA_MAP).map(([languageKey, lang]) => (
                  <TouchableOpacity
                    key={`reset-${languageKey}`}
                    style={styles.devResetButton}
                    onPress={() => resetDevAssessment(languageKey)}
                  >
                    <Text style={[TYPO.tiny, { color: colors.accent }]}>
                      Reset {lang.data.intro?.title || languageKey}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {!showDevTools && (
              <TouchableOpacity
                style={[
                  styles.devToggle,
                  {
                    backgroundColor: colors.plate,
                    borderColor: colors.ruleStrong,
                  },
                ]}
                onPress={() => setShowDevTools(true)}
                accessibilityRole="button"
                accessibilityLabel="Open dev tools"
              >
                <Text style={[TYPO.label, { color: colors.accent }]}>Dev</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts(FONT_MAP);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1 },
  shell: { flex: 1, width: "100%", maxWidth: 560, alignSelf: "center" },
  content: { flex: 1 },
  devToggle: {
    position: "absolute",
    right: 16,
    bottom: 96,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
  },
  devPanel: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 96,
    borderRadius: 2,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  devHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  devClose: { paddingHorizontal: 6, paddingVertical: 4 },
  devLabel: { marginTop: 12, marginBottom: 8 },
  devButton: {
    padding: 10,
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 6,
  },
  devResetButton: {
    padding: 8,
    marginBottom: 4,
  },
});
