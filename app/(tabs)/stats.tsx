import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from '@legendapp/state/react';
import { Leaf, Clock, Car, TrendingUp } from 'lucide-react-native';
import { commuteStore$ } from '@/stores/commuteStore';
import { colors, spacing, textStyles, borderRadius, shadows } from '@/config/styles';

const StatCard = ({ icon: Icon, title, value, subtitle, color = colors.eco }: {
  icon: any;
  title: string;
  value: string;
  subtitle?: string;
  color?: string;
}) => {
  const $card = {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  };

  const $iconContainer = {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: color + '20',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: spacing.md,
  };

  const $value = {
    ...textStyles.h1,
    color,
  };

  return (
    <View style={$card}>
      <View style={$iconContainer}>
        <Icon size={24} color={color} strokeWidth={2} />
      </View>
      <Text style={textStyles.h3}>{title}</Text>
      <Text style={$value}>{value}</Text>
      {subtitle && <Text style={textStyles.caption}>{subtitle}</Text>}
    </View>
  );
};

export default observer(function StatsTab() {
  const stats = commuteStore$.stats.get();
  const settings = commuteStore$.settings.get();
  
  const distanceUnit = settings.units === 'imperial' ? 'miles' : 'km';
  const displayDistance = settings.units === 'imperial' 
    ? stats.totalMilesAvoided 
    : (stats.totalMilesAvoided * 1.60934);

  const $container = {
    flex: 1,
    backgroundColor: colors.background,
  };

  const $header = {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  };

  const $content = {
    padding: spacing.lg,
    paddingTop: 0,
  };

  const $impactSection = {
    marginTop: spacing.lg,
  };

  const $impactCard = {
    backgroundColor: colors.eco,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  };

  const $impactText = {
    ...textStyles.body,
    color: colors.surface,
    textAlign: 'center' as const,
  };

  const $impactValue = {
    ...textStyles.h2,
    color: colors.surface,
    textAlign: 'center' as const,
    marginVertical: spacing.sm,
  };

  return (
    <SafeAreaView style={$container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={$header}>
          <Text style={textStyles.h1}>Impact Stats</Text>
          <Text style={textStyles.bodySecondary}>
            See the positive impact of your choices
          </Text>
        </View>

        <View style={$content}>
          <StatCard
            icon={TrendingUp}
            title="Commutes Avoided"
            value={stats.avoidedCommutes.toString()}
            subtitle={`out of ${stats.totalCommutes} total commutes`}
          />

          <StatCard
            icon={Car}
            title="Distance Not Driven"
            value={displayDistance.toFixed(1)}
            subtitle={distanceUnit}
            color={colors.info}
          />

          <StatCard
            icon={Clock}
            title="Parking Hours Saved"
            value={stats.totalParkingHoursAvoided.toFixed(1)}
            subtitle="hours of your life back!"
            color={colors.warning}
          />

          <View style={$impactSection}>
            <View style={$impactCard}>
              <Leaf size={32} color={colors.surface} strokeWidth={2} style={{ alignSelf: 'center' }} />
              <Text style={$impactText}>CO₂ Emissions Avoided</Text>
              <Text style={$impactValue}>{stats.co2Saved.toFixed(1)} kg</Text>
              <Text style={$impactText}>
                Equivalent to planting {Math.round(stats.co2Saved / 21.77)} trees!
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});