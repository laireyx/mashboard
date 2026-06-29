import { contextBridge, ipcRenderer } from 'electron';
import type {
  KeyboardFilterKeySettings,
  KeyboardFilterKeyUpdate,
} from '../shared/keyboardFilterKeys';

contextBridge.exposeInMainWorld('mashboard', {
  getAppVersion: () => ipcRenderer.invoke('app:version') as Promise<string>,
  openExternalUrl: (url: string) =>
    ipcRenderer.invoke('app:open-external-url', url) as Promise<void>,
  getKeyboardFilterKeys: () =>
    ipcRenderer.invoke(
      'keyboard:get-filter-keys',
    ) as Promise<KeyboardFilterKeySettings>,
  setKeyboardFilterKeys: (update: KeyboardFilterKeyUpdate) =>
    ipcRenderer.invoke(
      'keyboard:set-filter-keys',
      update,
    ) as Promise<KeyboardFilterKeySettings>,
});
