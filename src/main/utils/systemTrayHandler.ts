import { BrowserWindow, Menu, Tray, app } from 'electron';

const imageDir = process.cwd() + '\\src\\assets\\clipboard-check-solid.png';

export const systemTrayHandler = (win: BrowserWindow) => {
  const tray = new Tray(imageDir);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'restore',
      click: () => {
        win.show();
      },
    },
    {
      label: 'quit',
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip('clipboard running');
  tray.setContextMenu(contextMenu);
  tray.addListener('click', () => {
    win.show();
  });
};
