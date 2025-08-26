import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Shield } from 'lucide-react-native';
import { colors, spacing, textStyles, borderRadius, shadows } from '@/config/styles';

export default function PrivacyScreen() {
  const router = useRouter();

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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.info + '20',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: spacing.lg,
  };

  const $section = {
    marginBottom: spacing.xl,
  };

  const $lastUpdated = {
    ...textStyles.caption,
    textAlign: 'center' as const,
    marginTop: spacing.lg,
    fontStyle: 'italic' as const,
  };

  return (
    <SafeAreaView style={$container}>
      <View style={$header}>
        <TouchableOpacity style={$backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text.primary} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={textStyles.h2}>Privacy Policy</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={$content}>
        <View style={$heroSection}>
          <View style={$iconContainer}>
            <Shield size={30} color={colors.info} strokeWidth={2} />
          </View>
          <Text style={[textStyles.bodySecondary, { textAlign: 'center' }]}>
            Your privacy is important to us. This policy explains how I Didn't Park handles your data.
          </Text>
        </View>

        <View style={$section}>
          <Text style={textStyles.h3}>Data Collection</Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            I Didn't Park is designed with privacy as a core principle. We collect minimal data necessary for the app to function:
          </Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            • Commute records you manually enter (transportation type, distance, description, parking hours){'\n'}
            • App settings and preferences{'\n'}
            • No personal information, location data, or identifying information is collected
          </Text>
        </View>

        <View style={$section}>
          <Text style={textStyles.h3}>Data Storage</Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            All your data is stored locally on your device using secure storage mechanisms:
          </Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            • On mobile devices: SQLite database with device encryption{'\n'}
            • On web browsers: Local storage with browser security{'\n'}
            • No data is transmitted to external servers{'\n'}
            • No cloud storage or backup services are used{'\n'}
            • Data remains on your device at all times
          </Text>
        </View>

        <View style={$section}>
          <Text style={textStyles.h3}>Data Sharing</Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            We do not share, sell, rent, or trade your data with any third parties. Since all data stays on your device, there is no data transmission to analyze or share.
          </Text>
        </View>

        <View style={$section}>
          <Text style={textStyles.h3}>Analytics and Tracking</Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            I Didn't Park does not use any analytics services, tracking pixels, or advertising networks. We do not collect usage statistics or behavioral data.
          </Text>
        </View>

        <View style={$section}>
          <Text style={textStyles.h3}>Permissions</Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            The app requests minimal permissions:
          </Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            • Storage access: To save your commute data locally{'\n'}
            • No location, camera, contacts, or other sensitive permissions are requested
          </Text>
        </View>

        <View style={$section}>
          <Text style={textStyles.h3}>Data Deletion</Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            You have complete control over your data:
          </Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            • Delete individual commute entries at any time{'\n'}
            • Clear all data using the "Clear All Data" option in Settings{'\n'}
            • Uninstalling the app removes all associated data{'\n'}
            • No data recovery is possible once deleted (since we don't store backups)
          </Text>
        </View>

        <View style={$section}>
          <Text style={textStyles.h3}>Security</Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            We implement security best practices:
          </Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            • Data is stored using platform-standard secure storage{'\n'}
            • No network communication means no data interception risk{'\n'}
            • App follows platform security guidelines{'\n'}
            • Regular security updates through app store updates
          </Text>
        </View>

        <View style={$section}>
          <Text style={textStyles.h3}>Children's Privacy</Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            I Didn't Park does not knowingly collect any data from children under 13. Since we don't collect personal information from any users, this app is safe for all ages.
          </Text>
        </View>

        <View style={$section}>
          <Text style={textStyles.h3}>Changes to This Policy</Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            We may update this privacy policy from time to time. Any changes will be reflected in app updates, and we will update the "Last Updated" date below. Continued use of the app after updates constitutes acceptance of the new policy.
          </Text>
        </View>

        <View style={$section}>
          <Text style={textStyles.h3}>Contact</Text>
          <Text style={[textStyles.body, { marginTop: spacing.sm }]}>
            Since this app operates entirely offline and we don't collect contact information, we cannot provide direct support. However, the app is designed to be simple and self-explanatory.
          </Text>
        </View>

        <Text style={$lastUpdated}>
          Last updated: January 2025
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}