import { StyleSheet, Text, View } from "react-native";

import Button from "./Button";
import FadeIn from "./FadeIn";
import Rule from "./Rule";
import { DURATION } from "../motion";
import { TYPO, useTheme } from "../theme";

export default function EmptyState({
  eyebrow,
  title,
  body,
  actionLabel,
  onAction,
  style,
}) {
  const { colors } = useTheme();

  return (
    <FadeIn from="up" duration={DURATION.base}>
      <View style={[styles.outer, style]}>
        <View style={styles.inner}>
          <Rule animate style={styles.rule} />
          {!!eyebrow && (
            <Text style={[TYPO.label, { color: colors.accent }]}>
              {eyebrow}
            </Text>
          )}
          <Text style={[TYPO.h2, styles.title, { color: colors.ink }]}>
            {title}
          </Text>
          <Text style={[TYPO.small, styles.body, { color: colors.body }]}>
            {body}
          </Text>
          {actionLabel && onAction ? (
            <Button
              variant="secondary"
              onPress={onAction}
              style={styles.action}
            >
              {actionLabel}
            </Button>
          ) : null}
        </View>
      </View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  outer: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  inner: {
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
  },
  rule: { width: 28, marginBottom: 16 },
  title: { marginTop: 8, textAlign: "center" },
  body: { marginTop: 8, textAlign: "center" },
  action: { marginTop: 20, alignSelf: "stretch" },
});
