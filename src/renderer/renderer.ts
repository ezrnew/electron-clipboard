// import { initClipboardHandler } from "../main/utils/clipboardHandler"

import { ipcRenderer } from "electron"
import { ipcMainActions } from "../common/ipcActions"
import { ipc } from "./connection/IpcRendererHandler"
import { store } from "./store/store"



console.log('renderer')





document.addEventListener('DOMContentLoaded',  ()=> {
    ipc;
intializeInputs()




})

   


function intializeInputs(){
    document.getElementById("clipboard-input-1").addEventListener("contextmenu",(event)=>{
        event.preventDefault()
        // @ts-ignore
        navigator.clipboard.writeText(document.getElementById("clipboard-input-1").value)
        console.log('copied')
        })
        document.getElementById("clipboard-input-2").addEventListener("contextmenu",(event)=>{
            event.preventDefault()
            // @ts-ignore
            navigator.clipboard.writeText(document.getElementById("clipboard-input-2").value)
            console.log('copied')
            })
            document.getElementById("clipboard-input-3").addEventListener("contextmenu",(event)=>{
                event.preventDefault()
                // @ts-ignore
                navigator.clipboard.writeText(document.getElementById("clipboard-input-3").value)
                console.log('copied')
                })
        
}
    





// let alwaysOnTop = true
// let timeoutId;
   


// const copyButton1 = document.getElementById("copy-button-1")
// const copyButton2 = document.getElementById("copy-button-2")
// const copyButton3 = document.getElementById("copy-button-3")

// copyButton1.addEventListener('click',(e)=>{handleCopyButton(e,copyButton1 as HTMLButtonElement)})
// copyButton2.addEventListener('click',(e)=>{handleCopyButton(e,copyButton2 as HTMLButtonElement)})
// copyButton3.addEventListener('click',(e)=>{handleCopyButton(e,copyButton3 as HTMLButtonElement)})

// async function handleCopyButton(event:MouseEvent,button:HTMLButtonElement) {
//     const buttonIndex = button.id.charAt(button.id.length - 1);
    

//     console.log(buttonIndex)
//     // @ts-ignore
//     const img = document.getElementById("copy-button-image-"+buttonIndex) as HTMLImageElement
//     img.src = "assets/clipboard-check-solid.svg"
//     button.disabled=true
//     const input = document.getElementById("clipboard-input-"+buttonIndex) as HTMLInputElement
//     navigator.clipboard.writeText(input.value)

//     console.log(input.value)

    
//    timeoutId= setTimeout(() => {
//     img.src="assets/clipboard-solid.svg"
//     button.disabled=false

//    }, 1500);


// }

// //
// const huj1 = document.getElementById("button1")
// huj1?.addEventListener('click', handleOnTopButton)
// function handleOnTopButton() {

//     console.log('alwaysOnTop: ',alwaysOnTop)
//     ipc.sendGuwno(alwaysOnTop)
//     alwaysOnTop = !alwaysOnTop

// }

