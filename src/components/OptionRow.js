import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { TYPO, useTheme } from "../theme";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

// Examination option row: letter + answer on a hairline, 52dp tall.
// state: "idle" | "selected" | "correct" | "wrong"
export default function OptionRow({
  index,
  label,
  state = "idle",
  selected = false,
  onPress,
  disabled = false,
}) {
  const { colors } = useTheme();
  const letter = LETTERS[index] || String(index + 1);
  const isSelected = selected || state === "selected";
  const letterColor =
    state === "idle" ? colors.muted : state === "correct" ? colors.ink : colors.accent;
  const labelColor = isSelected ? colors.accent : colors.ink;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: isSelected }}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.row, { borderBottomColor: colors.rule }]}
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
    </TouchableOpacity>
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
