export const ipcRendererActions = {
    windowReady : "window-ready",
    windowOnTop : "window-on-top",


    paintRequest : "paint-request",
    //paint
    paintWindowReady:"paint-ready"
} as const


export const ipcMainActions = {
    initialClipboard : "initial-clipboard-data",
    clipboard : "clipboard-data",
    shortcutData:  "key-shortcut-data",
    inputsQuantity:  "inputs-quantity",
    clipboardEntrySize:  "clipboard-entry-size",

    //paint
    paintResponse: 'paint-response'
} as const