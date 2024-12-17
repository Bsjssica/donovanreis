import { create } from 'zustand';

interface AlarmState {
  isActive: boolean;
  activatedAt: string | null;
  type: 'none' | 'flood' | 'fire' | 'chemical' | 'earthquake';
  location: string;
  activateAlarm: (type: 'flood' | 'fire' | 'chemical' | 'earthquake', location: string) => void;
  deactivateAlarm: () => void;
}

export const useAlarmStore = create<AlarmState>((set) => ({
  isActive: false,
  activatedAt: null,
  type: 'none',
  location: '',
  activateAlarm: (type, location) => set({
    isActive: true,
    activatedAt: new Date().toISOString(),
    type,
    location
  }),
  deactivateAlarm: () => set({
    isActive: false,
    activatedAt: null,
    type: 'none',
    location: ''
  })
}));