import { ipcRenderer } from "electron"
import { ipcMainActions, ipcRendererActions } from "../../common/ipcActions";
import { appendClipboardData, displayInitialClipboardData } from "../utils/displayClipboard";
import { setImageToCanvas } from "../features/paintWindow/paintRenderer";
import { paint } from "../features/paintWindow/Paint";

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
           paint.setInitialImage(data)
           paint.setInitialImageToCanvas()
            // console.log()
            // appendClipboardData(value)
        })





    }


}

export const ipcPaint = new IpcRendererHandler()