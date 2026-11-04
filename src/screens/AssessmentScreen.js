import { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Button from "../components/Button";
import FieldLabel from "../components/FieldLabel";
import OptionRow from "../components/OptionRow";
import Screen from "../components/Screen";
import TopBar from "../components/TopBar";
import { saveAssessmentResult } from "../data/progress";
import { QUIZZES } from "../data/quiz";
import { TYPO, useTheme } from "../theme";
import { confirmAction } from "../utils/confirm";

const shuffleQuestions = (questions) => {
  const shuffled = [...questions];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export default function AssessmentScreen({
  languageKey,
  languageData,
  languageLabel,
  onComplete,
  onBack,
}) {
  const { colors } = useTheme();
  const questions = useMemo(() => {
    const allQuestions = [];

    for (const level of languageData.levels) {
      const quiz = QUIZZES[languageKey]?.[level.level];

      if (!quiz?.questions) {
        continue;
      }

      for (const question of quiz.questions) {
        allQuestions.push({
          ...question,
          _level: level.level,
        });
      }
    }

    return shuffleQuestions(allQuestions);
  }, [languageKey, languageData]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  if (questions.length === 0) {
    return (
      <Screen>
        <TopBar left="← Back" onLeft={onBack} leftLabel="Go back" right="Placement" />
        <View style={styles.center}>
          <Text style={[TYPO.h2, { color: colors.ink }]}>
            Assessment unavailable
          </Text>
          <Text style={[TYPO.small, styles.centerText, { color: colors.body }]}>
            There are currently no assessment questions for this language.
          </Text>
          <Button onPress={() => onComplete?.()} style={styles.centerButton}>
            Continue
          </Button>
        </View>
      </Screen>
    );
  }

  const question = questions[currentQuestion];

  const handleOptionSelect = (index) => {
    // The answer can change until Next is pressed.
    setSelectedOption(index);
  };

  const calculateResults = (finalAnswers) => {
    const levelResults = {};

    for (const level of languageData.levels) {
      const levelQuestions = questions.filter(
        (item) => item._level === level.level,
      );
      const levelAnswers = finalAnswers.filter(
        (answer) => answer.level === level.level,
      );
      const score = levelAnswers.filter(
        (answer) => answer.selected === answer.correct,
      ).length;
      const total = levelQuestions.length;
      const quizData = QUIZZES[languageKey]?.[level.level];
      const passingScore = quizData?.passingScore || Math.ceil(total * 0.6);

      levelResults[level.level] = {
        score,
        total,
        passingScore,
        passed: score >= passingScore,
      };
    }

    let startingLevel = languageData.levels[0]?.level;

    for (const level of languageData.levels) {
      const levelResult = levelResults[level.level];

      if (!levelResult?.passed) {
        startingLevel = level.level;
        break;
      }

      startingLevel = level.level;
    }

    return { scores: levelResults, startingLevel };
  };

  const handleNext = async () => {
    if (selectedOption === null) return;

    const answer = {
      level: question._level,
      selected: selectedOption,
      correct: question.correct,
    };

    const finalAnswers = [...answers, answer];
    setAnswers(finalAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      return;
    }

    const assessmentResult = calculateResults(finalAnswers);

    try {
      await saveAssessmentResult(languageKey, assessmentResult);
    } catch (error) {
      console.error("Error saving assessment result:", error);
    }

    setResult(assessmentResult);
  };

  const requestQuit = () => {
    const hasProgress =
      answers.length > 0 || selectedOption !== null || currentQuestion > 0;

    if (!hasProgress) {
      onBack?.();
      return;
    }

    confirmAction({
      title: "Quit assessment?",
      message: "Your progress will be lost.",
      confirmText: "Quit",
      cancelText: "Keep going",
      destructive: true,
      onConfirm: () => onBack?.(),
    });
  };

  // Placement is optional: skipping records a completed, skipped assessment so
  // "Start learning" opens Levels from now on instead of asking again.
  const requestSkip = () => {
    confirmAction({
      title: "Skip the placement test?",
      message:
        "Your answers so far won't be saved. You'll start from Beginner — every level stays open, so you can jump ahead whenever you like.",
      confirmText: "Skip",
      cancelText: "Keep going",
      onConfirm: async () => {
        try {
          await saveAssessmentResult(languageKey, {
            skipped: true,
            scores: {},
            startingLevel: languageData.levels[0]?.level,
          });
        } catch (error) {
          console.error("Error saving skipped assessment:", error);
        }
        onComplete?.();
      },
    });
  };

  if (result) {
    const recommendedLevel = languageData.levels.find(
      (level) => level.level === result.startingLevel,
    );

    return (
      <Screen>
        <TopBar right="Placement" />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.resultContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[TYPO.label, { color: colors.accent }]}>
            Placement
          </Text>
          <Text style={[TYPO.title, styles.resultTitle, { color: colors.ink }]}>
            Assessment complete
          </Text>

          <FieldLabel>Recommended start</FieldLabel>
          <Text style={[TYPO.title, styles.recommended, { color: colors.ink }]}>
            {recommendedLevel?.label || result.startingLevel}
          </Text>
          <Text style={[TYPO.body, styles.resultText, { color: colors.body }]}>
            Based on your answers, this is the level we recommend starting
            with. You can still open any level and learn in whatever order you
            prefer.
          </Text>

          <FieldLabel>Scores</FieldLabel>
          <View style={styles.scores}>
            {languageData.levels.map((level) => {
              const levelResult = result.scores[level.level];

              return (
                <View
                  key={level.level}
                  style={[styles.scoreRow, { borderBottomColor: colors.rule }]}
                >
                  <Text style={[TYPO.body, { color: colors.ink }]}>
                    {level.level} · {level.label}
                  </Text>
                  <Text style={[TYPO.meta, { color: colors.muted }]}>
                    {levelResult.score} / {levelResult.total}
                  </Text>
                </View>
              );
            })}
          </View>

          <Button onPress={() => onComplete?.(result)} style={styles.resultButton}>
            Start learning
          </Button>
        </ScrollView>
      </Screen>
    );
  }

  const progressPct = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Screen>
      <TopBar
        left="← Quit"
        onLeft={requestQuit}
        leftLabel="Quit assessment"
        right={
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Skip placement test"
            onPress={requestSkip}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.skipTap}
          >
            <Text style={[TYPO.label, { color: colors.muted }]}>Skip</Text>
          </TouchableOpacity>
        }
      />

      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityValue={{
          min: 0,
          max: questions.length,
          now: currentQuestion + 1,
        }}
        style={styles.progressWrap}
      >
        <View style={styles.progressMeta}>
          <Text style={[TYPO.label, { color: colors.muted }]}>
            Question {String(currentQuestion + 1).padStart(2, "0")} /{" "}
            {String(questions.length).padStart(2, "0")}
          </Text>
          <Text style={[TYPO.label, { color: colors.muted }]}>
            {languageLabel || "Placement"}
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
        <Text style={[TYPO.question, { color: colors.ink }]}>
          {question.question}
        </Text>

        <Text style={[TYPO.small, styles.hint, { color: colors.muted }]}>
          Select an answer. You can change it before continuing.
        </Text>

        <View style={styles.options}>
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index;

            return (
              <OptionRow
                key={index}
                index={index}
                label={option}
                state={isSelected ? "selected" : "idle"}
                onPress={() => handleOptionSelect(index)}
              />
            );
          })}
        </View>

        {selectedOption !== null ? (
          <Button onPress={handleNext} style={styles.next}>
            {currentQuestion === questions.length - 1
              ? "See results"
              : "Next question"}
          </Button>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 18, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", padding: 24 },
  centerText: { marginTop: 10, lineHeight: 20 },
  centerButton: { marginTop: 22 },
  progressWrap: { paddingHorizontal: 24, paddingTop: 18, paddingBottom: 16 },
  progressMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  skipTap: { minHeight: 44, justifyContent: "center" },
  track: { height: 2 },
  fill: { height: 2 },
  hint: { marginTop: 10 },
  options: { marginTop: 22 },
  next: { marginTop: 24 },
  resultContent: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 },
  resultTitle: { marginTop: 14 },
  recommended: { marginTop: 10 },
  resultText: { marginTop: 12 },
  scores: { marginTop: 4 },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  resultButton: { marginTop: 28 },
});
