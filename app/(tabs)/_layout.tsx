import type React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Theme colors from Moroccan-inspired design system
const colors = {
  primary: '#C65D3B', // Terracotta
  secondary: '#356B66', // Teal
  background: '#F7F4F0', // Warm sand
  foreground: '#2D2622', // Dark brown
  muted: '#7A7471',
};

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

interface TabIconProps {
  name: IoniconsName;
  color: string;
  size: number;
}

function TabIcon({ name, color, size }: TabIconProps): React.ReactElement {
  return <Ionicons name={name} size={size} color={color} />;
}

/**
 * Tab layout defining the 5 bottom tabs:
 * 1. Home - Plan Your Trip, weather, quick tools
 * 2. Picks - Coup de Coeur editorial recommendations
 * 3. Explore - Search, browse, filter places
 * 4. Maps - Offline maps with POI markers
 * 5. Tips - Travel essentials, safety, emergency
 */
export default function TabLayout(): React.ReactElement {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: '#DDD6CC',
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 8,
          height: 60 + Math.max(insets.bottom, 8),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.foreground,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <TabIcon name="home" color={color} size={size} />,
          tabBarAccessibilityLabel: 'Home tab',
          headerTitle: 'Marrakech Compass',
        }}
      />
      <Tabs.Screen
        name="picks"
        options={{
          title: 'Picks',
          tabBarIcon: ({ color, size }) => <TabIcon name="heart" color={color} size={size} />,
          tabBarAccessibilityLabel: 'Picks tab',
          headerTitle: 'Our Picks',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <TabIcon name="compass" color={color} size={size} />,
          tabBarAccessibilityLabel: 'Explore tab',
          headerTitle: 'Explore',
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: 'Maps',
          tabBarIcon: ({ color, size }) => <TabIcon name="map" color={color} size={size} />,
          tabBarAccessibilityLabel: 'Maps tab',
          headerTitle: 'Maps',
        }}
      />
      <Tabs.Screen
        name="tips"
        options={{
          title: 'Tips',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="information-circle" color={color} size={size} />
          ),
          tabBarAccessibilityLabel: 'Tips tab',
          headerTitle: 'Travel Tips',
        }}
      />
    </Tabs>
  );
}
