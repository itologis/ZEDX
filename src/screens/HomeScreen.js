import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ContinueStrip from "../components/ContinueStrip";
import IndexRow from "../components/IndexRow";
import Screen from "../components/Screen";
import SectionHead from "../components/SectionHead";
import ThemeToggle from "../components/ThemeToggle";
import TopBar from "../components/TopBar";
import { LANGUAGES } from "../data/languages";
import { getLastTopic, getProgress } from "../data/progress";
import { TYPO, useTheme } from "../theme";

const levelsLabel = (data) => {
  const count = data.levels.length;
  return `${count} level${count === 1 ? "" : "s"}`;
};

const topicsLabel = (data) =>
  data.levels.reduce((sum, level) => sum + (level.topics?.length || 0), 0);

// Completed topics across every level.
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

// Next unread topic in the last opened language, plus how much of that
// language has been read (for the continue strip's meta line).
const findResume = async () => {
  const last = await getLastTopic();
  if (!last) return null;

  const lang = LANGUAGES.find((item) => item.key === last.languageKey);
  if (!lang) return null;

  const progress = await getProgress(lang.key);
  const flat = [];
  let read = 0;
  let total = 0;

  for (const level of lang.data.levels) {
    const completed = progress[level.level] || [];

    for (const topic of level.topics || []) {
      flat.push({ level, topic });
      total += 1;
      if (completed.includes(topic.id)) read += 1;
    }
  }

  if (flat.length === 0) return null;

  const foundIndex = flat.findIndex((item) => item.topic.id === last.topicId);
  const start = Math.max(0, foundIndex);

  for (let n = 0; n < flat.length; n++) {
    const item = flat[(start + n) % flat.length];
    const completed = progress[item.level.level] || [];

    if (!completed.includes(item.topic.id)) {
      return { lang, ...item, read, total };
    }
  }

  return null;
};

export default function HomeScreen({ onSelectLanguage, onOpenTopic }) {
  const { colors } = useTheme();
  const [percents, setPercents] = useState({});
  const [resume, setResume] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoadError(false);
      try {
        const result = {};

        for (const lang of LANGUAGES) {
          result[lang.key] = calcPercent(lang.data, await getProgress(lang.key));
        }

        const nextTopic = await findResume();

        if (mounted) {
          setPercents(result);
          setResume(nextTopic);
        }
      } catch (error) {
        console.error("Error loading home progress:", error);
        if (mounted) setLoadError(true);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [reloadKey]);

  const totalTopics = LANGUAGES.reduce(
    (sum, lang) => sum + topicsLabel(lang.data),
    0,
  );

  return (
    <Screen>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TopBar left="ZEDX" right={<ThemeToggle />} strong />

        <View style={styles.masthead}>
          <Text style={[TYPO.label, { color: colors.accent }]}>
            A quiet reference
          </Text>
          <Text style={[TYPO.display, styles.title, { color: colors.ink }]}>
            ZEDX
          </Text>
          <Text style={[TYPO.subtitle, styles.subtitle, { color: colors.muted }]}>
            Syntax Library
          </Text>
          <Text style={[TYPO.lede, styles.lede, { color: colors.body }]}>
            The library you would need
          </Text>
        </View>

        <SectionHead
          left="Index"
          right={`${String(LANGUAGES.length).padStart(2, "0")} languages`}
        />

        {resume ? (
          <ContinueStrip
            title={resume.topic.title}
            meta={`${resume.lang.label} · ${resume.level.label} · ${resume.read} of ${resume.total} read`}
            onPress={() => onOpenTopic(resume.lang.key, resume.topic.id)}
          />
        ) : null}

        {loadError ? (
          <View style={[styles.notice, { borderColor: colors.rule }]}>
            <Text style={[TYPO.small, styles.noticeText, { color: colors.body }]}>
              Your progress could not be loaded. Percentages may be inaccurate.
            </Text>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => setReloadKey((key) => key + 1)}
              style={styles.noticeAction}
            >
              <Text style={[TYPO.label, { color: colors.accent }]}>
                Try again
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {LANGUAGES.map((lang, index) => {
          const percent = percents[lang.key] ?? 0;

          return (
            <IndexRow
              key={lang.key}
              number={String(index + 1).padStart(2, "0")}
              swatch={colors.lang[lang.key]}
              name={lang.label}
              meta={`${levelsLabel(lang.data)} · ${topicsLabel(lang.data)} topics`}
              percent={percent}
              onPress={() => onSelectLanguage(lang.key)}
            />
          );
        })}

        <View style={styles.foot}>
          <Text style={[TYPO.tiny, { color: colors.muted }]}>ZEDX</Text>
          <Text style={[TYPO.tiny, { color: colors.muted }]}>
            {totalTopics} topics · 0 accounts
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 24,
    paddingTop: 0,
    // The nav is a sibling below the scroll area; keep the last row clear of it.
    paddingBottom: 48,
  },
  masthead: { paddingTop: 26, paddingBottom: 26 },
  title: { marginTop: 12 },
  subtitle: { marginTop: 10 },
  lede: { marginTop: 14, maxWidth: 330 },
  notice: {
    marginTop: 16,
    paddingTop: 14,
    paddingBottom: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  noticeText: { lineHeight: 20 },
  noticeAction: {
    marginTop: 10,
    minHeight: 44,
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  foot: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 26,
  },
});
