import { StyleSheet, View } from "react-native";

import { useTheme } from "../theme";

// Hairline divider. `strong` for structural rules, default for row separators.
export default function Rule({ strong = false, style }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.rule,
        { backgroundColor: strong ? colors.ruleStrong : colors.rule },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  rule: { height: StyleSheet.hairlineWidth },
});
