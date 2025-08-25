import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Leaf, Car, Clock, MapPin, Users, DollarSign } from 'lucide-react-native';
import { colors, spacing, textStyles, borderRadius, shadows } from '@/config/styles';

const FactCard = ({ icon: Icon, title, fact, color = colors.eco }: {
  icon: any;
  title: string;
  fact: string;
  color?: string;
}) => {
  const $card = {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  };

  const $header = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: spacing.md,
  };

  const $iconContainer = {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color + '20',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: spacing.md,
  };

  return (
    <View style={$card}>
      <View style={$header}>
        <View style={$iconContainer}>
          <Icon size={20} color={color} strokeWidth={2} />
        </View>
        <Text style={textStyles.h3}>{title}</Text>
      </View>
      <Text style={textStyles.body}>{fact}</Text>
    </View>
  );
};

export default function FactsTab() {
  const facts = [
    {
      icon: Leaf,
      title: "Carbon Footprint",
      fact: "The average car emits about 404 grams of CO₂ per mile. By avoiding just 10 miles of driving per week, you prevent over 200 kg of CO₂ emissions annually.",
      color: colors.eco,
    },
    {
      icon: MapPin,
      title: "Urban Space",
      fact: "In downtown areas, up to 30% of land is dedicated to parking. Each parking space takes up about 180 square feet - that's a small room in your house!",
      color: colors.info,
    },
    {
      icon: Clock,
      title: "Time Spent Parking",
      fact: "Studies show drivers spend an average of 17 hours per year just looking for parking spots. That's more than two full work days!",
      color: colors.warning,
    },
    {
      icon: DollarSign,
      title: "Cost Savings",
      fact: "The average cost of owning and operating a car is about $0.65 per mile. Every mile you avoid driving saves you money and the environment.",
      color: colors.success,
    },
    {
      icon: Users,
      title: "Public Health",
      fact: "Cities with more walkable infrastructure and public transit have 50% lower rates of obesity and cardiovascular disease among residents.",
      color: colors.eco,
    },
    {
      icon: Car,
      title: "Traffic Impact",
      fact: "If just 10% of commuters switched to alternative transportation one day per week, traffic congestion would decrease by 40% during peak hours.",
      color: colors.info,
    },
  ];

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

  return (
    <SafeAreaView style={$container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={$header}>
          <Text style={textStyles.h1}>Did You Know?</Text>
          <Text style={textStyles.bodySecondary}>
            Learn about the impact of sustainable transportation
          </Text>
        </View>

        <View style={$content}>
          {facts.map((fact, index) => (
            <FactCard key={index} {...fact} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}