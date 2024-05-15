import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import Store from 'electron-store';
import { storeActions } from '../../utils/menuBarHandler';

const store = new Store();

class PaintWindow {
  private _window: BrowserWindow;
  private _image: string | null = null;

  open(image: string | null) {
    const paintBounds = store.get(storeActions.PAINT_BOUNDS) as Electron.Rectangle;
    const bounds = paintBounds
      ? { width: paintBounds.width, height: paintBounds.height, x: paintBounds.x, y: paintBounds.y }
      : { width: null, height: null, x: null, y: null };

    this._image = image;
    this._window = new BrowserWindow({
      width: bounds.width,
      height: bounds.height,
      x: bounds.x,
      y: bounds.y,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        // devTools: true,
      },
    });

    this._window.loadFile(path.join(app.getAppPath(), 'src', 'renderer', 'features', 'paintWindow', 'index.html'));
    this._window.setMenuBarVisibility(false);
    this._window.on('close', () => {
      store.set(storeActions.PAINT_BOUNDS, this._window.getBounds());
    });

    // this._window.webContents.openDevTools();
  }

  getWindow() {
    return this._window;
  }
  getImage() {
    return this._image;
  }
}

export const paintWindow = new PaintWindow();
