import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../theme";
import GlassCard from "./GlassCard";

const TABS = [
  { key: "home", label: "Learn", icon: "⌂" },
  { key: "search", label: "Search", icon: "⌕" },
  { key: "quizzes", label: "Quizzes", icon: "✎" },
  { key: "saved", label: "Saved", icon: "★" },
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <GlassCard blur style={styles.bar}>
      <View style={styles.row}>
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
              hitSlop={{ top: 8, bottom: 8 }}
            >
              <View style={[styles.iconWrap, on && styles.iconWrapOn]}>
                <Text style={[styles.icon, on && styles.on]}>{tab.icon}</Text>
              </View>
              <Text style={[styles.label, on && styles.on]}>{tab.label}</Text>
              {on && <View style={styles.dot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  bar: {
    marginHorizontal: 14,
    marginTop: 4,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  item: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    minHeight: 56,
    justifyContent: "center",
  },
  iconWrap: {
    width: 36,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  iconWrapOn: {
    backgroundColor: "rgba(255, 106, 61, 0.14)",
  },
  icon: {
    color: COLORS.textDim,
    fontSize: 18,
  },
  label: {
    color: COLORS.textDim,
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  on: {
    color: COLORS.ember,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.ember,
    marginTop: 3,
  },
});
