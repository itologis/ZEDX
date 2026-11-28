import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Button from "../components/Button";
import CodePlate from "../components/CodePlate";
import FadeIn from "../components/FadeIn";
import FieldLabel from "../components/FieldLabel";
import OptionRow from "../components/OptionRow";
import PressableScale from "../components/PressableScale";
import Screen from "../components/Screen";
import TopBar from "../components/TopBar";
import {
  DEBUGGING_LAB_LEVELS,
  getDebuggingChallengeCount,
  getDebuggingChallenges,
} from "../data/debuggingLab";
import { LANGUAGES } from "../data/languages";
import {
  getDebuggingLabProgress,
  saveDebuggingLabSolved,
} from "../data/progress";
import { DURATION, STAGGER } from "../motion";
import { TYPO, useTheme } from "../theme";

function AnimatedCodeLine({
  lineNumber,
  line,
  active,
  correct,
  onPress,
}) {
  const { colors } = useTheme();
  const progress = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(active ? 1 : 0, {
      duration: DURATION.fast,
      easing: Easing.out(Easing.cubic),
      reduceMotion: ReduceMotion.System,
    });
  }, [active, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [
        colors.accent + "00",
        colors.accent + (correct ? "22" : "14"),
      ],
    ),
  }));

  return (
    <Animated.View style={[styles.animatedCodeLine, animatedStyle]}>
      <PressableScale
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        accessibilityLabel={"Select line " + lineNumber + ": " + line}
        accessibilityHint="Tap to choose this line as the one that needs fixing."
        style={styles.codeLine}
      >
        <Text
          style={[
            TYPO.tiny,
            styles.lineNumber,
            { color: active && correct ? colors.accent : colors.muted },
          ]}
        >
          {String(lineNumber).padStart(2, "0")}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            TYPO.code,
            styles.codeText,
            { color: active && correct ? colors.ink : colors.code },
          ]}
        >
          {line || " "}
        </Text>
      </PressableScale>
    </Animated.View>
  );
}

