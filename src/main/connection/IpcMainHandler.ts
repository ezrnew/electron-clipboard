import { ipcMainActions, ipcRendererActions } from "../../common/ipcActions"
import { BrowserWindow, IpcMain, ipcMain } from "electron"
import { getInitialClipboard } from "../utils/clipboardHandler";
import { paintWindow } from "../features/paintWindow/PaintWindow";
// import { getInitialClipboard } from "../utils/clipboardHandler";

export class IpcMainHandler {

    private window: BrowserWindow
    private paintSender: Electron.IpcMainEvent["sender"]


    constructor(window: BrowserWindow) {
        // console.log('consturctor:', window, ":::", paintWindow)

        this.window = window;
        // this.paintwindow = paintWindow;

        this.initIpcListeners()
    }

    sendClipboardEvery60() {
        //todo

        getInitialClipboard()
            .then(dataArray => {

                this.window.webContents.send(ipcMainActions.initialClipboard, dataArray);

            })


    }

    sendClipboardData(data: string) {
        this.window.webContents.send(ipcMainActions.clipboard, data);
    }

    sendShortcutData(data: shortcutData) {
        this.window.webContents.send(ipcMainActions.shortcutData, data);
    }



    // PAINT 

    sendPaintResponse(image64: string) {

        //    console.log('sending paing res to:',this.paintSender)
        this.paintSender.send(ipcMainActions.paintResponse, image64)
        // this.paintwindow.webContents.send(ipcMainActions.paintResponse, image64);

    }


    //!################################# INIT LISTENERS #######################################

    private initIpcListeners() {


        ipcMain.on(ipcRendererActions.windowReady, (event) => {

            this.sendClipboardEvery60()


        });


        ipcMain.on(ipcRendererActions.paintRequest, (event, arg) => {
            //todo need to add verification on renderer and here if its valid image


            console.log('received paint request with data: ', arg.substring(1, 100))

            paintWindow.open(arg)

            // this.sendPaintResponse(paintWindow.getImage())


        });



        ipcMain.on(ipcRendererActions.paintWindowReady, (event, arg) => {
            this.paintSender = event.sender
            // console.log('PAINT GOTUW,sender',event.sender)

            // console.log('received paint request with data: ',arg.substring(1,100))

            // // paintWindow.open(arg)

            this.sendPaintResponse(paintWindow.getImage())


        });






    }

}
