import { Tabs } from 'expo-router';
import { Car, ChartBar as BarChart3, Lightbulb, Settings } from 'lucide-react-native';
import { colors } from '@/config/styles';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.eco,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 88,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Commutes',
          tabBarIcon: ({ size, color }) => (
            <Car size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="facts"
        options={{
          title: 'Facts',
          tabBarIcon: ({ size, color }) => (
            <Lightbulb size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}