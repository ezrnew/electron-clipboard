import { BrowserWindow, Menu, Notification, dialog, shell } from 'electron';
import { win } from '../main';
import { clearClipboardFile } from './clipboardHandler';
import Store from 'electron-store';
import { ipc } from '../connection/IpcMainHandler';
import { registerGlobalShortcuts, unregisterGlobalShortcuts } from './keyboardShortcutsHandler';
import { CLIPBOARD_DATA_PATH } from '../../common/constants';
import { showClearDataDialog } from './showClearDataDialog';

const store = new Store();

export const storeActions = {
  ALWAYS_ON_TOP: 'always-on-top',
  HIDE_MENU: 'hide-menu',
  CLIPBOARD_BOUNDS: 'clipboard-bounds',
  PAINT_BOUNDS: 'paint-bounds',
  INPUTS_QUANTITY: 'inputs-quantity',
  ENTRY_SIZE: 'entry-size',
  HIDE_WINDOW_ON_START: 'show-window-on-start',
  HIDE_TASKBAR_ICON: 'hide-taskbar-icon',
  ENABLE_GLOBAL_SHORTCUTS: 'enable-global-shortcuts',
} as const;

const template = [
  {
    label: 'Settings',
    accelerator: 'Alt+S',
    submenu: [
      {
        type: 'checkbox',
        label: 'always on top',
        click: alwaysOnTopHandler,
        checked: store.get(storeActions.ALWAYS_ON_TOP),
      },
      {
        type: 'checkbox',
        label: 'hide window on start',
        click: hideWindowOnStartHandler,
        checked: store.get(storeActions.HIDE_WINDOW_ON_START),
      },
      {
        type: 'checkbox',
        label: 'hide taskbar icon',
        click: hideTaskbarIconHandler,
        checked: store.get(storeActions.HIDE_TASKBAR_ICON),
      },
      {
        type: 'checkbox',
        label: 'enable global shortcuts',
        click: enableGolbalShortcutsHandler,
        checked: store.get(storeActions.ENABLE_GLOBAL_SHORTCUTS),
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
            checked: store.get(storeActions.INPUTS_QUANTITY) === 0,
            label: '0',
            click: () => {
              inputsQuantityHandler(0);
            },
          },
          {
            type: 'radio',
            checked: store.get(storeActions.INPUTS_QUANTITY) === 1,
            label: '1',
            click: () => {
              inputsQuantityHandler(1);
            },
          },
          {
            type: 'radio',
            checked: store.get(storeActions.INPUTS_QUANTITY) === 2,
            label: '2',
            click: () => {
              inputsQuantityHandler(2);
            },
          },
          {
            type: 'radio',
            checked: store.get(storeActions.INPUTS_QUANTITY) === 3,
            label: '3',
            click: () => {
              inputsQuantityHandler(3);
            },
          },
          {
            type: 'radio',
            checked: store.get(storeActions.INPUTS_QUANTITY) === 4,
            label: '4',
            click: () => {
              inputsQuantityHandler(4);
            },
          },
          {
            type: 'radio',
            checked: store.get(storeActions.INPUTS_QUANTITY) === 5,
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
            checked: store.get(storeActions.ENTRY_SIZE) === 1,
            label: 'small',
            click: () => {
              clipboardEntrySizeHandler(1);
            },
          },
          {
            type: 'radio',
            checked: store.get(storeActions.ENTRY_SIZE) === 2,
            label: 'medium',
            click: () => {
              clipboardEntrySizeHandler(2);
            },
          },
          {
            type: 'radio',
            checked: store.get(storeActions.ENTRY_SIZE) === 3,
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
  {
    label: 'Data',
    submenu: [
      {
        label: 'open directory',
        click: openDataDirectoryHandler,
      },
      {
        label: 'clear all data',
        click: clearClipboardHandler,
      },
    ],
  },
  {
    label: 'Help',
    click: () => {
      console.log('aa pomusz mi');
    },
  },
];

function alwaysOnTopHandler() {
  store.set(storeActions.ALWAYS_ON_TOP, !win.isAlwaysOnTop());
  win.setAlwaysOnTop(!win.isAlwaysOnTop());
}

function openDataDirectoryHandler() {
  shell.showItemInFolder(CLIPBOARD_DATA_PATH);
}
function clearClipboardHandler() {
  showClearDataDialog(win).then((result) =>
    result.clickedId === result.acceptId
      ? (() => {
          clearClipboardFile();
          ipc.sendInitialClipboard();
        })()
      : null
  );
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

function hideWindowOnStartHandler() {
  store.set(storeActions.HIDE_WINDOW_ON_START, !store.get(storeActions.HIDE_WINDOW_ON_START));
}

function hideTaskbarIconHandler() {
  const newValue = !store.get(storeActions.HIDE_TASKBAR_ICON);
  store.set(storeActions.HIDE_TASKBAR_ICON, newValue);
  win.setSkipTaskbar(newValue);
}

function enableGolbalShortcutsHandler() {
  const newValue = !store.get(storeActions.ENABLE_GLOBAL_SHORTCUTS);
  store.set(storeActions.ENABLE_GLOBAL_SHORTCUTS, newValue);
  if (newValue) {
    registerGlobalShortcuts();
  } else {
    unregisterGlobalShortcuts();
  }
}

export const CLIPBOARD_WINDOW_MENU = Menu.buildFromTemplate(template as Electron.MenuItemConstructorOptions[]);
