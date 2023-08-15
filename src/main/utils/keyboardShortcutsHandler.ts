import { clipboard, globalShortcut } from 'electron';
import { IpcMainHandler, ipc } from '../connection/IpcMainHandler';
import { paintWindow } from '../features/paintWindow/PaintWindow';
import robot from 'robotjs';
import { getContent, getFormat } from './clipboardHandler';

export const registerGlobalShortcuts = () => {
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

    ipc.sendInputPasteRequest(1);
  });

  globalShortcut.register(paste2, () => {
    robot.keyToggle('shift', 'up');

    ipc.sendInputPasteRequest(2);
  });

  globalShortcut.register(paste3, () => {
    robot.keyToggle('shift', 'up');

    ipc.sendInputPasteRequest(3);
  });

  globalShortcut.register(paste4, () => {
    robot.keyToggle('shift', 'up');

    ipc.sendInputPasteRequest(4);
  });

  globalShortcut.register(paste5, () => {
    robot.keyToggle('shift', 'up');

    ipc.sendInputPasteRequest(5);
  });

  globalShortcut.register(copy1, () => {
    robot.keyToggle('command', 'up');

    robot.keyTap('c', ['control']);
    ipc.sendInputCopyRequest(1);
  });

  globalShortcut.register(copy2, () => {
    robot.keyToggle('command', 'up');

    robot.keyTap('c', ['control']);
    ipc.sendInputCopyRequest(2);
  });

  globalShortcut.register(copy3, () => {
    robot.keyToggle('command', 'up');

    robot.keyTap('c', ['control']);
    ipc.sendInputCopyRequest(3);
  });

  globalShortcut.register(copy4, () => {
    robot.keyToggle('command', 'up');

    robot.keyTap('c', ['control']);
    ipc.sendInputCopyRequest(4);
  });

  globalShortcut.register(copy5, () => {
    robot.keyToggle('command', 'up');

    robot.keyTap('c', ['control']);
    ipc.sendInputCopyRequest(5);
  });

  globalShortcut.register(paint, () => {
    getFormat() === 'image' ? paintWindow.open(getContent(getFormat())) : paintWindow.open(null);
  });
};

export const unregisterGlobalShortcuts = () => {
  globalShortcut.unregisterAll();
};
