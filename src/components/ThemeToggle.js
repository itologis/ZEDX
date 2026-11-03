import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { TYPO, useTheme } from "../theme";

// Text-only theme switch, set like a folio line: DARK / LIGHT.
export default function ThemeToggle() {
  const { scheme, toggle, colors } = useTheme();
  const next = scheme === "dark" ? "light" : "dark";

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${next} theme`}
      accessibilityState={{ selected: scheme === "light" }}
      onPress={toggle}
      activeOpacity={0.7}
      hitSlop={{ top: 12, bottom: 12, left: 10, right: 10 }}
      style={styles.row}
    >
      {["dark", "light"].map((option, index) => {
        const active = option === scheme;
        return (
          <View key={option} style={styles.item}>
            {index > 0 ? (
              <Text style={[TYPO.tiny, { color: colors.ruleStrong }]}>/</Text>
            ) : null}
            <Text
              style={[
                TYPO.tiny,
                styles.label,
                { color: active ? colors.ink : colors.muted },
              ]}
            >
              {option}
            </Text>
          </View>
        );
      })}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  item: { flexDirection: "row", alignItems: "center" },
  label: { marginLeft: 6 },
});
