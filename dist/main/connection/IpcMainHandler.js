"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcMainHandler = void 0;
const ipcActions_1 = require("../../common/ipcActions");
const electron_1 = require("electron");
const clipboardHandler_1 = require("../utils/clipboardHandler");
// import { getInitialClipboard } from "../utils/clipboardHandler";
class IpcMainHandler {
    constructor(window) {
        this.window = window;
        this.initIpcListeners();
    }
    //  sendInitialClipboardData () {
    //    getInitialClipboard()
    //     .then(dataArray => {
    //       this.window.webContents.send(ipcMainActions.initialClipboard, dataArray);
    //     })
    // }
    sendClipboardEvery60() {
        //todo
        // [Error: EBUSY: resource busy or locked, open 'C:\Users\ja\OneDrive\Pulpit\reactjs\electron-clipboard\data\text.txt'] {
        //     errno: -4082,
        //     code: 'EBUSY',
        //     syscall: 'open',
        //     path: 'C:\\Users\\ja\\OneDrive\\Pulpit\\reactjs\\electron-clipboard\\data\\text.txt'
        (0, clipboardHandler_1.getInitialClipboard)()
            .then(dataArray => {
            this.window.webContents.send(ipcActions_1.ipcMainActions.initialClipboard, dataArray);
        });
        // setInterval( 
        //     ()=>{
        //         getInitialClipboard()
        //         .then(dataArray => {
        //           this.window.webContents.send(ipcMainActions.initialClipboard, dataArray);
        //         })
        //     }
        //     ,60000)
    }
    sendClipboardData(data) {
        this.window.webContents.send(ipcActions_1.ipcMainActions.clipboard, data);
    }
    sendShortcutData(data) {
        this.window.webContents.send(ipcActions_1.ipcMainActions.shortcutData, data);
    }
    initIpcListeners() {
        electron_1.ipcMain.on(ipcActions_1.ipcRendererActions.windowOnTop, (event, arg) => {
            this.window.setAlwaysOnTop(arg);
        });
        electron_1.ipcMain.on(ipcActions_1.ipcRendererActions.windowReady, (event) => {
            this.sendClipboardEvery60();
        });
    }
}
exports.IpcMainHandler = IpcMainHandler;
