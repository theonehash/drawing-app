const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let brushSize = 5; // Default brush size
let drawingShape = 'pen'; // Default drawing shape

function startPosition(e) {
  isDrawing = true;
  draw(e);
}

function endPosition() {
  isDrawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!isDrawing) return;

  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';

  if (drawingShape === 'pen') {
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  } else if (drawingShape === 'line') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
  } else if (drawingShape === 'circle') {
    const radius = Math.sqrt(
      Math.pow(e.clientX - canvas.offsetLeft - canvas.width / 2, 2) +
      Math.pow(e.clientY - canvas.offsetTop - canvas.height / 2, 2)
    );
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
  }

  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function changeBrushSize(size) {
  brushSize = size;
}

function setPen() {
  drawingShape = 'pen';
}

function setLine() {
  drawingShape = 'line';
}

function setCircle() {
  drawingShape = 'circle';
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

