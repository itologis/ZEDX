import { useState } from "react";
import {
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
import { recordQuizAnswer } from "../data/progress";
import { QUIZZES, shuffle, shuffleOptions } from "../data/quiz";
import { COLORS } from "../theme";

const prepare = (questions) => shuffle(questions).map(shuffleOptions);

export default function QuizScreen({
  languageKey,
  levelId,
  accentColor = COLORS.ember,
  customQuestions,
  title = "Quiz",
  onBack,
  onPass,
}) {
  const isReview = Array.isArray(customQuestions);
  const quizData = isReview
    ? { questions: customQuestions }
    : QUIZZES[languageKey]?.[levelId];

  const [questions, setQuestions] = useState(() =>
    prepare(quizData?.questions || []),
  );
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(isReview);
  const [finished, setFinished] = useState(false);

  if (!quizData || questions.length === 0) {
    return (
      <Screen>
        <Header title={title} onBack={onBack} />
        <View style={styles.center}>
          <Text style={styles.muted}>No quiz available here yet.</Text>
        </View>
      </Screen>
    );
  }

  const total = questions.length;
  const passingScore = isReview
    ? Math.ceil(total * 0.6)
    : quizData.passingScore || Math.ceil(total * 0.6);
  const question = questions[current];
  const answered = selected !== null;

  const pick = (index) => {
    if (answered) return;
    const correct = index === question.correct;

    setSelected(index);
    if (correct) setScore((s) => s + 1);

    recordQuizAnswer(
      question._lang || languageKey,
      question._level || levelId,
      question.question,
      correct,
    );
  };

  const next = () => {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      return;
    }

    // Save the pass the moment results appear, whichever button is tapped next
    if (!isReview && score >= passingScore) onPass?.();
    setFinished(true);
  };

  const retry = () => {
    setQuestions(prepare(quizData.questions));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setStarted(true);
  };

  // ---------- Start card ----------
  if (!started) {
    return (
      <Screen>
        <Header title={title} onBack={onBack} />
        <View style={styles.pad}>
          <FadeIn from="scale" duration={300}>
            <GlassCard
              blur
              accent={accentColor}
              style={styles.bigCard}
              contentStyle={styles.centered}
            >
              <Text style={styles.bigTitle}>Level quiz</Text>
              <Text style={styles.bigSub}>Test what you&apos;ve learned</Text>

              <View style={styles.info}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Questions</Text>
                  <Text style={styles.infoValue}>{total}</Text>
                </View>
                <View style={[styles.infoRow, styles.infoLast]}>
                  <Text style={styles.infoLabel}>Passing score</Text>
                  <Text style={styles.infoValue}>
                    {passingScore}/{total}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.primary, { backgroundColor: accentColor }]}
                onPress={() => setStarted(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryText}>Start quiz</Text>
              </TouchableOpacity>
            </GlassCard>
          </FadeIn>
        </View>
      </Screen>
    );
  }

  // ---------- Results ----------
  if (finished) {
    const passed = score >= passingScore;
    const percent = Math.round((score / total) * 100);

    return (
      <Screen>
        <Header title={title} />
        <View style={styles.pad}>
          <FadeIn from="scale" duration={300}>
            <GlassCard
              blur
              accent={passed ? COLORS.success : COLORS.danger}
              style={styles.bigCard}
              contentStyle={styles.centered}
            >
              <Text style={styles.bigTitle}>
                {isReview
                  ? "Review complete"
                  : passed
                    ? "Passed!"
                    : "Keep learning"}
              </Text>
              <Text
                style={[
                  styles.score,
                  { color: passed ? COLORS.success : COLORS.danger },
                ]}
              >
                {score} / {total}
              </Text>
              <Text style={styles.percent}>{percent}%</Text>
              <Text style={styles.message}>
                {isReview
                  ? "Questions you got right are cleared from your missed list."
                  : passed
                    ? "Great work. This level's quiz is marked as passed."
                    : `You need ${passingScore}/${total} to pass. Review the topics and try again.`}
              </Text>

              {!passed && (
                <TouchableOpacity
                  style={[styles.primary, { backgroundColor: accentColor }]}
                  onPress={retry}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryText}>Retry quiz</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  passed ? styles.primary : styles.secondary,
                  passed
                    ? { backgroundColor: accentColor }
                    : { borderColor: accentColor },
                ]}
                onPress={onBack}
                activeOpacity={0.85}
              >
                <Text
                  style={
                    passed
                      ? styles.primaryText
                      : [styles.secondaryText, { color: accentColor }]
                  }
                >
                  {passed ? "Finish" : "← Back"}
                </Text>
              </TouchableOpacity>
            </GlassCard>
          </FadeIn>
        </View>
      </Screen>
    );
  }

  // ---------- Question ----------
  const progressPct = ((current + 1) / total) * 100;
  const gotItRight = answered && selected === question.correct;

  return (
    <Screen>
      <Header title={title} onBack={onBack} />

      <View style={styles.progressWrap}>
        <View style={styles.progressMeta}>
          <Text style={styles.progressText}>
            {current + 1} of {total}
          </Text>
          <Text style={styles.scoreText}>Score {score}</Text>
        </View>
        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              { width: `${progressPct}%`, backgroundColor: accentColor },
            ]}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <FadeIn key={current} from="up" duration={220}>
          <GlassCard blur accent={accentColor} style={styles.questionCard}>
            {isReview && (
              <Text style={[styles.tag, { color: accentColor }]}>
                {(question._lang || "").toUpperCase()} · {question._level}
              </Text>
            )}
            <Text style={styles.questionText}>{question.question}</Text>

            <View style={styles.options}>
              {question.options.map((option, index) => {
                const isSelected = selected === index;
                const isCorrect = index === question.correct;
                const showCorrect = answered && isCorrect;
                const showWrong = answered && isSelected && !isCorrect;

                return (
                  <TouchableOpacity
                    key={`${option}-${index}`}
                    style={[
                      styles.option,
                      showCorrect && styles.optionCorrect,
                      showWrong && styles.optionWrong,
                    ]}
                    onPress={() => pick(index)}
                    disabled={answered}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                  >
                    <Text
                      style={[
                        styles.optionText,
                        showCorrect && { color: COLORS.success },
                        showWrong && { color: COLORS.danger },
                      ]}
                    >
                      {option}
                      {showCorrect ? "  ✓" : ""}
                      {showWrong ? "  ✕" : ""}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {answered && (
              <FadeIn from="up" duration={180}>
                <View
                  style={[
                    styles.explain,
                    {
                      borderColor: gotItRight ? COLORS.success : COLORS.danger,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.explainHead,
                      { color: gotItRight ? COLORS.success : COLORS.danger },
                    ]}
                  >
                    {gotItRight ? "Correct" : "Not quite"}
                  </Text>
                  {!!question.explanation && (
                    <Text style={styles.explainText}>
                      {question.explanation}
                    </Text>
                  )}
                </View>
              </FadeIn>
            )}

            {answered && (
              <TouchableOpacity
                style={[styles.primary, { backgroundColor: accentColor }]}
                onPress={next}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryText}>
                  {current === total - 1 ? "See results" : "Next question"}
                </Text>
              </TouchableOpacity>
            )}
          </GlassCard>
        </FadeIn>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  muted: { color: COLORS.textDim, fontSize: 15 },
  pad: { padding: 18 },
  bigCard: { padding: 26 },
  centered: { alignItems: "center" },
  bigTitle: { fontSize: 26, fontWeight: "800", color: COLORS.text },
  bigSub: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 6,
    marginBottom: 20,
  },
  info: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 22,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLast: { borderBottomWidth: 0 },
  infoLabel: { color: COLORS.textMuted, fontSize: 13, fontWeight: "600" },
  infoValue: { color: COLORS.text, fontSize: 14, fontWeight: "700" },
  primary: {
    minHeight: 52,
    width: "100%",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  primaryText: { color: COLORS.bg, fontSize: 16, fontWeight: "800" },
  secondary: {
    minHeight: 48,
    width: "100%",
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: { fontSize: 15, fontWeight: "700" },
  score: { fontSize: 42, fontWeight: "900", marginTop: 10 },
  percent: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
    marginBottom: 14,
  },
  message: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 10,
  },
  progressWrap: { paddingHorizontal: 18, paddingTop: 4, paddingBottom: 8 },
  progressMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressText: { color: COLORS.textMuted, fontSize: 13, fontWeight: "600" },
  scoreText: { color: COLORS.text, fontSize: 13, fontWeight: "700" },
  track: {
    height: 6,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  fill: { height: "100%", borderRadius: 6 },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 32 },
  questionCard: { padding: 20 },
  tag: { fontSize: 11, fontWeight: "800", letterSpacing: 1, marginBottom: 8 },
  questionText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    lineHeight: 26,
    marginBottom: 18,
  },
  options: { gap: 10 },
  option: {
    backgroundColor: "rgba(0,0,0,0.25)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    minHeight: 52,
    justifyContent: "center",
  },
  optionCorrect: {
    borderColor: COLORS.success,
    backgroundColor: "rgba(74,222,128,0.14)",
  },
  optionWrong: {
    borderColor: COLORS.danger,
    backgroundColor: "rgba(248,113,113,0.14)",
  },
  optionText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
  },
  explain: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 4,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  explainHead: { fontSize: 13, fontWeight: "800", marginBottom: 4 },
  explainText: { color: COLORS.textMuted, fontSize: 14, lineHeight: 21 },
});
