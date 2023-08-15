import { BASE64, CLIPBOARD_DATA_PATH, CLIPBOARD_SPLIT } from '../../common/constants';
import { ipc } from '../connection/IpcMainHandler';

const clipboardListener = require('clipboard-event');
const { clipboard } = require('electron');
const fs = require('fs');

let lastEntry = '';

export const clipboardListenerHandler = () => {
  clipboardListener.startListening();
  createFileIfDoesNotExist();

  clipboardListener.on('change', async () => {
    const format = getFormat();
    if (!format) return;

    const clipboardContent = getContent(format);

    ipc.sendClipboardData(clipboardContent);

    clipboard.readText('clipboard');

    deleteOldEntryIfExists(clipboardContent)
      .then((res) => {
        if (res === 'cancel') return;
        saveToFile(CLIPBOARD_DATA_PATH, getContent(format));
      })
      .catch((err) => {
        console.log(err);
        createFileIfDoesNotExist();
      });
  });
};

export const getFormat = () => {
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

const createFileIfDoesNotExist = () => {
  fs.access(CLIPBOARD_DATA_PATH, fs.constants.F_OK, (err) => {
    if (err) {
      fs.writeFile(CLIPBOARD_DATA_PATH, '', (err) => {
        if (err) {
          console.error('Error creating file:', err);
          return;
        }
      });
    }
  });
};

const saveToFile = (directory: string, data: string) => {
  if (data === lastEntry) return;
  lastEntry = data;

  fs.appendFile(directory, data + CLIPBOARD_SPLIT, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

export const getInitialClipboard = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(CLIPBOARD_DATA_PATH, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const dataArray = data.split(CLIPBOARD_SPLIT);
       if(dataArray[dataArray.length-1] === '') dataArray.pop()
      resolve(dataArray);
    });
  });
};

export const clearClipboardFile = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile(CLIPBOARD_DATA_PATH, '', (err) => {
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

      const splitEntry = `\n${entry}${CLIPBOARD_SPLIT}`;

      if (!data.includes(splitEntry)) {
        resolve('noentry');
        return;
      }

      const modifiedFileData = data.replace(splitEntry, '\n');

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
