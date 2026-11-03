import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Button from "../components/Button";
import CodePlate from "../components/CodePlate";
import FieldLabel from "../components/FieldLabel";
import OptionRow from "../components/OptionRow";
import Screen from "../components/Screen";
import TopBar from "../components/TopBar";
import { getLanguage } from "../data/languages";
import { PRACTICE } from "../data/practice";
import {
  getPracticeDone,
  getProgress,
  isBookmarked,
  saveLastTopic,
  savePracticeDone,
  toggleBookmark,
} from "../data/progress";
import { shuffle } from "../data/quiz";
import { FONTS, TYPO, useTheme } from "../theme";

function PracticeBlock({ topicId, languageKey }) {
  const { colors } = useTheme();
  const item = PRACTICE[topicId];
  const options = useMemo(
    () => (item ? shuffle([item.a, ...item.w]) : []),
    [item],
  );
  const [choice, setChoice] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let mounted = true;
    getPracticeDone(languageKey).then((list) => {
      if (mounted) setDone(list.includes(topicId));
    });
    return () => {
      mounted = false;
    };
  }, [languageKey, topicId]);

  if (!item) return null;

  const solved = choice === item.a;
  const wrong = choice !== null && !solved;
  const parts = item.code.split("____");

  const pick = async (option) => {
    if (solved) return;
    setChoice(option);
    if (option === item.a) {
      setDone(true);
      await savePracticeDone(languageKey, topicId);
    }
  };

  return (
    <>
      <FieldLabel>Practice</FieldLabel>

      <View style={styles.practiceHead}>
        <Text style={[TYPO.question, styles.practiceQ, { color: colors.ink }]}>
          {item.q}
        </Text>
        {done ? (
          <Text style={[TYPO.label, { color: colors.ink }]}>✓ Practiced</Text>
        ) : null}
      </View>

      <CodePlate>
        <Text style={[TYPO.code, { color: colors.code }]}>
          {parts.map((part, index) => (
            <Text key={index}>
              {part}
              {index < parts.length - 1 ? (
                <Text
                  style={{
                    color: solved ? colors.ink : colors.accent,
                    fontFamily: FONTS.monoSemiBold,
                  }}
                >
                  {choice ?? "____"}
                </Text>
              ) : null}
            </Text>
          ))}
        </Text>
      </CodePlate>

      <View style={styles.options}>
        {options.map((option, index) => {
          let state = "idle";
          if (solved && option === item.a) state = "correct";
          else if (wrong && choice === option) state = "wrong";

          return (
            <OptionRow
              key={option}
              index={index}
              label={option}
              state={state}
              disabled={solved}
              onPress={() => pick(option)}
            />
          );
        })}
      </View>

      {choice !== null ? (
        <View style={[styles.feedback, { borderLeftColor: solved ? colors.ink : colors.accent }]}>
          <Text
            style={[
              TYPO.label,
              { color: solved ? colors.ink : colors.accent },
            ]}
          >
            {solved ? "Correct" : "Not quite, try another"}
          </Text>
          {solved && item.why ? (
            <Text style={[TYPO.small, styles.feedbackText, { color: colors.body }]}>
              {item.why}
            </Text>
          ) : null}
        </View>
      ) : null}
    </>
  );
}

