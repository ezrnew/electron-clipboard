import { CLIPBOARD_DATA_PATH, CLIPBOARD_SPLIT } from "../../common/constants";
import { IpcMainHandler } from "../connection/IpcMainHandler";

const clipboardListener = require('clipboard-event');
const {clipboard,nativeImage} = require('electron');
const fs = require('fs');
const path = require('path');
const FileType = require('file-type');
// import {fileTypeFromFile} from 'file-type';
//TODO czy bedzie dzialac path po buildzie?
const rootDir = process.cwd()



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

// export const getInitialClipboard = async() =>{

//     let dataArray = []
    

//     const data = await fs.readFile(CLIPBOARD_DATA_PATH, 'utf8', (err, data) => {

//         dataArray = data.split(CLIPBOARD_SPLIT);

//         return dataArray



//       });
// }
// async()=>{console.log('3')}



export const clipboardHandler = (ipc:IpcMainHandler) =>{


// To start listening
clipboardListener.startListening();

clipboardListener.on('change', async() => {






   const format = getContentFormat()
   if(!format) return;




    const clipboardContent = getContent(format)

ipc.sendClipboardData(clipboardContent)

   

    const dataDirectory = getDataDirectory()

    clipboard.readText('clipboard')


    // console.log(nativeImage.createFromBuffer( clipboard.readImage('clipboard').toJPEG(100)))
    
const chuj = clipboard.readImage('clipboard').toDataURL()
// clipboard.writeImage(nativeImage.createFromBuffer( clipboard.readImage('clipboard').toJPEG(100)))
saveToFile(dataDirectory,getContent(format))


});


}



const getContentFormat = () =>{
 
    if(clipboard.readText('clipboard') !== ''){

        return 'text';
    }
    if(!clipboard.readImage('clipboard').isEmpty()){

        return 'image';
    }

    return undefined

}

const getContent = (format) =>{
 return (format === "text") ? clipboard.readText('clipboard') : clipboard.readImage('clipboard').toDataURL()

}

const getDataDirectory = () =>{
//     if (!fs.existsSync(rootDir+"\\data\\text.txt")) {
//         // console.log("doesnt exist, making dir")
//         fs.mkdirSync(rootDir+"\\data\\text.txt");
//     }
//    else{
//     // console.log('directory exists')
//    } 

//    return rootDir+"\\data"
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

const saveToFile = (directory:string,data:string) =>{


    fs.appendFile(directory, CLIPBOARD_SPLIT+data, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      
        console.log('Data has been written to the file.');
      });




}