import { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import css from "../data/css";
import html from "../data/html";
import java from "../data/java";
import { getQuizProgress } from "../data/progress";
import python from "../data/python";
import { QUIZZES } from "../data/quiz";

const LANGUAGES = [
  { key: "html", label: "HTML", color: "#f38ba8", data: html },
  { key: "css", label: "CSS", color: "#89b4fa", data: css },
  { key: "java", label: "Java", color: "#fab387", data: java },
  { key: "python", label: "Python", color: "#a6e3a1", data: python },
];

export default function QuizzesScreen({ onBack, onOpenQuiz }) {
  const [passed, setPassed] = useState({});

  useEffect(() => {
    const load = async () => {
      const result = {};

      for (const lang of LANGUAGES) {
        result[lang.key] = await getQuizProgress(lang.key);
      }

      setPassed(result);
    };

    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Quizzes</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {LANGUAGES.map((lang) => {
          const levels = lang.data.levels.filter(
            (level) => QUIZZES[lang.key]?.[level.level],
          );

          const passedCount = levels.filter(
            (level) => passed[lang.key]?.[level.level],
          ).length;

          return (
            <View key={lang.key} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: lang.color }]}>
                  {lang.label}
                </Text>
                <Text style={styles.sectionCount}>
                  {passedCount}/{levels.length} passed
                </Text>
              </View>

              {levels.map((level) => {
                const isPassed = !!passed[lang.key]?.[level.level];

                return (
                  <TouchableOpacity
                    key={level.level}
                    style={[
                      styles.quizCard,
                      isPassed && { borderLeftColor: lang.color },
                    ]}
                    onPress={() =>
                      onOpenQuiz(lang.key, level.level, lang.color)
                    }
                  >
                    <Text style={styles.quizTitle}>
                      {level.level} {level.label}
                    </Text>

                    <Text
                      style={[
                        styles.quizStatus,
                        isPassed && styles.quizStatusPassed,
                      ]}
                    >
                      {isPassed ? "Passed" : "Not taken"}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1b26" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2c2e3e",
  },
  backButton: { padding: 8, minWidth: 70 },
  backText: { color: "#89b4fa", fontSize: 16, fontWeight: "500" },
  headerTitle: { color: "#c0caf5", fontSize: 20, fontWeight: "bold" },
  headerSpacer: { width: 70 },

  content: { flex: 1 },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 20, fontWeight: "bold" },
  sectionCount: { color: "#9399b2", fontSize: 12 },

  quizCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#24273a",
    padding: 14,
    borderRadius: 8,
    marginBottom: 6,
    borderLeftWidth: 4,
    borderLeftColor: "transparent",
  },
  quizTitle: { color: "#c0caf5", fontSize: 15, fontWeight: "600" },
  quizStatus: { color: "#9399b2", fontSize: 12 },
  quizStatusPassed: { color: "#a6e3a1", fontWeight: "bold" },
});
