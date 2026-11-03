import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import FadeIn from "../components/FadeIn";
import Screen from "../components/Screen";
import SectionHead from "../components/SectionHead";
import TopBar from "../components/TopBar";
import { LANGUAGES } from "../data/languages";
import { getMissedQuestions, getQuizProgress } from "../data/progress";
import { QUIZZES } from "../data/quiz";
import { TYPO, useTheme } from "../theme";

export default function QuizzesScreen({ onOpenQuiz, onOpenReview }) {
  const { colors } = useTheme();
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

  const reviewDisabled = loading || loadError || missedCount === 0;

  return (
    <Screen>
      <TopBar left="ZEDX" right="Examinations" strong />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[TYPO.label, { color: colors.accent }]}>
          Assessment index
        </Text>
        <Text style={[TYPO.title, styles.title, { color: colors.ink }]}>
          Examinations
        </Text>
        <Text style={[TYPO.lede, styles.lede, { color: colors.body }]}>
          Choose a language and level to test what you have learned.
        </Text>

        <SectionHead
          left="Filter"
          right={`${passedCount} of ${availableQuizzes.length} passed`}
          style={styles.sectionHead}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
          accessibilityLabel="Filter quizzes by language"
        >
          {[
            { key: "all", label: "All" },
            ...LANGUAGES.map((lang) => ({ key: lang.key, label: lang.label })),
          ].map((filter) => {
            const selected = selectedLanguage === filter.key;

            return (
              <TouchableOpacity
                key={filter.key}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setSelectedLanguage(filter.key)}
                style={[
                  styles.filter,
                  selected && {
                    borderBottomColor: colors.accent,
                    borderBottomWidth: 2,
                  },
                ]}
              >
                <Text
                  style={[
                    TYPO.label,
                    { color: selected ? colors.ink : colors.muted },
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={{ disabled: reviewDisabled }}
          disabled={reviewDisabled}
          onPress={onOpenReview}
          activeOpacity={0.7}
          style={[
            styles.review,
            {
              borderLeftColor: colors.accent,
              borderTopColor: colors.rule,
              borderBottomColor: colors.rule,
              opacity: reviewDisabled ? 0.55 : 1,
            },
          ]}
        >
          <View style={styles.reviewBody}>
            <Text style={[TYPO.label, { color: colors.accent }]}>
              Review mode
            </Text>
            <Text style={[TYPO.section, styles.reviewTitle, { color: colors.ink }]}>
              Review missed questions
            </Text>
            <Text style={[TYPO.meta, styles.reviewMeta, { color: colors.muted }]}>
              {loading
                ? "Loading your review questions…"
                : loadError
                  ? "Review questions could not be loaded."
                  : missedCount === 0
                    ? "Nothing to review yet. Questions you miss will show up here."
                    : `${missedCount} question${missedCount === 1 ? "" : "s"} waiting`}
            </Text>
          </View>
          <Text style={[TYPO.label, { color: colors.accent }]}>→</Text>
        </TouchableOpacity>

        {loading ? (
          <Text style={[TYPO.small, styles.state, { color: colors.muted }]}>
            Loading quiz progress…
          </Text>
        ) : null}

        {loadError ? (
          <View style={styles.state}>
            <Text
              style={[TYPO.small, styles.stateText, { color: colors.body }]}
            >
              Quiz progress could not be loaded. Try again in a moment.
            </Text>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => setReloadKey((key) => key + 1)}
              style={styles.retry}
            >
              <Text style={[TYPO.label, { color: colors.accent }]}>
                Try again
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {!loading && !loadError
          ? filteredLanguages.map((lang, index) => {
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
                  delay={index * 40}
                  duration={160}
                  from="none"
                >
                  <View style={styles.section}>
                    <View
                      style={[
                        styles.sectionHeader,
                        { borderBottomColor: colors.ruleStrong },
                      ]}
                    >
                      <View style={styles.sectionTitleRow}>
                        <View
                          style={[
                            styles.swatch,
                            { backgroundColor: colors.lang[lang.key] },
                          ]}
                        />
                        <Text
                          style={[TYPO.label, { color: colors.ink }]}
                        >
                          {lang.label}
                        </Text>
                      </View>
                      <Text style={[TYPO.label, { color: colors.muted }]}>
                        {languagePassedCount}/{levels.length} passed
                      </Text>
                    </View>

                    {levels.map((level) => {
                      const isPassed = !!passed[lang.key]?.[level.level];
                      const quiz = QUIZZES[lang.key][level.level];

                      return (
                        <TouchableOpacity
                          key={level.level}
                          accessibilityRole="button"
                          accessibilityLabel={`${lang.label} ${level.label} quiz`}
                          onPress={() => onOpenQuiz(lang.key, level.level)}
                          activeOpacity={0.65}
                          style={[
                            styles.row,
                            { borderBottomColor: colors.rule },
                          ]}
                        >
                          <View style={styles.rowBody}>
                            <Text style={[TYPO.item, { color: colors.ink }]}>
                              {level.level} · {level.label}
                            </Text>
                            <Text
                              style={[TYPO.tiny, styles.rowMeta, { color: colors.muted }]}
                            >
                              {quiz.questions.length} questions · pass{" "}
                              {quiz.passingScore}/{quiz.questions.length}
                            </Text>
                          </View>
                          <Text
                            style={[
                              TYPO.label,
                              { color: isPassed ? colors.ink : colors.muted },
                            ]}
                          >
                            {isPassed ? "Passed ✓" : "Not taken"}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </FadeIn>
              );
            })
          : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 26, paddingBottom: 40 },
  title: { marginTop: 14 },
  lede: { marginTop: 14, maxWidth: 340 },
  sectionHead: { marginTop: 28 },
  filterContent: { gap: 20, paddingTop: 4 },
  filter: {
    minHeight: 44,
    justifyContent: "center",
    paddingTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  review: {
    marginTop: 10,
    paddingVertical: 18,
    paddingLeft: 14,
    paddingRight: 4,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  reviewBody: { flex: 1 },
  reviewTitle: { marginTop: 8 },
  reviewMeta: { marginTop: 7, lineHeight: 15 },
  section: { marginTop: 32 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionTitleRow: { flexDirection: "row", alignItems: "center" },
  swatch: { width: 7, height: 7, marginRight: 10 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 56,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowBody: { flex: 1, paddingRight: 12 },
  rowMeta: { marginTop: 6 },
  state: { paddingVertical: 22, alignItems: "center" },
  stateText: { textAlign: "center" },
  retry: {
    marginTop: 8,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
});
