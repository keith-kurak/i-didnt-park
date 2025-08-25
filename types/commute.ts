export interface Commute {
  id: string;
  type: 'drove' | 'avoided';
  transportationMode?: 'walk' | 'bicycle' | 'transit' | 'avoided-entirely';
  description: string;
  distance: number;
  isRoundTrip: boolean;
  parkingHours?: number;
  timestamp: number;
}

export interface CommuteStats {
  totalCommutes: number;
  avoidsedCommutes: number;
  totalMilesAvoided: number;
  totalParkingHoursAvoided: number;
  co2Saved: number; // in kg
}

export interface Settings {
  units: 'imperial' | 'metric';
  notifications: {
    weekdayReminders: boolean;
    reminderTime: string;
  };
}