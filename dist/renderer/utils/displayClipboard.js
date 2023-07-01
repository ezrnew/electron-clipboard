"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendClipboardData = exports.displayInitialClipboardData = void 0;
function displayInitialClipboardData(data) {
    const clipboardList = document.getElementById('clipboard-list');
    data.forEach(element => {
        let item = document.createElement('li');
        item.appendChild(document.createTextNode(element));
        item.addEventListener('click', () => { onEntryClick(element); });
        clipboardList.appendChild(item);
    });
}
exports.displayInitialClipboardData = displayInitialClipboardData;
function appendClipboardData(data) {
    const clipboardList = document.getElementById('clipboard-list');
    let item = document.createElement('li');
    item.appendChild(document.createTextNode(data));
    item.addEventListener('click', () => { onEntryClick(data); });
    clipboardList.appendChild(item);
}
exports.appendClipboardData = appendClipboardData;
function onEntryClick(data) {
    if (!data.startsWith('data:image')) {
        navigator.clipboard.writeText(data);
    }
    else {
        writeClipboardImage(data);
    }
}
function writeClipboardImage(base64Image) {
    const base64 = base64Image.replace('data:image/png;base64,', '');
    const blob = b64toBlob(base64, 'image/png');
    try {
        navigator.clipboard.write([
            new ClipboardItem({
                'image/png': blob
            })
        ]);
    }
    catch (error) {
        console.error(error);
    }
}
const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
};
