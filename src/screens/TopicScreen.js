import { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import GlassCard from "../components/GlassCard";
import Header from "../components/Header";
import Screen from "../components/Screen";
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
import { COLORS } from "../theme";

function PracticeCard({ topicId, languageKey, accent }) {
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
    <GlassCard accent={accent} style={styles.practice}>
      <View style={styles.practiceHead}>
        <Text style={[styles.label, { color: accent }]}>PRACTICE</Text>
        {done && <Text style={styles.practiced}>✓ Practiced</Text>}
      </View>
      <Text style={styles.practiceQ}>{item.q}</Text>

      <View style={styles.codeBlock}>
        <Text style={styles.codeText}>
          {parts.map((part, i) => (
            <Text key={i}>
              {part}
              {i < parts.length - 1 && (
                <Text
                  style={{
                    color: solved
                      ? COLORS.success
                      : wrong
                        ? COLORS.danger
                        : accent,
                    fontWeight: "800",
                  }}
                >
                  {choice ?? "____"}
                </Text>
              )}
            </Text>
          ))}
        </Text>
      </View>

      <View style={styles.optionRow}>
        {options.map((option) => {
          const isChoice = choice === option;
          return (
            <TouchableOpacity
              key={option}
              disabled={solved}
              onPress={() => pick(option)}
              activeOpacity={0.8}
              style={[
                styles.option,
                isChoice && solved && styles.optionRight,
                isChoice && wrong && styles.optionWrong,
              ]}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {choice !== null && (
        <Text
          style={[
            styles.feedback,
            { color: solved ? COLORS.success : COLORS.danger },
          ]}
        >
          {solved ? "Correct. " : "Not quite, try another. "}
          <Text style={styles.feedbackWhy}>{solved ? item.why : ""}</Text>
        </Text>
      )}
    </GlassCard>
  );
}

export default function TopicScreen({
  topic,
  languageKey,
  accentColor = COLORS.ember,
  onBack,
}) {
  const [completed, setCompleted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkBusy, setBookmarkBusy] = useState(false);

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
        <Header title="Topic" onBack={onBack} />
        <Text style={styles.empty}>This topic could not be found.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title="Topic Details"
        onBack={onBack}
        right={
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={
              bookmarked ? "Remove saved topic" : "Save topic"
            }
            accessibilityState={{ selected: bookmarked }}
            onPress={handleBookmark}
            disabled={bookmarkBusy}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={[styles.star, bookmarked && { color: COLORS.ember }]}>
              {bookmarked ? "★" : "☆"}
            </Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard blur accent={accentColor} style={styles.card}>
          <Text style={styles.title}>{topic.title}</Text>
          {!!topic._level && (
            <Text style={[styles.level, { color: accentColor }]}>
              Level: {topic._level}
            </Text>
          )}
          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{topic.description}</Text>

          {!!topic.syntax && (
            <>
              <Text style={styles.sectionTitle}>Syntax</Text>
              <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{topic.syntax}</Text>
              </View>
            </>
          )}

          {!!topic.variants && (
            <>
              <Text style={styles.sectionTitle}>Variants</Text>
              {topic.variants.map((variant, index) => (
                <View key={`${variant.title}-${index}`} style={styles.variant}>
                  <Text style={styles.variantTitle}>{variant.title}</Text>
                  <Text style={styles.variantDesc}>{variant.description}</Text>
                  {!!variant.syntax && (
                    <View style={styles.codeBlock}>
                      <Text style={styles.codeText}>{variant.syntax}</Text>
                    </View>
                  )}
                </View>
              ))}
            </>
          )}
        </GlassCard>

        <PracticeCard
          topicId={topic.id}
          languageKey={languageKey}
          accent={accentColor}
        />

        {showConfirm && (
          <GlassCard style={styles.confirm}>
            <Text style={styles.confirmTitle}>Mark as read?</Text>
            <Text style={styles.confirmText}>
              Have you completed "{topic.title}"?
            </Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowConfirm(false)}
              >
                <Text style={styles.cancelText}>Not yet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.yesButton, { backgroundColor: accentColor }]}
                onPress={confirmComplete}
              >
                <Text style={styles.yesText}>Yes!</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        )}

        <TouchableOpacity
          style={[
            styles.completeButton,
            { backgroundColor: completed ? COLORS.surfaceRaised : accentColor },
          ]}
          onPress={() => setShowConfirm(true)}
          disabled={completed}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.completeText,
              completed && { color: COLORS.success },
            ]}
          >
            {completed ? "Completed ✓" : "Mark as Read"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 32 },
  empty: { color: COLORS.textDim, textAlign: "center", marginTop: 40 },
  star: { color: COLORS.textMuted, fontSize: 28 },
  card: { padding: 20 },
  title: { fontSize: 24, fontWeight: "800", color: COLORS.text },
  level: { fontSize: 13, fontWeight: "700", marginTop: 6 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 8,
  },
  description: { fontSize: 15, color: COLORS.textMuted, lineHeight: 22 },
  codeBlock: {
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 14,
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  codeText: {
    color: COLORS.success,
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 20,
  },
  variant: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 10,
  },
  variantTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  variantDesc: { fontSize: 14, color: COLORS.textMuted, marginBottom: 8 },

  practice: { padding: 18, marginTop: 14 },
  practiceHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: { fontSize: 11, fontWeight: "800", letterSpacing: 1.2 },
  practiced: { color: COLORS.success, fontSize: 12, fontWeight: "700" },
  practiceQ: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
  },
  optionRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
  option: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.borderStrong,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  optionRight: {
    borderColor: COLORS.success,
    backgroundColor: "rgba(74,222,128,0.14)",
  },
  optionWrong: {
    borderColor: COLORS.danger,
    backgroundColor: "rgba(248,113,113,0.14)",
  },
  optionText: {
    color: COLORS.text,
    fontFamily: "monospace",
    fontSize: 14,
    fontWeight: "600",
  },
  feedback: { marginTop: 12, fontSize: 13, fontWeight: "800", lineHeight: 19 },
  feedbackWhy: { color: COLORS.textMuted, fontWeight: "500" },

  confirm: { padding: 18, marginTop: 16 },
  confirmTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 6,
  },
  confirmText: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  confirmButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceRaised,
  },
  cancelText: { color: COLORS.text, fontSize: 14, fontWeight: "600" },
  yesButton: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10 },
  yesText: { color: COLORS.bg, fontSize: 14, fontWeight: "800" },
  completeButton: {
    minHeight: 54,
    borderRadius: 14,
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  completeText: { color: COLORS.bg, fontSize: 16, fontWeight: "800" },
});
