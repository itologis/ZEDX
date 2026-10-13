import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import GlassCard from "../components/GlassCard";
import FadeIn from "../components/FadeIn";
import Header from "../components/Header";
import Screen from "../components/Screen";
import { LANGUAGES } from "../data/languages";
import { getMissedQuestions, getQuizProgress } from "../data/progress";
import { QUIZZES } from "../data/quiz";
import { COLORS } from "../theme";

export default function QuizzesScreen({ onOpenQuiz, onOpenReview }) {
  const [passed, setPassed] = useState({});
  const [missedCount, setMissedCount] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setLoadError(false);
      try {
        const [progress, missed] = await Promise.all([
          Promise.all(
            LANGUAGES.map(async (lang) => [
              lang.key,
              await getQuizProgress(lang.key),
            ]),
          ),
          getMissedQuestions(),
        ]);

        if (mounted) {
          setPassed(Object.fromEntries(progress));
          setMissedCount(missed.length);
        }
      } catch (error) {
        console.error("Error loading quizzes:", error);
        if (mounted) setLoadError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [reloadKey]);

  const availableQuizzes = LANGUAGES.flatMap((lang) =>
    lang.data.levels
      .filter((level) => QUIZZES[lang.key]?.[level.level])
      .map((level) => ({ ...level, languageKey: lang.key })),
  );
  const passedCount = availableQuizzes.filter(
    (level) => passed[level.languageKey]?.[level.level],
  ).length;
  const filteredLanguages =
    selectedLanguage === "all"
      ? LANGUAGES
      : LANGUAGES.filter((lang) => lang.key === selectedLanguage);

  return (
    <Screen>
      <Header title="Quizzes" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>
          Choose a language and level to test what you have learned.
        </Text>

        <ScrollView
          horizontal
          style={styles.filters}
          contentContainerStyle={styles.filterContent}
          showsHorizontalScrollIndicator={false}
          accessibilityLabel="Filter quizzes by language"
        >
          {[
            { key: "all", label: "All" },
            ...LANGUAGES.map((lang) => ({
              key: lang.key,
              label: lang.label,
              color: lang.color,
            })),
          ].map((filter) => {
            const selected = selectedLanguage === filter.key;
            const color = filter.color || COLORS.ember;

            return (
              <TouchableOpacity
                key={filter.key}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setSelectedLanguage(filter.key)}
                style={[
                  styles.filterChip,
                  selected && {
                    backgroundColor: `${color}24`,
                    borderColor: color,
                  },
                ]}
              >
                <Text style={[styles.filterText, selected && { color }]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {!loading && !loadError && (
          <FadeIn from="up" duration={240}>
            <Text style={styles.summary}>
              {passedCount} of {availableQuizzes.length} quizzes passed
            </Text>
          </FadeIn>
        )}

        <FadeIn from="up" duration={280}>
          <GlassCard
            blur
            accent={COLORS.ember}
            style={styles.review}
            onPress={onOpenReview}
            disabled={loading || loadError || missedCount === 0}
          >
            <Text style={styles.reviewTag}>REVIEW MODE</Text>
            <Text style={styles.reviewTitle}>Review missed questions</Text>
            <Text style={styles.reviewSub}>
              {loading
                ? "Loading your review questions..."
                : loadError
                  ? "Review questions could not be loaded."
                  : missedCount === 0
                    ? "Nothing to review yet. Questions you miss will show up here."
                    : `${missedCount} question${missedCount === 1 ? "" : "s"} waiting`}
            </Text>
          </GlassCard>
        </FadeIn>

        {loading && (
          <View style={styles.state}>
            <ActivityIndicator color={COLORS.ember} />
            <Text style={styles.stateText}>Loading quiz progress...</Text>
          </View>
        )}

        {loadError && (
          <View style={styles.state}>
            <Text style={styles.stateText}>
              Quiz progress could not be loaded. Check your connection or try
              again.
            </Text>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => setReloadKey((key) => key + 1)}
              style={styles.retry}
            >
              <Text style={styles.retryText}>Try again</Text>
            </TouchableOpacity>
          </View>
        )}

        {!loading &&
          !loadError &&
          filteredLanguages.map((lang, index) => {
            const levels = lang.data.levels.filter(
              (level) => QUIZZES[lang.key]?.[level.level],
            );
            if (levels.length === 0) return null;

            const languagePassedCount = levels.filter(
              (level) => passed[lang.key]?.[level.level],
            ).length;

            return (
              <FadeIn
                key={`${selectedLanguage}-${lang.key}`}
                delay={index * 45}
                duration={300}
                from="up"
              >
                <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, { color: lang.color }]}>
                    {lang.label}
                  </Text>
                  <Text style={styles.sectionCount}>
                    {languagePassedCount}/{levels.length} passed
                  </Text>
                </View>

                {levels.map((level) => {
                  const isPassed = !!passed[lang.key]?.[level.level];
                  const quiz = QUIZZES[lang.key][level.level];

                  return (
                    <GlassCard
                      key={level.level}
                      accent={lang.color}
                      style={styles.row}
                      contentStyle={styles.rowInner}
                      onPress={() => onOpenQuiz(lang.key, level.level)}
                    >
                      <View style={styles.rowInfo}>
                        <Text style={styles.rowTitle}>
                          {level.level} · {level.label}
                        </Text>
                        <Text style={styles.rowDetail}>
                          {quiz.questions.length} questions · Pass{" "}
                          {quiz.passingScore}/{quiz.questions.length}
                        </Text>
                      </View>
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
              </FadeIn>
            );
          })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 24 },
  intro: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 19,
    paddingHorizontal: 2,
    marginBottom: 10,
  },
  filters: { flexGrow: 0, marginHorizontal: -16, marginBottom: 12 },
  filterContent: { paddingHorizontal: 16, gap: 8 },
  filterChip: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: COLORS.glass,
  },
  filterText: { color: COLORS.textDim, fontSize: 12, fontWeight: "700" },
  summary: {
    color: COLORS.textDim,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 12,
  },
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
    gap: 12,
  },
  rowInfo: { flex: 1 },
  rowTitle: { color: COLORS.text, fontSize: 15, fontWeight: "700" },
  rowDetail: { color: COLORS.textDim, fontSize: 11, marginTop: 4 },
  rowStatus: { color: COLORS.textDim, fontSize: 12 },
  state: { alignItems: "center", paddingVertical: 24, paddingHorizontal: 20 },
  stateText: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
  },
  retry: {
    borderWidth: 1,
    borderColor: COLORS.ember,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 12,
  },
  retryText: { color: COLORS.ember, fontSize: 13, fontWeight: "700" },
});
