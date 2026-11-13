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
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

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
const LOCAL_RECORD_KEY = "zedx_snapshot_cache_v2";

// { html: { key, label, data }, css: {...}, ... }
const DATA_MAP = Object.fromEntries(LANGUAGES.map((l) => [l.key, l]));

function Root() {
  const { colors, isDark } = useTheme();
  const { height: windowHeight } = useWindowDimensions();
  const [screen, setScreen] = useState({ name: "home" });
  const [activeTab, setActiveTab] = useState("home");
  const [showDevTools, setShowDevTools] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [localRecordInput, setLocalRecordInput] = useState("");
  const [localRecordStatus, setLocalRecordStatus] = useState("");

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

  // This record is intentionally separate from all learning and quiz data.
  const saveLocalRecord = async () => {
    const value = localRecordInput.trim();

    if (!value) {
      setLocalRecordStatus("Enter a value first.");
      return;
    }

    try {
      const existing = await AsyncStorage.getItem(LOCAL_RECORD_KEY);

      if (existing !== null) {
        setLocalRecordStatus("A local record already exists. Remove it before replacing it.");
        return;
      }

      await AsyncStorage.setItem(
        LOCAL_RECORD_KEY,
        JSON.stringify({
          payload: value,
          kind: "device-note",
          version: 1,
          createdAt: new Date().toISOString(),
        }),
      );

      setLocalRecordInput("");
      setLocalRecordStatus("Saved on this device.");
    } catch (error) {
      console.error("Error saving local record:", error);
      setLocalRecordStatus("Could not save the record.");
    }
  };

  const removeLocalRecord = async () => {
    try {
      const existing = await AsyncStorage.getItem(LOCAL_RECORD_KEY);

      if (existing === null) {
        setLocalRecordStatus("No local record was found.");
        return;
      }

      await AsyncStorage.removeItem(LOCAL_RECORD_KEY);
      setLocalRecordInput("");
      setLocalRecordStatus("Local record removed.");
    } catch (error) {
      console.error("Error removing local record:", error);
      setLocalRecordStatus("Could not remove the record.");
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
        backLabel={screen.from === "levels" ? "← Topics" : "← Back"}
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

  const isTabScreen = ["home", "search", "saved", "quizzes"].includes(
    screen.name,
  );
  // Browse screens keep the tabs one tap away, so going from a lesson back to
  // Learn or Search never means walking the Back stack. The assessment and
  // quiz keep the nav hidden: they are focused flows that confirm before exit.
  const showBottomNavigation =
    isTabScreen || ["intro", "levels", "topic"].includes(screen.name);
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
            <BottomNav
              active={isTabScreen ? activeTab : null}
              onNavigate={handleNavigate}
            />
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
                <View
                  style={[styles.devHeader, { borderBottomColor: colors.rule }]}
                >
                  <Text style={[TYPO.label, { color: colors.accent }]}>
                    Dev tools
                  </Text>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Close dev tools"
                    onPress={() => setShowDevTools(false)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    style={styles.devClose}
                  >
                    <Text style={[TYPO.label, { color: colors.ink }]}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* The panel is taller than a phone screen, and it is anchored
                    to the bottom — the body scrolls under a pinned header so
                    Close never leaves the viewport. */}
                <ScrollView
                  style={[
                    styles.devBody,
                    { maxHeight: Math.max(160, windowHeight - 200) },
                  ]}
                  contentContainerStyle={styles.devBodyContent}
                  showsVerticalScrollIndicator
                  nestedScrollEnabled
                >
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

                  <Text style={[TYPO.tiny, styles.devLabel, { color: colors.muted }]}>
                    Local test record
                  </Text>
                  <Text style={[TYPO.tiny, { color: colors.muted, marginBottom: 8 }]}>
                    Saves one separate value on this device. Learning progress and quiz data are not changed.
                  </Text>
                  <TextInput
                    value={localRecordInput}
                    onChangeText={(value) => {
                      setLocalRecordInput(value);
                      if (localRecordStatus) setLocalRecordStatus("");
                    }}
                    placeholder="Enter a value to store locally"
                    placeholderTextColor={colors.muted}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={80}
                    style={[
                      styles.devInput,
                      {
                        color: colors.ink,
                        backgroundColor: colors.paper,
                        borderColor: colors.rule,
                      },
                    ]}
                    accessibilityLabel="Local test record value"
                  />
                  <TouchableOpacity
                    style={[styles.devButton, { borderColor: colors.rule }]}
                    onPress={saveLocalRecord}
                    accessibilityRole="button"
                  >
                    <Text style={[TYPO.small, { color: colors.ink }]}>
                      Save to device
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.devResetButton}
                    onPress={removeLocalRecord}
                    accessibilityRole="button"
                  >
                    <Text style={[TYPO.tiny, { color: colors.accent }]}>
                      Remove local record
                    </Text>
                  </TouchableOpacity>
                  {!!localRecordStatus && (
                    <Text
                      accessibilityLiveRegion="polite"
                      style={[TYPO.tiny, { color: colors.muted, marginTop: 4 }]}
                    >
                      {localRecordStatus}
                    </Text>
                  )}
                </ScrollView>
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
    minHeight: 44,
    justifyContent: "center",
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
    paddingTop: 4,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  devHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  // 44dp target: Close must stay reachable on a phone.
  devClose: {
    minHeight: 44,
    minWidth: 44,
    paddingLeft: 12,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  // The body scrolls inside the bottom-anchored panel so the header never
  // leaves the viewport on short screens.
  devBody: { flexShrink: 1 },
  devBodyContent: { paddingTop: 4, paddingBottom: 4 },
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
  devInput: {
    minHeight: 44,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
});
