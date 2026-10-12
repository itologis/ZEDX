import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  getAssessmentResult,
  getProgress,
  saveProgress,
} from "../data/progress";

export default function LevelsScreen({
  languageData,
  accentColor = "#89b4fa",
  onBack,
  onOpenTopic,
  languageKey,
}) {
  const [progress, setProgress] = useState({});
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const languageName = languageData.intro?.title || languageKey.toUpperCase();

  useEffect(() => {
    loadProgress();
  }, []);

  // FIX 1: silent flag skips the full-screen spinner
  const loadProgress = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError(null);

      const [prog, assessmentResult] = await Promise.all([
        getProgress(languageKey),
        getAssessmentResult(languageKey),
      ]);

      setProgress(prog);
      setAssessment(assessmentResult);
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

      // FIX 2: reload silently after marking a topic as read
      _onComplete: async () => {
        await saveProgress(languageKey, level.level, topic.id);
        await loadProgress(true);
      },
    });
  };

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
          <Text style={styles.errorText}>{error}</Text>

          {/* FIX 3: don't pass the press event in as "silent" */}
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: accentColor }]}
            onPress={() => loadProgress()}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const recommendedLevel =
    assessment?.startingLevel || languageData.levels[0]?.level;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← {languageName}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>ZEDX</Text>

        <View style={{ width: 60 }} />
      </View>

      {assessment?.completed && (
        <View style={[styles.recommendationCard, { borderColor: accentColor }]}>
          <Text style={styles.recommendationTitle}>
            Recommended starting point
          </Text>

          <Text style={[styles.recommendationLevel, { color: accentColor }]}>
            {languageData.levels.find(
              (level) => level.level === recommendedLevel,
            )?.label || recommendedLevel}
          </Text>

          <Text style={styles.recommendationText}>
            You can still explore every level freely.
          </Text>
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {languageData.levels.map((level) => {
          const levelTopics = level.topics || [];
          const completedTopics = progress[level.level] || [];

          const completedCount = levelTopics.filter((topic) =>
            completedTopics.includes(topic.id),
          ).length;

          const isComplete =
            levelTopics.length > 0 && completedCount === levelTopics.length;

          const isRecommended = level.level === recommendedLevel;

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

                  {isComplete && (
                    <Text style={styles.completeText}>Complete</Text>
                  )}
                </View>
              </View>

              {isRecommended && (
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
                    Recommended starting level
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
                      isCompleted && { borderLeftColor: accentColor },
                    ]}
                    onPress={() => handleTopicPress(level, topic)}
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
                        {isCompleted && (
                          <Text style={styles.completedMark}>Done</Text>
                        )}
                      </View>
                    </View>

                    <Text style={styles.topicDescription} numberOfLines={1}>
                      {topic.description}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1b26",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#c0caf5",
    fontSize: 18,
    marginTop: 16,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  errorText: {
    color: "#f38ba8",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },

  retryButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },

  retryButtonText: {
    color: "#1a1b26",
    fontSize: 16,
    fontWeight: "bold",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#2c2e3e",
  },

  backButton: {
    padding: 12,
    minWidth: 70,
  },

  backText: {
    color: "#89b4fa",
    fontSize: 15,
    fontWeight: "500",
  },

  headerTitle: {
    color: "#c0caf5",
    fontSize: 18,
    fontWeight: "bold",
  },

  recommendationCard: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#24273a",
    borderWidth: 1,
  },

  recommendationTitle: {
    color: "#9399b2",
    fontSize: 12,
    marginBottom: 4,
  },

  recommendationLevel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },

  recommendationText: {
    color: "#c0caf5",
    fontSize: 13,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  levelContainer: {
    marginBottom: 24,
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
  },

  levelNumber: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 6,
  },

  levelLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },

  levelStatus: {
    flexDirection: "row",
    alignItems: "center",
  },

  levelProgressText: {
    color: "#9399b2",
    fontSize: 12,
  },

  completeText: {
    color: "#a6e3a1",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 8,
  },

  recommendedBadge: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 8,
    alignSelf: "flex-start",
  },

  recommendedBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  topicCard: {
    backgroundColor: "#24273a",
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
    borderLeftWidth: 4,
    borderLeftColor: "transparent",
  },

  topicRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  topicLeft: {
    flex: 1,
  },

  topicRight: {
    marginLeft: 10,
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
    marginTop: 3,
  },

  completedMark: {
    color: "#a6e3a1",
    fontSize: 11,
    fontWeight: "bold",
  },
});
