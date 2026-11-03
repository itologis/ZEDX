import { ScrollView, StyleSheet, Text, View } from "react-native";

import { TYPO, useTheme } from "../theme";

// Code plate: sunken tone, 2px left rule, monochrome type.
// Children may be a string or a pre-styled <Text> (the practice blank needs
// inline coloured runs).
export default function CodePlate({ children, style }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.plate,
        {
          backgroundColor: colors.plate,
          borderLeftColor: colors.ruleStrong,
        },
        style,
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {typeof children === "string" ? (
          <Text style={[TYPO.code, { color: colors.code }]}>{children}</Text>
        ) : (
          children
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  plate: {
    marginTop: 12,
    borderLeftWidth: 2,
    paddingVertical: 16,
    paddingRight: 16,
  },
  content: {
    paddingLeft: 16,
  },
});
