import { Menu } from 'electron';
import { win } from '../main';
import { clearClipboardFile } from './clipboardHandler';
import Store from 'electron-store';

const store = new Store();

const template = [
  {
    label: 'Settings',
    submenu: [
      {
        type: 'checkbox',
        label: 'always on top',
        click: alwaysOnTopHandler,
        checked: store.get('always-on-top'),
      },
      {
        label: 'clear all data',
        click: clearClipboardHandler,
        checked: false,
      },
    ],
  },
];

function alwaysOnTopHandler() {
  store.set('always-on-top', !win.isAlwaysOnTop());
  win.setAlwaysOnTop(!win.isAlwaysOnTop());
}

function clearClipboardHandler() {
  clearClipboardFile();
  //todo wyslac nowa date
}

export const CLIPBOARD_WINDOW_MENU = Menu.buildFromTemplate(template as Electron.MenuItemConstructorOptions[]);
