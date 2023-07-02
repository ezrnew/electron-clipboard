// import { initClipboardHandler } from "../main/utils/clipboardHandler"

import { ipcRenderer } from "electron"
import { ipcMainActions } from "../common/ipcActions"
import { IpcRendererHandler } from "./connection/IpcRendererHandler"
import { store } from "./store/store"



console.log('renderer')





document.addEventListener('DOMContentLoaded', function () {
    const ipc = new IpcRendererHandler()
    let alwaysOnTop = true
   

//
    const button1 = document.getElementById("button1")
    button1?.addEventListener('click', handleOnTopButton)
    function handleOnTopButton() {

        console.log('alwaysOnTop: ',alwaysOnTop)
        ipc.sendGuwno(alwaysOnTop)
        alwaysOnTop = !alwaysOnTop

    }
})

