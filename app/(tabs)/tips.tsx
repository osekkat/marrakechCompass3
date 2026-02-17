import type React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

/**
 * Tips screen - Travel essentials, safety, emergency
 *
 * Expandable accordion sections:
 * 1. Getting Around
 * 2. Language
 * 3. Etiquette & Customs
 * 4. Climate & Packing
 * 5. Bargaining Guide
 * 6. SIM Cards & WiFi
 * 7. Food, Drink & Nightlife
 * 8. Accommodation
 * 9. Health & Safe Travels
 * 10. Money & Tipping
 * 11. Family Travel
 * 12. LGBTIQ+ Travellers
 * 13. Accessible Travel
 * 14. Responsible Travel
 * 15. Nuts & Bolts
 * 16. Scams & Incident Response
 */
export default function TipsScreen(): React.ReactElement {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const tipSections = [
    { id: 'transport', icon: '🚕', title: 'Getting Around' },
    { id: 'language', icon: '💬', title: 'Language' },
    { id: 'etiquette', icon: '🙏', title: 'Etiquette & Customs' },
    { id: 'climate', icon: '☀️', title: 'Climate & Packing' },
    { id: 'bargaining', icon: '💰', title: 'Bargaining Guide' },
    { id: 'connectivity', icon: '📱', title: 'SIM Cards & WiFi' },
    { id: 'food', icon: '🍲', title: 'Food, Drink & Nightlife' },
    { id: 'accommodation', icon: '🏠', title: 'Accommodation' },
    { id: 'health', icon: '🏥', title: 'Health & Safe Travels' },
    { id: 'money', icon: '💵', title: 'Money & Tipping' },
    { id: 'family', icon: '👨‍👩‍👧', title: 'Family Travel' },
    { id: 'lgbtiq', icon: '🏳️‍🌈', title: 'LGBTIQ+ Travellers' },
    { id: 'accessible', icon: '♿', title: 'Accessible Travel' },
    { id: 'responsible', icon: '🌱', title: 'Responsible Travel' },
    { id: 'nuts-bolts', icon: '🔧', title: 'Nuts & Bolts' },
    { id: 'scams', icon: '⚠️', title: 'Scams & Incident Response' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyIcon} accessible={false}>
            🆘
          </Text>
          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyTitle}>Emergency Mode</Text>
            <Text style={styles.emergencySubtitle}>Quick access to contacts & help</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle} accessibilityRole="header">
          Travel Tips
        </Text>

        {tipSections.map((section) => (
          <View key={section.id} style={styles.accordionItem}>
            <Pressable
              style={styles.accordionHeader}
              onPress={() => setExpandedId(expandedId === section.id ? null : section.id)}
              accessibilityRole="button"
              accessibilityLabel={section.title}
              accessibilityHint={
                expandedId === section.id
                  ? 'Collapse this travel tips section'
                  : 'Expand this travel tips section'
              }
              accessibilityState={{ expanded: expandedId === section.id }}
            >
              <Text style={styles.accordionIcon} accessible={false}>
                {section.icon}
              </Text>
              <Text style={styles.accordionTitle}>{section.title}</Text>
              <Text style={styles.accordionChevron} accessible={false}>
                {expandedId === section.id ? '▼' : '▶'}
              </Text>
            </Pressable>
            {expandedId === section.id && (
              <View style={styles.accordionContent}>
                <Text style={styles.accordionText}>Content for {section.title} coming soon...</Text>
              </View>
            )}
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
  emergencyCard: {
    backgroundColor: '#C65D3B',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  emergencyIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  emergencyContent: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  emergencySubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D2622',
    marginBottom: 16,
  },
  accordionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  accordionHeader: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  accordionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  accordionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#2D2622',
  },
  accordionChevron: {
    fontSize: 12,
    color: '#7A7471',
  },
  accordionContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#EFE9E2',
  },
  accordionText: {
    fontSize: 14,
    color: '#7A7471',
    lineHeight: 20,
    paddingTop: 16,
  },
});
