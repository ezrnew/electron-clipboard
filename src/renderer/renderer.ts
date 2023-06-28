// import { initClipboardHandler } from "../main/utils/clipboardHandler"

import { ipcRenderer } from "electron"
import { ipcMainActions } from "../common/ipcActions"
import { IpcRendererHandler } from "./connection/IpcRendererHandler"



console.log('renderer')


let alwaysOnTop= true


document.addEventListener('DOMContentLoaded', function () {

    const ipc = new IpcRendererHandler()



  



    const button1 = document.getElementById("button1")
    console.log(button1)

    button1?.addEventListener('click', handleOnTopButton)


    function handleOnTopButton() {

        console.log('alwaysOnTop: ',alwaysOnTop)
        ipc.sendGuwno(alwaysOnTop)
        alwaysOnTop = !alwaysOnTop

    }
})
