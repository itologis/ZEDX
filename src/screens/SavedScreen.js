import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import BottomNav from "../components/BottomNav";
import GlassCard from "../components/GlassCard";
import Header from "../components/Header";
import Screen from "../components/Screen";
import { findTopic } from "../data/languages";
import { getBookmarks, toggleBookmark } from "../data/progress";
import { COLORS } from "../theme";

export default function SavedScreen({ onOpenTopic, onNavigate }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const list = await getBookmarks();

    setItems(
      list.map((b) => findTopic(b.languageKey, b.topicId)).filter(Boolean),
    );
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (item) => {
    await toggleBookmark(item.languageKey, item.topic.id);
    load();
  };

  return (
    <Screen>
      <Header title="Saved" />

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {!loading && items.length === 0 && (
          <Text style={styles.hint}>
            Nothing saved yet. Open any topic and tap the star in the corner to
            save it here.
          </Text>
        )}

        {items.map((item) => (
          <GlassCard
            key={`${item.languageKey}-${item.topic.id}`}
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

            <TouchableOpacity onPress={() => remove(item)} style={styles.star}>
              <Text style={styles.starText}>★</Text>
            </TouchableOpacity>
          </GlassCard>
        ))}
      </ScrollView>

      <BottomNav active="saved" onNavigate={onNavigate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  listContent: { paddingHorizontal: 16, paddingBottom: 16, paddingTop: 6 },
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
  rowLeft: { flex: 1 },
  rowTag: {
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 4,
  },
  rowTitle: { color: COLORS.text, fontSize: 16, fontWeight: "700" },
  rowDesc: { color: COLORS.textDim, fontSize: 12, marginTop: 3 },
  star: { paddingLeft: 12, paddingVertical: 6 },
  starText: { color: COLORS.ember, fontSize: 24 },
});
