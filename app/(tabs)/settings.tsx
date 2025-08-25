import React from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from '@legendapp/state/react';
import { Globe, Bell, Trash2, ChevronRight } from 'lucide-react-native';
import { commuteStore$ } from '@/stores/commuteStore';
import { colors, spacing, textStyles, borderRadius, shadows } from '@/config/styles';

const SettingItem = ({ icon: Icon, title, subtitle, onPress, rightElement }: {
  icon: any;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}) => {
  const $item = {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xs,
    borderRadius: borderRadius.lg,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    ...shadows.sm,
  };

  const $iconContainer = {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.info + '20',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: spacing.md,
  };

  const $content = {
    flex: 1,
  };

  const $right = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  };

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={$item} onPress={onPress} activeOpacity={0.7}>
      <View style={$iconContainer}>
        <Icon size={20} color={colors.info} strokeWidth={2} />
      </View>
      <View style={$content}>
        <Text style={textStyles.body}>{title}</Text>
        {subtitle && <Text style={textStyles.caption}>{subtitle}</Text>}
      </View>
      <View style={$right}>
        {rightElement}
        {onPress && <ChevronRight size={20} color={colors.text.secondary} strokeWidth={2} />}
      </View>
    </Component>
  );
};

export default observer(function SettingsTab() {
  const settings = commuteStore$.settings.get();

  const toggleUnits = () => {
    commuteStore$.updateSettings({
      units: settings.units === 'imperial' ? 'metric' : 'imperial',
    });
  };

  const toggleNotifications = () => {
    commuteStore$.updateSettings({
      notifications: {
        ...settings.notifications,
        weekdayReminders: !settings.notifications.weekdayReminders,
      },
    });
  };

  const clearAllData = () => {
    // Reset all data
    commuteStore$.commutes.set([]);
  };

  const $container = {
    flex: 1,
    backgroundColor: colors.background,
  };

  const $header = {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  };

  const $section = {
    marginTop: spacing.lg,
  };

  const $sectionTitle = {
    ...textStyles.h3,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  };

  return (
    <SafeAreaView style={$container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={$header}>
          <Text style={textStyles.h1}>Settings</Text>
          <Text style={textStyles.bodySecondary}>
            Customize your app experience
          </Text>
        </View>

        <View style={$section}>
          <Text style={$sectionTitle}>Preferences</Text>
          
          <SettingItem
            icon={Globe}
            title="Units"
            subtitle={`Currently using ${settings.units === 'imperial' ? 'Imperial (miles)' : 'Metric (kilometers)'}`}
            onPress={toggleUnits}
          />

          <SettingItem
            icon={Bell}
            title="Weekday Reminders"
            subtitle="Get reminded to log your commutes"
            rightElement={
              <Switch
                value={settings.notifications.weekdayReminders}
                onValueChange={toggleNotifications}
                trackColor={{ false: colors.border, true: colors.eco + '40' }}
                thumbColor={settings.notifications.weekdayReminders ? colors.eco : colors.text.light}
              />
            }
          />
        </View>

        <View style={$section}>
          <Text style={$sectionTitle}>Data</Text>
          
          <SettingItem
            icon={Trash2}
            title="Clear All Data"
            subtitle="Remove all tracked commutes"
            onPress={clearAllData}
            rightElement={null}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});