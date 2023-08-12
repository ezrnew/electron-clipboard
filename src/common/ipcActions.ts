export const ipcRendererActions = {
    windowReady : "window-ready",
    windowOnTop : "window-on-top",


    paintRequest : "paint-request",
    inputPasteResponse:  "input-paste-response",
    //paint
    paintWindowReady:"paint-ready"
} as const


export const ipcMainActions = {
    initialClipboard : "initial-clipboard-data",
    clipboard : "clipboard-data",
    shortcutData:  "key-shortcut-data",
    inputsQuantity:  "inputs-quantity",
    clipboardEntrySize:  "clipboard-entry-size",
    inputPasteRequest:  "input-paste-request",
    inputCopyRequest:  "input-copy-request",

    //paint
    paintResponse: 'paint-response'
} as const