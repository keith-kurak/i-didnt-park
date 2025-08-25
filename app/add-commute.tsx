import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Switch, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  interpolateColor 
} from 'react-native-reanimated';
import { ArrowLeft, Car, Wallet as Walk, Bike, Bus, X, Check } from 'lucide-react-native';
import { commuteStore$ } from '@/stores/commuteStore';
import { colors, spacing, textStyles, borderRadius, shadows } from '@/config/styles';

const transportationOptions = [
  { key: 'walk', label: 'Walk', icon: Walk },
  { key: 'bicycle', label: 'Bicycle', icon: Bike },
  { key: 'transit', label: 'Public Transit', icon: Bus },
  { key: 'avoided-entirely', label: 'Avoided Trip', icon: X },
];

export default function AddCommuteScreen() {
  const router = useRouter();
  const [commuteType, setCommuteType] = useState<'drove' | 'avoided'>('avoided');
  const [transportationMode, setTransportationMode] = useState<string>('walk');
  const [description, setDescription] = useState('');
  const [distance, setDistance] = useState('');
  const [parkingHours, setParkingHours] = useState('');

  // Animation values
  const colorProgress = useSharedValue(1); // Start with green (avoided)

  useEffect(() => {
    colorProgress.value = withTiming(commuteType === 'avoided' ? 1 : 0, { duration: 300 });
  }, [commuteType]);

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      colorProgress.value,
      [0, 1],
      [colors.driving + '10', colors.eco + '10']
    ),
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      colorProgress.value,
      [0, 1],
      [colors.driving, colors.eco]
    ),
  }));

  const handleSave = () => {
    if (!description.trim() || !distance.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const distanceNum = parseFloat(distance);
    if (isNaN(distanceNum) || distanceNum <= 0) {
      Alert.alert('Invalid Distance', 'Please enter a valid distance.');
      return;
    }

    let parkingHoursNum = 0;
    if (parkingHours.trim()) {
      parkingHoursNum = parseFloat(parkingHours);
      if (isNaN(parkingHoursNum) || parkingHoursNum < 0) {
        Alert.alert('Invalid Parking Hours', 'Please enter valid parking hours.');
        return;
      }
    }

    commuteStore$.addCommute({
      type: commuteType,
      transportationMode: commuteType === 'avoided' ? transportationMode as any : undefined,
      description: description.trim(),
      distance: distanceNum,
      isRoundTrip: true,
      parkingHours: parkingHoursNum || undefined,
    });

    router.back();
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
  };

  const $backButton = {
    marginRight: spacing.md,
  };

  const $content = {
    flex: 1,
  };

  const $scrollContent = {
    padding: spacing.lg,
  };

  const $section = {
    marginBottom: spacing.xl,
  };

  const $segmentedControl = {
    flexDirection: 'row' as const,
    backgroundColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    marginBottom: spacing.lg,
  };

  const $segment = {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center' as const,
    borderRadius: borderRadius.md,
  };

  const $input = {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...textStyles.body,
    marginBottom: spacing.md,
  };

  const $transportationGrid = {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: spacing.sm,
    marginTop: spacing.md,
  };

  const $transportationOption = {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center' as const,
    borderWidth: 2,
    borderColor: colors.border,
  };

  const $selectedTransportation = {
    borderColor: colors.eco,
    backgroundColor: colors.eco + '10',
  };

  const $switchRow = {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  };

  const $saveButton = {
    margin: spacing.lg,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center' as const,
    ...shadows.md,
  };

  return (
    <SafeAreaView style={$container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.View style={[animatedHeaderStyle]}>
          <View style={$header}>
            <TouchableOpacity style={$backButton} onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.text.primary} strokeWidth={2} />
            </TouchableOpacity>
            <Text style={textStyles.h2}>Add Commute</Text>
          </View>
        </Animated.View>

        <ScrollView style={$content} contentContainerStyle={$scrollContent}>
          <View style={$section}>
            <Text style={textStyles.h3}>What did you do?</Text>
            <View style={$segmentedControl}>
              <TouchableOpacity
                style={[
                  $segment,
                  { backgroundColor: commuteType === 'drove' ? colors.driving : 'transparent' }
                ]}
                onPress={() => setCommuteType('drove')}
              >
                <Text style={[
                  textStyles.body,
                  { color: commuteType === 'drove' ? colors.surface : colors.text.primary }
                ]}>
                  Drove/Parked
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  $segment,
                  { backgroundColor: commuteType === 'avoided' ? colors.eco : 'transparent' }
                ]}
                onPress={() => setCommuteType('avoided')}
              >
                <Text style={[
                  textStyles.body,
                  { color: commuteType === 'avoided' ? colors.surface : colors.text.primary }
                ]}>
                  Avoided Driving
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {commuteType === 'avoided' && (
            <View style={$section}>
              <Text style={textStyles.h3}>How did you get around?</Text>
              <View style={$transportationGrid}>
                {transportationOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = transportationMode === option.key;
                  
                  return (
                    <TouchableOpacity
                      key={option.key}
                      style={[
                        $transportationOption,
                        isSelected && $selectedTransportation
                      ]}
                      onPress={() => setTransportationMode(option.key)}
                    >
                      <IconComponent 
                        size={24} 
                        color={isSelected ? colors.eco : colors.text.secondary} 
                        strokeWidth={2}
                      />
                      <Text style={[
                        textStyles.caption,
                        { color: isSelected ? colors.eco : colors.text.secondary, marginTop: spacing.xs }
                      ]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          <View style={$section}>
            <Text style={textStyles.h3}>Trip Details</Text>
            <TextInput
              style={$input}
              placeholder="Description (e.g., 'Work commute', 'Grocery store')"
              value={description}
              onChangeText={setDescription}
              placeholderTextColor={colors.text.light}
            />
            <TextInput
              style={$input}
              placeholder="Distance in miles"
              value={distance}
              onChangeText={setDistance}
              keyboardType="numeric"
              placeholderTextColor={colors.text.light}
            />
          </View>

          <View style={$section}>
            <Text style={[textStyles.body, { marginBottom: spacing.sm }]}>
              {commuteType === 'drove' ? 'Hours Parked' : 'Parking Hours Avoided'}
            </Text>
            <TextInput
              style={$input}
              placeholder="Hours (e.g., 8.5)"
              value={parkingHours}
              onChangeText={setParkingHours}
              keyboardType="numeric"
              placeholderTextColor={colors.text.light}
            />
          </View>
        </ScrollView>

        <Animated.View style={[animatedButtonStyle, $saveButton]}>
          <TouchableOpacity onPress={handleSave} style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Check size={20} color={colors.surface} strokeWidth={2} />
              <Text style={[textStyles.body, { color: colors.surface, marginLeft: spacing.sm }]}>
                Save Commute
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}