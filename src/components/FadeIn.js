import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export default function FadeIn({
  children,
  style,
  duration = 320,
  delay = 0,
  from = "up",
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(from === "up" ? 14 : 0)).current;
  const scale = useRef(new Animated.Value(from === "scale" ? 0.96 : 1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY, scale, duration, delay]);

  return (
    <Animated.View
      style={[style, { opacity, transform: [{ translateY }, { scale }] }]}
    >
      {children}
    </Animated.View>
  );
}
