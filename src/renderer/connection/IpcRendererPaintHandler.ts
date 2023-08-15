import { ipcRenderer } from 'electron';
import { ipcMainActions, ipcRendererActions } from '../../common/ipcActions';
import { paint } from '../features/paintWindow/Paint';

class IpcRendererHandler {
  initialImage = '';

  constructor() {
    this.initIpcListeners();
  }

  sendWindowReady() {
    ipcRenderer.send(ipcRendererActions.paintWindowReady);
  }

  private initIpcListeners() {
    ipcRenderer.on(ipcMainActions.paintResponse, (_event, data: string | null) => {
      if (data) {
        paint.setInitialImage(data);
        paint.setInitialImageToCanvas();
      } else {
        paint.setInitialEmptyCanvas();
      }
    });
  }
}

export const ipcPaint = new IpcRendererHandler();
