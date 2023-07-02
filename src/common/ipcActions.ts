export const ipcRendererActions = {
    windowReady : "window-ready",
    windowOnTop : "window-on-top",
    paintRequest : "paint-request",
} as const


export const ipcMainActions = {
    initialClipboard : "initial-clipboard-data",
    clipboard : "clipboard-data",
    shortcutData:  "key-shortcut-data",
} as const