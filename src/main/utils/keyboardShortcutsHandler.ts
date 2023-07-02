import { globalShortcut } from "electron";
import { IpcMainHandler } from "../connection/IpcMainHandler";

//todo custom keys
export const keyboardShortcutsHandler = (ipc: IpcMainHandler) =>{

    const shortcut = 'CommandOrControl+Shift+1';
    globalShortcut.register(shortcut, () => {
      // Handle the key combination event
// 
        



      console.log('Key 1');
    });
    


}