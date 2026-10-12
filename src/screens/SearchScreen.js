import { useMemo } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import BottomNav from "../components/BottomNav";
import GlassCard from "../components/GlassCard";
import Header from "../components/Header";
import Screen from "../components/Screen";
import { LANGUAGES, getAllTopics } from "../data/languages";
import { COLORS } from "../theme";

const FILTERS = [
  { key: "all", label: "All", color: COLORS.ember },
  ...LANGUAGES.map((l) => ({ key: l.key, label: l.label, color: l.color })),
];

export default function SearchScreen({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  onOpenTopic,
  onOpenLanguage,
  onNavigate,
}) {
  const index = useMemo(() => getAllTopics(), []);

  const text = query.trim().toLowerCase();
  const terms = text.split(/\s+/).filter(Boolean);

  const results =
    terms.length === 0
      ? []
      : index
          .filter((item) => filter === "all" || item.languageKey === filter)
          .map((item) => {
            const title = item.topic.title.toLowerCase();
            const haystack = `${title} ${item.topic.description} ${
              item.topic.syntax || ""
            } ${item.languageLabel} ${item.levelLabel}`.toLowerCase();

            if (!terms.every((t) => haystack.includes(t))) return null;

            // Title matches come first
            return {
              item,
              score: terms.every((t) => title.includes(t)) ? 0 : 1,
            };
          })
          .filter(Boolean)
          .sort((a, b) => a.score - b.score)
          .slice(0, 50)
          .map((r) => r.item);

  const languageMatches =
    terms.length === 0
      ? []
      : LANGUAGES.filter((l) => l.label.toLowerCase().includes(text));

  return (
    <Screen>
      <Header title="Search" />

      <TextInput
        style={styles.input}
        placeholder="Search topics, e.g. flexbox, decorators..."
        placeholderTextColor={COLORS.textDim}
        value={query}
        onChangeText={onQueryChange}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={styles.chips}>
        {FILTERS.map((f) => {
          const on = filter === f.key;

          return (
            <TouchableOpacity
              key={f.key}
              onPress={() => onFilterChange(f.key)}
              style={[
                styles.chip,
                on && { backgroundColor: f.color + "33", borderColor: f.color },
              ]}
            >
              <Text style={[styles.chipText, on && { color: f.color }]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {terms.length === 0 && (
          <Text style={styles.hint}>
            Type a word to search every topic across HTML, CSS, Java and Python.
          </Text>
        )}

        {terms.length > 0 &&
          results.length === 0 &&
          languageMatches.length === 0 && (
            <Text style={styles.hint}>No topics match "{query}"</Text>
          )}

        {languageMatches.map((lang) => (
          <GlassCard
            key={lang.key}
            accent={lang.color}
            style={styles.row}
            onPress={() => onOpenLanguage(lang.key)}
          >
            <Text style={[styles.rowTag, { color: lang.color }]}>LANGUAGE</Text>
            <Text style={styles.rowTitle}>Open {lang.label}</Text>
          </GlassCard>
        ))}

        {results.map((item) => (
          <GlassCard
            key={`${item.languageKey}-${item.topic.id}`}
            style={styles.row}
            onPress={() => onOpenTopic(item.languageKey, item.topic.id)}
          >
            <Text style={[styles.rowTag, { color: item.color }]}>
              {item.languageLabel} · {item.levelLabel}
            </Text>
            <Text style={styles.rowTitle}>{item.topic.title}</Text>
            <Text style={styles.rowDesc} numberOfLines={1}>
              {item.topic.description}
            </Text>
          </GlassCard>
        ))}
      </ScrollView>

      <BottomNav active="search" onNavigate={onNavigate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.glass,
    color: COLORS.text,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 16,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    marginBottom: 6,
  },
  chipText: { color: COLORS.textDim, fontSize: 13, fontWeight: "600" },
  list: { flex: 1 },
  listContent: { paddingHorizontal: 16, paddingBottom: 16 },
  hint: {
    color: COLORS.textDim,
    fontSize: 14,
    textAlign: "center",
    marginTop: 24,
    lineHeight: 20,
  },
  row: { padding: 14, marginBottom: 10 },
  rowTag: {
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 4,
  },
  rowTitle: { color: COLORS.text, fontSize: 16, fontWeight: "700" },
  rowDesc: { color: COLORS.textDim, fontSize: 12, marginTop: 3 },
});
