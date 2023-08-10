// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// const ipcEvents =    require("../common/events.ts")

// const { app, BrowserWindow,ipcMain  } = require('electron')
import { app, BrowserWindow, globalShortcut, ipcMain, Menu, Rectangle, screen } from 'electron';
import * as Positioner from 'electron-positioner';

import * as path from 'path';
import { windowStickToBorderHandler } from './utils/windowStickToScreenBorder';
import { clipboardHandler } from './utils/clipboardHandler';
import { IpcMainHandler } from './connection/IpcMainHandler';
import { keyboardShortcutsHandler } from './utils/keyboardShortcutsHandler';
import { CLIPBOARD_WINDOW_MENU } from './utils/menuBarHandler';
import { paintWindow } from './features/paintWindow/PaintWindow';
import Store from 'electron-store';

const store = new Store();

export let win: BrowserWindow;
console.log(app.getPath('userData'));

const createWindow = () => {
  const clipboardBounds = store.get('clipboard-bounds') as Rectangle;
  const bounds = clipboardBounds
    ? { width: clipboardBounds.width, height: clipboardBounds.height, x: clipboardBounds.x, y: clipboardBounds.y }
    : { width: null, height: null, x: null, y: null };

  win = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    autoHideMenuBar:true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
      devTools: true,
    },
  });

  Menu.setApplicationMenu(CLIPBOARD_WINDOW_MENU);

  win.loadFile(path.join(app.getAppPath(), 'src', 'renderer', 'index.html'));

  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  win.on('close', () => {
    store.set('clipboard-bounds', win.getBounds());
  });
  win.setAlwaysOnTop(store.get('always-on-top') as boolean);

  //?
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  initApp();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

function initApp() {
  const ipc = new IpcMainHandler(win);

  clipboardHandler(ipc);
  keyboardShortcutsHandler(ipc);
}
