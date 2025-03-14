const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let brushSize = 5;
let drawingShape = "pen";
let startX, startY;
let savedImage; // Stores previous drawings
resizeCanvas();

// Resize canvas dynamically
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.6;
  ctx.fillStyle = "white"; // Set background to white
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Start drawing
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  startX = e.clientX - canvas.offsetLeft;
  startY = e.clientY - canvas.offsetTop;

  if (drawingShape === "pen") {
    draw(e); // Start drawing immediately
  } else {
    savedImage = ctx.getImageData(0, 0, canvas.width, canvas.height); // Save previous drawings
  }
});

// Stop drawing
canvas.addEventListener("mouseup", (e) => {
  isDrawing = false;
  ctx.beginPath();

  if (drawingShape === "line" || drawingShape === "circle") {
    draw(e); // Finish shape drawing when mouse is released
  }
});

// Draw on mouse move
canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  if (drawingShape === "pen") {
    draw(e);
  } else if (drawingShape === "line" || drawingShape === "circle") {
    redrawCanvas(); // Restore previous drawings
    draw(e);
  }
});

// Clear canvas button
document.getElementById("clear-canvas").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white"; // Reset background to white
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Set brush size dynamically
function changeBrushSize(size) {
  brushSize = size;
}

// Change to Pen mode
function setPen() {
  drawingShape = "pen";
}

// Change to Line mode
function setLine() {
  drawingShape = "line";
}

// Change to Circle mode
function setCircle() {
  drawingShape = "circle";
}

// Drawing function
function draw(e) {
  let x = e.clientX - canvas.offsetLeft;
  let y = e.clientY - canvas.offsetTop;

  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";

  if (drawingShape === "pen") {
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else if (drawingShape === "line") {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.stroke();
  } else if (drawingShape === "circle") {
    let radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

// Restore previous drawings
function redrawCanvas() {
  if (savedImage) {
    ctx.putImageData(savedImage, 0, 0);
  }
}
