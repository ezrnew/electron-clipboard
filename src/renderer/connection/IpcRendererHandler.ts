import { ipcRenderer } from 'electron';
import { ipcMainActions, ipcRendererActions } from '../../common/ipcActions';
import {
  appendClipboardData,
  displayInitialClipboardData,
  displayInputs,
  getTextFromInput,
  setClipboardTextToInput,
  setEntrySize,
} from '../utils/displayClipboard';

class IpcRendererHandler {
  constructor() {
    this.sendWindowReady();
    this.initIpcListeners();
  }

  sendWindowReady() {
    ipcRenderer.send(ipcRendererActions.windowReady);
  }

  sendPaintRequest(data: string) {
    ipcRenderer.send(ipcRendererActions.paintRequest, data);
  }

  sendInputPasteResponse(data: string) {
    ipcRenderer.send(ipcRendererActions.inputPasteResponse, data);
  }

    sendClosePaintWindow() {
    ipcRenderer.send(ipcRendererActions.closePaintWindow);
  }


  private initIpcListeners() {
    ipcRenderer.on(ipcMainActions.initialClipboard, (_event, value) => {
      displayInitialClipboardData(value);
    });
    ipcRenderer.on(ipcMainActions.clipboard, (_event, value) => {
      appendClipboardData(value);
    });

    ipcRenderer.on(ipcMainActions.inputsQuantity, (event, data: number) => {
      displayInputs(data);
    });

    ipcRenderer.on(ipcMainActions.clipboardEntrySize, (event, data: 1 | 2 | 3) => {
      setEntrySize(data);
    });

    ipcRenderer.on(ipcMainActions.inputPasteRequest, (event, data: number) => {
      this.sendInputPasteResponse(getTextFromInput(data));
    });

    ipcRenderer.on(ipcMainActions.inputCopyRequest, (event, data: number) => {
      setClipboardTextToInput(data);
    });
  }
}

export const ipc = new IpcRendererHandler();
