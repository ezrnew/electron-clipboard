// All the Node.js APIs are available in the preload process.

import { ipcMainActions } from "../common/ipcActions"

// It has the same sandbox as a Chrome extension.
const { ipcRenderer } = require('electron')

let clipboardData = []


window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector:any, text:any) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }


    /////////////////
    // ipcRenderer.on(ipcMainActions.initialClipboard, (_event, value) => {
  
    //   console.log(ipcMainActions.initialClipboard,value)
      
    // })

    // ipcRenderer.on(ipcMainActions.clipboard, (_event, value) => {
  
    //     console.log('dostaje se clipboarda ok ',value)
    //     clipboardData.push(value)
    //   })




})