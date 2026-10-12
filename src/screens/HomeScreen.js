import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import BottomNav from "../components/BottomNav";
import GlassCard from "../components/GlassCard";
import Screen from "../components/Screen";
import { LANGUAGES } from "../data/languages";
import { getLastTopic, getProgress } from "../data/progress";
import { COLORS } from "../theme";

const levelsLabel = (data) => {
  const count = data.levels.length;
  return `${count} level${count === 1 ? "" : "s"}`;
};

// Percent of topics marked as read across every level of a language
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

// The first unread topic, starting from the last topic you opened
const findResume = async () => {
  const last = await getLastTopic();
  if (!last) return null;

  const lang = LANGUAGES.find((l) => l.key === last.languageKey);
  if (!lang) return null;

  const progress = await getProgress(lang.key);
  const flat = [];

  for (const level of lang.data.levels) {
    for (const topic of level.topics || []) {
      flat.push({ level, topic });
    }
  }

  const start = Math.max(
    0,
    flat.findIndex((item) => item.topic.id === last.topicId),
  );

  for (let n = 0; n < flat.length; n++) {
    const item = flat[(start + n) % flat.length];
    const completed = progress[item.level.level] || [];

    if (!completed.includes(item.topic.id)) {
      return { lang, ...item };
    }
  }

  return null; // everything in that language is finished
};

export default function HomeScreen({
  onSelectLanguage,
  onOpenTopic,
  onNavigate,
}) {
  const [query, setQuery] = useState("");
  const [percents, setPercents] = useState({});
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = {};

      for (const lang of LANGUAGES) {
        result[lang.key] = calcPercent(lang.data, await getProgress(lang.key));
      }

      setPercents(result);
      setResume(await findResume());
    };

    load();
  }, []);

  const visibleLanguages = LANGUAGES.filter((lang) =>
    lang.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <Screen>
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
          placeholderTextColor={COLORS.textDim}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {resume && (
          <GlassCard
            blur
            accent={resume.lang.color}
            style={styles.resumeCard}
            onPress={() => onOpenTopic(resume.lang.key, resume.topic.id)}
          >
            <Text style={styles.resumeLabel}>CONTINUE WHERE YOU LEFT OFF</Text>
            <Text style={styles.resumeTitle}>{resume.topic.title}</Text>
            <Text style={[styles.resumeSub, { color: resume.lang.color }]}>
              {resume.lang.label} · {resume.level.label}
            </Text>
          </GlassCard>
        )}

        {visibleLanguages.length === 0 ? (
          <Text style={styles.emptyText}>No languages match "{query}"</Text>
        ) : (
          <View style={styles.grid}>
            {visibleLanguages.map((lang) => {
              const percent = percents[lang.key] ?? 0;

              return (
                <GlassCard
                  key={lang.key}
                  blur
                  accent={lang.color}
                  style={styles.tile}
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
                </GlassCard>
              );
            })}
          </View>
        )}
      </ScrollView>

      <BottomNav active="home" onNavigate={onNavigate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },

  appTitle: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 36,
    marginBottom: 6,
    letterSpacing: 4,
  },
  appSubtitle: {
    color: COLORS.textDim,
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  searchInput: {
    backgroundColor: COLORS.glass,
    color: COLORS.text,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 20,
    marginBottom: 16,
  },

  resumeCard: { marginHorizontal: 20, marginBottom: 16, padding: 18 },
  resumeLabel: {
    color: COLORS.textDim,
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  resumeTitle: { color: COLORS.text, fontSize: 22, fontWeight: "bold" },
  resumeSub: { fontSize: 13, fontWeight: "600", marginTop: 4 },

  emptyText: {
    color: COLORS.textDim,
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
  tile: { width: "48%", padding: 20, marginBottom: 16, alignItems: "center" },
  tileTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 4 },
  tileSubtitle: { color: COLORS.textDim, fontSize: 14, marginBottom: 12 },

  progressTrack: {
    width: "100%",
    height: 6,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 3 },
  progressText: { color: COLORS.textDim, fontSize: 12, marginTop: 6 },
});
