import { ipcPaint } from "../../connection/IpcRendererPaintHandler"


document.addEventListener('DOMContentLoaded', function () {
    console.log('script')

console.log(ipcPaint)



})


export const setImage = (data64Image:string) =>{
    console.log('setting img',data64Image.substring(1,60))

    const imageElement = document.getElementById('main-image') as HTMLImageElement

    
    imageElement.src =  data64Image
    
    }

