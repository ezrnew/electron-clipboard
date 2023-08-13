import { clipboard, globalShortcut } from 'electron';
import { IpcMainHandler, ipc } from '../connection/IpcMainHandler';
import * as ncp from 'copy-paste';
import { paintWindow } from '../features/paintWindow/PaintWindow';
import robot from 'robotjs';
import { getContent, getFormat } from './clipboardHandler';
// const { clipboard } = require('electron');
// import ks from "node-key-sender"

// const printSelectedText = (selectedText) => {
//   console.log(`Selected Text: ${selectedText}`);
// };

//!global hotkeys prevent default behavior
//todo custom keys
export const registerGlobalShortcuts = () => {
  console.log('register');

  const copy1 = 'CommandOrControl+f1';
  const copy2 = 'CommandOrControl+f2';
  const copy3 = 'CommandOrControl+f3';
  const copy4 = 'CommandOrControl+f4';
  const copy5 = 'CommandOrControl+f5';

  const paste1 = 'Shift+f1';
  const paste2 = 'Shift+f2';
  const paste3 = 'Shift+f3';
  const paste4 = 'Shift+f4';
  const paste5 = 'Shift+f5';

  const paint = 'CommandOrControl+Shift+r';

  //todo hardcoded keytoggles
  globalShortcut.register(paste1, () => {
    robot.keyToggle('shift', 'up');

    console.log('paste 1');
    ipc.sendInputPasteRequest(1);
  });

  globalShortcut.register(paste2, () => {
    robot.keyToggle('shift', 'up');

    console.log('paste 2');
    ipc.sendInputPasteRequest(2);
  });

  globalShortcut.register(paste3, () => {
    robot.keyToggle('shift', 'up');

    console.log('paste 3');
    ipc.sendInputPasteRequest(3);
  });

  globalShortcut.register(paste4, () => {
    robot.keyToggle('shift', 'up');

    console.log('paste 4');
    ipc.sendInputPasteRequest(4);
  });

  globalShortcut.register(paste5, () => {
    robot.keyToggle('shift', 'up');

    console.log('paste 5');
    ipc.sendInputPasteRequest(5);
  });
  //////!

  globalShortcut.register(copy1, () => {
    robot.keyToggle('command', 'up');

    robot.keyTap('c', ['control']);
    ipc.sendInputCopyRequest(1);

    console.log('copy1 ');
  });

  globalShortcut.register(copy2, () => {
    robot.keyToggle('command', 'up');

    robot.keyTap('c', ['control']);
    ipc.sendInputCopyRequest(2);

    console.log('copy2 ');
  });

  globalShortcut.register(copy3, () => {
    robot.keyToggle('command', 'up');

    robot.keyTap('c', ['control']);
    ipc.sendInputCopyRequest(3);

    console.log('copy3 ');
  });

  globalShortcut.register(copy4, () => {
    robot.keyToggle('command', 'up');

    robot.keyTap('c', ['control']);
    ipc.sendInputCopyRequest(4);

    console.log('copy4 ');
  });

  globalShortcut.register(copy5, () => {
    robot.keyToggle('command', 'up');

    robot.keyTap('c', ['control']);
    ipc.sendInputCopyRequest(5);

    console.log('copy5 ');
  });

  globalShortcut.register(paint, () => {
    getFormat() === 'image' ? paintWindow.open(getContent(getFormat())) : paintWindow.open(null);

    console.log('paint 1');
  });
};

export const unregisterGlobalShortcuts = () => {
  console.log('unregister');
  globalShortcut.unregisterAll();
};
