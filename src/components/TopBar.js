import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { TYPO, useTheme } from "../theme";

// A thin top bar: optional left action (mono label) and optional right slot.
// The manual uses a rule instead of a header block.
export default function TopBar({
  left,
  onLeft,
  leftLabel = "Go back",
  right,
  strong = false,
  style,
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.bar,
        {
          borderBottomColor: strong ? colors.ruleStrong : colors.rule,
        },
        style,
      ]}
    >
      <View style={styles.left}>
        {left ? (
          onLeft ? (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={leftLabel}
              onPress={onLeft}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
              style={styles.tap}
            >
              <Text style={[TYPO.label, { color: colors.ink }]}>{left}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={[TYPO.label, { color: colors.ink }]}>{left}</Text>
          )
        ) : null}
      </View>

      <View style={styles.right}>
        {typeof right === "string" ? (
          <Text style={[TYPO.label, { color: colors.muted }]}>{right}</Text>
        ) : (
          right
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 52,
    paddingHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  left: { flexDirection: "row", alignItems: "center" },
  right: { flexDirection: "row", alignItems: "center" },
  tap: {
    minHeight: 44,
    justifyContent: "center",
  },
});
