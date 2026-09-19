import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

export default function IntroScreen({ intro, accentColor = '#89b4fa', onBack, onStart }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Introduction</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView style={styles.content}>
        <View style={[styles.card, { borderTopColor: accentColor }]}>
          <Text style={styles.title}>{intro.title}</Text>
          <Text style={styles.tagline}>{intro.tagline}</Text>
          <Text style={styles.description}>{intro.description}</Text>
          <Text style={styles.subtitle}>💡 Use Cases:</Text>
          {intro.useCases.map((useCase, index) => (
            <Text key={index} style={styles.useCase}>• {useCase}</Text>
          ))}
        </View>
        <TouchableOpacity style={[styles.startButton, { backgroundColor: accentColor }]} onPress={onStart}>
          <Text style={styles.startButtonText}>🚀 Start Learning</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1b26' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#2c2e3e' },
  backButton: { padding: 8 },
  backText: { color: '#89b4fa', fontSize: 16, fontWeight: '500' },
  headerTitle: { color: '#c0caf5', fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  card: { backgroundColor: '#24273a', padding: 20, borderRadius: 12, borderTopWidth: 4 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#c0caf5', marginBottom: 8 },
  tagline: { fontSize: 18, color: '#9399b2', marginBottom: 16 },
  description: { fontSize: 15, color: '#cdd6f4', lineHeight: 22, marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#c0caf5', marginTop: 8, marginBottom: 12 },
  useCase: { fontSize: 14, color: '#cdd6f4', marginVertical: 4, marginLeft: 8 },
  startButton: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20, marginBottom: 30 },
  startButtonText: { color: '#1a1b26', fontSize: 18, fontWeight: 'bold' },
});
