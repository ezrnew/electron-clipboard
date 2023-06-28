"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcRendererHandler = void 0;
const electron_1 = require("electron");
const ipcActions_1 = require("../../common/ipcActions");
const store_1 = require("../store/store");
class IpcRendererHandler {
    constructor() {
        this.sendWindowReady();
        this.initIpcListeners();
    }
    sendGuwno(data) {
        electron_1.ipcRenderer.send(ipcActions_1.ipcRendererActions.windowOnTop, data);
    }
    sendWindowReady() {
        electron_1.ipcRenderer.send(ipcActions_1.ipcRendererActions.windowReady);
    }
    initIpcListeners() {
        electron_1.ipcRenderer.on(ipcActions_1.ipcMainActions.initialClipboard, (_event, value) => {
            store_1.store.dispatch({ type: store_1.reducerActions.SET_INITIAL_CLIPBOARD, payload: value });
        });
        electron_1.ipcRenderer.on(ipcActions_1.ipcMainActions.clipboard, (_event, value) => {
            store_1.store.dispatch({ type: store_1.reducerActions.ADD_CLIPBOARD_ENTRY, payload: value });
        });
    }
}
exports.IpcRendererHandler = IpcRendererHandler;
