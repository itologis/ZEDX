import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { DURATION, SPRING } from "../motion";

export default function PageTransition({
  direction = "none",
  children,
  style,
}) {
  const initialX =
    direction === "forward" ? 14 : direction === "back" ? -14 : 0;
  const translateX = useSharedValue(initialX);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(0, {
      ...SPRING.page,
      reduceMotion: ReduceMotion.System,
    });
    opacity.value = withTiming(1, {
      duration: DURATION.base,
      easing: Easing.out(Easing.cubic),
      reduceMotion: ReduceMotion.System,
    });
  }, [direction, opacity, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[styles.fill, style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
