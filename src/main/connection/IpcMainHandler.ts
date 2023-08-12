import { ipcMainActions, ipcRendererActions } from '../../common/ipcActions';
import { BrowserWindow, IpcMain, clipboard, ipcMain } from 'electron';
import { getInitialClipboard } from '../utils/clipboardHandler';
import { paintWindow } from '../features/paintWindow/PaintWindow';
import Store from 'electron-store';
import { storeActions } from '../utils/menuBarHandler';
import robot from "robotjs"

const store = new Store();

export class IpcMainHandler {
  private _window: BrowserWindow;
  private _paintSender: Electron.IpcMainEvent['sender'];

  constructor() {
    this.initIpcListeners();
  }

  setMainWindow(win: BrowserWindow) {
    this._window = win;
  }
  sendInitialClipboard() {
    //todo

    getInitialClipboard().then((dataArray) => {
      this._window.webContents.send(ipcMainActions.initialClipboard, dataArray);
    });
  }

  sendClipboardData(data: string) {
    this._window.webContents.send(ipcMainActions.clipboard, data);
  }

  sendShortcutData(data: shortcutData) {
    this._window.webContents.send(ipcMainActions.shortcutData, data);
  }

  sendInputsQuantity(quantity: number) {
    this._window.webContents.send(ipcMainActions.inputsQuantity, quantity);
  }

  sendClipboardEntrySize(size: number) {
    this._window.webContents.send(ipcMainActions.clipboardEntrySize, size);
  }

  sendInputPasteRequest(index: number) {
    this._window.webContents.send(ipcMainActions.inputPasteRequest, index);
  
  }

  sendInputCopyRequest(index:number) {
    this._window.webContents.send(ipcMainActions.inputCopyRequest,index);
  
  }

  // PAINT

  sendPaintResponse(image64: string) {
    this._paintSender.send(ipcMainActions.paintResponse, image64);
  }

  //!################################# INIT LISTENERS #######################################

  private initIpcListeners() {
    ipcMain.on(ipcRendererActions.windowReady, () => {
      this.sendInitialClipboard();

      const inputsQuantity = store.get(storeActions.INPUTS_QUANTITY) as number;
      const clipboardEntrySize = store.get(storeActions.ENTRY_SIZE) as number;
      if (inputsQuantity !== undefined) ipc.sendInputsQuantity(inputsQuantity);
      if (clipboardEntrySize !== undefined) ipc.sendClipboardEntrySize(clipboardEntrySize);
    });

    ipcMain.on(ipcRendererActions.paintRequest, (event, arg) => {
      //todo need to add verification on renderer and here if valid image

      console.log('received paint request with data: ', arg.substring(1, 100));

      paintWindow.open(arg);
    });


    ipcMain.on(ipcRendererActions.inputPasteResponse, (event, arg) => {
      this._paintSender = event.sender;

     console.log("zwrotka z input response:",arg)
    // robot.typeString(arg)
    // clipboard.write(arg)
clipboard.writeText(arg)


    // Split the text into individual characters
    
    // robot.keyToggle('command', 'down');
    robot.keyTap('v', ['control'])
    // robot.keyToggle('command', 'up'); 




    });



    ipcMain.on(ipcRendererActions.paintWindowReady, (event, arg) => {
      this._paintSender = event.sender;

      this.sendPaintResponse(paintWindow.getImage());
    });

  }
}

export const ipc = new IpcMainHandler();
