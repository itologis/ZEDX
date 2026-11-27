import { useEffect } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { SPRING } from "../motion";
import { TYPO, useTheme } from "../theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const LETTERS = ["A", "B", "C", "D", "E", "F"];

export default function OptionRow({
  index,
  label,
  state = "idle",
  selected = false,
  onPress,
  disabled = false,
}) {
  const { colors } = useTheme();
  const pressScale = useSharedValue(1);
  const wobbleScale = useSharedValue(1);
  const shakeX = useSharedValue(0);
  const tilt = useSharedValue(0);

  useEffect(() => {
    const motion = { reduceMotion: ReduceMotion.System };

    if (state === "wrong") {
      // Give a wrong choice a quick, exaggerated wobble without lingering.
      shakeX.value = withSequence(
        withTiming(-11, { duration: 55, ...motion }),
        withTiming(11, { duration: 70, ...motion }),
        withTiming(-8, { duration: 60, ...motion }),
        withTiming(8, { duration: 55, ...motion }),
        withTiming(-3, { duration: 45, ...motion }),
        withSpring(0, { ...SPRING.settle, ...motion }),
      );
      tilt.value = withSequence(
        withTiming(-2.8, { duration: 55, ...motion }),
        withTiming(2.8, { duration: 70, ...motion }),
        withTiming(-1.8, { duration: 60, ...motion }),
        withTiming(1.2, { duration: 55, ...motion }),
        withSpring(0, { damping: 8, stiffness: 340, ...motion }),
      );
      wobbleScale.value = withSequence(
        withTiming(1.035, { duration: 70, ...motion }),
        withTiming(0.985, { duration: 65, ...motion }),
        withSpring(1, { ...SPRING.settle, ...motion }),
      );
      return;
    }

    shakeX.value = withSpring(0, { ...SPRING.settle, ...motion });
    tilt.value = withSpring(0, { ...SPRING.settle, ...motion });
    wobbleScale.value = withSpring(1, { ...SPRING.settle, ...motion });
  }, [shakeX, state, tilt, wobbleScale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: shakeX.value },
      { rotate: `${tilt.value}deg` },
      { scale: pressScale.value * wobbleScale.value },
    ],
  }));

  const letter = LETTERS[index] || String(index + 1);
  const isSelected = selected || state === "selected";
  const letterColor =
    state === "idle" ? colors.muted : state === "correct" ? colors.ink : colors.accent;
  const labelColor = isSelected ? colors.accent : colors.ink;

  const pressIn = () => {
    // Reanimated shared values are intentionally updated from press callbacks.
    pressScale.value = withSpring(1.01, {
      ...SPRING.press,
      reduceMotion: ReduceMotion.System,
    });
  };

  const pressOut = () => {
    // Reanimated shared values are intentionally updated from press callbacks.
    pressScale.value = withSpring(1, {
      ...SPRING.press,
      reduceMotion: ReduceMotion.System,
    });
  };

  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.selectionAsync().catch(() => {});
    }
    onPress?.();
  };

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: isSelected }}
      disabled={disabled}
      onPress={handlePress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      style={[styles.row, { borderBottomColor: colors.rule }, animatedStyle]}
    >
      <Text style={[TYPO.label, styles.letter, { color: letterColor }]}>
        {letter}
      </Text>
      <Text style={[TYPO.option, styles.label, { color: labelColor }]}>
        {label}
      </Text>
      <View style={styles.mark}>
        {state === "correct" ? (
          <Text style={[TYPO.label, { color: colors.ink }]}>✓</Text>
        ) : null}
        {state === "wrong" ? (
          <Text style={[TYPO.label, { color: colors.accent }]}>✕</Text>
        ) : null}
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 52,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  letter: { width: 24 },
  label: { flex: 1 },
  mark: { width: 18, alignItems: "flex-end" },
});
