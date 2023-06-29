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
    sendInitialClipboardData() {
        (0, clipboardHandler_1.getInitialClipboard)()
            .then(dataArray => {
            this.window.webContents.send(ipcActions_1.ipcMainActions.initialClipboard, dataArray);
        });
    }
    sendClipboardData(data) {
        this.window.webContents.send(ipcActions_1.ipcMainActions.clipboard, data);
    }
    initIpcListeners() {
        electron_1.ipcMain.on(ipcActions_1.ipcRendererActions.windowOnTop, (event, arg) => {
            this.window.setAlwaysOnTop(arg);
        });
        electron_1.ipcMain.on(ipcActions_1.ipcRendererActions.windowReady, (event) => {
            this.sendInitialClipboardData();
        });
    }
}
exports.IpcMainHandler = IpcMainHandler;
