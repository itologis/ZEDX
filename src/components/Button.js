import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { SPRING } from "../motion";
import { RADIUS, TYPO, useTheme } from "../theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Button({
  children,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}) {
  const { colors } = useTheme();
  const primary = variant === "primary";
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const background = primary
    ? disabled
      ? colors.plate
      : colors.accent
    : "transparent";

  const pressIn = () => {
    // Reanimated shared values are intentionally updated from press callbacks.
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(0.98, {
      ...SPRING.press,
      reduceMotion: ReduceMotion.System,
    });
  };

  const pressOut = () => {
    // Reanimated shared values are intentionally updated from press callbacks.
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(1, {
      ...SPRING.press,
      reduceMotion: ReduceMotion.System,
    });
  };

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
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
        animatedStyle,
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
    </AnimatedPressable>
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
