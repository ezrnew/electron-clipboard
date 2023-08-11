import { ipc } from '../connection/IpcRendererHandler';
import { store } from '../store/store';

let entrySize = 2;
let lastEntry = '';

export function displayInitialClipboardData(data: string[]) {
  const clipboardList = document.getElementById('clipboard-list');

  clipboardList.innerHTML = '';

  data.forEach((entry) => {
    let item = document.createElement('li');
    item.appendChild(getLiChild(entry));
    item.addEventListener('click', () => {
      onEntryClick(entry);
    });
    if (!isText(entry)) {
      item.addEventListener('contextmenu', () => {
        onImageRightClick(entry);
      });
    }

    clipboardList.appendChild(item);
  });
}

export function displayInputs(quantity: number) {
  const inputs = document.getElementsByClassName('clipboard-input');

  for (let item of inputs) {
    item.classList.remove('hidden');
  }

  for (let i = inputs.length; i > quantity; i--) {
    inputs[i - 1].classList.add('hidden');
  }
  const inputContainer = document.getElementById('inputs-container');
  inputContainer.classList.remove('margin-bottom-20px');
  if (quantity !== 0) {
    inputContainer.classList.add('margin-bottom-20px');
  }
}

export function appendClipboardData(data: string) {
  if (lastEntry === data) {
    return;
  }
  lastEntry = data;

  const clipboardList = document.getElementById('clipboard-list');

  let item = document.createElement('li');
  item.classList.add(getEntrySizeClassByNumber(entrySize));

  item.appendChild(getLiChild(data));

  item.addEventListener('click', () => {
    onEntryClick(data);
  });

  if (!isText(data)) {
    item.addEventListener('contextmenu', () => {
      onImageRightClick(data);
    });
  }

  clipboardList.appendChild(item);
}

function getLiChild(data: string) {
  if (isText(data)) {
    return document.createTextNode(data);
  } else {
    //todo dodac validacje jak się zaczyna z data:image/png;base64, czy mozna zdecodować poprawnie
    let img = document.createElement('img');

    img.src = data;
    img.className = 'imgStyle';

    return img;
  }
}

function onEntryClick(data: string) {
  isText(data) ? navigator.clipboard.writeText(data) : writeClipboardImage(data);
}

function onImageRightClick(data: string) {
  ipc.sendPaintRequest(data);
}

function isText(data: string) {
  return !data.startsWith('data:image/png;base64,');
}

export function writeClipboardImage(base64Image: string) {
  const base64 = base64Image.replace('data:image/png;base64,', '');

  const blob = b64toBlob(base64, 'image/png');

  try {
    navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
  } catch (error) {
    console.error(error);
  }
}

export const setEntrySize = async (size: 1 | 2 | 3) => {
  entrySize = size;
  const ul = document.getElementById('clipboard-list');

  const liItems = ul.getElementsByTagName('li');
  console.log('HTML COLLECTION', liItems);
  console.log('ustawiam klase dla chlopaczkuw:', getEntrySizeClassByNumber(size));
  console.log(liItems.length);

  if (liItems.length === 0) {
    console.log('nie ma uela');
    setTimeout(() => {
      setEntrySize(size);
    }, 100);
    return;
  }

  for (let item of liItems) {
    item.classList.remove('max-height-1c5em', 'max-height-3em', 'max-height-5em');

    item.classList.add(getEntrySizeClassByNumber(size));
  }
};

function getEntrySizeClassByNumber(size: number) {
  if (size === 1) return 'max-height-1c5em';
  if (size === 2) return 'max-height-3em';
  if (size === 3) return 'max-height-5em';
  return '';
}
const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
