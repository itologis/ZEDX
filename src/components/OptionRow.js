import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
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
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const letter = LETTERS[index] || String(index + 1);
  const isSelected = selected || state === "selected";
  const letterColor =
    state === "idle" ? colors.muted : state === "correct" ? colors.ink : colors.accent;
  const labelColor = isSelected ? colors.accent : colors.ink;

  const pressIn = () => {
    // Reanimated shared values are intentionally updated from press callbacks.
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(1.01, {
      ...SPRING.press,
      reduceMotion: ReduceMotion.System,
    });
  };

  const pressOut = () => {
    // Reanimated shared values are intentionally updated from press callbacks.
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(1, {
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
