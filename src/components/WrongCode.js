import { StyleSheet, Text, View } from "react-native";

import CodePlate from "./CodePlate";
import RichText from "./RichText";
import { TYPO, useTheme } from "../theme";

// The counter-example: a broken version of the snippet above. The accent rule
// and the ✕ mark separate it from the working example without introducing a
// second colour into the print palette.
export default function WrongCode({ code, why }) {
  const { colors } = useTheme();

  if (!code) return null;

  return (
    <View style={styles.block}>
      <View style={styles.labelRow}>
        <Text style={[TYPO.label, { color: colors.accent }]}>✕ Wrong</Text>
        <View style={[styles.line, { backgroundColor: colors.rule }]} />
      </View>

      <CodePlate style={{ borderLeftColor: colors.accent }}>{code}</CodePlate>

      {why ? (
        <RichText
          text={why}
          style={[TYPO.small, styles.why, { color: colors.body }]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  block: { marginTop: 24 },
  labelRow: { flexDirection: "row", alignItems: "center" },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    marginLeft: 12,
  },
  why: { marginTop: 8 },
});
