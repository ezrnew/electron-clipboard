import { BrowserWindow, dialog } from 'electron';

export const showClearDataDialog = async (win: BrowserWindow) => {
  const options = {
    // type: 'info',
    title: 'Delete all data',
    message: 'All your clipboard data will be erased. Do you want to continue?',
    buttons: [' Yes ', ' Cancel '],
    noLink: true,
    defaultId: 1,
  };

  return dialog.showMessageBox(win, options).then((res) => {
    return { clickedId: res.response, acceptId: 0 };
  });
};
