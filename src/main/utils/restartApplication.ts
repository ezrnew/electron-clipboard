import { app } from "electron"

export const restartApp = () =>{
    app.relaunch()
    app.exit()
}