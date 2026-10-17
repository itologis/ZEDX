import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import GlassCard from "../components/GlassCard";
import Screen from "../components/Screen";
import { LANGUAGES } from "../data/languages";
import { getLastTopic, getProgress } from "../data/progress";
import { COLORS } from "../theme";

const levelsLabel = (data) => {
  const count = data.levels.length;
  return `${count} level${count === 1 ? "" : "s"}`;
};

// Calculate completed topics across every level.
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

// Find the next unread topic in the last opened language.
const findResume = async () => {
  const last = await getLastTopic();
  if (!last) return null;

  const lang = LANGUAGES.find((item) => item.key === last.languageKey);

  if (!lang) return null;

  const progress = await getProgress(lang.key);
  const flat = [];

  for (const level of lang.data.levels) {
    for (const topic of level.topics || []) {
      flat.push({ level, topic });
    }
  }

  if (flat.length === 0) return null;

  const foundIndex = flat.findIndex((item) => item.topic.id === last.topicId);

  const start = Math.max(0, foundIndex);

  for (let n = 0; n < flat.length; n++) {
    const item = flat[(start + n) % flat.length];
    const completed = progress[item.level.level] || [];

    if (!completed.includes(item.topic.id)) {
      return { lang, ...item };
    }
  }

  return null;
};

