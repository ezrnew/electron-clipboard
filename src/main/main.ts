import { app, BrowserWindow, globalShortcut, ipcMain, Menu, Tray, Rectangle, screen } from 'electron';
import * as Positioner from 'electron-positioner';

import * as path from 'path';
import { windowStickToBorderHandler } from './utils/windowStickToScreenBorder';
import { clipboardListenerHandler } from './utils/clipboardHandler';
import { ipc, IpcMainHandler } from './connection/IpcMainHandler';
import { CLIPBOARD_WINDOW_MENU, storeActions } from './utils/menuBarHandler';
import { paintWindow } from './features/paintWindow/PaintWindow';
import Store from 'electron-store';
import { registerGlobalShortcuts } from './utils/keyboardShortcutsHandler';
import { systemTrayHandler } from './utils/systemTrayHandler';

const store = new Store();

export let win: BrowserWindow;

const createWindow = () => {
  const hideMenu = store.get(storeActions.HIDE_MENU) as boolean;
  const clipboardBounds = store.get(storeActions.CLIPBOARD_BOUNDS) as Rectangle;
  const bounds = clipboardBounds
    ? { width: clipboardBounds.width, height: clipboardBounds.height, x: clipboardBounds.x, y: clipboardBounds.y }
    : { width: null, height: null, x: null, y: null };

  win = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    show: !store.get(storeActions.HIDE_WINDOW_ON_START) as boolean,
    skipTaskbar: !!store.get(storeActions.HIDE_TASKBAR_ICON) as boolean,
    autoHideMenuBar: hideMenu,
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
    store.set(storeActions.CLIPBOARD_BOUNDS, win.getBounds());
  });
  win.setAlwaysOnTop(store.get(storeActions.ALWAYS_ON_TOP) as boolean);

  //?
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  initApp();

  //
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

function initApp() {
  ipc.setMainWindow(win);
  clipboardListenerHandler();
  systemTrayHandler(win);
  if (store.get(storeActions.ENABLE_GLOBAL_SHORTCUTS)) registerGlobalShortcuts();
  //? enable if not specified in config
  else if (store.get(storeActions.ENABLE_GLOBAL_SHORTCUTS) === undefined) {
    store.set(storeActions.ENABLE_GLOBAL_SHORTCUTS, true);
    registerGlobalShortcuts();
  }
}
