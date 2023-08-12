import { ipcRenderer } from 'electron';
import { ipcMainActions, ipcRendererActions } from '../../common/ipcActions';
import { reducerActions, store } from '../store/store';
import { appendClipboardData, displayInitialClipboardData, displayInputs, getTextFromInput, setClipboardTextToInput, setEntrySize } from '../utils/displayClipboard';
import { setImageToCanvas } from '../features/paintWindow/paintRenderer';

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



  private initIpcListeners() {
    ipcRenderer.on(ipcMainActions.initialClipboard, (_event, value) => {
      console.log('received initial clipboardxd ');

      displayInitialClipboardData(value);
    });
    ipcRenderer.on(ipcMainActions.clipboard, (_event, value) => {
      appendClipboardData(value);
    });

    ipcRenderer.on(ipcMainActions.shortcutData, (_event, data: shortcutData) => {
      console.log('received shortcut:', data);
    });

    ipcRenderer.on(ipcMainActions.inputsQuantity, (_event, data: number) => {
      console.log('received inputsQuantity:', data);
      displayInputs(data)
    });

    ipcRenderer.on(ipcMainActions.clipboardEntrySize, (_event, data: 1 | 2 | 3) => {
      console.log('received clipboardEntrySize:', data);
      setEntrySize(data);
    });

    ipcRenderer.on(ipcMainActions.inputPasteRequest, (_event, data: number) => {
     
      this.sendInputPasteResponse(getTextFromInput(data))
    });

    ipcRenderer.on(ipcMainActions.inputCopyRequest, (_event, data: number) => {
     
     
     setClipboardTextToInput(data)
     
    });

  }
}

export const ipc = new IpcRendererHandler();
