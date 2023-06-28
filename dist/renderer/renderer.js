"use strict";
// import { initClipboardHandler } from "../main/utils/clipboardHandler"
Object.defineProperty(exports, "__esModule", { value: true });
const IpcRendererHandler_1 = require("./connection/IpcRendererHandler");
console.log('renderer');
let alwaysOnTop = true;
document.addEventListener('DOMContentLoaded', function () {
    const ipc = new IpcRendererHandler_1.IpcRendererHandler();
    const button1 = document.getElementById("button1");
    console.log(button1);
    button1?.addEventListener('click', handleOnTopButton);
    function handleOnTopButton() {
        console.log('alwaysOnTop: ', alwaysOnTop);
        ipc.sendGuwno(alwaysOnTop);
        alwaysOnTop = !alwaysOnTop;
    }
});
