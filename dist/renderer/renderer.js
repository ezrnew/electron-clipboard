"use strict";
// import { initClipboardHandler } from "../main/utils/clipboardHandler"
Object.defineProperty(exports, "__esModule", { value: true });
const IpcRendererHandler_1 = require("./connection/IpcRendererHandler");
console.log('renderer');
document.addEventListener('DOMContentLoaded', function () {
    const ipc = new IpcRendererHandler_1.IpcRendererHandler();
    let alwaysOnTop = true;
    //
    const button1 = document.getElementById("button1");
    button1?.addEventListener('click', handleOnTopButton);
    function handleOnTopButton() {
        console.log('alwaysOnTop: ', alwaysOnTop);
        ipc.sendGuwno(alwaysOnTop);
        alwaysOnTop = !alwaysOnTop;
    }
});
