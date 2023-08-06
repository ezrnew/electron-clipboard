import { Menu } from "electron";
import { win } from "../main";
import { clearClipboardFile } from "./clipboardHandler";
import { alwaysOnTopConfigHandler } from "./initialConfigHandler";
// import * as config from "../../../data/initialConfig.json"


const template = [
    // {
    //   label: 'File',
    //   submenu: [
    //     {
    //       label: 'Open',
    //       accelerator: 'CmdOrCtrl+O',
    //       click() {
    //         // Handle "Open" action
    //       }
    //     },
    //     {
    //       label: 'Save',
    //       accelerator: 'CmdOrCtrl+S',
    //       click() {
    //         // Handle "Save" action
    //       }
    //     },
    //     {
    //       label: 'Quit',
    //       accelerator: 'CmdOrCtrl+Q',
    //       click() {
    //         // app.quit();
    //       }
    //     }
    //   ]
    // },
    {
      label: 'Settings',
      submenu: [
        {
          type: 'checkbox',
          label: 'always on top',
          click: alwaysOnTopHandler,
          checked:false,
        },
        {
          label: 'clear all data',
          click: clearClipboardHandler,
          checked:false,
        },
        // {
        //   role: 'copy'
        // },
        // {
        //   role: 'paste'
        // },
        
      ]
    },
  ];


function alwaysOnTopHandler () {
  console.log('alwayssontop?')
  alwaysOnTopConfigHandler(!win.isAlwaysOnTop())
    win.setAlwaysOnTop(!win.isAlwaysOnTop())

}


function clearClipboardHandler () {
  clearClipboardFile()
  //todo wyslac nowa date

}


export const CLIPBOARD_WINDOW_MENU = Menu.buildFromTemplate(template as Electron.MenuItemConstructorOptions[])