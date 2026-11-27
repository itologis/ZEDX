import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { DURATION, SPRING } from "../motion";
import { TYPO, useTheme } from "../theme";

const TABS = [
  { key: "home", label: "Learn" },
  { key: "search", label: "Search" },
  { key: "quizzes", label: "Quizzes" },
  { key: "saved", label: "Saved" },
];

export default function BottomNav({ active, onNavigate }) {
  const { colors } = useTheme();
  const [barWidth, setBarWidth] = useState(0);
  const previousActiveIndex = useRef(null);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const activeIndex = TABS.findIndex((tab) => tab.key === active);

  useEffect(() => {
    if (barWidth === 0) return;

    if (activeIndex < 0) {
      opacity.value = withTiming(0, {
        duration: DURATION.fast,
        reduceMotion: ReduceMotion.System,
      });
      previousActiveIndex.current = activeIndex;
      return;
    }

    const tabWidth = barWidth / TABS.length;
    const targetX = activeIndex * tabWidth + tabWidth * 0.22;
    const cameFromNoTab =
      previousActiveIndex.current === null || previousActiveIndex.current < 0;

    if (cameFromNoTab) {
      translateX.value = targetX;
      opacity.value = withTiming(1, {
        duration: DURATION.fast,
        reduceMotion: ReduceMotion.System,
      });
    } else {
      translateX.value = withSpring(targetX, {
        ...SPRING.settle,
        reduceMotion: ReduceMotion.System,
      });
      opacity.value = withTiming(1, {
        duration: DURATION.fast,
        reduceMotion: ReduceMotion.System,
      });
    }

    previousActiveIndex.current = activeIndex;
  }, [activeIndex, barWidth, opacity, translateX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
      style={[
        styles.bar,
        { backgroundColor: colors.paper, borderTopColor: colors.ruleStrong },
      ]}
    >
      {TABS.map((tab) => {
        const on = tab.key === active;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.item}
            onPress={() => !on && onNavigate(tab.key)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            accessibilityLabel={tab.label}
          >
            <Text
              style={[
                TYPO.label,
                { color: on ? colors.ink : colors.muted },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}

      {barWidth > 0 ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicator,
            {
              width: (barWidth / TABS.length) * 0.56,
              backgroundColor: colors.accent,
            },
            indicatorStyle,
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    position: "relative",
  },
  item: {
    flex: 1,
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 2,
  },
});
