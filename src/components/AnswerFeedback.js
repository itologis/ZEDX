import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { SPRING } from "../motion";
import { TYPO, useTheme } from "../theme";

export default function AnswerFeedback({
  correct,
  explanation,
  retryHint,
}) {
  const { colors } = useTheme();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.72);
  const rotation = useSharedValue(0);
  const lift = useSharedValue(7);

  useEffect(() => {
    const motion = { reduceMotion: ReduceMotion.System };

    opacity.value = withTiming(1, {
      duration: 120,
      easing: Easing.out(Easing.cubic),
      ...motion,
    });
    lift.value = withSpring(0, { ...SPRING.settle, ...motion });

    if (correct) {
      scale.value = withSequence(
        withSpring(1.16, { ...SPRING.settle, ...motion }),
        withSpring(1, { ...SPRING.press, ...motion }),
      );
      rotation.value = withSequence(
        withTiming(-3, { duration: 70, ...motion }),
        withSpring(0, { ...SPRING.press, ...motion }),
      );
      return;
    }

    // A deliberately dramatic, short "oops" stamp: pop, wobble, settle.
    scale.value = withSequence(
      withTiming(1.2, {
        duration: 85,
        easing: Easing.out(Easing.back(2)),
        ...motion,
      }),
      withTiming(0.92, { duration: 65, ...motion }),
      withSpring(1, { damping: 5, stiffness: 380, mass: 0.65, ...motion }),
    );
    rotation.value = withSequence(
      withTiming(-8, { duration: 55, ...motion }),
      withTiming(7, { duration: 65, ...motion }),
      withTiming(-5, { duration: 60, ...motion }),
      withTiming(3, { duration: 55, ...motion }),
      withSpring(0, { damping: 6, stiffness: 360, ...motion }),
    );
  }, [correct, lift, opacity, rotation, scale]);

  const reactionStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: lift.value },
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  return (
    <View
      style={[
        styles.feedback,
        { borderLeftColor: correct ? colors.ink : colors.accent },
      ]}
    >
      <Animated.View
        style={[
          styles.reaction,
          { backgroundColor: correct ? colors.ink : colors.accent },
          reactionStyle,
        ]}
      >
        <Text
          style={[
            TYPO.label,
            { color: correct ? colors.paper : colors.onAccent },
          ]}
        >
          {correct ? "NICE!" : "WHOOPS!"}
        </Text>
      </Animated.View>
      {!!explanation ? (
        <Text style={[TYPO.small, styles.explanation, { color: colors.body }]}>
          {explanation}
        </Text>
      ) : null}
      {!correct && retryHint ? (
        <Text style={[TYPO.tiny, styles.retry, { color: colors.muted }]}>
          {retryHint}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  feedback: {
    marginTop: 16,
    paddingLeft: 12,
    paddingVertical: 10,
    borderLeftWidth: 2,
  },
  reaction: {
    alignSelf: "flex-start",
    minHeight: 24,
    justifyContent: "center",
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  explanation: { marginTop: 9, lineHeight: 21 },
  retry: { marginTop: 8, lineHeight: 18 },
});
