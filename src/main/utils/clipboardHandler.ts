import { CLIPBOARD_DATA_PATH, CLIPBOARD_SPLIT, CLIPBOARD_SPLIT2 } from "../../common/constants";
import { IpcMainHandler } from "../connection/IpcMainHandler";

const clipboardListener = require('clipboard-event');
const { clipboard, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');
const FileType = require('file-type');
// import {fileTypeFromFile} from 'file-type';
//TODO czy bedzie dzialac path po buildzie?
const rootDir = process.cwd()






export const clipboardHandler = (ipc: IpcMainHandler) => {

  clipboardListener.startListening();

  clipboardListener.on('change', async () => {

    const format = getContentFormat()
    if (!format) return;



    const clipboardContent = getContent(format)









    ipc.sendClipboardData(clipboardContent)



    const dataDirectory = getDataDirectory()

    clipboard.readText('clipboard')


    // console.log(nativeImage.createFromBuffer( clipboard.readImage('clipboard').toJPEG(100)))

    const chuj = clipboard.readImage('clipboard').toDataURL()
    // clipboard.writeImage(nativeImage.createFromBuffer( clipboard.readImage('clipboard').toJPEG(100)))

    deleteOldEntryIfExists(clipboardContent)
      .then(() => { console.log('przed save to file'); saveToFile(dataDirectory, getContent(format)) })
      .catch(err => console.log(err))




  });


}



const getContentFormat = () => {

  if (clipboard.readText('clipboard') !== '') {

    return 'text';
  }
  if (!clipboard.readImage('clipboard').isEmpty()) {

    return 'image';
  }

  return undefined

}

const getContent = (format) => {
  return (format === "text") ? clipboard.readText('clipboard') : clipboard.readImage('clipboard').toDataURL()

}

const getDataDirectory = () => {

  const filePath = CLIPBOARD_DATA_PATH

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

  return filePath
}

const saveToFile = (directory: string, data: string) => {


  fs.appendFile(directory,  CLIPBOARD_SPLIT+data+CLIPBOARD_SPLIT2, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Data has been written to the file.');
  });


}

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
}









export const deleteOldEntryIfExists = (entry: string) => {



  return new Promise((resolve, reject) => {

    console.log('entryzajebane')
    console.log(entry)


    fs.readFile(CLIPBOARD_DATA_PATH, 'utf8', (err, data: string) => {
      if (err) {
        console.log(err)
        reject(err)
        // return;
      }

      if (!data.includes(entry)) {
        console.log('NIEMATAKIEGOWPISU')
        console.log(entry)
        resolve('noentry')
        return;
      }


      const entriii = `${CLIPBOARD_SPLIT}${entry}${CLIPBOARD_SPLIT2}`

      console.log(entriii)


      const modifiedFileData = data.replace(entriii, "")

      fs.writeFile(CLIPBOARD_DATA_PATH, modifiedFileData, 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          reject(err)
          // return;


        }
        console.log('przedresolve')
        resolve('ok')
      });


    })
    // const dataArray = data.split(CLIPBOARD_SPLIT);
    // resolve(dataArray);



    // console.log(data)
  });

}




