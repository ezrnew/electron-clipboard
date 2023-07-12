import {app, BrowserWindow } from "electron";

import * as path from 'path'

// let paintWindow:BrowserWindow

 class PaintWindow {
    private _window
    private _image

    // constructor(){

    
    
    // }

    //todo window is created at app start but is hidden
    open(image:string){
        console.log('initialize')
        this._image = image
        this._window = new BrowserWindow({
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

        this._window.loadFile(path.join(app.getAppPath(), 'src', 'renderer', 'features', 'paintWindow', 'index.html'))
    

        this._window.webContents.openDevTools();



    }

    // open(image:string){
        



    //     this._image = image
    //     //todo close window if alraeady open and ask for confirmation

    //     console.log('oopen paint:')
    //     // console.log(app.getAppPath())
    //     // console.log(path.join(app.getAppPath(), 'src', 'renderer', 'utils', 'paintWindow', 'index.html'))
    //     this._window.loadFile(path.join(app.getAppPath(), 'src', 'renderer', 'features', 'paintWindow', 'index.html'))
    
    //     this._window.webContents.openDevTools();
    // }


    getWindow(){
        return this._window
    }
    getImage(){
        return this._image
    }






    }

    export const paintWindow = new PaintWindow()

    