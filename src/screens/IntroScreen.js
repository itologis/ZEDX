import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Screen from "../components/Screen";

export default function IntroScreen({
  intro,
  accentColor = "#89b4fa",
  onBack,
  onStart,
}) {
  if (!intro) {
    return (
      <Screen style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Introduction data unavailable.</Text>
          <TouchableOpacity
            onPress={onBack}
            style={styles.errorBackButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={[styles.backText, { color: accentColor }]}>
              ← Back
            </Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
          activeOpacity={0.7}
        >
          <Text style={[styles.backText, { color: accentColor }]}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Introduction</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { borderTopColor: accentColor }]}>
          <Text style={styles.title}>{intro.title || "Untitled"}</Text>

          {intro.tagline ? (
            <Text style={styles.tagline}>{intro.tagline}</Text>
          ) : null}

          {intro.description ? (
            <Text style={styles.description}>{intro.description}</Text>
          ) : null}

          {intro.useCases?.length > 0 ? (
            <>
              <Text style={styles.subtitle}>Use cases</Text>
              {intro.useCases.map((useCase, index) => (
                <View key={`${useCase}-${index}`} style={styles.useCaseRow}>
                  <Text style={[styles.bullet, { color: accentColor }]}>•</Text>
                  <Text style={styles.useCase}>{useCase}</Text>
                </View>
              ))}
            </>
          ) : null}
        </View>

        <View style={[styles.assessmentNotice, { borderColor: accentColor }]}>
          <Text style={[styles.assessmentNoticeTitle, { color: accentColor }]}>
            Initial assessment
          </Text>
          <Text style={styles.assessmentNoticeText}>
            A short quiz helps place you at the right starting level. You can
            still explore every level freely afterward.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: accentColor }]}
          onPress={onStart}
          accessibilityRole="button"
          accessibilityLabel={`Start learning ${intro.title || "this topic"}`}
          activeOpacity={0.85}
        >
          <Text style={styles.startButtonText}>Start learning</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2c2e3e",
  },
  backButton: {
    minWidth: 72,
    paddingVertical: 8,
    zIndex: 1,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#c0caf5",
    fontSize: 18,
    fontWeight: "700",
  },
  headerSpacer: {
    minWidth: 72,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 36,
  },
  card: {
    backgroundColor: "#24273a",
    padding: 22,
    borderRadius: 16,
    borderTopWidth: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#c0caf5",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "#9399b2",
    marginBottom: 14,
    lineHeight: 22,
  },
  description: {
    fontSize: 15,
    color: "#cdd6f4",
    lineHeight: 23,
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#c0caf5",
    marginBottom: 10,
  },
  useCaseRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  bullet: {
    fontSize: 14,
    marginRight: 8,
    marginTop: 1,
  },
  useCase: {
    flex: 1,
    fontSize: 14,
    color: "#cdd6f4",
    lineHeight: 21,
  },
  assessmentNotice: {
    backgroundColor: "#24273a",
    padding: 16,
    borderRadius: 14,
    marginTop: 18,
    borderWidth: 1,
  },
  assessmentNoticeTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  assessmentNoticeText: {
    color: "#9399b2",
    fontSize: 13,
    lineHeight: 20,
  },
  startButton: {
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  startButtonText: {
    color: "#1a1b26",
    fontSize: 17,
    fontWeight: "800",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorText: {
    color: "#c0caf5",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  errorBackButton: {
    padding: 12,
  },
});
