import {app, BrowserWindow } from "electron";

import * as path from 'path'

let paintWindow:BrowserWindow

export const paintWindowHandler = () =>{

    
        paintWindow = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true, //alt pokazuje dalej bara
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                // preload: path.join(__dirname, 'preload.js'),
                devTools: true,
            }
        })
    
        // console.log(path.join(app.getAppPath(), 'src','renderer', 'index.html'))
        paintWindow.loadFile(path.join(app.getAppPath(), 'src', 'main', 'utils', 'paintWindow', 'index.html'))
    
        paintWindow.webContents.openDevTools();
    
    }