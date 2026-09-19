import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SyntaxCard({ item, accentColor }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: accentColor }]}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.7}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.title}</Text>
        {!!item.category && (
          <Text style={[styles.category, { color: accentColor }]}>{item.category}</Text>
        )}
      </View>

      <View style={[styles.codeBox, !expanded && styles.codeBoxCollapsed]}>
        <Text
          style={styles.code}
          numberOfLines={expanded ? undefined : 2}
        >
          {item.syntax}
        </Text>
      </View>

      {expanded && <Text style={styles.description}>{item.description}</Text>}

      <Text style={styles.toggle}>{expanded ? "▲ collapse" : "▼ tap for details"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e1e2e",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    color: "#f5f5f5",
    fontSize: 16,
    fontWeight: "700",
    flexShrink: 1,
  },
  category: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  codeBox: {
    backgroundColor: "#11111b",
    borderRadius: 6,
    padding: 10,
  },
  codeBoxCollapsed: {
    opacity: 0.85,
  },
  code: {
    color: "#a6e3a1",
    fontFamily: "monospace",
    fontSize: 13,
  },
  description: {
    color: "#bac2de",
    fontSize: 13,
    marginTop: 10,
    lineHeight: 19,
  },
  toggle: {
    color: "#6c7086",
    fontSize: 11,
    marginTop: 8,
    textAlign: "right",
  },
});
