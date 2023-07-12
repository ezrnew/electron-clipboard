import { ipcPaint } from "../../connection/IpcRendererPaintHandler"
import { tools } from "./paintTools"

const TOOLBAR_HEIGHT= 60

document.addEventListener('DOMContentLoaded', function () {
    console.log('script')
    ipcPaint.sendWindowReady()

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const canvasContext = canvas.getContext('2d')



// canvas.width=window.innerWidth
// canvas.height=window.innerHeight

let painting = false

// canvas.style.backgroundImage = "url('path/to/your/image.jpg')";

// console.log('CANVAS')

canvas.addEventListener('mousedown',(e)=>{painting=true; draw(e)})
canvas.addEventListener('mouseup',()=>{painting=false; canvasContext.beginPath()})

canvas.addEventListener('mousemove',draw)

function draw(e){
    // var rect = e.target.getBoundingClientRect();
    // var x = e.clientX - rect.left; //x position within the element.
    // var y = e.clientY - rect.top;  //y position within the element.
    // // console.log("Left? : " + x + " ; Top? : " + y + ".");
    // console.log('mousemove ',e);
    if(!painting) return;

    canvasContext.lineWidth = tools.getDrawingWidth()
    canvasContext.lineCap = "round"
    canvasContext.strokeStyle = tools.getColor()

    // console.log('drawing line to':x,y)
    canvasContext.lineTo(e.clientX,e.clientY-TOOLBAR_HEIGHT)

   
    canvasContext.stroke()
    canvasContext.beginPath()
    canvasContext.moveTo(e.clientX,e.clientY-TOOLBAR_HEIGHT)

}



})


export const setImageToCanvas = (data64Image:string) =>{

    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    const canvasContext = canvas.getContext('2d')


    getImageData(data64Image).then((result:any) => 
        {

            canvas.width=result.width;
            canvas.height=result.height;
            canvasContext.drawImage(result.img,0,0,result.width,result.height)
        }

        )

    }



    function getImageData(dataUri) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = dataUri;
      
          img.onload = () => {
            
            const width = img.width;
            const height = img.height;
            resolve({img, width, height });
          };
      
          img.onerror = () => {
            reject(new Error('Failed to load image'));
          };
      
        });
      }