import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GlassCard from "../components/GlassCard";
import Header from "../components/Header";
import Screen from "../components/Screen";
import { findTopic } from "../data/languages";
import { getBookmarks, toggleBookmark } from "../data/progress";
import { COLORS } from "../theme";

export default function SavedScreen({ onOpenTopic, onNavigate }) {
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
      <Header title="Saved" />
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {loading && items.length === 0 && (
          <View style={styles.loadingView}>
            <ActivityIndicator color={COLORS.ember} />
            <Text style={styles.loadingText}>Loading saved topics...</Text>
          </View>
        )}
        {!loading && loadError && (
          <View style={styles.errorState}>
            <Text style={styles.errorText}>
              Saved topics could not be loaded.
            </Text>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={load}
              style={styles.retryButton}
            >
              <Text style={styles.retryText}>Try again</Text>
            </TouchableOpacity>
          </View>
        )}
        {!loading && !loadError && items.length === 0 && (
          <Text style={styles.hint}>
            Nothing saved yet. Open any topic and tap the star in the corner to
            save it here.
          </Text>
        )}
        {items.map((item) => (
          <View
            key={`${item.languageKey}-${item.topic.id}`}
            style={styles.rowWrap}
          >
            {/* The star stays outside the card's pressable area: on web,
                react-native-web renders role="button" as a real <button>,
                and a button nested inside the card's button is invalid DOM. */}
            <GlassCard
              accent={item.color}
              style={styles.row}
              onPress={() => onOpenTopic(item.languageKey, item.topic.id)}
            >
              <View style={styles.rowLeft}>
                <Text style={[styles.rowTag, { color: item.color }]}>
                  {item.languageLabel} · {item.levelLabel}
                </Text>
                <Text style={styles.rowTitle}>{item.topic.title}</Text>
                <Text style={styles.rowDesc} numberOfLines={1}>
                  {item.topic.description}
                </Text>
              </View>
            </GlassCard>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={`Remove ${item.topic.title} from saved`}
              accessibilityState={{ disabled: busyId === item.topic.id }}
              onPress={() => remove(item)}
              disabled={busyId === item.topic.id}
              style={styles.star}
            >
              <Text style={styles.starText}>★</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  listContent: { paddingHorizontal: 16, paddingBottom: 16, paddingTop: 6 },
  rowWrap: { position: "relative" },
  hint: {
    color: COLORS.textDim,
    fontSize: 14,
    textAlign: "center",
    marginTop: 40,
    lineHeight: 21,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginBottom: 10,
  },
  loadingView: {
    alignItems: "center",
    paddingVertical: 32,
  },
  loadingText: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginTop: 8,
  },
  errorState: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  errorText: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
  },
  retryButton: {
    borderWidth: 1,
    borderColor: COLORS.ember,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  retryText: { color: COLORS.ember, fontSize: 13, fontWeight: "700" },
  rowLeft: { flex: 1, paddingRight: 40 },
  rowTag: {
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 4,
  },
  rowTitle: { color: COLORS.text, fontSize: 16, fontWeight: "700" },
  rowDesc: { color: COLORS.textDim, fontSize: 12, marginTop: 3 },
  star: {
    position: "absolute",
    right: 6,
    top: "50%",
    marginTop: -22,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  starText: { color: COLORS.ember, fontSize: 24 },
});
