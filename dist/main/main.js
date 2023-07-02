"use strict";
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
Object.defineProperty(exports, "__esModule", { value: true });
// const ipcEvents =    require("../common/events.ts")
// const { app, BrowserWindow,ipcMain  } = require('electron')
const electron_1 = require("electron");
const path = require("path");
const clipboardHandler_1 = require("./utils/clipboardHandler");
const IpcMainHandler_1 = require("./connection/IpcMainHandler");
const keyboardShortcutsHandler_1 = require("./utils/keyboardShortcutsHandler");
let win;
const createWindow = () => {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
            devTools: true,
        }
    });
    console.log(path.join(electron_1.app.getAppPath(), 'src', 'renderer', 'index.html'));
    win.loadFile(path.join(electron_1.app.getAppPath(), 'src', 'renderer', 'index.html'));
    win.webContents.openDevTools();
};
electron_1.app.whenReady().then(() => {
    createWindow();
    //?
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
    initApp();
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
function initApp() {
    const ipc = new IpcMainHandler_1.IpcMainHandler(win);
    (0, clipboardHandler_1.clipboardHandler)(ipc);
    (0, keyboardShortcutsHandler_1.keyboardShortcutsHandler)(ipc);
}
