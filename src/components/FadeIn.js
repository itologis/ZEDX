import { useEffect } from "react";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { DURATION } from "../motion";

export default function FadeIn({
  children,
  style,
  duration = DURATION.base,
  delay = 0,
  from = "up",
}) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(from === "up" ? 8 : 0);
  const scale = useSharedValue(from === "scale" ? 0.98 : 1);

  useEffect(() => {
    const config = {
      duration,
      delay,
      easing: Easing.out(Easing.cubic),
      reduceMotion: ReduceMotion.System,
    };

    opacity.value = withTiming(1, config);
    translateY.value = withTiming(0, config);
    scale.value = withTiming(1, config);
  }, [delay, duration, opacity, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
}
