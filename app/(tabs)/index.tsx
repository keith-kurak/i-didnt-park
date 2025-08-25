import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { observer } from '@legendapp/state/react';
import { Plus, Car, Wallet as Walk, Bike, Bus, X } from 'lucide-react-native';
import { commuteStore$ } from '@/stores/commuteStore';
import { colors, spacing, textStyles, borderRadius, shadows } from '@/config/styles';
import type { Commute } from '@/types/commute';

const transportationIcons = {
  walk: Walk,
  bicycle: Bike,
  transit: Bus,
  'avoided-entirely': X,
};

const CommuteItem = observer(({ item }: { item: Commute }) => {
  const isEcoFriendly = item.type === 'avoided';
  const IconComponent = item.transportationMode ? transportationIcons[item.transportationMode] : Car;
  
  const handleDelete = () => {
    Alert.alert(
      'Delete Commute',
      'Are you sure you want to delete this commute?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => commuteStore$.removeCommute(item.id)
        },
      ]
    );
  };

  const $itemContainer = {
    backgroundColor: colors.surface,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    borderRadius: borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: isEcoFriendly ? colors.eco : colors.driving,
    ...shadows.sm,
  };

  const $iconContainer = {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: isEcoFriendly ? colors.eco + '20' : colors.driving + '20',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: spacing.md,
  };

  const $content = {
    flex: 1,
  };

  const $header = {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: spacing.xs,
  };

  const $deleteButton = {
    padding: spacing.xs,
  };

  return (
    <View style={$itemContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={$iconContainer}>
          <IconComponent 
            size={20} 
            color={isEcoFriendly ? colors.eco : colors.driving} 
            strokeWidth={2}
          />
        </View>
        <View style={$content}>
          <View style={$header}>
            <Text style={textStyles.body}>
              {item.type === 'avoided' ? 'Avoided Driving' : 'Drove & Parked'}
            </Text>
            <TouchableOpacity style={$deleteButton} onPress={handleDelete}>
              <X size={16} color={colors.text.secondary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
          <Text style={textStyles.caption}>{item.description}</Text>
          <Text style={textStyles.small}>
            {item.distance} miles {item.isRoundTrip ? '(round trip)' : ''}
            {item.parkingHours ? ` • ${item.parkingHours}h parking` : ''}
          </Text>
          <Text style={textStyles.small}>
            {new Date(item.timestamp).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
});

export default observer(function CommutesTab() {
  const router = useRouter();
  const commutes = commuteStore$.commutes.get();

  const $container = {
    flex: 1,
    backgroundColor: colors.background,
  };

  const $header = {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  };

  const $emptyState = {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: spacing.xl,
  };

  const $emptyText = {
    ...textStyles.bodySecondary,
    textAlign: 'center' as const,
    marginTop: spacing.md,
  };

  const $fab = {
    position: 'absolute' as const,
    bottom: spacing.xl,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.eco,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    ...shadows.lg,
  };

  return (
    <SafeAreaView style={$container}>
      <View style={$header}>
        <Text style={textStyles.h1}>My Commutes</Text>
        <Text style={textStyles.bodySecondary}>
          Track your daily transportation choices
        </Text>
      </View>

      {commutes.length === 0 ? (
        <View style={$emptyState}>
          <Car size={48} color={colors.text.light} strokeWidth={1.5} />
          <Text style={$emptyText}>
            No commutes tracked yet.{'\n'}
            Start by adding your first commute!
          </Text>
        </View>
      ) : (
        <FlatList
          data={commutes}
          renderItem={({ item }) => <CommuteItem item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <TouchableOpacity 
        style={$fab}
        onPress={() => router.push('/add-commute')}
        activeOpacity={0.8}
      >
        <Plus size={24} color={colors.surface} strokeWidth={2} />
      </TouchableOpacity>
    </SafeAreaView>
  );
});