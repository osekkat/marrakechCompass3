import type React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

/**
 * Sample item data structure for FlashList demo
 */
interface SampleItem {
  id: string;
  title: string;
}

/**
 * Generate sample data for FlashList testing
 * @param count Number of items to generate
 * @returns Array of sample items
 */
function generateSampleData(count: number): SampleItem[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `item-${index}`,
    title: `Item ${index + 1}`,
  }));
}

interface FlashListExampleProps {
  /** Number of items to display (default: 100) */
  itemCount?: number;
}

/**
 * Example FlashList component demonstrating high-performance list rendering.
 * Used to verify @shopify/flash-list is correctly configured.
 *
 * FlashList v2 provides:
 * - Better performance than FlatList for large datasets
 * - Consistent 60 FPS scrolling
 * - Automatic cell recycling
 * - Automatic item size calculation (no estimatedItemSize needed in v2)
 */
export function FlashListExample({ itemCount = 100 }: FlashListExampleProps): React.ReactElement {
  const data = generateSampleData(itemCount);

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={({ item }): React.ReactElement => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item): string => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4F0', // Moroccan warm sand background
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE9E2', // Light sand border
  },
  title: {
    fontSize: 16,
    color: '#2D2622', // Dark brown foreground
    fontFamily: 'System', // Will be replaced with DM Sans
  },
});

export default FlashListExample;
