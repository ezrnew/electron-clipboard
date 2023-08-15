import { ipcPaint } from '../../connection/IpcRendererPaintHandler';
import { paint } from './Paint';
import { tools } from './paintTools';

const TOOLBAR_HEIGHT = 60;

document.addEventListener('DOMContentLoaded', async function () {
  ipcPaint.sendWindowReady();

  // const undo = document.getElementById('undo');
  // undo.addEventListener('click', () => {
  //   paint.undo();
  // });
  document.getElementById('undo').addEventListener('click', () => {
    paint.undo();
  });
  document.getElementById('redo').addEventListener('click', () => {
    paint.redo();
  });
  document.getElementById('reset').addEventListener('click', () => {
    paint.reset();
  });
  document.getElementById('copy').addEventListener('click', () => {
    paint.copy();
  });
  document.getElementById('save').addEventListener('click', () => {
    paint.save();
  });


  //! PAINTING

  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  let drawing = false;

  var mouse = { x: 0, y: 0 };
  var previous = { x: 0, y: 0 };

  canvas.addEventListener('mousedown', function (e) {
    drawing = true;
    previous = { x: mouse.x, y: mouse.y };
    mouse = oMousePos(canvas, e);
    // points = [];
    // points.push({x:mouse.x,y:mouse.y})
  });

  canvas.addEventListener(
    'mousemove',
    function (e) {
      // ctx.lineWidth = tools.getDrawingWidth()
      ctx.lineCap = 'round';
      ctx.strokeStyle = tools.getColor();
      ctx.lineWidth = tools.getDrawingWidth();

      if (drawing) {
        previous = { x: mouse.x, y: mouse.y };
        mouse = oMousePos(canvas, e);
        // saving the points in the points array

        // points.push({x:mouse.x,y:mouse.y})
        // drawing a line from the previous point to the current point
        ctx.beginPath();
        ctx.moveTo(previous.x, previous.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    },
    false
  );

  canvas.addEventListener(
    'mouseup',
    function () {
      drawing = false;

      paint.pushImage();
    },
    false
  );

  canvas.addEventListener(
    'mouseleave',
    function () {
      if(drawing)paint.pushImage();
      drawing = false;
      
    },
    false
  );

  function oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return {
      //objeto
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top),
    };
  }
});
