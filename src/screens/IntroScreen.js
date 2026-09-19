
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function IntroScreen({
  intro,
  accentColor = '#89b4fa',
  onBack,
  onStart,
}) {
  if (!intro) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Introduction data unavailable.</Text>

          <TouchableOpacity
            onPress={onBack}
            style={styles.errorBackButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Introduction</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { borderTopColor: accentColor }]}>
          <Text style={styles.title}>
            {intro.title || 'Untitled'}
          </Text>

          {intro.tagline ? (
            <Text style={styles.tagline}>
              {intro.tagline}
            </Text>
          ) : null}

          {intro.description ? (
            <Text style={styles.description}>
              {intro.description}
            </Text>
          ) : null}

          {intro.useCases?.length > 0 ? (
            <>
              <Text style={styles.subtitle}>Use Cases</Text>

              {intro.useCases.map((useCase, index) => (
                <Text key={`${useCase}-${index}`} style={styles.useCase}>
                  • {useCase}
                </Text>
              ))}
            </>
          ) : null}
        </View>

        <TouchableOpacity
          style={[
            styles.startButton,
            { backgroundColor: accentColor },
          ]}
          onPress={onStart}
          accessibilityRole="button"
          accessibilityLabel={`Start learning ${
            intro.title || 'this topic'
          }`}
        >
          <Text style={styles.startButtonText}>
            Start Learning
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b26',
  },

  header: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2e3e',
    position: 'relative',
  },

  backButton: {
    padding: 8,
    zIndex: 1,
  },

  backText: {
    color: '#89b4fa',
    fontSize: 16,
    fontWeight: '500',
  },

  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#c0caf5',
    fontSize: 20,
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#24273a',
    padding: 20,
    borderRadius: 12,
    borderTopWidth: 4,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#c0caf5',
    marginBottom: 8,
  },

  tagline: {
    fontSize: 18,
    color: '#9399b2',
    marginBottom: 16,
  },

  description: {
    fontSize: 15,
    color: '#cdd6f4',
    lineHeight: 22,
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#c0caf5',
    marginTop: 4,
    marginBottom: 12,
  },

  useCase: {
    fontSize: 14,
    color: '#cdd6f4',
    lineHeight: 21,
    marginVertical: 4,
    marginLeft: 8,
  },

  startButton: {
    minHeight: 54,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },

  startButtonText: {
    color: '#1a1b26',
    fontSize: 18,
    fontWeight: 'bold',
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  errorText: {
    color: '#c0caf5',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },

  errorBackButton: {
    padding: 10,
  },
});
