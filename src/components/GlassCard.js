import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { COLORS } from "../theme";

export default function GlassCard({
  children,
  style,
  contentStyle,
  accent,
  blur = false,
  onPress,
  disabled = false,
}) {
  const cardStyle = [
    styles.card,
    accent
      ? {
          borderColor: `${accent}66`,
          shadowColor: accent,
        }
      : null,
    style,
  ];

  const inner = (
    <>
      {blur && (
        <BlurView
          intensity={28}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      )}

      <LinearGradient
        colors={[
          "rgba(255,255,255,0.09)",
          "rgba(255,255,255,0.025)",
          "rgba(0,0,0,0.04)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <View style={[styles.content, contentStyle]}>{children}</View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.78}
        onPress={onPress}
        disabled={disabled}
        style={[...cardStyle, disabled && styles.disabled]}
      >
        {inner}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{inner}</View>;
}

const styles = StyleSheet.create({
  card: {
    position: "relative",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.glass,
    overflow: "hidden",
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  content: {
    position: "relative",
    zIndex: 1,
  },

  disabled: {
    opacity: 0.48,
  },
});
