import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../theme";

export default function GlassCard({
  children,
  style,
  accent,
  blur = false,
  onPress,
  disabled,
}) {
  const inner = (
    <>
      {blur && (
        <BlurView
          intensity={35}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
          style={StyleSheet.absoluteFill}
        />
      )}

      <LinearGradient
        colors={["rgba(255,255,255,0.16)", "rgba(255,255,255,0.02)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {children}
    </>
  );

  const cardStyle = [
    styles.card,
    accent && {
      borderColor: accent + "88",
      shadowColor: accent,
      shadowOpacity: 0.35,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 4 },
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={cardStyle}
      >
        {inner}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{inner}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.glass,
    overflow: "hidden",
  },
});
