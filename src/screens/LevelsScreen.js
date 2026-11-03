import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Button from "../components/Button";
import Screen from "../components/Screen";
import TopBar from "../components/TopBar";
import {
  getAssessmentResult,
  getProgress,
  getQuizProgress,
  saveProgress,
} from "../data/progress";
import { QUIZZES } from "../data/quiz";
import { TYPO, useTheme } from "../theme";

export default function LevelsScreen({
  languageData,
  languageKey,
  languageLabel,
  onBack,
  onOpenTopic,
  onOpenQuiz,
}) {
  const { colors } = useTheme();
  const [progress, setProgress] = useState({});
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
    } catch (err) {
      console.error(err);
      setError("Failed to load your progress.");
    } finally {
      if (!silent) setLoading(false);
    }
  }, [languageKey]);

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

  if (loading) {
    return (
      <Screen>
        <TopBar
          left={`← ${languageName}`}
          onLeft={onBack}
          leftLabel={`Back to ${languageName}`}
          right="Contents"
        />
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
          <Text style={[TYPO.label, styles.recommended, { color: colors.accent }]}>
            Recommended start ·{" "}
            {languageData.levels.find((l) => l.level === recommendedLevel)
              ?.label || recommendedLevel}
          </Text>
        ) : null}

        <View style={styles.levels}>
          {languageData.levels.map((level) => {
            const levelTopics = level.topics || [];
            const completedTopics = progress[level.level] || [];
            const completedCount = levelTopics.filter((topic) =>
              completedTopics.includes(topic.id),
            ).length;
            const percent =
              levelTopics.length === 0
                ? 0
                : Math.round((completedCount / levelTopics.length) * 100);
            const quiz = QUIZZES[languageKey]?.[level.level];

            return (
              <View key={level.level} style={styles.level}>
                <View style={styles.levelHead}>
                  <View style={styles.levelHeadLeft}>
                    <Text style={[TYPO.label, { color: colors.accent }]}>
                      Level {level.level}
                    </Text>
                    <Text style={[TYPO.section, styles.levelLabel, { color: colors.ink }]}>
                      {level.label}
                    </Text>
                  </View>
                  <Text style={[TYPO.meta, { color: colors.muted }]}>
                    {completedCount}/{levelTopics.length}
                  </Text>
                </View>

                <View style={[styles.track, { backgroundColor: colors.rule }]}>
                  <View
                    style={[
                      styles.fill,
                      { width: `${percent}%`, backgroundColor: colors.accent },
                    ]}
                  />
                </View>

                {levelTopics.map((topic, index) => {
                  const isCompleted = completedTopics.includes(topic.id);

                  return (
                    <TouchableOpacity
                      key={topic.id}
                      style={[
                        styles.topicRow,
                        { borderBottomColor: colors.rule },
                      ]}
                      onPress={() => handleTopicPress(level, topic)}
                      activeOpacity={0.65}
                      accessibilityRole="button"
                      accessibilityLabel={`${topic.title}${
                        isCompleted ? ", completed" : ""
                      }`}
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
                            style={[TYPO.small, styles.topicDesc, { color: colors.muted }]}
                            numberOfLines={2}
                          >
                            {topic.description}
                          </Text>
                        ) : null}
                      </View>

                      <Text
                        style={[
                          TYPO.label,
                          {
                            color: isCompleted ? colors.ink : colors.muted,
                          },
                        ]}
                      >
                        {isCompleted ? "✓" : "→"}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

                {onOpenQuiz && quiz ? (
                  <TouchableOpacity
                    accessibilityRole="button"
                    style={styles.quizRow}
                    onPress={() => onOpenQuiz(languageKey, level.level)}
                    activeOpacity={0.65}
                  >
                    <View style={styles.quizBody}>
                      <Text
                        style={[
                          TYPO.label,
                          { color: quizPassed[level.level] ? colors.muted : colors.accent },
                        ]}
                      >
                        {quizPassed[level.level]
                          ? "Quiz passed · retake"
                          : "Level quiz"}
                      </Text>
                      <Text style={[TYPO.tiny, styles.quizMeta, { color: colors.muted }]}>
                        {quiz.questions.length} questions · pass{" "}
                        {quiz.passingScore}/{quiz.questions.length}
                      </Text>
                    </View>
                    <Text style={[TYPO.label, { color: colors.accent }]}>→</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })}
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
