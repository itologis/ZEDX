import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { TYPO, useTheme } from "../theme";

const TABS = [
  { key: "home", label: "Learn" },
  { key: "search", label: "Search" },
  { key: "quizzes", label: "Quizzes" },
  { key: "saved", label: "Saved" },
];

// Edge-to-edge index tabs: hairline top rule, mono labels, 2px accent marker.
export default function BottomNav({ active, onNavigate }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.bar,
        { backgroundColor: colors.paper, borderTopColor: colors.ruleStrong },
      ]}
    >
      {TABS.map((tab) => {
        const on = tab.key === active;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.item}
            onPress={() => !on && onNavigate(tab.key)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            accessibilityLabel={tab.label}
          >
            {on ? (
              <View
                style={[styles.indicator, { backgroundColor: colors.accent }]}
              />
            ) : null}
            <Text
              style={[
                TYPO.label,
                { color: on ? colors.ink : colors.muted },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  item: {
    flex: 1,
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  indicator: {
    position: "absolute",
    top: 0,
    left: "22%",
    right: "22%",
    height: 2,
  },
});
