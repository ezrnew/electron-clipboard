import { ipcRenderer } from "electron"
import { ipcMainActions, ipcRendererActions } from "../../common/ipcActions";
import { reducerActions, store } from "../store/store"
import { appendClipboardData, displayInitialClipboardData } from "../utils/displayClipboard";
import { setImage } from "../features/paintWindow/paintRenderer";

 class IpcRendererHandler {

    constructor() {
        this.sendWindowReady()
        this.initIpcListeners()
    }

    sendGuwno(data: boolean) {
        ipcRenderer.send(ipcRendererActions.windowOnTop, data)

    }
    sendWindowReady() {
        ipcRenderer.send(ipcRendererActions.windowReady)

    }

    sendPaintRequest(data: string) {
        ipcRenderer.send(ipcRendererActions.paintRequest, data)

    }






    private initIpcListeners() {
        ipcRenderer.on(ipcMainActions.initialClipboard, (_event, value) => {

            console.log('received initial clipboardxd ')


            store.dispatch({ type: reducerActions.SET_INITIAL_CLIPBOARD, payload: value })
            displayInitialClipboardData(value)

        })
        ipcRenderer.on(ipcMainActions.clipboard, (_event, value) => {


            store.dispatch({ type: reducerActions.ADD_CLIPBOARD_ENTRY, payload: value })
            appendClipboardData(value)
        })

        ipcRenderer.on(ipcMainActions.clipboard, (_event, value) => {


            store.dispatch({ type: reducerActions.ADD_CLIPBOARD_ENTRY, payload: value })
            appendClipboardData(value)
        })

        ipcRenderer.on(ipcMainActions.shortcutData, (_event, data) => {

            // console.log("received shortcut:")
            // console.log(data)
            // store.dispatch({type:reducerActions.ADD_CLIPBOARD_ENTRY,payload:value})
            // appendClipboardData(value)
        })


        //!paint
        ipcRenderer.on(ipcMainActions.paintResponse, (_event, data) => {

            console.log("received paint response:")
            console.log(data.substring(1,60))
            setImage(data)
            // store.dispatch({type:reducerActions.ADD_CLIPBOARD_ENTRY,payload:value})
            // appendClipboardData(value)
        })





    }


}

export const ipc = new IpcRendererHandler()