import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Leaf, Car, Clock, MapPin, Shield } from 'lucide-react-native';
import { colors, spacing, textStyles, borderRadius, shadows } from '@/config/styles';

export default function AboutScreen() {
  const router = useRouter();

  const handlePrivacyPress = () => {
    router.push('/privacy');
  };

  const $container = {
    flex: 1,
    backgroundColor: colors.background,
  };

  const $header = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    padding: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    ...shadows.sm,
  };

  const $backButton = {
    marginRight: spacing.md,
  };

  const $content = {
    padding: spacing.lg,
  };

  const $heroSection = {
    alignItems: 'center' as const,
    marginBottom: spacing.xl,
  };

  const $iconContainer = {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.eco + '20',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: spacing.lg,
  };

  const $section = {
    marginBottom: spacing.xl,
  };

  const $featureList = {
    marginTop: spacing.md,
  };

  const $featureItem = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: spacing.md,
  };

  const $featureIcon = {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.eco + '20',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: spacing.md,
  };

  const $privacyButton = {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginTop: spacing.lg,
    ...shadows.sm,
  };

  return (
    <SafeAreaView style={$container}>
      <View style={$header}>
        <TouchableOpacity style={$backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text.primary} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={textStyles.h2}>About I Didn't Park</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={$content}>
        <View style={$heroSection}>
          <View style={$iconContainer}>
            <Leaf size={40} color={colors.eco} strokeWidth={2} />
          </View>
          <Text style={textStyles.h1}>I Didn't Park</Text>
          <Text style={[textStyles.bodySecondary, { textAlign: 'center', marginTop: spacing.sm }]}>
            Track your sustainable transportation choices and see the positive impact you're making on the environment.
          </Text>
        </View>

        <View style={$section}>
          <Text style={textStyles.h3}>What is I Didn't Park?</Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            I Didn't Park is a simple yet powerful app that helps you track every time you choose sustainable transportation over driving. Whether you walk, bike, take public transit, or avoid a trip entirely, every choice matters for our planet.
          </Text>
        </View>

        <View style={$section}>
          <Text style={textStyles.h3}>Key Features</Text>
          <View style={$featureList}>
            <View style={$featureItem}>
              <View style={$featureIcon}>
                <Car size={16} color={colors.eco} strokeWidth={2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={textStyles.body}>Track Your Commutes</Text>
                <Text style={textStyles.caption}>Log both driving and sustainable transportation choices</Text>
              </View>
            </View>

            <View style={$featureItem}>
              <View style={$featureIcon}>
                <Clock size={16} color={colors.eco} strokeWidth={2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={textStyles.body}>Impact Statistics</Text>
                <Text style={textStyles.caption}>See your CO₂ savings, miles avoided, and parking hours saved</Text>
              </View>
            </View>

            <View style={$featureItem}>
              <View style={$featureIcon}>
                <MapPin size={16} color={colors.eco} strokeWidth={2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={textStyles.body}>Educational Facts</Text>
                <Text style={textStyles.caption}>Learn about the environmental impact of transportation choices</Text>
              </View>
            </View>

            <View style={$featureItem}>
              <View style={$featureIcon}>
                <Leaf size={16} color={colors.eco} strokeWidth={2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={textStyles.body}>Privacy First</Text>
                <Text style={textStyles.caption}>All data stays on your device - no tracking, no ads</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={$section}>
          <Text style={textStyles.h3}>Why Track Sustainable Transportation?</Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            Small changes in our daily transportation habits can have a significant environmental impact. By tracking your sustainable choices, you can:
          </Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            • Visualize your positive environmental impact{'\n'}
            • Stay motivated to make eco-friendly choices{'\n'}
            • Understand how much money you save{'\n'}
            • See the cumulative effect of your actions{'\n'}
            • Inspire others to make similar changes
          </Text>
        </View>

        <View style={$section}>
          <Text style={textStyles.h3}>Our Mission</Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            We believe that awareness leads to action. By making it easy to track and visualize the impact of sustainable transportation choices, we hope to encourage more people to consider alternatives to driving and parking.
          </Text>
        </View>

        <TouchableOpacity style={$privacyButton} onPress={handlePrivacyPress}>
          <Shield size={20} color={colors.text.primary} strokeWidth={2} />
          <Text style={[textStyles.body, { marginLeft: spacing.sm }]}>
            View Privacy Policy
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}