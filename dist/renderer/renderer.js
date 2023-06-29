"use strict";
// import { initClipboardHandler } from "../main/utils/clipboardHandler"
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendClipboardData = exports.displayInitialClipboardData = void 0;
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
function displayInitialClipboardData(data) {
    const clipboardListContainer = document.getElementById('clipboard-list');
    let listItems = data.map((item) => {
        return `<li>${escapeHTML(item)}</li>`;
        // Alternatively, you can use concatenation:
        // return '<li>' + fruit + '</li>';
    });
    clipboardListContainer.innerHTML = listItems.join('');
}
exports.displayInitialClipboardData = displayInitialClipboardData;
function appendClipboardData(data) {
    const clipboardListContainer = document.getElementById('clipboard-list');
    let newEntry = document.createElement('li');
    newEntry.textContent = data;
    newEntry.addEventListener('click', () => { console.log('text:', data); });
    clipboardListContainer.appendChild(newEntry);
}
exports.appendClipboardData = appendClipboardData;
function escapeHTML(text) {
    const escapedText = document.createElement('div');
    escapedText.textContent = text;
    return escapedText.innerHTML;
}
