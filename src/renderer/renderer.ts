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

export function displayInitialClipboardData(data){
    
    const clipboardListContainer = document.getElementById('clipboard-list')

let listItems = data.map((item)=> {
    return `<li>${escapeHTML(item)}</li>`;
    // Alternatively, you can use concatenation:
    // return '<li>' + fruit + '</li>';
  });

  clipboardListContainer.innerHTML = listItems.join('');

}


export function appendClipboardData(data:string){
    
    const clipboardListContainer = document.getElementById('clipboard-list')

    let newEntry = document.createElement('li')

    newEntry.textContent = data

    newEntry.addEventListener('click', ()=>{console.log('text:',data)})

  clipboardListContainer.appendChild(newEntry)

}

function escapeHTML(text) {
    const escapedText = document.createElement('div');
    escapedText.textContent = text;
    return escapedText.innerHTML;
  }