import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import GlassCard from "../components/GlassCard";
import Header from "../components/Header";
import Screen from "../components/Screen";
import { LANGUAGES } from "../data/languages";
import { getMissedQuestions, getQuizProgress } from "../data/progress";
import { QUIZZES } from "../data/quiz";
import { COLORS } from "../theme";

export default function QuizzesScreen({ onOpenQuiz, onOpenReview }) {
  const [passed, setPassed] = useState({});
  const [missedCount, setMissedCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const result = {};
        for (const lang of LANGUAGES) {
          result[lang.key] = await getQuizProgress(lang.key);
        }
        const missed = await getMissedQuestions();

        if (mounted) {
          setPassed(result);
          setMissedCount(missed.length);
        }
      } catch (error) {
        console.error("Error loading quizzes:", error);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Screen>
      <Header title="Quizzes" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard
          blur
          accent={COLORS.ember}
          style={styles.review}
          onPress={onOpenReview}
          disabled={missedCount === 0}
        >
          <Text style={styles.reviewTag}>REVIEW MODE</Text>
          <Text style={styles.reviewTitle}>Review missed questions</Text>
          <Text style={styles.reviewSub}>
            {missedCount === 0
              ? "Nothing to review yet. Questions you miss will show up here."
              : `${missedCount} question${missedCount === 1 ? "" : "s"} waiting`}
          </Text>
        </GlassCard>

        {LANGUAGES.map((lang) => {
          const levels = lang.data.levels.filter(
            (level) => QUIZZES[lang.key]?.[level.level],
          );
          if (levels.length === 0) return null;

          const passedCount = levels.filter(
            (level) => passed[lang.key]?.[level.level],
          ).length;

          return (
            <View key={lang.key} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: lang.color }]}>
                  {lang.label}
                </Text>
                <Text style={styles.sectionCount}>
                  {passedCount}/{levels.length} passed
                </Text>
              </View>

              {levels.map((level) => {
                const isPassed = !!passed[lang.key]?.[level.level];

                return (
                  <GlassCard
                    key={level.level}
                    accent={lang.color}
                    style={styles.row}
                    contentStyle={styles.rowInner}
                    onPress={() => onOpenQuiz(lang.key, level.level)}
                  >
                    <Text style={styles.rowTitle}>
                      {level.level} · {level.label}
                    </Text>
                    <Text
                      style={[
                        styles.rowStatus,
                        isPassed && {
                          color: COLORS.success,
                          fontWeight: "800",
                        },
                      ]}
                    >
                      {isPassed ? "Passed ✓" : "Not taken"}
                    </Text>
                  </GlassCard>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 24 },
  review: { padding: 16, marginBottom: 22 },
  reviewTag: {
    color: COLORS.ember,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  reviewTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
  },
  reviewSub: { color: COLORS.textMuted, fontSize: 13, marginTop: 4 },
  section: { marginBottom: 22 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 19, fontWeight: "800" },
  sectionCount: { color: COLORS.textDim, fontSize: 12, fontWeight: "600" },
  row: { padding: 14, marginBottom: 8 },
  rowInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowTitle: { color: COLORS.text, fontSize: 15, fontWeight: "700" },
  rowStatus: { color: COLORS.textDim, fontSize: 12 },
});