export default function DebuggingLabScreen({ onBack }) {
  const { colors } = useTheme();
  const [view, setView] = useState("setup");
  const [languageKey, setLanguageKey] = useState("python");
  const [level, setLevel] = useState("L1");
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [solvedByLanguage, setSolvedByLanguage] = useState({});
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedFix, setSelectedFix] = useState(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [saveWarning, setSaveWarning] = useState(false);

  useEffect(() => {
    let active = true;

    Promise.all(
      LANGUAGES.map(async (item) => [
        item.key,
        await getDebuggingLabProgress(item.key),
      ]),
    )
      .then((entries) => {
        if (active) setSolvedByLanguage(Object.fromEntries(entries));
      })
      .catch((error) => {
        console.error("Could not load debugging lab progress:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  const language = LANGUAGES.find((item) => item.key === languageKey);
  const challenges = useMemo(
    () => getDebuggingChallenges(languageKey, level),
    [languageKey, level],
  );
  const challenge = challenges[challengeIndex] || challenges[0] || null;
  const solvedIds = solvedByLanguage[languageKey] || [];
  const solvedTotal = solvedIds.length;
  const solvedInLevel = challenges.filter((item) => solvedIds.includes(item.id)).length;
  const totalForLanguage = getDebuggingChallengeCount(languageKey);
  const lineSelectedCorrectly =
    challenge !== null && selectedLine === challenge.bugLine;
  const challengeSolved =
    challenge !== null && selectedFix === challenge.correctFix;
  const selectedFixIsWrong =
    selectedFix !== null && selectedFix !== challenge?.correctFix;

  const resetAttempt = () => {
    setSelectedLine(null);
    setSelectedFix(null);
    setHintVisible(false);
    setSaveWarning(false);
  };

  const chooseLanguage = (nextLanguage) => {
    if (nextLanguage === languageKey) return;
    setLanguageKey(nextLanguage);
    setLevel("L1");
  };

  const chooseLevel = (nextLevel) => {
    if (nextLevel === level) return;
    setLevel(nextLevel);
  };

  const startChallenges = () => {
    const firstUnsolved = challenges.findIndex(
      (item) => !solvedIds.includes(item.id),
    );
    setChallengeIndex(firstUnsolved >= 0 ? firstUnsolved : 0);
    resetAttempt();
    setView("challenge");
  };

  const returnToSetup = () => {
    resetAttempt();
    setView("setup");
  };

  const chooseLine = (lineNumber) => {
    if (challengeSolved) return;
    setSelectedLine(lineNumber);
    setSelectedFix(null);
    setSaveWarning(false);
  };

  const chooseFix = async (fixIndex) => {
    if (challengeSolved) return;
    setSelectedFix(fixIndex);

    if (fixIndex !== challenge.correctFix) return;

    setHintVisible(false);
    const saved = await saveDebuggingLabSolved(languageKey, challenge.id);

    if (saved) {
      setSolvedByLanguage((current) => {
        const existing = current[languageKey] || [];
        if (existing.includes(challenge.id)) return current;
        return {
          ...current,
          [languageKey]: [...existing, challenge.id],
        };
      });
    } else {
      setSaveWarning(true);
    }
  };

  const goNextChallenge = () => {
    if (challengeIndex >= challenges.length - 1) {
      returnToSetup();
      return;
    }

    setChallengeIndex((current) => current + 1);
    resetAttempt();
    setView("challenge");
  };

  if (!challenge || !language) {
    return (
      <Screen>
        <TopBar left="← Home" onLeft={onBack} leftLabel="Back to home" />
        <View style={styles.empty}>
          <Text style={[TYPO.section, { color: colors.ink }]}>
            No challenges yet
          </Text>
          <Text style={[TYPO.body, { color: colors.body }]}>
            This language does not have debugging exercises available.
          </Text>
        </View>
      </Screen>
    );
  }

  if (view === "setup") {
    return (
      <Screen>
        <TopBar
          left="← Home"
          onLeft={onBack}
          leftLabel="Back to home"
          right="Debugging Lab"
          strong
        />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.setupContent}
          showsVerticalScrollIndicator={false}
        >
          <FadeIn from="up" duration={DURATION.slow}>
            <View style={styles.masthead}>
              <Text style={[TYPO.label, { color: colors.accent }]}>
                PRACTICE / DEBUGGING
              </Text>
              <Text style={[TYPO.title, styles.title, { color: colors.ink }]}>
                Find the fault.
              </Text>
              <Text style={[TYPO.lede, styles.lede, { color: colors.body }]}>
                Pick a language and difficulty. We’ll take it one challenge at a
                time.
              </Text>
            </View>
          </FadeIn>

          <FieldLabel>01 · Language</FieldLabel>
          <View style={styles.languageGrid}>
            {LANGUAGES.map((item) => {
              const active = item.key === languageKey;
              const count = getDebuggingChallengeCount(item.key);
              const done = (solvedByLanguage[item.key] || []).length;

              return (
                <PressableScale
                  key={item.key}
                  onPress={() => chooseLanguage(item.key)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={
                    item.label + ", " + done + " of " + count + " solved"
                  }
                  style={[
                    styles.languageItem,
                    {
                      borderColor: active ? colors.accent : colors.rule,
                      backgroundColor: active ? colors.plate : "transparent",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.swatch,
                      { backgroundColor: colors.lang[item.key] },
                    ]}
                  />
                  <View style={styles.languageCopy}>
                    <Text
                      style={[
                        TYPO.small,
                        { color: active ? colors.ink : colors.body },
                      ]}
                    >
                      {item.label}
                    </Text>
                    <Text style={[TYPO.tiny, { color: colors.muted }]}>
                      {done}/{count}
                    </Text>
                  </View>
                </PressableScale>
              );
            })}
          </View>

          <FieldLabel>02 · Difficulty</FieldLabel>
          <View style={styles.levelRow}>
            {DEBUGGING_LAB_LEVELS.map((item, index) => {
              const active = item.id === level;

              return (
                <PressableScale
                  key={item.id}
                  onPress={() => chooseLevel(item.id)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  style={[
                    styles.levelItem,
                    {
                      borderColor: active ? colors.accent : colors.rule,
                      backgroundColor: active ? colors.plate : "transparent",
                    },
                  ]}
                >
                  <Text style={[TYPO.tiny, { color: colors.muted }]}>
                    LEVEL 0{index + 1}
                  </Text>
                  <Text
                    style={[
                      TYPO.small,
                      styles.levelLabel,
                      { color: active ? colors.accent : colors.ink },
                    ]}
                  >
                    {item.label}
                  </Text>
                </PressableScale>
              );
            })}
          </View>

          <View style={[styles.setupSummary, { borderTopColor: colors.rule }]}>
            <View style={styles.summaryCopy}>
              <Text style={[TYPO.label, { color: colors.ink }]}>
                {language.label} · {DEBUGGING_LAB_LEVELS.find((item) => item.id === level)?.label}
              </Text>
              <Text style={[TYPO.tiny, { color: colors.muted, marginTop: 4 }]}>
                {solvedInLevel} of {challenges.length} challenges completed
              </Text>
            </View>
            <Text style={[TYPO.label, { color: colors.accent }]}>
              {solvedTotal}/{totalForLanguage}
            </Text>
          </View>

          <FadeIn from="up" delay={STAGGER * 2} duration={DURATION.base}>
            <Button onPress={startChallenges} style={styles.startButton}>
              Start challenges
            </Button>
          </FadeIn>
        </ScrollView>
      </Screen>
    );
  }

  if (challengeSolved) {
    return (
      <Screen>
        <TopBar
          left="← Challenge"
          onLeft={resetAttempt}
          leftLabel="Return to challenge"
          right="Solved"
          strong
        />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.resultContent}
          showsVerticalScrollIndicator={false}
        >
          <FadeIn from="up" duration={200}>
            <FadeIn from="scale" duration={DURATION.slow}>
              <Text style={[TYPO.label, { color: colors.accent }]}>
                ✓ REPAIR ACCEPTED
              </Text>
            </FadeIn>
            <Text style={[TYPO.title, styles.resultTitle, { color: colors.ink }]}>
              Good catch.
            </Text>
            <Text style={[TYPO.body, { color: colors.body, marginTop: 12 }]}>
              {challenge.explanation}
            </Text>

            <FieldLabel>Corrected code</FieldLabel>
            <CodePlate style={styles.codePlate}>
              <View style={styles.codeLines}>
                {challenge.code.map((line, index) => (
                  <View
                    key={challenge.id + "-fixed-" + index}
                    style={styles.codeLine}
                  >
                    <Text
                      style={[
                        TYPO.tiny,
                        styles.lineNumber,
                        { color: colors.muted },
                      ]}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Text>
                    <Text
                      style={[
                        TYPO.code,
                        styles.codeText,
                        { color: colors.code },
                      ]}
                    >
                      {index + 1 === challenge.bugLine
                        ? challenge.fixes[challenge.correctFix]
                        : line || " "}
                    </Text>
                  </View>
                ))}
              </View>
            </CodePlate>

            {saveWarning ? (
              <Text style={[TYPO.small, { color: colors.accent, marginTop: 12 }]}>
                Solved, but progress could not be saved on this device.
              </Text>
            ) : null}
          </FadeIn>

          <Button
            variant="secondary"
            onPress={resetAttempt}
            style={styles.retryButton}
          >
            Try again
          </Button>
          <Button onPress={goNextChallenge} style={styles.nextButton}>
            {challengeIndex === challenges.length - 1
              ? "Back to selection"
              : "Next challenge"}
          </Button>
        </ScrollView>
      </Screen>
    );
  }

  return (
    <Screen>
      <TopBar
        left="← Lab"
        onLeft={returnToSetup}
        leftLabel="Back to language and level selection"
        right={language.label + " · " + level}
        strong
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.challengeContent}
        showsVerticalScrollIndicator={false}
      >
        <FadeIn
          key={challenge.id + "-heading"}
          from="up"
          duration={DURATION.base}
        >
          <View style={styles.challengeHead}>
            <View style={styles.challengeHeading}>
              <Text style={[TYPO.label, { color: colors.muted }]}>
                CHALLENGE {challengeIndex + 1} OF {challenges.length}
              </Text>
              <Text
                style={[
                  TYPO.title,
                  styles.challengeTitle,
                  { color: colors.ink },
                ]}
              >
                {challenge.title}
              </Text>
            </View>
            <Text style={[TYPO.meta, { color: colors.accent, marginTop: 2 }]}>
              {solvedInLevel}/{challenges.length}
            </Text>
          </View>
        </FadeIn>

        <FadeIn
          key={challenge.id + "-goal"}
          from="up"
          delay={STAGGER}
          duration={DURATION.base}
        >
          <View
            style={[
              styles.goalBlock,
              {
                borderLeftColor: colors.accent,
                backgroundColor: colors.plate,
              },
            ]}
          >
            <Text style={[TYPO.label, { color: colors.accent }]}>
              THE GOAL
            </Text>
            <Text style={[TYPO.body, styles.goalText, { color: colors.ink }]}>
              {challenge.goal}
            </Text>
          </View>
        </FadeIn>

        <FieldLabel>STEP 1 OF 2 · Find the mistake</FieldLabel>
        <Text style={[TYPO.small, styles.instruction, { color: colors.muted }]}>
          Read the numbered lines. Tap the one that stops the code from reaching the goal.
        </Text>

        <FadeIn
          key={challenge.id + "-code"}
          from="up"
          delay={STAGGER * 2}
          duration={DURATION.base}
        >
          <CodePlate style={styles.codePlate}>
            <View style={styles.codeLines}>
              {challenge.code.map((line, index) => {
                const lineNumber = index + 1;
                const active = lineNumber === selectedLine;

                return (
                  <AnimatedCodeLine
                    key={challenge.id + "-line-" + lineNumber}
                    lineNumber={lineNumber}
                    line={line}
                    active={active}
                    correct={active && lineSelectedCorrectly}
                    onPress={() => chooseLine(lineNumber)}
                  />
                );
              })}
            </View>
          </CodePlate>
        </FadeIn>

        {selectedLine !== null && !lineSelectedCorrectly ? (
          <FadeIn from="up" duration={140}>
            <Text style={[TYPO.small, styles.lineFeedback, { color: colors.accent }]}>
              This line is not the problem. Try tapping a different line.
            </Text>
          </FadeIn>
        ) : null}

        {lineSelectedCorrectly ? (
          <FadeIn key={challenge.id + "-fixes"} from="up" duration={180}>
            <View style={styles.stepTwo}>
              <FieldLabel>STEP 2 OF 2 · Fix line {challenge.bugLine}</FieldLabel>
              <Text style={[TYPO.small, styles.instruction, { color: colors.muted }]}>
                Nice find. Choose the replacement that makes the goal work.
              </Text>
            </View>
            <View style={styles.options}>
              {challenge.fixes.map((fix, index) => (
                <FadeIn
                  key={challenge.id + "-fix-" + index}
                  from="up"
                  delay={index * STAGGER}
                  duration={DURATION.fast}
                >
                  <OptionRow
                    index={index}
                    label={fix.trim()}
                    state={selectedFix === index ? "wrong" : "idle"}
                    selected={selectedFix === index}
                    onPress={() => chooseFix(index)}
                  />
                </FadeIn>
              ))}
            </View>
            {selectedFixIsWrong ? (
              <FadeIn from="down" duration={150}>
                <View
                  style={[
                    styles.feedbackBlock,
                    {
                      borderLeftColor: colors.accent,
                      backgroundColor: colors.plate,
                    },
                  ]}
                >
                  <Text style={[TYPO.label, { color: colors.accent }]}>
                    Why this repair fails
                  </Text>
                  <Text style={[TYPO.small, { color: colors.body, marginTop: 6 }]}>
                    {challenge.fixFeedback[selectedFix]}
                  </Text>
                </View>
              </FadeIn>
            ) : null}
          </FadeIn>
        ) : (
          <View style={styles.hintArea}>
            {!hintVisible ? (
              <PressableScale
                onPress={() => setHintVisible(true)}
                accessibilityRole="button"
                style={styles.hintAction}
              >
                <Text style={[TYPO.label, { color: colors.accent }]}>
                  Need a hint?
                </Text>
              </PressableScale>
            ) : (
              <FadeIn from="up" duration={150}>
                <View
                  style={[
                    styles.feedbackBlock,
                    {
                      borderLeftColor: colors.accent,
                      backgroundColor: colors.plate,
                    },
                  ]}
                >
                  <Text style={[TYPO.label, { color: colors.accent }]}>HINT</Text>
                  <Text style={[TYPO.small, { color: colors.body, marginTop: 6 }]}>
                    {challenge.hint}
                  </Text>
                </View>
              </FadeIn>
            )}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  setupContent: {
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  challengeContent: {
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 40,
  },
  resultContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
  },
  masthead: {
    paddingTop: 26,
    paddingBottom: 22,
  },
  title: {
    marginTop: 12,
  },
  lede: {
    marginTop: 12,
    maxWidth: 390,
  },
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
    marginBottom: 26,
  },
  languageItem: {
    width: "48.5%",
    minHeight: 54,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 11,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  swatch: {
    width: 4,
    height: 28,
  },
  languageCopy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  levelRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  levelItem: {
    flex: 1,
    minWidth: 0,
    minHeight: 64,
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    paddingVertical: 9,
    gap: 4,
  },
  levelLabel: {
    fontFamily: TYPO.label.fontFamily,
    letterSpacing: 0,
    textTransform: "none",
  },
  setupSummary: {
    marginTop: 28,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryCopy: {
    flex: 1,
    minWidth: 0,
  },
  startButton: {
    marginTop: 20,
  },
  challengeHead: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },
  challengeHeading: {
    flex: 1,
    minWidth: 0,
  },
  challengeTitle: {
    marginTop: 10,
  },
  goalBlock: {
    marginTop: 22,
    marginBottom: 22,
    borderLeftWidth: 3,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  goalText: {
    marginTop: 7,
  },
  stepTwo: {
    marginTop: 8,
  },
  instruction: {
    marginTop: 8,
  },
  codePlate: {
    marginTop: 12,
    paddingVertical: 10,
  },
  codeLines: {
    minWidth: "100%",
  },
  animatedCodeLine: {
    minHeight: 36,
    borderRadius: 3,
    overflow: "hidden",
  },
  codeLine: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 36,
    paddingHorizontal: 8,
    gap: 10,
  },
  lineNumber: {
    width: 22,
    textAlign: "right",
  },
  codeText: {
    flexShrink: 0,
  },
  lineFeedback: {
    marginTop: 12,
  },
  options: {
    marginTop: 8,
  },
  feedbackBlock: {
    marginTop: 14,
    borderLeftWidth: 2,
    padding: 14,
  },
  hintArea: {
    marginTop: 18,
  },
  hintAction: {
    minHeight: 44,
    alignSelf: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  resultTitle: {
    marginTop: 12,
  },
  retryButton: {
    marginTop: 22,
  },
  nextButton: {
    marginTop: 10,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
});
