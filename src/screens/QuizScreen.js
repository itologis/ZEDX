import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import FadeIn from "../components/FadeIn";
import OptionRow from "../components/OptionRow";
import Screen from "../components/Screen";
import TopBar from "../components/TopBar";
import { recordQuizAnswer } from "../data/progress";
import { QUIZZES, shuffle, shuffleOptions } from "../data/quiz";
import { TYPO, useTheme } from "../theme";

const prepare = (questions) => shuffle(questions).map(shuffleOptions);

export default function QuizScreen({
  languageKey,
  levelId,
  customQuestions,
  title = "Quiz",
  onBack,
  onPass,
}) {
  const { colors } = useTheme();
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
        <TopBar left="← Back" onLeft={onBack} leftLabel="Go back" />
        <EmptyState
          eyebrow="Quiz"
          title="No quiz here yet"
          body="This level's questions are still being written."
          actionLabel="Go back"
          onAction={onBack}
        />
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
    if (correct) setScore((value) => value + 1);

    recordQuizAnswer(
      question._lang || languageKey,
      question._level || levelId,
      question.question,
      correct,
    );
  };

  const next = () => {
    if (current < total - 1) {
      setCurrent((value) => value + 1);
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

  // ---------- Start ----------
  if (!started) {
    return (
      <Screen>
        <TopBar left="← Back" onLeft={onBack} leftLabel="Go back" right={title} />
        <ScrollView contentContainerStyle={styles.pad}>
          <FadeIn from="none" duration={150}>
            <Text style={[TYPO.label, { color: colors.accent }]}>
              Examination
            </Text>
            <Text style={[TYPO.title, styles.startTitle, { color: colors.ink }]}>
              {isReview ? "Review" : `${levelId} · Quiz`}
            </Text>
            <Text style={[TYPO.lede, styles.startLede, { color: colors.body }]}>
              Test what you&apos;ve learned. Answers are marked as you go.
            </Text>

            <View style={styles.info}>
              <View style={[styles.infoRow, { borderBottomColor: colors.rule }]}>
                <Text style={[TYPO.label, { color: colors.muted }]}>
                  Questions
                </Text>
                <Text style={[TYPO.meta, { color: colors.ink }]}>{total}</Text>
              </View>
              <View style={[styles.infoRow, styles.infoLast]}>
                <Text style={[TYPO.label, { color: colors.muted }]}>
                  Passing score
                </Text>
                <Text style={[TYPO.meta, { color: colors.ink }]}>
                  {passingScore}/{total}
                </Text>
              </View>
            </View>

            <Button onPress={() => setStarted(true)}>Start quiz</Button>
          </FadeIn>
        </ScrollView>
      </Screen>
    );
  }

  // ---------- Results ----------
  if (finished) {
    const passed = score >= passingScore;
    const percent = Math.round((score / total) * 100);

    return (
      <Screen>
        <TopBar right={title} />
        <ScrollView contentContainerStyle={styles.pad}>
          <FadeIn from="none" duration={150}>
            <Text style={[TYPO.label, { color: colors.accent }]}>Result</Text>
            <Text style={[TYPO.title, styles.score, { color: colors.ink }]}>
              {score} / {total}
            </Text>
            <Text style={[TYPO.meta, styles.percent, { color: colors.muted }]}>
              {percent}% correct
            </Text>

            <Text style={[TYPO.lede, styles.message, { color: colors.body }]}>
              {isReview
                ? "Questions you got right are cleared from your missed list."
                : passed
                  ? "Great work. This level's quiz is marked as passed."
                  : `You need ${passingScore}/${total} to pass. Review the topics and try again.`}
            </Text>

            <Text
              style={[
                TYPO.label,
                styles.verdict,
                { color: passed ? colors.ink : colors.accent },
              ]}
            >
              {isReview
                ? "Review complete"
                : passed
                  ? "Passed"
                  : "Not passed"}
            </Text>

            {!passed ? (
              <Button onPress={retry} style={styles.action}>
                Retry quiz
              </Button>
            ) : null}

            <Button
              variant={passed ? "primary" : "secondary"}
              onPress={onBack}
              style={styles.action}
            >
              {passed ? "Finish" : "← Back"}
            </Button>
          </FadeIn>
        </ScrollView>
      </Screen>
    );
  }

  // ---------- Question ----------
  const progressPct = ((current + 1) / total) * 100;
  const gotItRight = answered && selected === question.correct;

  return (
    <Screen>
      <TopBar left="← Back" onLeft={onBack} leftLabel="Go back" right={title} />

      <View style={styles.progressWrap}>
        <View style={styles.progressMeta}>
          <Text style={[TYPO.label, { color: colors.muted }]}>
            Question {String(current + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </Text>
          <Text style={[TYPO.label, { color: colors.muted }]}>
            Score {score}
          </Text>
        </View>
        <View style={[styles.track, { backgroundColor: colors.rule }]}>
          <View
            style={[
              styles.fill,
              { width: `${progressPct}%`, backgroundColor: colors.accent },
            ]}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <FadeIn key={current} from="none" duration={140}>
          {isReview ? (
            <Text style={[TYPO.label, { color: colors.accent }]}>
              {(question._lang || "").toUpperCase()} · {question._level}
            </Text>
          ) : null}

          <Text
            style={[
              TYPO.question,
              styles.questionText,
              isReview && styles.questionTextReview,
              { color: colors.ink },
            ]}
          >
            {question.question}
          </Text>

          <View style={styles.options}>
            {question.options.map((option, index) => {
              const showCorrect = answered && index === question.correct;
              const showWrong =
                answered && selected === index && index !== question.correct;

              return (
                <OptionRow
                  key={`${option}-${index}`}
                  index={index}
                  label={option}
                  state={showCorrect ? "correct" : showWrong ? "wrong" : "idle"}
                  disabled={answered}
                  onPress={() => pick(index)}
                />
              );
            })}
          </View>

          {answered ? (
            <FadeIn from="none" duration={130}>
              <View
                style={[
                  styles.explain,
                  {
                    borderLeftColor: gotItRight ? colors.ink : colors.accent,
                  },
                ]}
              >
                <Text
                  style={[
                    TYPO.label,
                    { color: gotItRight ? colors.ink : colors.accent },
                  ]}
                >
                  {gotItRight ? "Correct" : "Not quite"}
                </Text>
                {!!question.explanation ? (
                  <Text
                    style={[TYPO.small, styles.explainText, { color: colors.body }]}
                  >
                    {question.explanation}
                  </Text>
                ) : null}
              </View>
            </FadeIn>
          ) : null}

          {answered ? (
            <Button onPress={next} style={styles.next}>
              {current === total - 1 ? "See results" : "Next question"}
            </Button>
          ) : null}
        </FadeIn>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  pad: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 },
  startTitle: { marginTop: 14 },
  startLede: { marginTop: 14 },
  info: { marginTop: 30, marginBottom: 28 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  infoLast: { borderBottomWidth: 0 },
  score: { marginTop: 14 },
  percent: { marginTop: 8 },
  message: { marginTop: 20 },
  verdict: { marginTop: 26 },
  action: { marginTop: 16 },
  progressWrap: { paddingHorizontal: 24, paddingTop: 18, paddingBottom: 16 },
  progressMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  track: { height: 2 },
  fill: { height: 2 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 40 },
  questionText: { marginTop: 16 },
  questionTextReview: { marginTop: 10 },
  options: { marginTop: 22 },
  explain: {
    marginTop: 20,
    paddingLeft: 12,
    borderLeftWidth: 2,
  },
  explainText: { marginTop: 8 },
  next: { marginTop: 24 },
});
