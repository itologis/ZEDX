import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import css from "../data/css";
import html from "../data/html";
import java from "../data/java";
import { getProgress } from "../data/progress";
import python from "../data/python";

const LANGUAGES = [
  { key: "html", label: "HTML", color: "#f38ba8", data: html },
  { key: "css", label: "CSS", color: "#89b4fa", data: css },
  { key: "java", label: "Java", color: "#fab387", data: java },
  { key: "python", label: "Python", color: "#a6e3a1", data: python },
];

const levelsLabel = (data) => {
  const count = data.levels.length;
  return `${count} level${count === 1 ? "" : "s"}`;
};

// Percent of topics marked as read across all levels of a language
const calcPercent = (data, progress) => {
  let total = 0;
  let done = 0;

  for (const level of data.levels) {
    const completed = progress[level.level] || [];
    const topics = level.topics || [];

    total += topics.length;
    done += topics.filter((topic) => completed.includes(topic.id)).length;
  }

  return total === 0 ? 0 : Math.round((done / total) * 100);
};

export default function HomeScreen({ onSelectLanguage, onOpenQuizzes }) {
  const [query, setQuery] = useState("");
  const [percents, setPercents] = useState({});

  useEffect(() => {
    const loadPercents = async () => {
      const result = {};

      for (const lang of LANGUAGES) {
        const progress = await getProgress(lang.key);
        result[lang.key] = calcPercent(lang.data, progress);
      }

      setPercents(result);
    };

    loadPercents();
  }, []);

  const visibleLanguages = LANGUAGES.filter((lang) =>
    lang.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.appTitle}>ZEDX</Text>
        <Text style={styles.appSubtitle}>
          Pick a language to browse the corresponding syntax
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search languages..."
          placeholderTextColor="#6c7086"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {visibleLanguages.length === 0 ? (
          <Text style={styles.emptyText}>No languages match "{query}"</Text>
        ) : (
          <View style={styles.grid}>
            {visibleLanguages.map((lang) => {
              const percent = percents[lang.key] ?? 0;

              return (
                <TouchableOpacity
                  key={lang.key}
                  style={[styles.tile, { borderColor: lang.color }]}
                  onPress={() => onSelectLanguage(lang.key)}
                >
                  <Text style={[styles.tileTitle, { color: lang.color }]}>
                    {lang.label}
                  </Text>
                  <Text style={styles.tileSubtitle}>
                    {levelsLabel(lang.data)}
                  </Text>

                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${percent}%`, backgroundColor: lang.color },
                      ]}
                    />
                  </View>

                  <Text style={styles.progressText}>{percent}% done</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} disabled>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Learn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={onOpenQuizzes}>
          <Text style={styles.navLabel}>Quizzes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1b26" },
  scroll: { flex: 1 },

  appTitle: {
    color: "#c0caf5",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    marginTop: 40,
  },
  appSubtitle: {
    color: "#9399b2",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  searchInput: {
    backgroundColor: "#24273a",
    color: "#c0caf5",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2c2e3e",
    marginHorizontal: 20,
    marginBottom: 20,
  },

  emptyText: {
    color: "#9399b2",
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  tile: {
    width: "48%",
    backgroundColor: "#24273a",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    alignItems: "center",
  },
  tileTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 4 },
  tileSubtitle: { color: "#9399b2", fontSize: 14, marginBottom: 12 },

  progressTrack: {
    width: "100%",
    height: 6,
    backgroundColor: "#2c2e3e",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 3 },
  progressText: { color: "#9399b2", fontSize: 12, marginTop: 6 },

  navBar: {
    flexDirection: "row",
    backgroundColor: "#24273a",
    borderTopWidth: 1,
    borderTopColor: "#2c2e3e",
  },
  navItem: { flex: 1, alignItems: "center", paddingVertical: 14 },
  navLabel: { color: "#9399b2", fontSize: 15, fontWeight: "600" },
  navLabelActive: { color: "#89b4fa" },
});
