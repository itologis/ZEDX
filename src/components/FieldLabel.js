import { StyleSheet, Text, View } from "react-native";

import { TYPO, useTheme } from "../theme";

// Field label followed by a hairline filling the remaining width.
export default function FieldLabel({ children, style }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.row, style]}>
      <Text style={[TYPO.label, { color: colors.muted }]}>{children}</Text>
      <View style={[styles.line, { backgroundColor: colors.rule }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    marginLeft: 12,
  },
});
