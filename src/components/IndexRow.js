import { StyleSheet, Text, View } from "react-native";
import PressableScale from "./PressableScale";

import { TYPO, useTheme } from "../theme";

// Contents-page row: number, language swatch, name, meta, percentage, 2px rule.
export default function IndexRow({
  number,
  swatch,
  name,
  meta,
  percent = 0,
  onPress,
  style,
}) {
  const { colors } = useTheme();
  const unread = percent === 0;

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${meta}, ${percent}% complete`}
      onPress={onPress}
      style={[styles.row, { borderBottomColor: colors.rule }, style]}
    >
      <View style={styles.top}>
        <Text style={[TYPO.tiny, styles.number, { color: colors.muted }]}>
          {number}
        </Text>
        <View style={[styles.swatch, { backgroundColor: swatch }]} />
        <View style={styles.nameWrap}>
          <Text
            style={[
              TYPO.row,
              { color: unread ? colors.muted : colors.ink },
            ]}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text style={[TYPO.meta, styles.meta, { color: colors.muted }]}>
            {meta}
          </Text>
        </View>
        <Text style={[TYPO.meta, styles.percent, { color: colors.muted }]}>
          {percent}%
        </Text>
      </View>

      <View style={[styles.track, { backgroundColor: colors.rule }]}>
        <View
          style={[
            styles.fill,
            { width: `${percent}%`, backgroundColor: colors.accent },
          ]}
        />
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingTop: 15,
    paddingBottom: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  top: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingBottom: 11,
  },
  number: { width: 26, paddingTop: 5 },
  swatch: { width: 7, height: 7, marginTop: 7, marginRight: 12 },
  nameWrap: { flex: 1 },
  meta: { marginTop: 7 },
  percent: { paddingTop: 5, marginLeft: 12 },
  track: { height: 2, marginLeft: 45 },
  fill: { height: 2 },
});
