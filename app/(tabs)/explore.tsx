import type React from 'react';
import { useState } from 'react';
import { Keyboard, StyleSheet, Text, View, ScrollView, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Explore screen - Search, browse, filter places
 *
 * Features:
 * - Offline full-text search (FTS5)
 * - Category grid
 * - Neighborhood quick filters
 * - Advanced filters (price, rating, open-now)
 * - Place cards with favorites
 */
export default function ExploreScreen(): React.ReactElement {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All');

  const categories = [
    { id: 'restaurants', title: 'Restaurants & Cafes', icon: '🍽️' },
    { id: 'museums', title: 'Museums & Galleries', icon: '🏛️' },
    { id: 'riads', title: 'Riads & Hotels', icon: '🏨' },
    { id: 'gardens', title: 'Gardens & Courtyards', icon: '🌿' },
    { id: 'shopping', title: 'Shopping & Souks', icon: '🛍️' },
    { id: 'hammams', title: 'Hammams & Spas', icon: '🛁' },
    { id: 'daytrips', title: 'Day Trips', icon: '🏔️' },
  ];

  const neighborhoods = ['Medina', 'Gueliz', 'Hivernage', 'Mellah', 'Palmeraie'];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search places, restaurants, activities..."
            placeholderTextColor="#7A7471"
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={Keyboard.dismiss}
            accessibilityLabel="Search places"
            accessibilityHint="Enter keywords to search places and activities"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.neighborhoodScroll}
          contentContainerStyle={styles.neighborhoodContent}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            style={[styles.chip, selectedNeighborhood === 'All' && styles.chipActive]}
            onPress={() => setSelectedNeighborhood('All')}
            accessibilityRole="button"
            accessibilityLabel="Show all neighborhoods"
            accessibilityState={{ selected: selectedNeighborhood === 'All' }}
          >
            <Text
              style={[styles.chipText, selectedNeighborhood === 'All' && styles.chipTextActive]}
            >
              All
            </Text>
          </Pressable>
          {neighborhoods.map((neighborhood) => (
            <Pressable
              key={neighborhood}
              style={[styles.chip, selectedNeighborhood === neighborhood && styles.chipActive]}
              onPress={() => setSelectedNeighborhood(neighborhood)}
              accessibilityRole="button"
              accessibilityLabel={`Filter by ${neighborhood}`}
              accessibilityState={{ selected: selectedNeighborhood === neighborhood }}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedNeighborhood === neighborhood && styles.chipTextActive,
                ]}
              >
                {neighborhood}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle} accessibilityRole="header">
          Categories
        </Text>
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <View key={category.id} style={styles.categoryCard}>
              <Text style={styles.categoryIcon} accessible={false}>
                {category.icon}
              </Text>
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </View>
          ))}
        </View>
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
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2D2622',
    borderWidth: 1,
    borderColor: '#DDD6CC',
  },
  neighborhoodScroll: {
    marginBottom: 20,
    marginHorizontal: -16,
  },
  neighborhoodContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    backgroundColor: '#EFE9E2',
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#C65D3B',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D2622',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D2622',
    marginBottom: 16,
  },
  categoryGrid: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2622',
  },
});
