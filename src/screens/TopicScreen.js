import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PressableScale from "../components/PressableScale";

import AnswerFeedback from "../components/AnswerFeedback";
import Breadcrumbs from "../components/Breadcrumbs";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import FadeIn from "../components/FadeIn";
import LessonCheck from "../components/LessonCheck";
import CodePlate from "../components/CodePlate";
import FieldLabel from "../components/FieldLabel";
import OptionRow from "../components/OptionRow";
import RichText from "../components/RichText";
import Screen from "../components/Screen";
import TopBar from "../components/TopBar";
import WrongCode from "../components/WrongCode";
import { getLanguage } from "../data/languages";
import { getLessons } from "../data/lessons";
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
import { DURATION, MAX_STAGGERED, STAGGER } from "../motion";
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
      const saved = await savePracticeDone(languageKey, topicId);
      if (saved) setDone(true);
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
        <FadeIn key={choice} from={solved ? "up" : "down"} duration={170}>
          <AnswerFeedback
            correct={solved}
            explanation={item.why}
            retryHint="That choice doesn't fit. Try another option."
          />
        </FadeIn>
      ) : null}
    </>
  );
}

export default function TopicScreen({
  topic,
  languageKey,
  languageLabel,
  backLabel = "← Back",
  onBack,
  onHome,
  onIntro,
  onLevels,
}) {
  const { colors } = useTheme();
  const [completed, setCompleted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkBusy, setBookmarkBusy] = useState(false);

  const lessons = useMemo(
    () => getLessons(languageKey, topic?.id),
    [languageKey, topic?.id],
  );
  const [lessonIndex, setLessonIndex] = useState(0);
  const [lessonDirection, setLessonDirection] = useState("up");
  const scrollRef = useRef(null);

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

  // Lessons turn a topic into a chapter. `lessonIndex` is clamped so a topic
  // swap can never point past the end of the new lesson list.
  const lesson = lessons
    ? lessons[Math.min(lessonIndex, lessons.length - 1)]
    : null;
  const isLastLesson = !lessons || lessonIndex >= lessons.length - 1;

  const goToLesson = (index) => {
    if (!lessons) return;

    const next = Math.max(0, Math.min(index, lessons.length - 1));
    if (next === lessonIndex) return;

    setLessonDirection(next > lessonIndex ? "slide-right" : "slide-left");
    setLessonIndex(next);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  if (!topic) {
    return (
      <Screen>
        <TopBar left={backLabel} onLeft={onBack} leftLabel="Go back" />
        <Breadcrumbs
          items={[
            { label: "Home", onPress: onHome },
            { label: languageLabel || language?.label || languageKey, onPress: onIntro },
            { label: placement?.levelLabel || "Level", onPress: onLevels },
          ]}
        />
        <EmptyState
          eyebrow="Topic"
          title="This page is missing"
          body="The topic you followed is no longer in the index."
          actionLabel="Go back"
          onAction={onBack}
        />
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
        left={backLabel}
        onLeft={onBack}
        leftLabel="Go back"
        right={
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel={
              bookmarked ? "Remove saved topic" : "Save topic"
            }
            accessibilityState={{ selected: bookmarked, disabled: bookmarkBusy }}
            onPress={handleBookmark}
            disabled={bookmarkBusy}
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
          </PressableScale>
        }
      />
      <Breadcrumbs
        items={[
          { label: "Home", onPress: onHome },
          { label: languageLabel || language?.label || languageKey, onPress: onIntro },
          { label: placement?.levelLabel || "Level", onPress: onLevels },
        ]}
      />

      <ScrollView
        ref={scrollRef}
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

        {lesson ? (
          <>
            {lessonIndex === 0 ? (
              <Text
                style={[TYPO.lede, styles.description, { color: colors.body }]}
              >
                {topic.description}
              </Text>
            ) : null}

            <View
              style={[styles.lessonTabs, { borderBottomColor: colors.rule }]}
            >
              <Text style={[TYPO.label, { color: colors.muted }]}>
                Lessons
              </Text>

              {lessons.map((item, index) => {
                const active = index === lessonIndex;

                return (
                  <PressableScale
                    key={item.title}
                    accessibilityRole="button"
                    accessibilityLabel={`Lesson ${index + 1} of ${lessons.length}: ${item.title}`}
                    accessibilityState={{ selected: active }}
                    onPress={() => goToLesson(index)}
                    style={styles.lessonTab}
                  >
                    <Text
                      style={[
                        TYPO.meta,
                        { color: active ? colors.accent : colors.muted },
                      ]}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Text>
                    {active ? (
                      <View
                        style={[
                          styles.lessonTabMark,
                          { backgroundColor: colors.accent },
                        ]}
                      />
                    ) : null}
                  </PressableScale>
                );
              })}
            </View>

            <FadeIn
              key={`lesson-panel-${topic.id}-${lesson.title}`}
              from={lessonDirection}
              duration={DURATION.base}
            >
              <FadeIn
                key={`${lesson.title}-heading`}
                from="none"
                duration={DURATION.base}
              >
                <Text
                  style={[TYPO.section, styles.lessonTitle, { color: colors.ink }]}
                >
                  {lesson.title}
                </Text>
              </FadeIn>

              {lesson.goal ? (
                <FadeIn
                  key={`${lesson.title}-goal`}
                  from="none"
                  delay={STAGGER}
                  duration={DURATION.base}
                >
                  <View style={[styles.goal, { borderLeftColor: colors.ruleStrong }]}>
                    <FieldLabel>What you will learn</FieldLabel>
                    <RichText
                      text={lesson.goal}
                      style={[TYPO.small, styles.goalText, { color: colors.body }]}
                    />
              </View>
            </FadeIn>
          ) : null}

          {(Array.isArray(lesson.body) ? lesson.body : [lesson.body]).map(
            (paragraph, index) => (
              <FadeIn
                key={`${lesson.title}-body-${index}`}
                from="none"
                delay={Math.min(index, MAX_STAGGERED) * STAGGER}
                duration={190}
              >
                <RichText
                  text={paragraph}
                  style={[
                    TYPO.body,
                    index === 0 ? styles.firstParagraph : styles.paragraph,
                    { color: colors.body },
                  ]}
                />
              </FadeIn>
            ),
          )}

          {lesson.walkthrough?.length ? (
            <View style={styles.walkthrough}>
              <FadeIn key={`${lesson.title}-walk-title`} from="none" delay={STAGGER}>
                <FieldLabel>Follow the example</FieldLabel>
              </FadeIn>
              {lesson.walkthrough.map((step, index) => (
                <FadeIn
                  key={`${lesson.title}-step-${index}`}
                  from="none"
                  delay={Math.min(index, MAX_STAGGERED) * STAGGER}
                  duration={190}
                >
                  <View style={styles.walkStep}>
                    <View style={styles.walkHeading}>
                      <Text style={[TYPO.meta, { color: colors.accent }]}>
                        {String(index + 1).padStart(2, "0")}
                      </Text>
                      <Text style={[TYPO.label, styles.walkLabel, { color: colors.ink }]}>
                        {step.label}
                      </Text>
                    </View>
                    {step.code ? <CodePlate>{step.code}</CodePlate> : null}
                    <RichText
                      text={step.detail}
                      style={[TYPO.small, styles.walkDetail, { color: colors.body }]}
                    />
                  </View>
                </FadeIn>
              ))}
            </View>
          ) : null}

          {lesson.example ? (
            <FadeIn key={`${lesson.title}-example`} from="none" delay={STAGGER} duration={190}>
              <FieldLabel>Example</FieldLabel>
              <CodePlate>{lesson.example.code}</CodePlate>
              {lesson.example.caption ? (
                <Text
                  style={[TYPO.tiny, styles.caption, { color: colors.muted }]}
                >
                  {lesson.example.caption}
                </Text>
              ) : null}
            </FadeIn>
          ) : null}

          {lesson.wrong ? (
            <FadeIn key={`${lesson.title}-wrong`} from="none" delay={STAGGER} duration={190}>
              <WrongCode code={lesson.wrong.code} why={lesson.wrong.why} />
            </FadeIn>
          ) : null}

          {lesson.gotcha ? (
            <FadeIn key={`${lesson.title}-gotcha`} from="none" duration={190}>
              <View
                style={[styles.gotcha, { borderLeftColor: colors.accent }]}
              >
                <Text style={[TYPO.label, { color: colors.accent }]}>
                  Watch out
                </Text>
                <RichText
                  text={lesson.gotcha}
                  style={[
                    TYPO.small,
                    styles.gotchaText,
                    { color: colors.body },
                  ]}
                />
              </View>
            </FadeIn>
          ) : null}

          {lesson.check ? (
            <LessonCheck key={`${lesson.title}-check`} check={lesson.check} />
          ) : null}

          {lesson.capstone && placement?.levelLabel === "Beginner" ? (
            <View
              style={[
                styles.capstone,
                {
                  backgroundColor: colors.plate,
                  borderColor: colors.rule,
                },
              ]}
            >
              <Text style={[TYPO.label, { color: colors.accent }]}>
                Beginner capstone
              </Text>
              <Text style={[TYPO.item, styles.capstoneTitle, { color: colors.ink }]}>
                {lesson.capstone.title}
              </Text>
              <Text style={[TYPO.body, styles.capstoneText, { color: colors.body }]}>
                {lesson.capstone.prompt}
              </Text>
              <Text style={[TYPO.label, styles.capstoneSubhead, { color: colors.ink }]}>
                Your deliverable
              </Text>
              <Text style={[TYPO.small, styles.capstoneText, { color: colors.body }]}>
                {lesson.capstone.deliverable}
              </Text>
              <Text style={[TYPO.label, styles.capstoneSubhead, { color: colors.ink }]}>
                Acceptance checklist
              </Text>
              {lesson.capstone.criteria.map((criterion, index) => (
                <View key={index} style={styles.capstoneCriterion}>
                  <Text style={[TYPO.small, { color: colors.accent }]}>•</Text>
                  <Text style={[TYPO.small, styles.capstoneCriterionText, { color: colors.body }]}>
                    {criterion}
                  </Text>
                </View>
              ))}
              <Text style={[TYPO.label, styles.capstoneSubhead, { color: colors.ink }]}>
                Self-check
              </Text>
              <Text style={[TYPO.small, styles.capstoneText, { color: colors.body }]}>
                {lesson.capstone.selfCheck}
              </Text>
            </View>
          ) : null}

          {lessons.length > 1 ? (
            <View style={styles.lessonNav}>
              {lessonIndex > 0 ? (
                <Button
                  variant="secondary"
                  onPress={() => goToLesson(lessonIndex - 1)}
                >
                  Previous
                </Button>
              ) : (
                <View />
              )}
              {isLastLesson ? null : (
                <Button onPress={() => goToLesson(lessonIndex + 1)}>
                  Next lesson
                </Button>
              )}
            </View>
          ) : null}
            </FadeIn>
          </>
        ) : (
          <>
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
                    <Text
                      style={[
                        TYPO.small,
                        styles.variantDesc,
                        { color: colors.body },
                      ]}
                    >
                      {variant.description}
                    </Text>
                    {!!variant.syntax ? (
                      <CodePlate>{variant.syntax}</CodePlate>
                    ) : null}
                  </View>
                ))}
              </>
            ) : null}
          </>
        )}

        {isLastLesson ? (
          <>
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
                <Text style={[TYPO.section, { color: colors.ink }]}>
                  Mark as read?
                </Text>
                <Text
                  style={[TYPO.small, styles.confirmText, { color: colors.body }]}
                >
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
          </>
        ) : null}

        <View style={[styles.bottomNav, { borderTopColor: colors.rule }]}>
          <Button variant="secondary" onPress={onBack} style={styles.bottomBack}>
            {backLabel}
          </Button>
        </View>
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
  lessonTabs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 22,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  lessonTab: {
    minHeight: 44,
    minWidth: 34,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonTabMark: {
    position: "absolute",
    left: 4,
    right: 4,
    bottom: 0,
    height: 2,
  },
  lessonTitle: { marginTop: 18 },
  goal: {
    marginTop: 12,
    marginBottom: 10,
    paddingLeft: 12,
    paddingVertical: 10,
    borderLeftWidth: 2,
  },
  goalText: { lineHeight: 21, marginTop: 4 },
  walkthrough: { marginTop: 24 },
  capstone: {
    marginTop: 28,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
  },
  capstoneTitle: { marginTop: 8 },
  capstoneText: { marginTop: 8, lineHeight: 22 },
  capstoneSubhead: { marginTop: 16 },
  capstoneCriterion: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 8,
  },
  capstoneCriterionText: { flex: 1, lineHeight: 21 },
  walkStep: { marginTop: 16 },
  walkHeading: { flexDirection: "row", alignItems: "baseline", gap: 10 },
  walkLabel: { flex: 1 },
  walkDetail: { lineHeight: 21, marginTop: 8 },
  firstParagraph: { marginTop: 14 },
  paragraph: { marginTop: 12 },
  caption: { marginTop: 8 },
  gotcha: {
    marginTop: 24,
    paddingLeft: 12,
    borderLeftWidth: 2,
  },
  gotchaText: { marginTop: 6 },
  lessonNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 26,
  },
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
  bottomNav: {
    marginTop: 36,
    paddingTop: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  bottomBack: { width: "100%" },
  saveTap: { minHeight: 44, justifyContent: "center" },
  emptyWrap: { flex: 1, justifyContent: "center", padding: 24 },
});
