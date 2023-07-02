import { Menu } from "electron";

//todo xdd
export const CLIPBOARD_SPLIT = `
@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@
`
export const CLIPBOARD_SPLIT2 = `
@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@`
const rootDir = process.cwd()

export const CLIPBOARD_DATA_PATH = rootDir+"\\data\\text.txt"





const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click() {
            // Handle "Open" action
          }
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click() {
            // Handle "Save" action
          }
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click() {
            // app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          role: 'cut'
        },
        {
          role: 'copy'
        },
        {
          role: 'paste'
        },
        
      ]
    },
  ];




//   const menu = Menu.buildFromTemplate(template )



export const CLIPBOARD_WINDOW_MENU = Menu.buildFromTemplate(template as Electron.MenuItemConstructorOptions[])