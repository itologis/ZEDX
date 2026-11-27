import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AnswerFeedback from "./AnswerFeedback";
import FadeIn from "./FadeIn";
import FieldLabel from "./FieldLabel";
import OptionRow from "./OptionRow";
import { TYPO, useTheme } from "../theme";

export default function LessonCheck({ check }) {
  const { colors } = useTheme();
  const [selected, setSelected] = useState(null);

  if (!check) return null;

  const hasAnswered = selected !== null;
  const isCorrect = selected === check.correct;

  return (
    <View style={styles.block}>
      <FieldLabel>Check your understanding</FieldLabel>
      <Text style={[TYPO.item, styles.question, { color: colors.ink }]}>
        {check.question}
      </Text>
      <Text style={[TYPO.tiny, styles.instruction, { color: colors.muted }]}>
        Choose an answer. You can try again after a mistake.
      </Text>
      <View style={styles.options}>
        {check.options.map((option, index) => {
          const showCorrect = hasAnswered && index === check.correct;
          const showWrong = hasAnswered && selected === index && !isCorrect;

          return (
            <OptionRow
              key={`${option}-${index}`}
              index={index}
              label={option}
              state={showCorrect ? "correct" : showWrong ? "wrong" : "idle"}
              selected={selected === index}
              disabled={isCorrect}
              onPress={() => setSelected(index)}
            />
          );
        })}
      </View>
      {hasAnswered ? (
        <FadeIn key={selected} from={isCorrect ? "up" : "down"} duration={170}>
          <AnswerFeedback
            correct={isCorrect}
            explanation={check.explanation}
            retryHint="The correct choice is marked. Try selecting it to lock in the idea."
          />
        </FadeIn>
      ) : null}
    </View>
  );
}


const styles = StyleSheet.create({
  block: { marginTop: 28 },
  question: { marginTop: 10, lineHeight: 25 },
  instruction: { marginTop: 6 },
  options: { marginTop: 8 },
});
