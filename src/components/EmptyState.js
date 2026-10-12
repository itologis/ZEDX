import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, RADIUS, SPACE, TYPE } from "../theme";
import FadeIn from "./FadeIn";

export default function EmptyState({
  icon = "◇",
  title,
  body,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
}) {
  return (
    <FadeIn from="up" style={styles.wrap}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      {!!body && <Text style={styles.body}>{body}</Text>}
      {actionLabel && onAction && (
        <TouchableOpacity
          style={styles.primary}
          onPress={onAction}
          activeOpacity={0.85}
          accessibilityRole="button"
        >
          <Text style={styles.primaryText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
      {secondaryLabel && onSecondary && (
        <TouchableOpacity style={styles.secondary} onPress={onSecondary}>
          <Text style={styles.secondaryText}>{secondaryLabel}</Text>
        </TouchableOpacity>
      )}
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingHorizontal: SPACE.xxl,
    paddingVertical: SPACE.xxxl,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceRaised,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACE.lg,
  },
  icon: { fontSize: 26, color: COLORS.ember },
  title: {
    ...TYPE.heading,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACE.sm,
  },
  body: {
    ...TYPE.body,
    color: COLORS.textMuted,
    textAlign: "center",
    marginBottom: SPACE.xl,
  },
  primary: {
    minHeight: 48,
    paddingHorizontal: SPACE.xl,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.ember,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 280,
  },
  primaryText: { color: "#0f0f14", fontSize: 15, fontWeight: "800" },
  secondary: { marginTop: SPACE.md, paddingVertical: SPACE.sm },
  secondaryText: { color: COLORS.textMuted, fontSize: 14, fontWeight: "600" },
});
