import { ipcMainActions, ipcRendererActions } from "../../common/ipcActions"
import { BrowserWindow, IpcMain, ipcMain } from "electron"
import { getInitialClipboard } from "../utils/clipboardHandler";
// import { getInitialClipboard } from "../utils/clipboardHandler";

export class IpcMainHandler {

    private window: BrowserWindow


    constructor(window: BrowserWindow) {
        this.window = window;

        this.initIpcListeners()
    }

    //  sendInitialClipboardData () {

    //    getInitialClipboard()
    //     .then(dataArray => {

    //       this.window.webContents.send(ipcMainActions.initialClipboard, dataArray);

    //     })


    // }




    sendClipboardEvery60 () {
        //todo
        // [Error: EBUSY: resource busy or locked, open 'C:\Users\ja\OneDrive\Pulpit\reactjs\electron-clipboard\data\text.txt'] {
        //     errno: -4082,
        //     code: 'EBUSY',
        //     syscall: 'open',
        //     path: 'C:\\Users\\ja\\OneDrive\\Pulpit\\reactjs\\electron-clipboard\\data\\text.txt'

        getInitialClipboard()
        .then(dataArray => {

          this.window.webContents.send(ipcMainActions.initialClipboard, dataArray);

        })



        // setInterval( 
        //     ()=>{
        //         getInitialClipboard()
        //         .then(dataArray => {
        
        //           this.window.webContents.send(ipcMainActions.initialClipboard, dataArray);
        
        //         })
        

        //     }
            
            
        //     ,60000)


 
     }



    sendClipboardData(data: string) {

   
        this.window.webContents.send(ipcMainActions.clipboard, data);

    }


    sendShortcutData(data: any) {

   
        this.window.webContents.send(ipcMainActions.shortcutData, data);

    }


    private initIpcListeners() {

        ipcMain.on(ipcRendererActions.windowOnTop, (event, arg: boolean) => {

            this.window.setAlwaysOnTop(arg)


        });
        
        ipcMain.on(ipcRendererActions.windowReady, (event) => {

            this.sendClipboardEvery60()


        });






    }

}
