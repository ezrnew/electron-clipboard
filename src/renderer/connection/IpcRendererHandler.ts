import {ipcRenderer} from "electron"
import { ipcMainActions, ipcRendererActions } from "../../common/ipcActions";
import {reducerActions, store} from "../store/store"
import { appendClipboardData, displayInitialClipboardData } from "../utils/displayClipboard";

export class IpcRendererHandler {

    constructor(){
        this.sendWindowReady()
        this.initIpcListeners()
    }

    sendGuwno(data:boolean){
        ipcRenderer.send(ipcRendererActions.windowOnTop,data)

    }
    sendWindowReady(){
        ipcRenderer.send(ipcRendererActions.windowReady)

    }






    private initIpcListeners(){
        ipcRenderer.on(ipcMainActions.initialClipboard, (_event, value) => {

        console.log('received initial clipboardxd ')
  

           store.dispatch({type:reducerActions.SET_INITIAL_CLIPBOARD,payload:value})
           displayInitialClipboardData(value) 

          })
          ipcRenderer.on(ipcMainActions.clipboard, (_event, value) => {

  
            store.dispatch({type:reducerActions.ADD_CLIPBOARD_ENTRY,payload:value})
            appendClipboardData(value)
           })
 


    }

    
}