export default function HomeScreen({ onSelectLanguage, onOpenTopic }) {
  const [query, setQuery] = useState("");
  const [percents, setPercents] = useState({});
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoadError(false);
      setLoading(true);
      try {
        const result = {};

        for (const lang of LANGUAGES) {
          result[lang.key] = calcPercent(
            lang.data,
            await getProgress(lang.key),
          );
        }

        const nextTopic = await findResume();

        if (mounted) {
          setPercents(result);
          setResume(nextTopic);
        }
      } catch (error) {
        console.error("Error loading home progress:", error);
        if (mounted) setLoadError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [reloadKey]);

  const visibleLanguages = LANGUAGES.filter((lang) =>
    lang.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <Screen>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>YOUR OFFLINE SYNTAX LIBRARY</Text>
          <Text style={styles.appTitle}>ZEDX</Text>
          <Text style={styles.appSubtitle}>
            Learn syntax. Build understanding.
          </Text>
          <Text style={styles.helperText}>
            Choose a language to explore its syntax and topics.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore languages</Text>
          <Text style={styles.sectionMeta}>{LANGUAGES.length} available</Text>
        </View>

        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search languages..."
            placeholderTextColor={COLORS.textDim}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Search languages"
            returnKeyType="search"
          />
          {!!query && (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Clear search"
              onPress={() => setQuery("")}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={styles.clearSearch}
            >
              <Text style={styles.clearSearchText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {loadError && (
          <View style={styles.loadNotice}>
            <Text style={styles.loadNoticeText}>
              Your progress could not be loaded. Percentages may be
              inaccurate.
            </Text>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => setReloadKey((key) => key + 1)}
              style={styles.loadNoticeRetry}
            >
              <Text style={styles.loadNoticeRetryText}>Try again</Text>
            </TouchableOpacity>
          </View>
        )}

        {resume && (
          <GlassCard
            blur
            accent={resume.lang.color}
            style={styles.resumeCard}
            onPress={() => onOpenTopic(resume.lang.key, resume.topic.id)}
          >
            <View style={styles.resumeTopRow}>
              <Text style={styles.resumeLabel}>PICK UP WHERE YOU LEFT OFF</Text>
              <Text style={[styles.resumeArrow, { color: resume.lang.color }]}>
                ↗
              </Text>
            </View>

            <Text style={styles.resumeTitle}>{resume.topic.title}</Text>

            <Text style={[styles.resumeSub, { color: resume.lang.color }]}>
              {resume.lang.label} · {resume.level.label}
            </Text>

            <Text style={styles.resumeHint}>Continue learning</Text>
          </GlassCard>
        )}

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
                <View
                  style={[
                    styles.languageMark,
                    { borderColor: `${lang.color}88` },
                  ]}
                >
                  <Text style={[styles.languageInitial, { color: lang.color }]}>
                    {lang.label.slice(0, 1).toUpperCase()}
                  </Text>
                </View>

                <Text
                  style={[styles.tileTitle, { color: lang.color }]}
                  numberOfLines={1}
                >
                  {lang.label}
                </Text>

                <Text style={styles.tileSubtitle}>
                  {levelsLabel(lang.data)}
                </Text>

                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${percent}%`,
                        backgroundColor: lang.color,
                      },
                    ]}
                  />
                </View>

                <View style={styles.progressRow}>
                  <Text style={styles.progressText}>
                    {loading ? "Loading..." : `${percent}% complete`}
                  </Text>
                  <Text style={[styles.tileArrow, { color: lang.color }]}>
                    →
                  </Text>
                </View>
              </GlassCard>
            );
          })}
        </View>

        {visibleLanguages.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No languages found</Text>
            <Text style={styles.emptyText}>
              Try another name or clear your search.
            </Text>
          </View>
        )}

        <Text style={styles.footer}>
          ZEDX · Your syntax reference, offline.
        </Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 28,
  },

  hero: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 28,
  },

  eyebrow: {
    color: COLORS.textDim,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 10,
  },

  appTitle: {
    color: COLORS.text,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 7,
  },

  appSubtitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 7,
    textAlign: "center",
  },

  helperText: {
    color: COLORS.textDim,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 12,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
  },

  sectionMeta: {
    color: COLORS.textDim,
    fontSize: 12,
    fontWeight: "600",
  },

  searchWrap: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.glass,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    paddingHorizontal: 14,
    marginBottom: 18,
  },

  searchIcon: {
    color: COLORS.textDim,
    fontSize: 23,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    paddingVertical: 12,
  },

  clearSearch: {
    minHeight: 44,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 8,
  },

  clearSearchText: {
    color: COLORS.textDim,
    fontSize: 12,
    fontWeight: "700",
  },

  loadNotice: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.glass,
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },

  loadNoticeText: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },

  loadNoticeRetry: {
    marginTop: 10,
    alignSelf: "flex-start",
    minHeight: 44,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.ember,
    borderRadius: 12,
  },

  loadNoticeRetryText: {
    color: COLORS.ember,
    fontSize: 13,
    fontWeight: "700",
  },

  resumeCard: {
    padding: 18,
    marginBottom: 20,
  },

  resumeTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  resumeLabel: {
    color: COLORS.textDim,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  resumeArrow: {
    fontSize: 20,
    fontWeight: "700",
  },

  resumeTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "800",
    marginTop: 12,
  },

  resumeSub: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
  },

  resumeHint: {
    color: COLORS.textDim,
    fontSize: 12,
    marginTop: 14,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  tile: {
    width: "48.3%",
    padding: 15,
    marginBottom: 13,
  },

  languageMark: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    backgroundColor: "rgba(255,255,255,0.035)",
  },

  languageInitial: {
    fontSize: 19,
    fontWeight: "900",
  },

  tileTitle: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },

  tileSubtitle: {
    color: COLORS.textDim,
    fontSize: 12,
    marginBottom: 16,
  },

  progressTrack: {
    width: "100%",
    height: 5,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 5,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 5,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 9,
  },

  progressText: {
    color: COLORS.textDim,
    fontSize: 10,
    fontWeight: "600",
    flexShrink: 1,
  },

  tileArrow: {
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 4,
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.glass,
  },

  emptyTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "800",
  },

  emptyText: {
    color: COLORS.textDim,
    fontSize: 13,
    marginTop: 7,
    textAlign: "center",
    lineHeight: 19,
  },

  footer: {
    color: COLORS.textDim,
    fontSize: 11,
    textAlign: "center",
    marginTop: 12,
    opacity: 0.8,
  },
});
