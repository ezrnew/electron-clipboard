import { BASE64, CLIPBOARD_DATA_PATH, CLIPBOARD_SPLIT } from '../../common/constants';
import { ipc } from '../connection/IpcMainHandler';

const clipboardListener = require('clipboard-event');
const { clipboard } = require('electron');
const fs = require('fs');
// const path = require('path');
// const FileType = require('file-type');
// import {fileTypeFromFile} from 'file-type';
//TODO czy bedzie dzialac path po buildzie?
const rootDir = process.cwd();

let lastEntry = '';

export const clipboardListenerHandler = () => {
  clipboardListener.startListening();

  clipboardListener.on('change', async () => {
    const format = getFormat();
    if (!format) return;

    const clipboardContent = getContent(format);

    ipc.sendClipboardData(clipboardContent);

    clipboard.readText('clipboard');

    deleteOldEntryIfExists(clipboardContent)
      .then((res) => {
        if (res === 'cancel') return;
        saveToFile(getDataDirectory(), getContent(format));
      })
      .catch((err) => console.log(err));
  });
};

export const getFormat = () => {
  //todo validating dataurl makes it impossible to copy it manually
  if (clipboard.readText('clipboard') !== '' && !clipboard.readText('clipboard').startsWith(BASE64)) {
    return 'text';
  }
  if (!clipboard.readImage('clipboard').isEmpty()) {
    return 'image';
  }

  return undefined;
};

export const getContent = (format: 'text' | 'image') => {
  return format === 'text' ? clipboard.readText('clipboard') : clipboard.readImage('clipboard').toDataURL();
};

const getDataDirectory = () => {
  const filePath = CLIPBOARD_DATA_PATH;

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
    } else {
      // File exists
      console.log('File already exists.');
    }
  });

  return filePath;
};

const saveToFile = (directory: string, data: string) => {
  if (data === lastEntry) return;
  lastEntry = data;

  fs.appendFile(directory, data + CLIPBOARD_SPLIT, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Data has been written to the file.');
  });
};

//////////////////

export const getInitialClipboard = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(CLIPBOARD_DATA_PATH, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const dataArray = data.split(CLIPBOARD_SPLIT);
      resolve(dataArray);
    });
  });
};

export const clearClipboardFile = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile(CLIPBOARD_DATA_PATH, '', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve('res');
    });
  });
};

export const deleteOldEntryIfExists = (entry: string) => {
  return new Promise((resolve, reject) => {
    if (entry === lastEntry) {
      resolve('cancel');
      return;
    }

    fs.readFile(CLIPBOARD_DATA_PATH, 'utf8', (err, data: string) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      const kurwisko = `\n${entry}${CLIPBOARD_SPLIT}`;

      if (!data.includes(kurwisko)) {
        resolve('noentry');
        return;
      }

      const modifiedFileData = data.replace(kurwisko, '\n');

      fs.writeFile(CLIPBOARD_DATA_PATH, modifiedFileData, 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          reject(err);
        }
        resolve('ok');
      });
    });
  });
};
