import { useEffect } from "react";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { DURATION } from "../motion";

const ORIGINS = {
  up: { x: 0, y: 12, scale: 1 },
  down: { x: 0, y: -9, scale: 1 },
  left: { x: -12, y: 0, scale: 1 },
  right: { x: 12, y: 0, scale: 1 },
  scale: { x: 0, y: 0, scale: 0.965 },
  none: { x: 0, y: 0, scale: 1 },
};

export default function FadeIn({
  children,
  style,
  duration = DURATION.base,
  delay = 0,
  from = "up",
}) {
  const origin = ORIGINS[from] || ORIGINS.none;
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(origin.x);
  const translateY = useSharedValue(origin.y);
  const scale = useSharedValue(origin.scale);

  useEffect(() => {
    const config = {
      duration,
      delay,
      easing: Easing.out(Easing.cubic),
      reduceMotion: ReduceMotion.System,
    };

    opacity.value = withTiming(1, config);
    translateX.value = withTiming(0, config);
    translateY.value = withTiming(0, config);
    scale.value = withTiming(1, config);
  }, [delay, duration, opacity, scale, translateX, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
}
