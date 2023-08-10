import { BASE64, CLIPBOARD_DATA_PATH, CLIPBOARD_SPLIT, CLIPBOARD_SPLIT2 } from "../../common/constants";
import { IpcMainHandler } from "../connection/IpcMainHandler";
import {  validateBase64 } from "./validateBase64";

const clipboardListener = require('clipboard-event');
const { clipboard, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');
const FileType = require('file-type');
// import {fileTypeFromFile} from 'file-type';
//TODO czy bedzie dzialac path po buildzie?
const rootDir = process.cwd()


let lastEntry = ''



export const clipboardHandler = (ipc: IpcMainHandler) => {

  clipboardListener.startListening();

  clipboardListener.on('change', async () => {
    

    const format = getFormat()
    if (!format)return 
    

    const clipboardContent = getContent(format)
    // if (format === "image") {
    //   console.log("WCHODZI W FORMAT")
    //   if (!validateBase64(getContent(format))) {
    //     console.log('INVALID BASE64 W IFIE')
    //     return
    //   } else {
    //     console.log("git zdjencie")
    //   }
    // }

    ipc.sendClipboardData(clipboardContent)



    const dataDirectory = getDataDirectory()

    clipboard.readText('clipboard')


    // console.log(nativeImage.createFromBuffer( clipboard.readImage('clipboard').toJPEG(100)))

    // clipboard.writeImage(nativeImage.createFromBuffer( clipboard.readImage('clipboard').toJPEG(100)))

    deleteOldEntryIfExists(clipboardContent)
      .then((res) => { if (res === 'cancel') return; saveToFile(dataDirectory, getContent(format)) })
      .catch(err => console.log(err))




  });


}



const getFormat = () => {
//todo should it be validating dataurl preventing copying them manually?
  if (clipboard.readText('clipboard') !== '' &&  !clipboard.readText('clipboard').startsWith(BASE64)) {

    return 'text';
  }
  if (!clipboard.readImage('clipboard').isEmpty()) {

    return 'image';
  }

  return undefined

}

const getContent = (format: "text" | "image") => {
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

// const saveToFile = (directory: string, data: string) => {


//   fs.appendFile(directory, data+CLIPBOARD_SPLIT, (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     console.log('Data has been written to the file.');
//   });


// }


const saveToFile = (directory: string, data: string) => {
  // console.log('zapisywanko:')
  // console.log(lastEntry)
  // console.log(data)
  if (data === lastEntry) return;
  lastEntry = data


  fs.appendFile(directory, data + CLIPBOARD_SPLIT, (err) => {
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


export const clearClipboardFile = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile(CLIPBOARD_DATA_PATH, '', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve("res")

    });
  });
}







export const deleteOldEntryIfExists = (entry: string) => {



  return new Promise((resolve, reject) => {


    if (entry === lastEntry) {
      resolve('cancel')
      return;
    }

    // console.log('entryzajebane')
    // console.log("-",entry,entry.length,'-')


    fs.readFile(CLIPBOARD_DATA_PATH, 'utf8', (err, data: string) => {
      if (err) {
        console.log(err)
        reject(err)
        // return;
      }

      const kurwisko = `\n${entry}${CLIPBOARD_SPLIT}`

      // console.log('kurwisko')
      // console.log(kurwisko)

      if (!data.includes(kurwisko)) {
        console.log('NIEMATAKIEGOWPISU')
        // console.log(entry)
        resolve('noentry')
        return;
      }


      const entriii = `${entry}${CLIPBOARD_SPLIT}`

      // console.log(entriii)


      const modifiedFileData = data.replace(kurwisko, "\n")

      fs.writeFile(CLIPBOARD_DATA_PATH, modifiedFileData, 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          reject(err)
          // return;


        }
        // console.log('przedresolve')
        resolve('ok')
      });


    })
    // const dataArray = data.split(CLIPBOARD_SPLIT);
    // resolve(dataArray);



    // console.log(data)
  });

}




