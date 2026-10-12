import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../theme";

export default function Header({ title, onBack, backLabel = "← Back", right }) {
  return (
    <View style={styles.row}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.side}>
          <Text style={styles.back}>{backLabel}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.side} />
      )}

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  side: { width: 90 },
  right: { alignItems: "flex-end" },
  back: { color: COLORS.ember, fontSize: 16, fontWeight: "600" },
  title: {
    flex: 1,
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
