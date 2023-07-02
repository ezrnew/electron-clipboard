"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOldEntryIfExists = exports.getInitialClipboard = exports.clipboardHandler = void 0;
const constants_1 = require("../../common/constants");
const clipboardListener = require('clipboard-event');
const { clipboard, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');
const FileType = require('file-type');
// import {fileTypeFromFile} from 'file-type';
//TODO czy bedzie dzialac path po buildzie?
const rootDir = process.cwd();
let lastEntry = '';
const clipboardHandler = (ipc) => {
    clipboardListener.startListening();
    clipboardListener.on('change', async () => {
        const format = getContentFormat();
        if (!format)
            return;
        const clipboardContent = getContent(format);
        ipc.sendClipboardData(clipboardContent);
        const dataDirectory = getDataDirectory();
        clipboard.readText('clipboard');
        // console.log(nativeImage.createFromBuffer( clipboard.readImage('clipboard').toJPEG(100)))
        const chuj = clipboard.readImage('clipboard').toDataURL();
        // clipboard.writeImage(nativeImage.createFromBuffer( clipboard.readImage('clipboard').toJPEG(100)))
        (0, exports.deleteOldEntryIfExists)(clipboardContent)
            .then((res) => { console.log('res:', res); saveToFile(dataDirectory, getContent(format)); })
            .catch(err => console.log(err));
    });
};
exports.clipboardHandler = clipboardHandler;
const getContentFormat = () => {
    if (clipboard.readText('clipboard') !== '') {
        return 'text';
    }
    if (!clipboard.readImage('clipboard').isEmpty()) {
        return 'image';
    }
    return undefined;
};
const getContent = (format) => {
    return (format === "text") ? clipboard.readText('clipboard') : clipboard.readImage('clipboard').toDataURL();
};
const getDataDirectory = () => {
    const filePath = constants_1.CLIPBOARD_DATA_PATH;
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File does not exist, create it
            fs.writeFile(filePath, '', (err) => {
                if (err) {
                    console.error('Error creating file:', err);
                    return;
                }
                console.log('File created successfully.');
            });
        }
        else {
            // File exists
            console.log('File already exists.');
        }
    });
    return filePath;
};
// const saveToFile = (directory: string, data: string) => {
//   fs.appendFile(directory, data+CLIPBOARD_SPLIT, (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('Data has been written to the file.');
//   });
// }
const saveToFile = (directory, data) => {
    console.log('zapisywanko:');
    console.log(lastEntry);
    console.log(data);
    if (data === lastEntry)
        return;
    lastEntry = data;
    fs.appendFile(directory, data + constants_1.CLIPBOARD_SPLIT, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data has been written to the file.');
    });
};
//////////////////
const getInitialClipboard = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(constants_1.CLIPBOARD_DATA_PATH, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const dataArray = data.split(constants_1.CLIPBOARD_SPLIT);
            resolve(dataArray);
        });
    });
};
exports.getInitialClipboard = getInitialClipboard;
const deleteOldEntryIfExists = (entry) => {
    return new Promise((resolve, reject) => {
        if (entry === lastEntry) {
            resolve('stop');
            return;
        }
        console.log('entryzajebane');
        console.log("-", entry, entry.length, '-');
        fs.readFile(constants_1.CLIPBOARD_DATA_PATH, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
                // return;
            }
            const kurwisko = `\n${entry}${constants_1.CLIPBOARD_SPLIT}`;
            console.log('kurwisko');
            console.log(kurwisko);
            if (!data.includes(kurwisko)) {
                console.log('NIEMATAKIEGOWPISU');
                // console.log(entry)
                resolve('noentry');
                return;
            }
            const entriii = `${entry}${constants_1.CLIPBOARD_SPLIT}`;
            console.log(entriii);
            const modifiedFileData = data.replace(kurwisko, "\n");
            fs.writeFile(constants_1.CLIPBOARD_DATA_PATH, modifiedFileData, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    reject(err);
                    // return;
                }
                // console.log('przedresolve')
                resolve('ok');
            });
        });
        // const dataArray = data.split(CLIPBOARD_SPLIT);
        // resolve(dataArray);
        // console.log(data)
    });
};
exports.deleteOldEntryIfExists = deleteOldEntryIfExists;
