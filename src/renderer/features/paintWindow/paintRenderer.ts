import { ipcPaint } from "../../connection/IpcRendererPaintHandler"
import { paint } from "./Paint"
import { tools } from "./paintTools"

const TOOLBAR_HEIGHT= 60

document.addEventListener('DOMContentLoaded',async function () {
  console.log('script')
  ipcPaint.sendWindowReady()


// const canvas = document.getElementById("canvas") as HTMLCanvasElement
// const canvasContext = canvas.getContext('2d')


// function handleKeyDown(event) {
//   console.log('handlekeydown',event)
//   if (event.ctrlKey && event.key === 'c') {
//     console.log('Ctrl + C pressed');
//     // Your code to execute when Ctrl + C is pressed
//   }
// }

// window.addEventListener('keydown', handleKeyDown);


// // canvas.width=window.innerWidth
// // canvas.height=window.innerHeight

// let painting = false

// // canvas.style.backgroundImage = "url('path/to/your/image.jpg')";

// // console.log('CANVAS')

// canvas.addEventListener('mousedown',(e)=>{painting=true; draw(e)})
// canvas.addEventListener('mouseup',()=>{painting=false; canvasContext.beginPath()})

// canvas.addEventListener('mousemove',draw)

// function draw(e){
//     // var rect = e.target.getBoundingClientRect();
//     // var x = e.clientX - rect.left; //x position within the element.
//     // var y = e.clientY - rect.top;  //y position within the element.
//     // // console.log("Left? : " + x + " ; Top? : " + y + ".");
//     // console.log('mousemove ',e);
//     if(!painting) return;

//     canvasContext.lineWidth = tools.getDrawingWidth()
//     canvasContext.lineCap = "round"
//     canvasContext.strokeStyle = tools.getColor()

//     // console.log('drawing line to':x,y)
//     canvasContext.lineTo(e.clientX,e.clientY-TOOLBAR_HEIGHT)

   
//     canvasContext.stroke()
//     canvasContext.beginPath()
//     canvasContext.moveTo(e.clientX,e.clientY-TOOLBAR_HEIGHT)

// }
// const wartosc = await setImageToCanvas(ipcPaint.initialImage)



//! PAINTING

let firstDrawing = true
var cPushArray = [];
// cPushArray.push((document.getElementById('canvas')as HTMLCanvasElement).toDataURL())
// var poczontkoweZdjencie = ((document.getElementById('canvas')as HTMLCanvasElement).toDataURL());
// cPushArray.push((document.getElementById('canvas')as HTMLCanvasElement).toDataURL());
console.log('SIARRAJINITIALNY', cPushArray)
var cStep = 0;
var ctx2= (document.getElementById('canvas')as HTMLCanvasElement).getContext("2d");




function cPush() {
  cStep++;
  console.log("CPUSZUJE, STEP:",cStep)
  if (cStep < cPushArray.length) { cPushArray.length = cStep; }
  cPushArray.push((document.getElementById('canvas')as HTMLCanvasElement).toDataURL());
  console.log('NOWY C ARRAY:',cPushArray)
}


function cUndo() {
  if (cStep > 0) {
    cStep--;
    console.log("przechodzi step po reducki:",cStep)
      var canvasPic = new Image();
      canvasPic.src = cPushArray[cStep];
      canvasPic.onload = function () { ctx2.drawImage(canvasPic, 0, 0); }
  }
}

function cRedo() {
  if (cStep < cPushArray.length-1) {
      cStep++;
      var canvasPic = new Image();
      canvasPic.src = cPushArray[cStep];
      canvasPic.onload = function () { ctx2.drawImage(canvasPic, 0, 0); }
  }
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d');
// canvas.width = 600;
// canvas.height=200;
ctx.lineJoin = 'round';
    ctx.lineWidth = tools.getDrawingWidth()
    ctx.lineCap = "round"
    ctx.strokeStyle = tools.getColor()
let drawing = false;
let pathsry = [];
let points = [];
let gluwnatablica = []

var mouse = {x: 0, y: 0};
var previous = {x: 0, y: 0};

canvas.addEventListener('mousedown', function(e) {
// if(firstDrawing){
//   cPushArray.push((document.getElementById('canvas')as HTMLCanvasElement).toDataURL())
//   firstDrawing =false
// }
  
drawing = true; 
previous = {x:mouse.x,y:mouse.y};
mouse = oMousePos(canvas, e);
points = [];
points.push({x:mouse.x,y:mouse.y})

});

canvas.addEventListener('mousemove', function(e) {

  // ctx.lineWidth = tools.getDrawingWidth()
  ctx.lineCap = "round"
  ctx.strokeStyle = tools.getColor()
  ctx.lineWidth = tools.getDrawingWidth()

if(drawing){
previous = {x:mouse.x,y:mouse.y};
mouse = oMousePos(canvas, e);
// saving the points in the points array

points.push({x:mouse.x,y:mouse.y})
// drawing a line from the previous point to the current point
ctx.beginPath();
ctx.moveTo(previous.x,previous.y);
ctx.lineTo(mouse.x,mouse.y);
ctx.stroke();
}
}, false);


canvas.addEventListener('mouseup', function() {
drawing=false;
// Adding the path to the array or the paths
// console.log('PUSZUJE SE PUNKTY')
// console.log(points)
// pathsry.push(points);

// gluwnatablica.push({points,color:tools.getColor(),width:tools.getDrawingWidth()})
//! cPush()
paint.pushImage()

}, false);

canvas.addEventListener('mouseleave', function() {

// if(drawing){
//   cPush()
// }

  drawing=false;
  // Adding the path to the array or the paths
  // console.log('PUSZUJE SE PUNKTY')
  // console.log(points)
  // pathsry.push(points);
  
  // gluwnatablica.push({points,color:tools.getColor(),width:tools.getDrawingWidth()})
 
  
  }, false);

const undo = document.getElementById("undo")

undo.addEventListener("click",()=>{paint.undo()});

const redo = document.getElementById("redo")

redo.addEventListener("click",()=>{paint.redo()});




// async function drawPaths(){
//   // delete everything
//   // ctx.clearRect(0,0,canvas.width,canvas.height);
//   const wartosc = await setImageToCanvas(ipcPaint.initialImage)
//   // draw all the paths in the paths array
//   // setTimeout(() => {
//     console.log(wartosc)
    
 
//   // pathsry.forEach(path=>{
//   //   console.log(path)
//   // ctx.beginPath();
//   // ctx.moveTo(path[0].x,path[0].y);  
//   // for(let i = 1; i < path.length; i++){
//   //   ctx.lineTo(path[i].x,path[i].y); 
//   // }
//   //   ctx.stroke();
//   // })
//   // pathcanvasContext.lineWidth = tools.getDrawingWidth()
//   gluwnatablica.forEach(item=>{
//     console.log(item)
//     ctx.strokeStyle = item.color
//     ctx.lineWidth = item.width 
//   ctx.beginPath();
//   ctx.moveTo(item.points[0].x,item.points[0].y);  
//   for(let i = 1; i < item.points.length; i++){
//     ctx.lineTo(item.points[i].x,item.points[i].y); 
//   }
//     ctx.stroke();
//   })





// // }, 100);
// }  

// function Undo(){
//   console.log("UNDOADASDASASDA")
 
//   // remove the last path from the paths array
//   pathsry.splice(-1,1);
//   gluwnatablica.splice(-1,1);
//   // draw all the paths in the paths array
//   drawPaths();
// }


// a function to detect the mouse position
function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
	return { //objeto
	x: Math.round(evt.clientX - ClientRect.left),
	y: Math.round(evt.clientY - ClientRect.top)
}
}



















})


export const setImageToCanvas = async (data64Image:string) =>{

    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    const canvasContext = canvas.getContext('2d')


    return getImageData(data64Image).then((result:any) => 
        {

            canvas.width=result.width;
            canvas.height=result.height;
            canvasContext.clearRect(0,0,canvas.width,canvas.height)
            canvasContext.drawImage(result.img,0,0,result.width,result.height)
        return 3
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