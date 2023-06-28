"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipcMainActions = exports.ipcRendererActions = void 0;
exports.ipcRendererActions = {
    windowReady: "window-ready",
    windowOnTop: "window-on-top"
};
exports.ipcMainActions = {
    initialClipboard: "initial-clipboard-data",
    clipboard: "clipboard-data",
};
