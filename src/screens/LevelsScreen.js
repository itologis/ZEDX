import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import Breadcrumbs from "../components/Breadcrumbs";
import Button from "../components/Button";
import FadeIn from "../components/FadeIn";
import Screen from "../components/Screen";
import TopBar from "../components/TopBar";
import {
  getAssessmentResult,
  getProgress,
  getQuizProgress,
  saveProgress,
} from "../data/progress";
import { QUIZZES } from "../data/quiz";
import { DURATION, SPRING } from "../motion";
import { TYPO, useTheme } from "../theme";

export default function LevelsScreen({
  languageData,
  languageKey,
  languageLabel,
  onBack,
  onHome,
  onOpenTopic,
  onOpenQuiz,
}) {
  const { colors } = useTheme();
  const [progress, setProgress] = useState({});
  const [activeLevel, setActiveLevel] = useState(languageData.levels?.[0]?.level ?? null);
  const [levelDirection, setLevelDirection] = useState("up");
  const [assessment, setAssessment] = useState(null);
  const [quizPassed, setQuizPassed] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const languageName =
    languageLabel || languageData.intro?.title || languageKey.toUpperCase();
  const swatch = colors.lang[languageKey];

  const loadProgress = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError(null);

      const [prog, assessmentResult, quizzes] = await Promise.all([
        getProgress(languageKey),
        getAssessmentResult(languageKey),
        getQuizProgress(languageKey),
      ]);

      setProgress(prog);
      setAssessment(assessmentResult);
      setQuizPassed(quizzes);

      if (!silent) {
        setActiveLevel(
          assessmentResult?.completed &&
            !assessmentResult.skipped &&
            assessmentResult.startingLevel
            ? assessmentResult.startingLevel
            : languageData.levels[0]?.level ?? null,
        );
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load your progress.");
    } finally {
      if (!silent) setLoading(false);
    }
  }, [languageKey, languageData.levels]);

  useEffect(() => {
    // Async storage read; loading state is set before the first await.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProgress();
  }, [loadProgress]);

  const handleTopicPress = (level, topic) => {
    onOpenTopic({
      ...topic,
      _level: level.level,
      _onComplete: async () => {
        await saveProgress(languageKey, level.level, topic.id);
        await loadProgress(true);
      },
    });
  };

  const totalTopics = languageData.levels.reduce(
    (sum, level) => sum + (level.topics?.length || 0),
    0,
  );
  const readTopics = languageData.levels.reduce(
    (sum, level) =>
      sum +
      (level.topics || []).filter((topic) =>
        (progress[level.level] || []).includes(topic.id),
      ).length,
    0,
  );

  const recommendedLevel =
    assessment?.startingLevel || languageData.levels[0]?.level;
  const activeLevelData =
    languageData.levels.find((level) => level.level === activeLevel) ||
    languageData.levels[0];
  const activeLevelIndex = Math.max(
    0,
    languageData.levels.findIndex((level) => level.level === activeLevelData?.level),
  );
  const pickerWidth = useSharedValue(0);
  const indicatorIndex = useSharedValue(activeLevelIndex);
  const indicatorStyle = useAnimatedStyle(() => {
    const levelCount = Math.max(languageData.levels.length, 1);
    const tabWidth = Math.max(0, (pickerWidth.value - 8 * (levelCount - 1)) / levelCount);
    return {
      width: tabWidth,
      transform: [{ translateX: indicatorIndex.value * (tabWidth + 8) }],
    };
  });

  useEffect(() => {
    indicatorIndex.value = withSpring(activeLevelIndex, {
      ...SPRING.settle,
      reduceMotion: ReduceMotion.System,
    });
  }, [activeLevelIndex, indicatorIndex]);

  const activeLevelTopics = activeLevelData?.topics || [];
  const activeCompletedTopics = progress[activeLevelData?.level] || [];
  const activeCompletedCount = activeLevelTopics.filter((topic) =>
    activeCompletedTopics.includes(topic.id),
  ).length;
  const activePercent =
    activeLevelTopics.length === 0
      ? 0
      : Math.round((activeCompletedCount / activeLevelTopics.length) * 100);
  const activeQuiz = QUIZZES[languageKey]?.[activeLevelData?.level];

  if (loading) {
    return (
      <Screen>
        <TopBar
          left={`← ${languageName}`}
          onLeft={onBack}
          leftLabel={`Back to ${languageName}`}
          right="Contents"
        />
        <Breadcrumbs items={[{ label: "Home", onPress: onHome }, { label: languageName }]} />
        <View style={styles.stateWrap}>
          <Text style={[TYPO.small, { color: colors.muted }]}>
            Loading your progress…
          </Text>
        </View>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <TopBar
          left={`← ${languageName}`}
          onLeft={onBack}
          leftLabel={`Back to ${languageName}`}
          right="Contents"
        />
        <Breadcrumbs items={[{ label: "Home", onPress: onHome }, { label: languageName }]} />
        <View style={styles.stateWrap}>
          <Text style={[TYPO.body, styles.stateText, { color: colors.body }]}>
            {error}
          </Text>
          <Button onPress={() => loadProgress()} style={styles.retry}>
            Try again
          </Button>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <TopBar
        left={`← ${languageName}`}
        onLeft={onBack}
        leftLabel={`Back to ${languageName}`}
        right="Contents"
      />
      <Breadcrumbs items={[{ label: "Home", onPress: onHome }, { label: languageName }]} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chapterRow}>
          <View style={[styles.swatch, { backgroundColor: swatch }]} />
          <Text style={[TYPO.label, { color: colors.muted }]}>
            Chapter contents
          </Text>
        </View>

        <Text style={[TYPO.title, styles.title, { color: colors.ink }]}>
          {languageName}
        </Text>

        <Text style={[TYPO.meta, styles.readLine, { color: colors.muted }]}>
          {readTopics} of {totalTopics} read
        </Text>

        {assessment?.completed ? (
          <Text
            style={[
              TYPO.label,
              styles.recommended,
              { color: assessment.skipped ? colors.muted : colors.accent },
            ]}
          >
            {assessment.skipped
              ? "Placement skipped · Every level is open"
              : `Recommended start · ${
                  languageData.levels.find(
                    (l) => l.level === recommendedLevel,
                  )?.label || recommendedLevel
                }`}
          </Text>
        ) : null}

        <View style={styles.levels}>
          <Text style={[TYPO.label, { color: colors.muted }]}>
            LEARNING LEVEL
          </Text>

          <View
            style={styles.levelPicker}
            onLayout={(event) => {
              pickerWidth.value = event.nativeEvent.layout.width;
            }}
          >
            {languageData.levels.map((level, index) => {
              const topics = level.topics || [];
              const completedCount = topics.filter((topic) =>
                (progress[level.level] || []).includes(topic.id),
              ).length;
              const isActive = level.level === activeLevel;

              return (
                <TouchableOpacity
                  key={level.level}
                  style={[
                    styles.levelTab,
                    {
                      borderColor: isActive ? colors.accent : colors.ruleStrong,
                    },
                  ]}
                  onPress={() => {
                    if (level.level === activeLevel) return;
                    setLevelDirection(
                      index > activeLevelIndex ? "slide-right" : "slide-left",
                    );
                    setActiveLevel(level.level);
                  }}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel={level.label + ", " + completedCount + " of " + topics.length + " topics completed"}
                  accessibilityState={{ selected: isActive }}
                >
                  <View style={styles.levelTabTop}>
                    <Text style={[TYPO.tiny, { color: colors.muted }]}>
                      LEVEL {index + 1}
                    </Text>
                    <Text
                      style={[
                        TYPO.tiny,
                        { color: isActive ? colors.accent : colors.muted },
                      ]}
                    >
                      {completedCount}/{topics.length}
                    </Text>
                  </View>
                  <Text
                    style={[
                      TYPO.label,
                      styles.levelTabLabel,
                      { color: isActive ? colors.accent : colors.ink },
                    ]}
                  >
                    {level.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <Animated.View
              pointerEvents="none"
              style={[styles.levelIndicator, indicatorStyle, { backgroundColor: colors.accent }]}
            />
          </View>

          {activeLevelData ? (
            <FadeIn
              key={activeLevelData.level}
              from={levelDirection}
              duration={DURATION.base}
              style={styles.level}
            >
              <View style={styles.levelHead}>
                <View style={styles.levelHeadLeft}>
                  <Text style={[TYPO.label, { color: colors.accent }]}>
                    Level {activeLevelData.level}
                  </Text>
                  <Text
                    style={[
                      TYPO.section,
                      styles.levelLabel,
                      { color: colors.ink },
                    ]}
                  >
                    {activeLevelData.label}
                  </Text>
                </View>
                <Text style={[TYPO.meta, { color: colors.muted }]}>
                  {activeCompletedCount}/{activeLevelTopics.length} complete
                </Text>
              </View>

              <View style={[styles.track, { backgroundColor: colors.rule }]}>
                <View
                  style={[
                    styles.fill,
                    {
                      width: activePercent + "%",
                      backgroundColor: colors.accent,
                    },
                  ]}
                />
              </View>

              {activeLevelTopics.map((topic, index) => {
                const isCompleted = activeCompletedTopics.includes(topic.id);

                return (
                  <TouchableOpacity
                    key={topic.id}
                    style={[
                      styles.topicRow,
                      { borderBottomColor: colors.rule },
                    ]}
                    onPress={() => handleTopicPress(activeLevelData, topic)}
                    activeOpacity={0.65}
                    accessibilityRole="button"
                    accessibilityLabel={topic.title + (isCompleted ? ", completed" : "")}
                  >
                    <Text
                      style={[
                        TYPO.tiny,
                        styles.topicNo,
                        { color: colors.muted },
                      ]}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Text>

                    <View style={styles.topicBody}>
                      <Text
                        style={[
                          TYPO.item,
                          styles.topicTitle,
                          { color: isCompleted ? colors.muted : colors.ink },
                        ]}
                      >
                        {topic.title}
                      </Text>
                      {!!topic.description ? (
                        <Text
                          style={[
                            TYPO.small,
                            styles.topicDesc,
                            { color: colors.muted },
                          ]}
                          numberOfLines={2}
                        >
                          {topic.description}
                        </Text>
                      ) : null}
                    </View>

                    <Text
                      style={[
                        TYPO.label,
                        { color: isCompleted ? colors.ink : colors.muted },
                      ]}
                    >
                      {isCompleted ? "✓" : "→"}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              {onOpenQuiz && activeQuiz ? (
                <TouchableOpacity
                  accessibilityRole="button"
                  style={styles.quizRow}
                  onPress={() => onOpenQuiz(languageKey, activeLevelData.level)}
                  activeOpacity={0.65}
                >
                  <View style={styles.quizBody}>
                    <Text
                      style={[
                        TYPO.label,
                        {
                          color: quizPassed[activeLevelData.level]
                            ? colors.muted
                            : colors.accent,
                        },
                      ]}
                    >
                      {quizPassed[activeLevelData.level]
                        ? "Quiz passed · retake"
                        : "Level quiz"}
                    </Text>
                    <Text
                      style={[
                        TYPO.tiny,
                        styles.quizMeta,
                        { color: colors.muted },
                      ]}
                    >
                      {activeQuiz.questions.length} questions · pass{" "}
                      {activeQuiz.passingScore}/{activeQuiz.questions.length}
                    </Text>
                  </View>
                  <Text style={[TYPO.label, { color: colors.accent }]}>→</Text>
                </TouchableOpacity>
              ) : null}
            </FadeIn>
          ) : null}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },
  chapterRow: { flexDirection: "row", alignItems: "center" },
  swatch: { width: 7, height: 7, marginRight: 10 },
  title: { marginTop: 14 },
  readLine: { marginTop: 12 },
  recommended: { marginTop: 14 },
  levels: { marginTop: 26 },
  levelPicker: {
    position: "relative",
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
    marginBottom: 26,
    paddingBottom: 2,
  },
  levelTab: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
  },
  levelTabTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  levelTabLabel: { marginTop: 8 },
  levelIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 2,
  },
  level: { marginBottom: 44 },
  levelHead: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  levelHeadLeft: { flex: 1 },
  levelLabel: { marginTop: 8 },
  track: { height: 2, marginTop: 14 },
  fill: { height: 2 },
  topicRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    minHeight: 60,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  topicNo: { width: 26, paddingTop: 5 },
  topicBody: { flex: 1, paddingRight: 12 },
  topicTitle: { lineHeight: 24 },
  topicDesc: { marginTop: 4, lineHeight: 18 },
  quizRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  quizBody: { flex: 1 },
  quizMeta: { marginTop: 6 },
  stateWrap: { flex: 1, justifyContent: "center", padding: 24 },
  stateText: { textAlign: "center" },
  retry: { marginTop: 18 },
});
