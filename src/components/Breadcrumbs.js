import { StyleSheet, Text, View } from "react-native";
import PressableScale from "./PressableScale";

import { TYPO, useTheme } from "../theme";

export default function Breadcrumbs({ items = [], style }) {
  const { colors } = useTheme();

  if (items.length === 0) return null;

  return (
    <View style={[styles.row, style]}>
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1;
        const textStyle = [
          TYPO.label,
          { color: isCurrent ? colors.ink : colors.muted },
          isCurrent && styles.currentText,
        ];

        return (
          <View
            key={`${item.label}-${index}`}
            style={[styles.itemWrap, isCurrent && styles.currentItem]}
          >
            {index > 0 ? (
              <Text style={[TYPO.label, styles.separator, { color: colors.ruleStrong }]}>
                /
              </Text>
            ) : null}

            {typeof item.onPress === "function" ? (
              <PressableScale
                accessibilityRole="link"
                accessibilityLabel={item.label}
                onPress={item.onPress}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                style={[styles.tap, isCurrent && styles.flexible]}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[textStyle, isCurrent && styles.flexible]}
                >
                  {item.label}
                </Text>
              </PressableScale>
            ) : (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[textStyle, isCurrent && styles.flexible]}
              >
                {item.label}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 10,
    minHeight: 44,
    overflow: "hidden",
  },
  itemWrap: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
    minWidth: 0,
  },
  currentItem: { flexShrink: 1 },
  tap: {
    minHeight: 44,
    justifyContent: "center",
  },
  flexible: { flexShrink: 1, minWidth: 0 },
  currentText: { flexShrink: 1 },
  separator: { marginHorizontal: 8 },
});
