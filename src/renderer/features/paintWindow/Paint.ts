import { ipc } from '../../connection/IpcRendererHandler';
import { writeClipboardImage } from '../../utils/displayClipboard';
import { tools } from './paintTools';

class Paint {
  private _initialImage: string;
  private _editHistory: string[];
  private _step: number;

  constructor() {
    this._step = 0;
    this._editHistory = [];
    this._initialImage = '';

    this.initializeKeyboardUtilities();
  }

  getInitialImage() {
    return this._initialImage;
  }
  setInitialImage(image: string) {
    this._initialImage = image;
  }

  getStep() {
    return this._step;
  }
  setStep(step: number) {
    this._step = step;
  }

  setImageHistory(history: []) {
    this._editHistory = history;
  }

  getImageHistory() {
    return this._editHistory;
  }

  pushImage() {
    this._step = this._step + 1;
    if (this._step < this._editHistory.length) {
      this._editHistory.length = this._step;
    }

    this._editHistory.push((document.getElementById('canvas') as HTMLCanvasElement).toDataURL());
  }
  undo() {
    if (this._step > 0) {
      this._step = this._step - 1;
      this.setImageToCanvas(this._step);
    }
  }
  redo() {
    if (this._step < this._editHistory.length - 1) {
      this._step = this._step + 1;
      this.setImageToCanvas(this._step);
    }
  }
  reset() {
    this.setInitialImageToCanvas();
    this.setImageHistory([]);
    this._step = 0;
  }
  async copy() {
    await writeClipboardImage(this._editHistory[this._step]);
    ipc.sendClosePaintWindow()

  }
  save() {
    let link = document.createElement('a');
    link.download = 'filename.png';
    link.href = (document.getElementById('canvas') as HTMLCanvasElement).toDataURL();
    link.click();
  }

  pickColor() {
    tools.setIsPickingColor(true)

  }

  closeWindow() {
    ipc.sendClosePaintWindow()

  }


  //todo
  setImageToCanvas(step: number) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const canvasContext = canvas.getContext('2d');
    const canvasPic = new Image();
    canvasPic.src = this._editHistory[step];
    canvasPic.onload = () => {
      canvasContext.drawImage(canvasPic, 0, 0);
    };
  }
  setInitialImageToCanvas() {
    this._editHistory = [];
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const canvasContext = canvas.getContext('2d');

    return getImageData(this._initialImage).then((result: any) => {
      canvas.width = result.width;
      canvas.height = result.height;
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.drawImage(result.img, 0, 0, result.width, result.height);
      this._editHistory.push(this._initialImage);

      return 3;
    });
  }

  setInitialEmptyCanvas() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const canvasContext = canvas.getContext('2d');

    //todo
    canvas.width = 500;
    canvas.height = 500;
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.rect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'white';
    canvasContext.fill();
    const img = (document.getElementById('canvas') as HTMLCanvasElement).toDataURL();
    this._editHistory.push(img);
    this._initialImage = img;
  }

  //initialize colors

  initializeKeyboardUtilities() {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'c') {
        this.copy();
      }

      if (event.ctrlKey && event.key === 'z') {
        this.undo();
      }

      if (event.ctrlKey && event.key === 'y') {
        this.redo();
      }

      if (event.ctrlKey && event.key === 'r') {
        this.reset();
      }

      if (event.ctrlKey && event.key === 's') {
        this.save();
      }
      if (event.altKey && event.key === 'a') {
        this.pickColor();
      }
      if (event.ctrlKey && event.key === 'w') {
        this.closeWindow();
      }

    };

    window.addEventListener('keydown', handleKeyDown);
  }
}

//todo
function getImageData(dataUri) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataUri;

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      resolve({ img, width, height });
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
}

export const paint = new Paint();
