import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { FONTS, TYPO, useTheme } from "../theme";

// "Continue reading" strip: 2px accent rule, label, title, meta, arrow.
export default function ContinueStrip({ title, meta, onPress, style }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Continue reading ${title}, ${meta}`}
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.strip,
        {
          borderLeftColor: colors.accent,
          borderBottomColor: colors.rule,
        },
        style,
      ]}
    >
      <View style={styles.body}>
        <Text style={[TYPO.label, { color: colors.accent }]}>
          Continue reading
        </Text>
        <Text style={[TYPO.section, styles.title, { color: colors.ink }]}>
          {title}
        </Text>
        <Text style={[TYPO.meta, styles.meta, { color: colors.muted }]}>
          {meta}
        </Text>
      </View>
      <Text style={[styles.arrow, { color: colors.accent }]}>→</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingLeft: 14,
    borderLeftWidth: 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  body: { flex: 1 },
  title: { marginTop: 10 },
  meta: { marginTop: 7 },
  arrow: {
    fontFamily: FONTS.mono,
    fontSize: 20,
    lineHeight: 24,
    paddingHorizontal: 8,
  },
});
