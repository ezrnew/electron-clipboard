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

     sendInitialClipboardData () {

       getInitialClipboard()
        .then(dataArray => {
          console.log('dataArray w then' )
          console.log(dataArray)
          this.window.webContents.send(ipcMainActions.initialClipboard, dataArray);

        })


    }

    sendClipboardData(data: string) {

   
        this.window.webContents.send(ipcMainActions.clipboard, data);

    }


    private initIpcListeners() {

        ipcMain.on(ipcRendererActions.windowOnTop, (event, arg: boolean) => {

            this.window.setAlwaysOnTop(arg)


        });
        
        ipcMain.on(ipcRendererActions.windowReady, (event) => {

            this.sendInitialClipboardData()


        });






    }

}
