/// <reference types="vite/client" />

import type {
  KeyboardFilterKeySettings,
  KeyboardFilterKeyUpdate,
} from '../../shared/keyboardFilterKeys';

interface MashboardBridge {
  getAppVersion: () => Promise<string>;
  openExternalUrl: (url: string) => Promise<void>;
  launchMapleStory: () => Promise<void>;
  getKeyboardFilterKeys: () => Promise<KeyboardFilterKeySettings>;
  setKeyboardFilterKeys: (
    update: KeyboardFilterKeyUpdate,
  ) => Promise<KeyboardFilterKeySettings>;
}

declare global {
  interface Window {
    mashboard?: MashboardBridge;
  }
}

export {};
