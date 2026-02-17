import type React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Home screen - Plan Your Trip
 *
 * Features:
 * - Live weather widget
 * - Plan Your Trip section with duration selector
 * - Arrival Mode (Quick Tools)
 * - Quick Links grid
 * - Don't Miss Carousel
 */
export default function HomeScreen(): React.ReactElement {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle} accessibilityRole="header">
            Welcome to Marrakech
          </Text>
          <Text style={styles.heroSubtitle}>Your offline travel companion</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">
            Plan Your Trip
          </Text>
          <Text style={styles.placeholder}>Duration selector and itineraries coming soon...</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">
            Quick Tools
          </Text>
          <Text style={styles.placeholder}>
            Airport info, emergency contacts, currency converter...
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">
            Don&apos;t Miss
          </Text>
          <Text style={styles.placeholder}>Featured highlights carousel...</Text>
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
  hero: {
    backgroundColor: '#C65D3B',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D2622',
    marginBottom: 12,
  },
  placeholder: {
    fontSize: 14,
    color: '#7A7471',
    backgroundColor: '#EFE9E2',
    padding: 16,
    borderRadius: 8,
  },
});
