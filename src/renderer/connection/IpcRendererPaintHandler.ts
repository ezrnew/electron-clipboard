import { ipcRenderer } from "electron"
import { ipcMainActions, ipcRendererActions } from "../../common/ipcActions";
import { reducerActions, store } from "../store/store"
import { appendClipboardData, displayInitialClipboardData } from "../utils/displayClipboard";
import { setImage } from "../features/paintWindow/paintRenderer";

 class IpcRendererHandler {

    constructor() {
        // this.sendWindowReady()
        this.initIpcListeners()
    }






    private initIpcListeners() {
       

        //!paint
        ipcRenderer.on(ipcMainActions.paintResponse, (_event, data) => {

            console.log("received paint response in new ipc handler:")
            console.log(data.substring(1,60))
            setImage(data)
            // store.dispatch({type:reducerActions.ADD_CLIPBOARD_ENTRY,payload:value})
            // appendClipboardData(value)
        })





    }


}

export const ipcPaint = new IpcRendererHandler()