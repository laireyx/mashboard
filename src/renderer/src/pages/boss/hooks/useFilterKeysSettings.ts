import { useCallback, useState } from 'react';
import type {
  KeyboardFilterKeySettings,
  KeyboardFilterKeyUpdate,
} from '../../../../../shared/keyboardFilterKeys';

export type FilterKeyStatus =
  | { type: 'idle' }
  | { type: 'applying' }
  | { type: 'applied' }
  | { type: 'unavailable'; reason: string }
  | { type: 'error'; reason: string };

export function useFilterKeysSettings() {
  const bridge = window.mashboard;
  const [status, setStatus] = useState<FilterKeyStatus>({ type: 'idle' });

  const applyFilterKeys = useCallback(
    async (
      update: KeyboardFilterKeyUpdate,
    ): Promise<KeyboardFilterKeySettings | undefined> => {
      if (!bridge?.setKeyboardFilterKeys) {
        setStatus({
          type: 'unavailable',
          reason: 'Electron bridge is unavailable.',
        });
        return undefined;
      }

      setStatus({ type: 'applying' });

      try {
        const settings = await bridge.setKeyboardFilterKeys(update);
        setStatus({ type: 'applied' });
        return settings;
      } catch (nextError: unknown) {
        setStatus({
          type: 'error',
          reason:
            nextError instanceof Error
              ? nextError.message
              : 'Failed to apply FilterKeys settings.',
        });
        return undefined;
      }
    },
    [bridge],
  );

  return {
    applyFilterKeys,
    status,
  };
}
