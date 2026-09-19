import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LANGUAGES = [
  { key: "html", label: "HTML", color: "#f38ba8", subtitle: "3 levels" },
  { key: "css", label: "CSS", color: "#89b4fa", subtitle: "3 levels" },
  { key: "java", label: "Java", color: "#fab387", subtitle: "3 levels" },
  { key: "python", label: "Python", color: "#a6e3a1", subtitle: "3 levels" },
];

export default function HomeScreen({ onSelectLanguage }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>ZEDX</Text>
      <Text style={styles.appSubtitle}>Pick a language to browse the corresponding syntax</Text>
      <View style={styles.grid}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity key={lang.key} style={[styles.tile, { borderColor: lang.color }]} onPress={() => onSelectLanguage(lang.key)}>
            <Text style={[styles.tileTitle, { color: lang.color }]}>{lang.label}</Text>
            <Text style={styles.tileSubtitle}>{lang.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1b26', paddingHorizontal: 20, paddingTop: 40 },
  appTitle: { color: '#c0caf5', fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  appSubtitle: { color: '#9399b2', fontSize: 16, textAlign: 'center', marginBottom: 32 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tile: { width: '48%', backgroundColor: '#24273a', borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 2, alignItems: 'center' },
  tileTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  tileSubtitle: { color: '#9399b2', fontSize: 14 },
});
