import { ipcRenderer } from "electron"
import { ipcMainActions, ipcRendererActions } from "../../common/ipcActions";
import { reducerActions, store } from "../store/store"
import { appendClipboardData, displayInitialClipboardData } from "../utils/displayClipboard";
import { setImageToCanvas } from "../features/paintWindow/paintRenderer";

 class IpcRendererHandler {

    constructor() {
        // this.sendWindowReady()
        this.initIpcListeners()
    }

    sendWindowReady(){
        ipcRenderer.send(ipcRendererActions.paintWindowReady)
    }






    private initIpcListeners() {
       

        //!paint
        ipcRenderer.on(ipcMainActions.paintResponse, (_event, data) => {

            console.log("received paint response in new ipc handler:")
            // console.log()
            setImageToCanvas(data)
            // store.dispatch({type:reducerActions.ADD_CLIPBOARD_ENTRY,payload:value})
            // appendClipboardData(value)
        })





    }


}

export const ipcPaint = new IpcRendererHandler()