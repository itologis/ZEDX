import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import { useTheme } from "../theme";

export default function Screen({ children, style }) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: colors.paper }, style]}
    >
      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },
  // Content bounds for absolutely positioned overlays, so they align with the
  // content area instead of the safe-area padding.
  body: {
    flex: 1,
  },
});
