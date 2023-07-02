import { ipcMainActions, ipcRendererActions } from "../../common/ipcActions"
import { BrowserWindow, IpcMain, ipcMain } from "electron"
import { getInitialClipboard } from "../utils/clipboardHandler";
import { paintWindowHandler } from "../utils/paintWindowHandler";
// import { getInitialClipboard } from "../utils/clipboardHandler";

export class IpcMainHandler {

    private window: BrowserWindow


    constructor(window: BrowserWindow) {
        this.window = window;

        this.initIpcListeners()
    }




    sendClipboardEvery60 () {
        //todo

        getInitialClipboard()
        .then(dataArray => {

          this.window.webContents.send(ipcMainActions.initialClipboard, dataArray);

        })

 
     }



    sendClipboardData(data: string) {

   
        this.window.webContents.send(ipcMainActions.clipboard, data);

    }


    sendShortcutData(data: any) {

   
        this.window.webContents.send(ipcMainActions.shortcutData, data);

    }


    private initIpcListeners() {


        ipcMain.on(ipcRendererActions.windowReady, (event) => {

            this.sendClipboardEvery60()


        });


        ipcMain.on(ipcRendererActions.windowOnTop, (event, arg: boolean) => {

            this.window.setAlwaysOnTop(arg)


        });
        

        ipcMain.on(ipcRendererActions.paintRequest, (event,arg) => {
            //todo need to add verification on renderer and here if its valid image

            
            console.log('received paint request with data: ',arg)

            paintWindowHandler()


        });






    }

}
