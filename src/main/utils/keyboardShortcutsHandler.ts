import { clipboard, globalShortcut } from "electron";
import { IpcMainHandler } from "../connection/IpcMainHandler";
import * as ncp from "copy-paste"
import { paintWindow } from "../features/paintWindow/PaintWindow";
// const { clipboard } = require('electron');
// import ks from "node-key-sender"


// const printSelectedText = (selectedText) => {
//   console.log(`Selected Text: ${selectedText}`);
// };


//!global hotkeys prevent default behavior
//todo custom keys
export const keyboardShortcutsHandler = (ipc: IpcMainHandler) =>{

    const copy1 = 'CommandOrControl+Shift+1';
    const copy2 = 'CommandOrControl+Shift+2';
    const paste1 = 'CommandOrControl+Alt+1';
    const paste2 = 'CommandOrControl+Alt+2';
    const copyDefault = 'CommandOrControl+C';


//     globalShortcut.register(copyDefault, () => {
//       // Handle the key combination event
//       // console.log(paintWindow.getWindow())
// if(!paintWindow.getWindow() || paintWindow.getWindow().isDestroyed()) return

//       console.log('SFOKUSOWANE OKNO PAINTOWE:',paintWindow.getWindow().isFocused())
//       // console.log())

      
//       // console.log('paste 2');
//     })



    // globalShortcut.register(copy1, async() => {
    //   // Handle the key combination event

    //   // ncp.copy('some text', function () {
    //     // robot.keyToggle('v');
    //     // robot.keyToggle('control');
    //     // robot.keyToggle('v');
    //   // })
    //   ipc.sendShortcutData({data:clipboard.readText(),type:"copy",index:1})

      
    //   console.log('copy 1');
    // });

    // globalShortcut.register(copy2, () => {
      
      

    //   const printSelectedText = (selectedText) => {
    //     console.log(`Selected Text: ${selectedText}`);
    //   };
      
      
    //   // Handle the key combination event

      
    //   console.log('copy 2');
    // })

    // globalShortcut.register(paste1, () => {
    //   // Handle the key combination event

    //   console.log("kombinancja")

    //   // ks.sendKey('a')
    //   console.log("kombinancja2")
    //   // ncp.paste('pastadozembuw')
    //   // ncp.paste('pastadozembuw', function () {
    //   //   // complete...
    //   //   console.log("ncp copy")
    //   // })



      
    //   console.log('paste 1 ');
    // })

    // globalShortcut.register(paste2, () => {
    //   // Handle the key combination event

      
    //   console.log('paste 2');
    // })
    


}