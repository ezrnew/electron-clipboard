import { Menu } from "electron";
import { win } from "../main";


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
    win.setAlwaysOnTop(!win.isAlwaysOnTop())

}



export const CLIPBOARD_WINDOW_MENU = Menu.buildFromTemplate(template as Electron.MenuItemConstructorOptions[])