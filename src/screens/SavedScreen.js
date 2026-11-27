import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import EmptyState from "../components/EmptyState";
import Screen from "../components/Screen";
import TopBar from "../components/TopBar";
import { findTopic } from "../data/languages";
import { getBookmarks, toggleBookmark } from "../data/progress";
import { TYPO, useTheme } from "../theme";

export default function SavedScreen({ onOpenTopic, onBrowse }) {
  const { colors } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getBookmarks();
      setItems(
        list
          .map((bookmark) => findTopic(bookmark.languageKey, bookmark.topicId))
          .filter(Boolean),
      );
      setLoadError(false);
    } catch (error) {
      console.error("Error loading saved topics:", error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Async storage read; the state update happens after the await.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const remove = async (item) => {
    if (busyId) return;
    setBusyId(item.topic.id);
    try {
      await toggleBookmark(item.languageKey, item.topic.id);
      await load();
    } catch (error) {
      console.error("Error removing bookmark:", error);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <Screen>
      <TopBar left="ZEDX" right="Marked pages" strong />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[TYPO.label, { color: colors.accent }]}>Saved</Text>
        <Text style={[TYPO.title, styles.title, { color: colors.ink }]}>
          Marked pages
        </Text>
        <Text style={[TYPO.lede, styles.lede, { color: colors.body }]}>
          Topics you marked with the star, kept here for a quick return.
        </Text>

        {loading && items.length === 0 ? (
          <Text style={[TYPO.small, styles.state, { color: colors.muted }]}>
            Loading saved topics…
          </Text>
        ) : null}

        {!loading && loadError ? (
          <View style={styles.state}>
            <Text style={[TYPO.small, styles.stateText, { color: colors.body }]}>
              Saved topics could not be loaded.
            </Text>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={load}
              style={styles.retry}
            >
              <Text style={[TYPO.label, { color: colors.accent }]}>
                Try again
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {!loading && !loadError && items.length === 0 ? (
          <EmptyState
            eyebrow="Saved"
            title="Nothing marked yet"
            body="Tap Save on any topic and it will wait for you here."
            actionLabel="Browse topics"
            onAction={onBrowse}
            style={styles.emptyState}
          />
        ) : null}

        {items.map((item) => (
          <View
            key={`${item.languageKey}-${item.topic.id}`}
            style={styles.rowWrap}
          >
            {/* The remove action stays outside the row's pressable area: on
                web, react-native-web renders role="button" as a real <button>,
                and nesting one button inside another is invalid DOM. */}
            <TouchableOpacity
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
                <Text style={[TYPO.item, styles.rowTitle, { color: colors.ink }]}>
                  {item.topic.title}
                </Text>
                <Text
                  style={[TYPO.small, styles.rowDesc, { color: colors.muted }]}
                  numberOfLines={1}
                >
                  {item.topic.description}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={`Remove ${item.topic.title} from saved`}
              accessibilityState={{ disabled: busyId === item.topic.id }}
              onPress={() => remove(item)}
              disabled={busyId === item.topic.id}
              style={styles.remove}
            >
              <Text style={[TYPO.label, { color: colors.accent }]}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 26, paddingBottom: 40 },
  title: { marginTop: 14 },
  lede: { marginTop: 14, maxWidth: 340 },
  state: { paddingVertical: 28, alignItems: "center" },
  stateText: { textAlign: "center" },
  emptyState: { marginHorizontal: -24 },
  retry: {
    marginTop: 8,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  rowWrap: { position: "relative", marginTop: 26 },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    paddingRight: 82,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  swatch: { width: 7, height: 7, marginTop: 4, marginRight: 12 },
  rowBody: { flex: 1 },
  rowTitle: { marginTop: 6 },
  rowDesc: { marginTop: 4 },
  remove: {
    position: "absolute",
    right: 0,
    bottom: 10,
    minHeight: 44,
    minWidth: 72,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
