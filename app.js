
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let startX = 0;
let startY = 0;
let shape = 'line';

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawShape);
canvas.addEventListener('mouseup', finishDrawing);
canvas.addEventListener('mouseout', finishDrawing);

function startDrawing(event) {
    isDrawing = true;
    [startX, startY] = getMousePos(event);
    ctx.beginPath();
}

function drawShape(event) {
    if (!isDrawing) return;

    const [currentX, currentY] = getMousePos(event);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (shape === 'line') {
    
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
    } else if (shape === 'Circle') {
        
        const radius = Math.sqrt((currentX - startX) ** 2 + (currentY - startY) ** 2);
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
}

function finishDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
    ctx.closePath();
}

function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return [
        event.clientX - rect.left,
        event.clientY - rect.top
    ];
}

function setShape(newShape) {
    shape = newShape;
}
