import { BrowserWindow, Menu, Tray, app } from "electron"

const rootDir = process.cwd()

const zdjencieDir = rootDir+"\\src\\assets\\pobrane.png"


export const systemTrayHandler = (win:BrowserWindow) =>{
    
    const tray = new Tray(zdjencieDir)

    const contextMenu = Menu.buildFromTemplate([
        { label: 'restore', click:()=>{win.show()}},
        { label: 'quit', click:()=>{app.quit()}},

      ])

      tray.setToolTip("quick clipboard running")
      tray.setContextMenu(contextMenu)
      tray.addListener("click",()=>{win.show()})
      


    
}