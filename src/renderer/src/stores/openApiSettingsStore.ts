import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface OpenApiSettingsState {
  characterName: string;
  settingsVersion: number;
  setCharacterName: (characterName: string) => void;
}

export const useOpenApiSettingsStore = create<OpenApiSettingsState>()(
  persist(
    (set) => ({
      characterName: '',
      settingsVersion: 0,
      setCharacterName: (characterName) =>
        set((state) => ({
          characterName,
          settingsVersion: state.settingsVersion + 1,
        })),
    }),
    {
      name: 'mashboard-openapi-settings',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ characterName }) => ({ characterName }),
    },
  ),
);
