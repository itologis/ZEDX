import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { DURATION } from "../motion";
import { useTheme } from "../theme";

export default function Rule({ strong = false, style, animate = false }) {
  const { colors } = useTheme();
  const scaleX = useSharedValue(animate ? 0 : 1);

  useEffect(() => {
    if (!animate) {
      scaleX.value = 1;
      return;
    }

    scaleX.value = 0;
    scaleX.value = withTiming(1, {
      duration: DURATION.base,
      easing: Easing.out(Easing.cubic),
      reduceMotion: ReduceMotion.System,
    });
  }, [animate, scaleX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: scaleX.value }],
    transformOrigin: "left",
  }));

  const ruleStyle = [
    styles.rule,
    { backgroundColor: strong ? colors.ruleStrong : colors.rule },
    style,
  ];

  if (animate) {
    return <Animated.View style={[ruleStyle, animatedStyle]} />;
  }

  return <View style={ruleStyle} />;
}

const styles = StyleSheet.create({
  rule: { height: StyleSheet.hairlineWidth },
});
