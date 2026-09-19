import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function TopicScreen({ topic, accentColor = '#89b4fa', onBack }) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    Alert.alert(
      '✅ Mark as Read?',
      `Have you completed "${topic.title}"?`,
      [
        { text: 'Not yet', style: 'cancel' },
        { 
          text: 'Yes!', 
          onPress: () => {
            setCompleted(true);
            if (topic._onComplete) {
              topic._onComplete();
            }
            onBack();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Topic Details</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.card, { borderTopColor: accentColor }]}>
          <Text style={styles.title}>{topic.title}</Text>
          {topic._level && (
            <Text style={[styles.level, { color: accentColor }]}>
              Level: {topic._level}
            </Text>
          )}
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>📝 Description</Text>
          <Text style={styles.description}>{topic.description}</Text>
          
          {topic.syntax && (
            <>
              <Text style={styles.sectionTitle}>💻 Syntax</Text>
              <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{topic.syntax}</Text>
              </View>
            </>
          )}

          {topic.variants && (
            <>
              <Text style={styles.sectionTitle}>📦 Variants</Text>
              {topic.variants.map((variant, index) => (
                <View key={index} style={styles.variantContainer}>
                  <Text style={styles.variantTitle}>{variant.title}</Text>
                  <Text style={styles.variantDescription}>{variant.description}</Text>
                  {variant.syntax && (
                    <View style={styles.codeBlock}>
                      <Text style={styles.codeText}>{variant.syntax}</Text>
                    </View>
                  )}
                </View>
              ))}
            </>
          )}
        </View>

        <TouchableOpacity 
          style={[
            styles.completeButton, 
            { backgroundColor: completed ? '#6c7086' : accentColor }
          ]} 
          onPress={handleComplete}
          disabled={completed}
        >
          <Text style={styles.completeButtonText}>
            {completed ? '✅ Completed!' : '✅ Mark as Read'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1b26' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2e3e',
  },
  backButton: { padding: 8 },
  backText: { color: '#89b4fa', fontSize: 16, fontWeight: '500' },
  headerTitle: { color: '#c0caf5', fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  card: {
    backgroundColor: '#24273a',
    padding: 20,
    borderRadius: 12,
    borderTopWidth: 4,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#c0caf5', marginBottom: 8 },
  level: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  divider: { height: 1, backgroundColor: '#2c2e3e', marginVertical: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#c0caf5', marginTop: 16, marginBottom: 8 },
  description: { fontSize: 15, color: '#cdd6f4', lineHeight: 22 },
  codeBlock: {
    backgroundColor: '#1a1b26',
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2c2e3e',
  },
  codeText: { color: '#a6e3a1', fontFamily: 'monospace', fontSize: 13, lineHeight: 20 },
  variantContainer: { marginTop: 12, padding: 12, backgroundColor: '#1a1b26', borderRadius: 8 },
  variantTitle: { fontSize: 16, fontWeight: '600', color: '#c0caf5', marginBottom: 4 },
  variantDescription: { fontSize: 14, color: '#cdd6f4', marginBottom: 8 },
  completeButton: { 
    padding: 16, 
    borderRadius: 12, 
    marginTop: 20, 
    marginBottom: 30, 
    alignItems: 'center' 
  },
  completeButtonText: { 
    color: '#1a1b26', 
    fontSize: 18, 
    fontWeight: '600' 
  },
});