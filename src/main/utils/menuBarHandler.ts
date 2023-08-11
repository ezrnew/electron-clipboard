import { Menu } from 'electron';
import { win } from '../main';
import { clearClipboardFile } from './clipboardHandler';
import Store from 'electron-store';
import { ipc } from '../connection/IpcMainHandler';

const store = new Store();

export const storeActions = {
  ALWAYS_ON_TOP: 'always-on-top',
  HIDE_MENU: 'hide-menu',
  CLIPBOARD_BOUNDS: 'clipboard-bounds',
  PAINT_BOUNDS: 'paint-bounds',
  INPUTS_QUANTITY: 'inputs-quantity',
  ENTRY_SIZE: 'entry-size',
} as const;

const template = [
  {
    label: 'Settings',
    submenu: [
      {
        type: 'checkbox',
        label: 'always on top',
        click: alwaysOnTopHandler,
        checked: store.get(storeActions.ALWAYS_ON_TOP),
      },
      {
        label: 'clear all data',
        click: clearClipboardHandler,
      },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'inputs',

        submenu: [
          {
            type: 'radio',
            checked:store.get(storeActions.INPUTS_QUANTITY) === 0,
            label: '0',
            click: () => {
              inputsQuantityHandler(0);
            },
          },
          {
            type: 'radio',
            checked:store.get(storeActions.INPUTS_QUANTITY) === 1,
            label: '1',
            click: () => {
              inputsQuantityHandler(1);
            },
          },
          {
            type: 'radio',
            checked:store.get(storeActions.INPUTS_QUANTITY) === 2,
            label: '2',
            click: () => {
              inputsQuantityHandler(2);
            },
          },
          {
            type: 'radio',
            checked:store.get(storeActions.INPUTS_QUANTITY) === 3,
            label: '3',
            click: () => {
              inputsQuantityHandler(3);
            },
          },
          {
            type: 'radio',
            checked:store.get(storeActions.INPUTS_QUANTITY) === 4,
            label: '4',
            click: () => {
              inputsQuantityHandler(4);
            },
          },
          {
            type: 'radio',
            checked:store.get(storeActions.INPUTS_QUANTITY) === 5,
            label: '5',
            click: () => {
              inputsQuantityHandler(5);
            },
          },
        ],
      },
      {
        label: 'entry size',
        click: () => {},
        submenu: [
          {
            type: 'radio',
            checked:store.get(storeActions.ENTRY_SIZE) === 1,
            label: 'small',
            click: () => {
              clipboardEntrySizeHandler(1);
            },
          },
          {
            type: 'radio',
            checked:store.get(storeActions.ENTRY_SIZE) === 2,
            label: 'medium',
            click: () => {
              clipboardEntrySizeHandler(2);
            },
          },
          {
            type: 'radio',
            checked:store.get(storeActions.ENTRY_SIZE) === 3,
            label: 'large',
            click: () => {
              clipboardEntrySizeHandler(3);
            },
          },
        ],
      },
      {
        type: 'checkbox',
        label: 'hide menu',
        click: hideMenuHandler,
        checked: store.get(storeActions.HIDE_MENU),
      },
    ],
  },
];

function alwaysOnTopHandler() {
  store.set(storeActions.ALWAYS_ON_TOP, !win.isAlwaysOnTop());
  win.setAlwaysOnTop(!win.isAlwaysOnTop());
}

function clearClipboardHandler() {
  clearClipboardFile();
  //todo wyslac nowa date
}

function hideMenuHandler() {
  win.setAutoHideMenuBar(!win.isMenuBarAutoHide());
  store.set(storeActions.HIDE_MENU, win.isMenuBarAutoHide());
  if (!win.isMenuBarAutoHide()) {
    win.setMenuBarVisibility(true);
  } else {
    win.setMenuBarVisibility(false);
  }
}

function inputsQuantityHandler(quantity: number) {
  store.set(storeActions.INPUTS_QUANTITY, quantity);
  ipc.sendInputsQuantity(quantity);
}

function clipboardEntrySizeHandler(size: 1 | 2 | 3) {
  store.set(storeActions.ENTRY_SIZE, size);
  ipc.sendClipboardEntrySize(size);
}

export const CLIPBOARD_WINDOW_MENU = Menu.buildFromTemplate(template as Electron.MenuItemConstructorOptions[]);
