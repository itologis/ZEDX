import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { RADIUS, TYPO, useTheme } from "../theme";

// Primary = accent fill, uppercase mono, 52dp, 2px radius.
// Secondary = hairline outline, same footprint.
export default function Button({
  children,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}) {
  const { colors } = useTheme();
  const primary = variant === "primary";

  const background = primary
    ? disabled
      ? colors.plate
      : colors.accent
    : "transparent";

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.base,
        {
          backgroundColor: background,
          borderColor: primary
            ? disabled
              ? colors.ruleStrong
              : colors.accent
            : colors.ruleStrong,
        },
        style,
      ]}
    >
      <Text
        style={[
          TYPO.button,
          {
            color: primary
              ? disabled
                ? colors.muted
                : colors.onAccent
              : colors.ink,
          },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
