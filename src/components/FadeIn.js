import { useEffect, useState } from "react";
import { AccessibilityInfo, Animated, Easing } from "react-native";

export default function FadeIn({
  children,
  style,
  duration = 320,
  delay = 0,
  from = "up",
}) {
  const [opacity] = useState(() => new Animated.Value(0));
  const [translateY] = useState(
    () => new Animated.Value(from === "up" ? 14 : 0),
  );
  const [scale] = useState(
    () => new Animated.Value(from === "scale" ? 0.96 : 1),
  );
  const [reduceMotion, setReduceMotion] = useState(null);

  useEffect(() => {
    let mounted = true;
    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduceMotion,
    );

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (mounted) setReduceMotion(enabled);
      })
      .catch((error) => {
        console.warn("Could not read reduced-motion preference:", error);
        if (mounted) setReduceMotion(false);
      });

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion === null) return undefined;

    if (reduceMotion) {
      opacity.setValue(1);
      translateY.setValue(0);
      scale.setValue(1);
      return undefined;
    }

    const animation = Animated.parallel([
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
    ]);

    animation.start();
    return () => animation.stop();
  }, [opacity, translateY, scale, duration, delay, reduceMotion]);

  if (reduceMotion === null) {
    return <Animated.View style={style}>{children}</Animated.View>;
  }

  return (
    <Animated.View
      style={[style, { opacity, transform: [{ translateY }, { scale }] }]}
    >
      {children}
    </Animated.View>
  );
}
