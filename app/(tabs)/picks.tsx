import type React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Our Picks screen - Coup de Coeur
 *
 * Editorial-style curated recommendations:
 * - Best Architectural Experience
 * - Best Djemaa El Fna Experience
 * - Best Shopping / Souks
 * - Best Dining Experience
 * - Best Place to Stay
 * - Best Hidden Gem
 * - Best Rooftop View
 * - Best Art & Design
 * - Best Cultural Experiences
 * - Best Museum Experiences
 * - Best Experience in New Town
 * - Best Hammam Experience
 */
export default function PicksScreen(): React.ReactElement {
  const categories = [
    { id: 'architecture', title: 'Best Architectural Experience', icon: '🏛️' },
    { id: 'djemaa', title: 'Best Djemaa El Fna Experience', icon: '🌅' },
    { id: 'shopping', title: 'Best Shopping / Souks', icon: '🛍️' },
    { id: 'dining', title: 'Best Dining Experience', icon: '🍽️' },
    { id: 'stay', title: 'Best Place to Stay', icon: '🏨' },
    { id: 'hidden', title: 'Best Hidden Gem', icon: '💎' },
    { id: 'rooftop', title: 'Best Rooftop View', icon: '🌆' },
    { id: 'art', title: 'Best Art & Design', icon: '🎨' },
    { id: 'cultural', title: 'Best Cultural Experiences', icon: '🎭' },
    { id: 'museum', title: 'Best Museum Experiences', icon: '🖼️' },
    { id: 'newtown', title: 'Best Experience in New Town', icon: '🌃' },
    { id: 'hammam', title: 'Best Hammam Experience', icon: '🛁' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text style={styles.intro}>
          Our handpicked favorites - the very best of Marrakech, curated just for you.
        </Text>

        {categories.map((category) => (
          <View key={category.id} style={styles.card}>
            <Text style={styles.cardIcon} accessible={false}>
              {category.icon}
            </Text>
            <Text style={styles.cardTitle}>{category.title}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4F0',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  intro: {
    fontSize: 16,
    color: '#2D2622',
    marginBottom: 20,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2622',
    flex: 1,
  },
});
