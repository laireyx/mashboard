import { load, sizeof, struct } from 'koffi';
import type { KeyboardFilterKeyUpdate } from '../shared/keyboardFilterKeys';

interface NativeFilterKeys {
  cbSize: number;
  dwFlags: number;
  iWaitMSec: number;
  iDelayMSec: number;
  iRepeatMSec: number;
  iBounceMSec: number;
}

type SystemParametersInfo = (
  uiAction: number,
  uiParam: number,
  pvParam: NativeFilterKeys,
  fWinIni: number,
) => boolean;

const SPI_GETFILTERKEYS = 0x0032;
const SPI_SETFILTERKEYS = 0x0033;
const FKF_FILTERKEYSON = 0x00000001;
const SPIF_UPDATEINIFILE = 0x0001;
const SPIF_SENDCHANGE = 0x0002;
const QUIET_ENABLED_FILTER_FLAGS = 0x23;
const WINDOWS_DEFAULT_DISABLED_FILTER_FLAGS = 0x7e;

let systemParametersInfo: SystemParametersInfo | undefined;
let getLastError: (() => number) | undefined;
let filterKeysSize = 0;

function assertWindows() {
  if (process.platform !== 'win32') {
    throw new Error(
      'Keyboard FilterKeys settings are only supported on Windows.',
    );
  }
}

function getBindings() {
  assertWindows();

  if (systemParametersInfo && getLastError && filterKeysSize > 0) {
    return { systemParametersInfo, getLastError, filterKeysSize };
  }

  const user32 = load('user32.dll');
  const kernel32 = load('kernel32.dll');

  const filterKeys = struct('FILTERKEYS', {
    cbSize: 'uint32_t',
    dwFlags: 'uint32_t',
    iWaitMSec: 'uint32_t',
    iDelayMSec: 'uint32_t',
    iRepeatMSec: 'uint32_t',
    iBounceMSec: 'uint32_t',
  });

  systemParametersInfo = user32.func(
    'bool __stdcall SystemParametersInfoW(uint uiAction, uint uiParam, _Inout_ FILTERKEYS *pvParam, uint fWinIni)',
  ) as unknown as SystemParametersInfo;
  getLastError = kernel32.func(
    'uint32_t __stdcall GetLastError()',
  ) as unknown as () => number;
  filterKeysSize = sizeof(filterKeys);

  return { systemParametersInfo, getLastError, filterKeysSize };
}

function throwSystemParametersInfoError(
  action: string,
  readLastError: () => number,
) {
  const lastError = readLastError();
  throw new Error(
    `SystemParametersInfo(${action}) failed with GetLastError=${lastError}.`,
  );
}

function readNativeFilterKeys() {
  const bindings = getBindings();
  const filterKeys: NativeFilterKeys = {
    cbSize: bindings.filterKeysSize,
    dwFlags: 0,
    iWaitMSec: 0,
    iDelayMSec: 0,
    iRepeatMSec: 0,
    iBounceMSec: 0,
  };
  const success = bindings.systemParametersInfo(
    SPI_GETFILTERKEYS,
    bindings.filterKeysSize,
    filterKeys,
    0,
  );

  if (!success) {
    throwSystemParametersInfoError('SPI_GETFILTERKEYS', bindings.getLastError);
  }

  return filterKeys;
}

export function getKeyboardFilterKeys() {
  const filterKeys = readNativeFilterKeys();

  return {
    enabled: (filterKeys.dwFlags & FKF_FILTERKEYSON) !== 0,
    acceptDelayMs: filterKeys.iWaitMSec,
    repeatDelayMs: filterKeys.iDelayMSec,
    repeatRateMs: filterKeys.iRepeatMSec,
    bounceDelayMs: filterKeys.iBounceMSec,
    rawFlags: filterKeys.dwFlags,
  };
}

export function setKeyboardFilterKeys(update: KeyboardFilterKeyUpdate) {
  const bindings = getBindings();
  const filterKeys = readNativeFilterKeys();
  const updatesDelay =
    update.acceptDelayMs !== undefined ||
    update.repeatDelayMs !== undefined ||
    update.repeatRateMs !== undefined;

  if (update.enabled !== undefined) {
    filterKeys.dwFlags = update.enabled
      ? QUIET_ENABLED_FILTER_FLAGS
      : WINDOWS_DEFAULT_DISABLED_FILTER_FLAGS;
  } else if (updatesDelay && (filterKeys.dwFlags & FKF_FILTERKEYSON) !== 0) {
    filterKeys.dwFlags = QUIET_ENABLED_FILTER_FLAGS;
  }

  if (update.acceptDelayMs !== undefined) {
    filterKeys.iWaitMSec = update.acceptDelayMs;
  }

  if (update.repeatDelayMs !== undefined) {
    filterKeys.iDelayMSec = update.repeatDelayMs;
  }

  if (update.repeatRateMs !== undefined) {
    filterKeys.iRepeatMSec = update.repeatRateMs;
  }

  if (updatesDelay) {
    filterKeys.iBounceMSec = 0;
  }

  const persist = update.persist ?? true;
  const broadcastChange = update.broadcastChange ?? false;
  const winIni =
    (persist ? SPIF_UPDATEINIFILE : 0) |
    (broadcastChange ? SPIF_SENDCHANGE : 0);
  const success = bindings.systemParametersInfo(
    SPI_SETFILTERKEYS,
    bindings.filterKeysSize,
    filterKeys,
    winIni,
  );

  if (!success) {
    throwSystemParametersInfoError('SPI_SETFILTERKEYS', bindings.getLastError);
  }

  return getKeyboardFilterKeys();
}
