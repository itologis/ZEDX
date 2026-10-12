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
            >
              <Text style={[styles.icon, on && styles.on]}>{tab.icon}</Text>
              <Text style={[styles.label, on && styles.on]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  bar: { marginHorizontal: 14, marginTop: 4, marginBottom: 10 },
  row: { flexDirection: "row" },
  item: { flex: 1, alignItems: "center", paddingVertical: 10 },
  icon: { color: COLORS.textDim, fontSize: 18 },
  label: {
    color: COLORS.textDim,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  on: { color: COLORS.ember },
});
