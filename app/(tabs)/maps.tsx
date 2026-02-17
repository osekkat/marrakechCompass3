import type React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Maps screen - Offline maps with POI markers
 *
 * Features:
 * - Full-screen Mapbox map centered on Marrakech Medina
 * - Offline map packs by zone (Medina Core, City Center, Full City)
 * - POI markers color-coded by category
 * - Current location indicator
 * - Walking directions (online + offline A*)
 * - Download manager for offline packs
 */
export default function MapsScreen(): React.ReactElement {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapOverlay}>
            <Text style={styles.mapIcon} accessible={false}>
              🗺️
            </Text>
            <Text style={styles.mapTitle} accessibilityRole="header">
              Offline Maps
            </Text>
            <Text style={styles.mapSubtitle}>Mapbox integration coming soon...</Text>
            <Text style={styles.mapInfo}>
              Download map packs for offline navigation in the Medina and beyond.
            </Text>
          </View>
        </View>

        <View style={styles.downloadPanel}>
          <Text style={styles.panelTitle} accessibilityRole="header">
            Available Map Packs
          </Text>

          <View style={styles.packItem}>
            <View style={styles.packInfo}>
              <Text style={styles.packName}>Medina Core</Text>
              <Text style={styles.packSize}>~25 MB</Text>
            </View>
            <View style={styles.packStatus}>
              <Text style={styles.statusText}>Not Downloaded</Text>
            </View>
          </View>

          <View style={styles.packItem}>
            <View style={styles.packInfo}>
              <Text style={styles.packName}>City Center</Text>
              <Text style={styles.packSize}>~50 MB</Text>
            </View>
            <View style={styles.packStatus}>
              <Text style={styles.statusText}>Not Downloaded</Text>
            </View>
          </View>

          <View style={styles.packItem}>
            <View style={styles.packInfo}>
              <Text style={styles.packName}>Full City</Text>
              <Text style={styles.packSize}>~100 MB</Text>
            </View>
            <View style={styles.packStatus}>
              <Text style={styles.statusText}>Not Downloaded</Text>
            </View>
          </View>
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
    paddingBottom: 40,
  },
  mapPlaceholder: {
    minHeight: 320,
    backgroundColor: '#356B66',
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  mapOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  mapIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  mapTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  mapSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 16,
  },
  mapInfo: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 20,
  },
  downloadPanel: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    padding: 16,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D2622',
    marginBottom: 16,
  },
  packItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE9E2',
  },
  packInfo: {
    flex: 1,
  },
  packName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D2622',
  },
  packSize: {
    fontSize: 14,
    color: '#7A7471',
    marginTop: 2,
  },
  packStatus: {
    backgroundColor: '#EFE9E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#7A7471',
    fontWeight: '500',
  },
});
