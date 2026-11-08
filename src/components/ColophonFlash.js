import { useCallback, useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { FONTS, TYPO, useTheme } from "../theme";

// A one-beat title page: the maker's mark flashes up and leaves.
// It only appears through the hidden "ryuu" search entry, so it stays quiet
// unless someone goes looking for it.
const HOLD_MS = 700;
const REDUCED_HOLD_MS = 900;

// Slightly translucent paper, so the app stays faintly behind the title page.
const BACKDROP = {
  dark: "rgba(18, 17, 14, 0.97)",
  light: "rgba(243, 240, 233, 0.97)",
};

export default function ColophonFlash({ visible, onClose = () => {} }) {
  const { colors, scheme } = useTheme();
  const [opacity] = useState(() => new Animated.Value(0));
  const [scale] = useState(() => new Animated.Value(0.98));
  const [reduceMotion, setReduceMotion] = useState(false);
  const timer = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (mounted) setReduceMotion(enabled);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const close = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    opacity.stopAnimation();
    opacity.setValue(0);
    scale.setValue(1);
    onCloseRef.current();
  }, [opacity, scale]);

  useEffect(() => {
    if (!visible) return undefined;

    if (reduceMotion) {
      opacity.setValue(1);
      scale.setValue(1);
      timer.current = setTimeout(close, REDUCED_HOLD_MS);
      return () => {
        if (timer.current) clearTimeout(timer.current);
      };
    }

    opacity.setValue(0);
    scale.setValue(0.98);

    const animation = Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(HOLD_MS),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 350,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    animation.start(({ finished }) => {
      if (finished) close();
    });

    return () => animation.stop();
  }, [visible, reduceMotion, opacity, scale, close]);

  if (!visible) return null;

  return (
    <Modal
      visible
      transparent
      animationType="none"
      onRequestClose={close}
      statusBarTranslucent
    >
      <Pressable
        testID="colophon-flash"
        style={[styles.backdrop, { backgroundColor: BACKDROP[scheme] }]}
        onPress={close}
        accessibilityRole="button"
        accessibilityLabel="Close colophon"
      >
        <Animated.View
          style={[styles.card, { opacity, transform: [{ scale }] }]}
          accessibilityViewIsModal
        >
          <View style={[styles.rule, { backgroundColor: colors.accent }]} />
          <Text style={[styles.name, { color: colors.accent }]}>Ryuu</Text>
          <View style={[styles.rule, { backgroundColor: colors.accent }]} />
          <Text style={[TYPO.label, styles.caption, { color: colors.muted }]}>
            Colophon
          </Text>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  card: { alignItems: "center" },
  rule: { width: 180, height: 2 },
  name: {
    fontFamily: FONTS.sansBold,
    fontSize: 64,
    lineHeight: 68,
    letterSpacing: -2.4,
    marginVertical: 18,
  },
  caption: { marginTop: 22 },
});
