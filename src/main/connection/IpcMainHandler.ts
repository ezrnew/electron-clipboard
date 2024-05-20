import { ipcMainActions, ipcRendererActions } from '../../common/ipcActions';
import { BrowserWindow, IpcMain, clipboard, ipcMain } from 'electron';
import { getInitialClipboard } from '../utils/clipboardHandler';
import { paintWindow } from '../features/paintWindow/PaintWindow';
import Store from 'electron-store';
import { storeActions } from '../utils/menuBarHandler';
import robot from 'robotjs';

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

    getInitialClipboard()
      .then((data) => {
        this._window.webContents.send(ipcMainActions.initialClipboard, data);
        console.log(data)
      })
      .catch((e) => console.log('Unable to get clipboard data:', e));
  }

  sendClipboardData(data: string) {
    this._window.webContents.send(ipcMainActions.clipboard, data);
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

  sendInputCopyRequest(index: number) {
    this._window.webContents.send(ipcMainActions.inputCopyRequest, index);
  }

  sendPaintResponse(image64: string) {
    this._paintSender.send(ipcMainActions.paintResponse, image64);
  }

  private initIpcListeners() {
    ipcMain.on(ipcRendererActions.windowReady, () => {
      this.sendInitialClipboard();

      const inputsQuantity = store.get(storeActions.INPUTS_QUANTITY) as number;
      const clipboardEntrySize = store.get(storeActions.ENTRY_SIZE) as number;
      if (inputsQuantity !== undefined) ipc.sendInputsQuantity(inputsQuantity);
      if (clipboardEntrySize !== undefined) ipc.sendClipboardEntrySize(clipboardEntrySize);
    });

    ipcMain.on(ipcRendererActions.paintRequest, (event, data: string) => {
      paintWindow.open(data);
    });

    ipcMain.on(ipcRendererActions.inputPasteResponse, (event, data: string) => {
      this._paintSender = event.sender;

      clipboard.writeText(data);

      robot.keyTap('v', ['control']);
    });


    

    ipcMain.on(ipcRendererActions.paintWindowReady, (event) => {
      this._paintSender = event.sender;

      this.sendPaintResponse(paintWindow.getImage());
    });


    ipcMain.on(ipcRendererActions.closePaintWindow, () => {
      if (paintWindow) {
        paintWindow.getWindow().close();
      }
    });

  }
}

export const ipc = new IpcMainHandler();
