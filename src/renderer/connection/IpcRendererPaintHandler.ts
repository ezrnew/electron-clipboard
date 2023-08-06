import { ipcRenderer } from "electron"
import { ipcMainActions, ipcRendererActions } from "../../common/ipcActions";
import { reducerActions, store } from "../store/store"
import { appendClipboardData, displayInitialClipboardData } from "../utils/displayClipboard";
import { setImageToCanvas } from "../features/paintWindow/paintRenderer";

 class IpcRendererHandler {

     initialImage = ""

    //todo ogarnac syf
    // setCanvasImage(){
    //     setImageToCanvas(this.initialImage)
    // }

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
            this.initialImage=data
            // console.log()
            setImageToCanvas(this.initialImage)
            // store.dispatch({type:reducerActions.ADD_CLIPBOARD_ENTRY,payload:value})
            // appendClipboardData(value)
        })





    }


}

export const ipcPaint = new IpcRendererHandler()