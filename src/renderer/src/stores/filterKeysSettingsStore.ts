import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface FilterKeyDelaySettings {
  acceptDelayMs: number;
  repeatDelayMs: number;
  repeatRateMs: number;
}

interface FilterKeysSettingsState extends FilterKeyDelaySettings {
  enabled: boolean;
  setDelaySettings: (settings: Partial<FilterKeyDelaySettings>) => void;
  setEnabled: (enabled: boolean) => void;
}

export const defaultFilterKeyDelaySettings: FilterKeyDelaySettings = {
  acceptDelayMs: 0,
  repeatDelayMs: 0,
  repeatRateMs: 0,
};

export const defaultFilterKeysSettings = {
  enabled: false,
  ...defaultFilterKeyDelaySettings,
};

export const useFilterKeysSettingsStore = create<FilterKeysSettingsState>()(
  persist(
    (set) => ({
      ...defaultFilterKeysSettings,
      setDelaySettings: (settings) => set(settings),
      setEnabled: (enabled) => set({ enabled }),
    }),
    {
      name: 'mashboard-filter-key-settings',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ acceptDelayMs, repeatDelayMs, repeatRateMs }) => ({
        acceptDelayMs,
        repeatDelayMs,
        repeatRateMs,
      }),
    },
  ),
);
