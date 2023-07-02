"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendClipboardData = exports.displayInitialClipboardData = void 0;
function displayInitialClipboardData(data) {
    const clipboardList = document.getElementById('clipboard-list');
    clipboardList.innerHTML = '';
    data.forEach(entry => {
        let item = document.createElement('li');
        item.appendChild(getLiChild(entry));
        item.addEventListener('click', () => { onEntryClick(entry); });
        clipboardList.appendChild(item);
    });
}
exports.displayInitialClipboardData = displayInitialClipboardData;
let lastEntry = '';
function appendClipboardData(data) {
    if (lastEntry === data) {
        console.log('taki sam');
        return;
    }
    lastEntry = data;
    const clipboardList = document.getElementById('clipboard-list');
    let item = document.createElement('li');
    // item.appendChild(document.createTextNode(data))
    item.appendChild(getLiChild(data));
    item.addEventListener('click', () => { onEntryClick(data); });
    clipboardList.appendChild(item);
}
exports.appendClipboardData = appendClipboardData;
function getLiChild(data) {
    if (isText(data)) {
        return document.createTextNode(data);
    }
    else {
        //todo dodac validacje jak się zaczyna z data:image/png;base64, czy mozna zdecodować poprawnie
        let img = document.createElement("img");
        img.src = data;
        // img.alt = data;
        img.className = 'imgStyle';
        // img.max = ;
        return img;
    }
}
function onEntryClick(data) {
    isText(data) ? navigator.clipboard.writeText(data) : writeClipboardImage(data);
}
function isText(data) {
    return !data.startsWith('data:image');
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
