import { ScrollView, StyleSheet, Text, View } from "react-native";

import Breadcrumbs from "../components/Breadcrumbs";
import Button from "../components/Button";
import FieldLabel from "../components/FieldLabel";
import Screen from "../components/Screen";
import TopBar from "../components/TopBar";
import { TYPO, useTheme } from "../theme";

const countTopics = (data) =>
  data?.levels?.reduce((sum, level) => sum + (level.topics?.length || 0), 0) ||
  0;

export default function IntroScreen({
  intro,
  languageKey,
  languageLabel,
  languageData,
  onBack,
  onHome,
  onStart,
}) {
  const { colors } = useTheme();
  const swatch = colors.lang[languageKey];

  if (!intro) {
    return (
      <Screen>
        <TopBar left="← Index" onLeft={onBack} leftLabel="Back to contents" />
        <Breadcrumbs items={[{ label: "Home", onPress: onHome }, { label: languageLabel || languageKey }]} />
        <View style={styles.errorWrap}>
          <Text style={[TYPO.body, { color: colors.body }]}>
            Introduction data unavailable.
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <TopBar
        left="← Index"
        onLeft={onBack}
        leftLabel="Back to contents"
        right={`${countTopics(languageData)} topics`}
      />
      <Breadcrumbs items={[{ label: "Home", onPress: onHome }, { label: languageLabel || languageKey }]} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chapterRow}>
          <View style={[styles.swatch, { backgroundColor: swatch }]} />
          <Text style={[TYPO.label, { color: colors.muted }]}>Chapter</Text>
        </View>

        <Text style={[TYPO.title, styles.title, { color: colors.ink }]}>
          {intro.title || languageLabel || "Untitled"}
        </Text>

        {intro.tagline ? (
          <Text style={[TYPO.subtitle, styles.tagline, { color: colors.muted }]}>
            {intro.tagline}
          </Text>
        ) : null}

        {intro.description ? (
          <Text style={[TYPO.lede, styles.description, { color: colors.body }]}>
            {intro.description}
          </Text>
        ) : null}

        {intro.useCases?.length > 0 ? (
          <>
            <FieldLabel>Use cases</FieldLabel>
            {intro.useCases.map((useCase, index) => (
              <View
                key={`${useCase}-${index}`}
                style={[styles.useCase, { borderBottomColor: colors.rule }]}
              >
                <Text
                  style={[TYPO.tiny, styles.useCaseNo, { color: colors.muted }]}
                >
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Text style={[TYPO.body, styles.useCaseText, { color: colors.body }]}>
                  {useCase}
                </Text>
              </View>
            ))}
          </>
        ) : null}

        <FieldLabel>Placement</FieldLabel>
        <Text style={[TYPO.small, styles.note, { color: colors.body }]}>
          A short quiz helps place you at the right starting level. You can
          still explore every level freely afterward.
        </Text>

        <Button onPress={onStart} style={styles.start}>
          Start learning
        </Button>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },
  chapterRow: { flexDirection: "row", alignItems: "center" },
  swatch: { width: 7, height: 7, marginRight: 10 },
  title: { marginTop: 14 },
  tagline: { marginTop: 12 },
  description: { marginTop: 16 },
  useCase: {
    flexDirection: "row",
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  useCaseNo: { width: 26, paddingTop: 4 },
  useCaseText: { flex: 1 },
  note: { marginTop: 12, lineHeight: 21 },
  start: { marginTop: 28 },
  errorWrap: { flex: 1, justifyContent: "center", padding: 24 },
});
