import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { KeyboardFilterKeyUpdate } from '../shared/keyboardFilterKeys';
import {
  getKeyboardFilterKeys,
  setKeyboardFilterKeys,
} from './keyboardFilterKeys';
import { registerMapleStoryDisplayMediaRequestHandler } from './mapleStoryCapture';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_ICON_PATH = app.isPackaged
  ? join(process.resourcesPath, 'icon.ico')
  : join(__dirname, '../../build/icon.ico');

function turnOffKeyboardFilterKeys() {
  if (process.platform !== 'win32') {
    return;
  }

  try {
    setKeyboardFilterKeys({ enabled: false });
  } catch (error) {
    console.error('Failed to turn off FilterKeys before quit.', error);
  }
}

function openExternalUrl(url: string) {
  const parsedUrl = new URL(url);

  if (parsedUrl.protocol !== 'https:') {
    throw new Error('Only HTTPS URLs can be opened externally.');
  }

  return shell.openExternal(parsedUrl.toString());
}

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 1180,
    height: 760,
    minWidth: 900,
    minHeight: 620,
    title: 'Mashboard',
    icon: APP_ICON_PATH,
    backgroundColor: '#f5f2ea',
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) {
      openExternalUrl(url);
      return { action: 'deny' };
    }

    return { action: 'deny' };
  });

  if (process.env.ELECTRON_RENDERER_URL) {
    await mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    return;
  }

  await mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
};

ipcMain.handle('app:version', () => app.getVersion());
ipcMain.handle('app:open-external-url', (_event, url: string) =>
  openExternalUrl(url),
);
ipcMain.handle('keyboard:get-filter-keys', () => getKeyboardFilterKeys());
ipcMain.handle(
  'keyboard:set-filter-keys',
  (_event, update: KeyboardFilterKeyUpdate) => setKeyboardFilterKeys(update),
);

app.whenReady().then(async () => {
  registerMapleStoryDisplayMediaRequestHandler();
  await createWindow();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on('before-quit', () => {
  turnOffKeyboardFilterKeys();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
