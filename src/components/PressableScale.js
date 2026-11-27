import { Pressable } from "react-native";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { SPRING } from "../motion";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PressableScale({
  children,
  onPress,
  onLongPress,
  disabled = false,
  accessibilityRole,
  accessibilityLabel,
  accessibilityHint,
  accessibilityState,
  hitSlop,
  testID,
  style,
  pressedScale = 0.975,
  pressedOpacity = 0.8,
}) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const motion = { reduceMotion: ReduceMotion.System };
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const pressIn = () => {
    // Reanimated shared values are intentionally updated from press callbacks.
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(pressedScale, {
      ...SPRING.press,
      ...motion,
    });
    // Reanimated shared values are intentionally updated from press callbacks.
    // eslint-disable-next-line react-hooks/immutability
    opacity.value = withTiming(pressedOpacity, {
      duration: 75,
      ...motion,
    });
  };

  const pressOut = () => {
    // Reanimated shared values are intentionally updated from press callbacks.
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(1, {
      ...SPRING.press,
      ...motion,
    });
    // Reanimated shared values are intentionally updated from press callbacks.
    // eslint-disable-next-line react-hooks/immutability
    opacity.value = withTiming(1, {
      duration: 115,
      ...motion,
    });
  };

  return (
    <AnimatedPressable
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ ...accessibilityState, disabled }}
      disabled={disabled}
      hitSlop={hitSlop}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      style={[style, animatedStyle]}
    >
      {children}
    </AnimatedPressable>
  );
}
