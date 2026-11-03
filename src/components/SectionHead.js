import { StyleSheet, Text, View } from "react-native";

import { TYPO, useTheme } from "../theme";

// Section heading: mono label on a strong rule, optional right-hand count.
export default function SectionHead({ left, right, style }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.head,
        { borderBottomColor: colors.ruleStrong },
        style,
      ]}
    >
      <Text style={[TYPO.label, { color: colors.muted }]}>{left}</Text>
      {right ? (
        <Text style={[TYPO.label, { color: colors.muted }]}>{right}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
