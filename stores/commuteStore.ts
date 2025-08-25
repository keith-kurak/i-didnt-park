import { observable } from '@legendapp/state';
import { configureSynced, syncObservable } from '@legendapp/state/sync';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage'
import { observablePersistSqlite } from '@legendapp/state/persist-plugins/expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'expo-sqlite/kv-store';
import { Platform } from 'react-native';
import { randomUUID } from 'expo-crypto';
import type { Commute, Settings } from '@/types/commute';

// Calculate CO2 savings (rough estimate: 404g CO2 per mile for average car)
const calculateCO2Saved = (miles: number) => miles * 0.404;

export const commuteStore$ = observable({
  commutes: [] as Commute[],
  settings: {
    units: 'imperial',
    notifications: {
      weekdayReminders: true,
      reminderTime: '17:00',
    },
  } as Settings,

  // Computed values
  stats: (): any => {
    const commutes = commuteStore$.commutes.get();
    const avoidedCommutes = commutes.filter(c => c.type === 'avoided');
    
    const totalMilesAvoided = avoidedCommutes.reduce((sum, commute) => {
      return sum + (commute.isRoundTrip ? commute.distance * 2 : commute.distance);
    }, 0);
    
    const totalParkingHoursAvoided = avoidedCommutes.reduce((sum, commute) => {
      return sum + (commute.parkingHours || 0);
    }, 0);

    return {
      totalCommutes: commutes.length,
      avoidedCommutes: avoidedCommutes.length,
      totalMilesAvoided,
      totalParkingHoursAvoided,
      co2Saved: calculateCO2Saved(totalMilesAvoided),
    };
  },

  // Actions
  addCommute: (commute: Omit<Commute, 'id' | 'timestamp'>) => {
    const newCommute: Commute = {
      ...commute,
      id: randomUUID(),
      timestamp: Date.now(),
    };
    commuteStore$.commutes.push(newCommute);
  },

  removeCommute: (id: string) => {
    const index = commuteStore$.commutes.findIndex(c => c.id === id);
    if (index > -1) {
      commuteStore$.commutes.splice(index, 1);
    }
  },

  updateSettings: (settings: Partial<Settings>) => {
    commuteStore$.settings.assign(settings);
  },
});

// Global configuration for persistence
const persistOptions = configureSynced({
  persist: {
    plugin: Platform.OS === 'web' 
      ? ObservablePersistLocalStorage
      : observablePersistSqlite(Storage)
  },
});

syncObservable(
  commuteStore$,
  persistOptions({
    persist: {
      name: 'commuteStore',
    },
  }),
);