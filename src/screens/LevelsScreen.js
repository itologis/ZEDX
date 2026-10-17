import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Screen from "../components/Screen";

import {
  getAssessmentResult,
  getProgress,
  getQuizProgress,
  saveProgress,
} from "../data/progress";
import { QUIZZES } from "../data/quiz";

export default function LevelsScreen({
  languageData,
  accentColor = "#89b4fa",
  onBack,
  onOpenTopic,
  onOpenQuiz,
  languageKey,
}) {
  const [progress, setProgress] = useState({});
  const [assessment, setAssessment] = useState(null);
  const [quizPassed, setQuizPassed] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const languageName = languageData.intro?.title || languageKey.toUpperCase();

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async (silent = false) => {
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
  };

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

  if (loading) {
    return (
      <Screen style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={accentColor} />
          <Text style={styles.loadingText}>Loading your progress…</Text>
        </View>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            accessibilityRole="button"
            style={[styles.retryButton, { backgroundColor: accentColor }]}
            onPress={() => loadProgress()}
            activeOpacity={0.85}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  const recommendedLevel =
    assessment?.startingLevel || languageData.levels[0]?.level;

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel={`Back to ${languageName}`}
          hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
          activeOpacity={0.7}
        >
          <Text style={[styles.backText, { color: accentColor }]}>
            ← {languageName}
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Levels</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {assessment?.completed && (
          <View
            style={[styles.recommendationCard, { borderColor: accentColor }]}
          >
            <Text style={styles.recommendationTitle}>
              Recommended starting point
            </Text>
            <Text style={[styles.recommendationLevel, { color: accentColor }]}>
              {languageData.levels.find((l) => l.level === recommendedLevel)
                ?.label || recommendedLevel}
            </Text>
            <Text style={styles.recommendationText}>
              You can still explore every level freely.
            </Text>
          </View>
        )}

        {languageData.levels.map((level) => {
          const levelTopics = level.topics || [];
          const completedTopics = progress[level.level] || [];
          const completedCount = levelTopics.filter((t) =>
            completedTopics.includes(t.id),
          ).length;
          const isComplete =
            levelTopics.length > 0 && completedCount === levelTopics.length;
          const isRecommended = level.level === recommendedLevel;
          const percent =
            levelTopics.length === 0
              ? 0
              : Math.round((completedCount / levelTopics.length) * 100);

          return (
            <View key={level.level} style={styles.levelContainer}>
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
                  <Text style={styles.levelProgressText}>
                    {completedCount}/{levelTopics.length}
                  </Text>
                  {isComplete && <Text style={styles.completeText}>Done</Text>}
                </View>
              </View>

              <View style={styles.levelTrack}>
                <View
                  style={[
                    styles.levelFill,
                    {
                      width: `${percent}%`,
                      backgroundColor: accentColor,
                    },
                  ]}
                />
              </View>

              {isRecommended && assessment?.completed && (
                <View
                  style={[
                    styles.recommendedBadge,
                    { borderColor: accentColor },
                  ]}
                >
                  <Text
                    style={[
                      styles.recommendedBadgeText,
                      { color: accentColor },
                    ]}
                  >
                    Recommended start
                  </Text>
                </View>
              )}

              {levelTopics.map((topic) => {
                const isCompleted = completedTopics.includes(topic.id);

                return (
                  <TouchableOpacity
                    key={topic.id}
                    style={[
                      styles.topicCard,
                      isCompleted && {
                        borderLeftColor: accentColor,
                        backgroundColor: "rgba(166, 227, 161, 0.06)",
                      },
                    ]}
                    onPress={() => handleTopicPress(level, topic)}
                    activeOpacity={0.75}
                    accessibilityRole="button"
                    accessibilityLabel={`${topic.title}${
                      isCompleted ? ", completed" : ""
                    }`}
                  >
                    <View style={styles.topicRow}>
                      <View style={styles.topicLeft}>
                        <Text
                          style={[
                            styles.topicTitle,
                            isCompleted && styles.topicTitleCompleted,
                          ]}
                        >
                          {topic.title}
                        </Text>
                      </View>
                      <View style={styles.topicRight}>
                        {isCompleted ? (
                          <Text style={styles.completedMark}>✓</Text>
                        ) : (
                          <Text style={styles.chevron}>›</Text>
                        )}
                      </View>
                    </View>
                    {!!topic.description && (
                      <Text style={styles.topicDescription} numberOfLines={2}>
                        {topic.description}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
              {onOpenQuiz && QUIZZES[languageKey]?.[level.level] && (
                <TouchableOpacity
                  accessibilityRole="button"
                  style={[styles.quizButton, { borderColor: accentColor }]}
                  onPress={() => onOpenQuiz(languageKey, level.level)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.quizButtonText, { color: accentColor }]}>
                    {quizPassed[level.level]
                      ? "Quiz passed ✓ · retake"
                      : `Take ${level.label} quiz`}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#c0caf5",
    fontSize: 15,
    marginTop: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    color: "#f38ba8",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    minHeight: 48,
    justifyContent: "center",
  },
  retryButtonText: {
    color: "#1a1b26",
    fontSize: 16,
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2c2e3e",
    minHeight: 52,
  },
  backButton: {
    minWidth: 88,
    paddingVertical: 8,
  },
  backText: {
    fontSize: 15,
    fontWeight: "600",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#c0caf5",
    fontSize: 18,
    fontWeight: "700",
  },
  headerSpacer: {
    minWidth: 88,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  recommendationCard: {
    marginBottom: 18,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#24273a",
    borderWidth: 1,
  },
  recommendationTitle: {
    color: "#9399b2",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  recommendationLevel: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },
  recommendationText: {
    color: "#c0caf5",
    fontSize: 13,
    lineHeight: 19,
  },
  levelContainer: {
    marginBottom: 28,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  levelHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  levelNumber: {
    fontSize: 12,
    fontWeight: "800",
    marginRight: 8,
  },
  levelLabel: {
    fontSize: 17,
    fontWeight: "800",
  },
  levelStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelProgressText: {
    color: "#9399b2",
    fontSize: 12,
    fontWeight: "600",
  },
  completeText: {
    color: "#a6e3a1",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 8,
  },
  levelTrack: {
    height: 4,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    marginBottom: 10,
  },
  levelFill: {
    height: "100%",
    borderRadius: 4,
  },
  recommendedBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  recommendedBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  topicCard: {
    backgroundColor: "#24273a",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "transparent",
    minHeight: 56,
  },
  topicRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topicLeft: {
    flex: 1,
    paddingRight: 8,
  },
  topicRight: {
    marginLeft: 4,
  },
  topicTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#c0caf5",
  },
  topicTitleCompleted: {
    color: "#a6e3a1",
  },
  topicDescription: {
    fontSize: 12,
    color: "#9399b2",
    marginTop: 4,
    lineHeight: 17,
  },
  completedMark: {
    color: "#a6e3a1",
    fontSize: 16,
    fontWeight: "700",
  },
  chevron: {
    color: "#585b70",
    fontSize: 20,
    fontWeight: "300",
  },
  quizButton: {
    marginTop: 4,
    minHeight: 48,
    borderWidth: 1.5,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  quizButtonText: { fontSize: 14, fontWeight: "700" },
});