export default function TopicScreen({
  topic,
  languageKey,
  languageLabel,
  onBack,
}) {
  const { colors } = useTheme();
  const [completed, setCompleted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkBusy, setBookmarkBusy] = useState(false);

  const language = getLanguage(languageKey);

  const placement = useMemo(() => {
    if (!language) return null;

    const flat = [];
    for (const level of language.data.levels || []) {
      for (const entry of level.topics || []) {
        flat.push({ level, topic: entry });
      }
    }

    const index = flat.findIndex((entry) => entry.topic.id === topic?.id);

    return {
      index,
      total: flat.length,
      levelLabel: index >= 0 ? flat[index].level.label : null,
    };
  }, [language, topic?.id]);

  useEffect(() => {
    let mounted = true;
    if (!languageKey || topic?.id == null) return undefined;

    saveLastTopic(languageKey, topic.id);

    isBookmarked(languageKey, topic.id).then((saved) => {
      if (mounted) setBookmarked(saved);
    });

    getProgress(languageKey).then((progress) => {
      if (mounted && topic._level) {
        setCompleted((progress[topic._level] || []).includes(topic.id));
      }
    });

    return () => {
      mounted = false;
    };
  }, [languageKey, topic?.id, topic?._level]);

  const handleBookmark = async () => {
    if (!languageKey || topic?.id == null || bookmarkBusy) return;
    setBookmarkBusy(true);
    try {
      setBookmarked(await toggleBookmark(languageKey, topic.id));
    } catch (error) {
      console.error("Error updating bookmark:", error);
    } finally {
      setBookmarkBusy(false);
    }
  };

  const confirmComplete = async () => {
    setCompleted(true);
    setShowConfirm(false);
    try {
      if (topic?._onComplete) await topic._onComplete();
    } catch (error) {
      console.error("Error saving progress:", error);
    }
    onBack();
  };

  if (!topic) {
    return (
      <Screen>
        <TopBar left="← Index" onLeft={onBack} leftLabel="Go back" />
        <View style={styles.emptyWrap}>
          <Text style={[TYPO.body, { color: colors.body }]}>
            This topic could not be found.
          </Text>
        </View>
      </Screen>
    );
  }

  const folio =
    placement && placement.index >= 0
      ? `${String(placement.index + 1).padStart(2, "0")} / ${String(
          placement.total,
        ).padStart(2, "0")}`
      : null;

  return (
    <Screen>
      <TopBar
        left="← Index"
        onLeft={onBack}
        leftLabel="Go back"
        right={
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={
              bookmarked ? "Remove saved topic" : "Save topic"
            }
            accessibilityState={{ selected: bookmarked, disabled: bookmarkBusy }}
            onPress={handleBookmark}
            disabled={bookmarkBusy}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.saveTap}
          >
            <Text
              style={[
                TYPO.label,
                { color: bookmarked ? colors.accent : colors.muted },
              ]}
            >
              {bookmarked ? "★ Saved" : "Save"}
            </Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.folioRow}>
          {folio ? (
            <Text style={[TYPO.meta, { color: colors.accent }]}>{folio}</Text>
          ) : (
            <View />
          )}
          <Text style={[TYPO.meta, { color: colors.muted }]}>
            {languageLabel || language?.label || languageKey}
            {placement?.levelLabel ? ` · ${placement.levelLabel}` : ""}
          </Text>
        </View>

        <Text style={[TYPO.title, styles.title, { color: colors.ink }]}>
          {topic.title}
        </Text>

        <Text style={[TYPO.lede, styles.description, { color: colors.body }]}>
          {topic.description}
        </Text>

        {!!topic.syntax ? (
          <>
            <FieldLabel>Syntax</FieldLabel>
            <CodePlate>{topic.syntax}</CodePlate>
          </>
        ) : null}

        {topic.variants?.length > 0 ? (
          <>
            <FieldLabel>Variants</FieldLabel>
            {topic.variants.map((variant, index) => (
              <View
                key={`${variant.title}-${index}`}
                style={[styles.variant, { borderBottomColor: colors.rule }]}
              >
                <Text style={[TYPO.item, { color: colors.ink }]}>
                  {variant.title}
                </Text>
                <Text style={[TYPO.small, styles.variantDesc, { color: colors.body }]}>
                  {variant.description}
                </Text>
                {!!variant.syntax ? (
                  <CodePlate>{variant.syntax}</CodePlate>
                ) : null}
              </View>
            ))}
          </>
        ) : null}

        <PracticeBlock topicId={topic.id} languageKey={languageKey} />

        {showConfirm ? (
          <View
            style={[
              styles.confirm,
              {
                borderTopColor: colors.ruleStrong,
                borderBottomColor: colors.ruleStrong,
              },
            ]}
          >
            <Text style={[TYPO.section, { color: colors.ink }]}>Mark as read?</Text>
            <Text style={[TYPO.small, styles.confirmText, { color: colors.body }]}>
              Have you completed “{topic.title}”?
            </Text>
            <View style={styles.confirmButtons}>
              <Button
                variant="secondary"
                onPress={() => setShowConfirm(false)}
                style={styles.confirmButton}
              >
                Not yet
              </Button>
              <Button onPress={confirmComplete} style={styles.confirmButton}>
                Yes
              </Button>
            </View>
          </View>
        ) : null}

        {showConfirm ? null : (
          <Button
            onPress={() => setShowConfirm(true)}
            disabled={completed}
            style={styles.complete}
          >
            {completed ? "Completed ✓" : "Mark as read"}
          </Button>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 48 },
  folioRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { marginTop: 14 },
  description: { marginTop: 16 },
  variant: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  variantDesc: { marginTop: 8 },
  practiceHead: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  practiceQ: { flex: 1 },
  options: { marginTop: 18 },
  feedback: {
    marginTop: 18,
    paddingLeft: 12,
    borderLeftWidth: 2,
  },
  feedbackText: { marginTop: 6 },
  confirm: {
    marginTop: 26,
    paddingVertical: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  confirmText: { marginTop: 8 },
  confirmButtons: { flexDirection: "row", gap: 10, marginTop: 18 },
  confirmButton: { flex: 1 },
  complete: { marginTop: 26 },
  saveTap: { minHeight: 44, justifyContent: "center" },
  emptyWrap: { flex: 1, justifyContent: "center", padding: 24 },
});
