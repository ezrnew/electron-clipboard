// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// const ipcEvents =    require("../common/events.ts")


// const { app, BrowserWindow,ipcMain  } = require('electron')
import { app, BrowserWindow, globalShortcut, ipcMain, Menu, screen } from 'electron'
import * as Positioner from 'electron-positioner'

import * as path from 'path'
import { windowStickToBorderHandler } from './utils/windowStickToScreenBorder';
import { clipboardHandler } from './utils/clipboardHandler';
import { IpcMainHandler } from './connection/IpcMainHandler';
import { keyboardShortcutsHandler } from './utils/keyboardShortcutsHandler';
import { CLIPBOARD_WINDOW_MENU } from './utils/menuBarHandler';
import { paintWindow } from './features/paintWindow/PaintWindow';
import { configType, readInitialConfig } from './utils/initialConfigHandler';

export let win: BrowserWindow;


const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        // autoHideMenuBar: true, //alt pokazuje dalej bara
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
            devTools: true,
        }
    })


    Menu.setApplicationMenu(CLIPBOARD_WINDOW_MENU)

    // console.log(path.join(app.getAppPath(), 'src','renderer', 'index.html'))
    win.loadFile(path.join(app.getAppPath(), 'src', 'renderer', 'index.html'))

    win.webContents.openDevTools();

}

app.whenReady().then(() => {

    createWindow()

    console.log("??5353sdsddd5")
    readInitialConfig().then((data:configType) => {
       win.setAlwaysOnTop(data.alwaysOnTop)
    }
        )


// const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

// (async () => {
//   if (!(await checkAccessibilityPermissions({ prompt: true }))) {
//     console.log('grant accessibility permissions and restart this program');
//     process.exit(1);
//   }

//   for (;;) {
//     try {
//       const selection = await getSelection();
//       console.log('current selection:', selection);
//     } catch (error) {
//       console.error('error', error);
//     }
//     await sleep(1000);
//   }
// })();


    // paintWindow.initialize()




//?
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })


    initApp()

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

function initApp() {

    const ipc = new IpcMainHandler(win)



    clipboardHandler(ipc)
    keyboardShortcutsHandler(ipc)



}

