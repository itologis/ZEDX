import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import Screen from "../components/Screen";
import TopBar from "../components/TopBar";
import { LANGUAGES, getAllTopics } from "../data/languages";
import { FONTS, TYPO, useTheme } from "../theme";

export default function SearchScreen({
  query = "",
  onQueryChange = () => {},
  filter = "all",
  onFilterChange = () => {},
  onOpenTopic,
  onOpenLanguage,
}) {
  const { colors } = useTheme();
  const index = useMemo(() => getAllTopics(), []);
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results =
    terms.length === 0
      ? []
      : index
          .filter((item) => filter === "all" || item.languageKey === filter)
          .map((item) => {
            const title = item.topic.title.toLowerCase();
            const haystack =
              `${title} ${item.topic.description || ""} ${item.topic.syntax || ""} ${item.languageLabel} ${item.levelLabel}`.toLowerCase();
            if (!terms.every((term) => haystack.includes(term))) return null;
            return {
              item,
              score: terms.every((term) => title.includes(term)) ? 0 : 1,
            };
          })
          .filter(Boolean)
          .sort((a, b) => a.score - b.score)
          .slice(0, 50)
          .map((result) => result.item);
  const languageMatches =
    terms.length === 0
      ? []
      : LANGUAGES.filter((lang) =>
          lang.label.toLowerCase().includes(query.trim().toLowerCase()),
        );

  const filters = [
    { key: "all", label: "All" },
    ...LANGUAGES.map((lang) => ({ key: lang.key, label: lang.label })),
  ];

  return (
    <Screen>
      <TopBar left="ZEDX" right="Index" strong />

      <View style={styles.searchWrap}>
        <TextInput
          style={[
            styles.input,
            { color: colors.ink, borderBottomColor: colors.ruleStrong },
          ]}
          placeholder="Search topics, e.g. flexbox, decorators…"
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={onQueryChange}
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Search topics"
        />
      </View>

      <ScrollView
        horizontal
        style={styles.filterScroll}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
        accessibilityLabel="Filter search by language"
      >
        {filters.map((item) => {
          const selected = filter === item.key;

          return (
            <TouchableOpacity
              key={item.key}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => onFilterChange(item.key)}
              style={[
                styles.filter,
                selected && {
                  borderBottomColor: colors.accent,
                  borderBottomWidth: 2,
                },
              ]}
            >
              <Text
                style={[
                  TYPO.label,
                  { color: selected ? colors.ink : colors.muted },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {terms.length === 0 ? (
          <Text style={[TYPO.small, styles.hint, { color: colors.muted }]}>
            Type a word to search every topic across all languages.
          </Text>
        ) : null}

        {terms.length > 0 &&
        results.length === 0 &&
        languageMatches.length === 0 ? (
          <Text style={[TYPO.small, styles.hint, { color: colors.muted }]}>
            No topics match “{query}”.
          </Text>
        ) : null}

        {languageMatches.map((lang) => (
          <TouchableOpacity
            key={lang.key}
            accessibilityRole="button"
            onPress={() => onOpenLanguage?.(lang.key)}
            activeOpacity={0.65}
            style={[styles.row, { borderBottomColor: colors.rule }]}
          >
            <View style={[styles.swatch, { backgroundColor: colors.lang[lang.key] }]} />
            <View style={styles.rowBody}>
              <Text style={[TYPO.label, { color: colors.muted }]}>
                Language
              </Text>
              <Text style={[TYPO.item, styles.rowTitle, { color: colors.ink }]}>
                Open {lang.label}
              </Text>
            </View>
            <Text style={[TYPO.label, { color: colors.accent }]}>→</Text>
          </TouchableOpacity>
        ))}

        {results.map((item) => (
          <TouchableOpacity
            key={`${item.languageKey}-${item.topic.id}`}
            accessibilityRole="button"
            onPress={() => onOpenTopic(item.languageKey, item.topic.id)}
            activeOpacity={0.65}
            style={[styles.row, { borderBottomColor: colors.rule }]}
          >
            <View
              style={[
                styles.swatch,
                { backgroundColor: colors.lang[item.languageKey] },
              ]}
            />
            <View style={styles.rowBody}>
              <Text style={[TYPO.label, { color: colors.muted }]}>
                {item.languageLabel} · {item.levelLabel}
              </Text>
              <Text
                style={[TYPO.item, styles.rowTitle, { color: colors.ink }]}
                numberOfLines={1}
              >
                {item.topic.title}
              </Text>
              <Text
                style={[TYPO.small, styles.rowDesc, { color: colors.muted }]}
                numberOfLines={1}
              >
                {item.topic.description}
              </Text>
            </View>
            <Text style={[TYPO.label, { color: colors.accent }]}>→</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchWrap: { paddingHorizontal: 24, paddingTop: 18 },
  input: {
    fontFamily: FONTS.sans,
    fontSize: 18,
    lineHeight: 24,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  filterScroll: { flexGrow: 0, flexShrink: 0 },
  filters: {
    gap: 20,
    paddingHorizontal: 24,
  },
  filter: {
    minHeight: 44,
    justifyContent: "center",
    paddingTop: 8,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  list: { flex: 1, marginTop: 8 },
  listContent: { paddingHorizontal: 24, paddingBottom: 32 },
  hint: { marginTop: 24, textAlign: "center", lineHeight: 20 },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  swatch: { width: 7, height: 7, marginTop: 4, marginRight: 12 },
  rowBody: { flex: 1, paddingRight: 12 },
  rowTitle: { marginTop: 6 },
  rowDesc: { marginTop: 4 },
});
