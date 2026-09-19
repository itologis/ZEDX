import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function BackButton({ onPress, color }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color + "22", borderColor: color }]}
      onPress={onPress}
      activeOpacity={0.5}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    >
      <Text style={[styles.arrow, { color }]}>‹</Text>
      <Text style={[styles.label, { color }]}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 16,
  },
  arrow: {
    fontSize: 22,
    fontWeight: "800",
    marginRight: 6,
    marginTop: -2,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
  },
});
