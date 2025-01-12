// Nicholas Powell
// nipowell@ucsc.edu

function main() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    // Set up canvas background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Event listeners for both buttons
    document.getElementById('draw-button').addEventListener('click', function () {
        handleDrawEvent(ctx);
    });

    document.getElementById('operation-draw-button').addEventListener('click', function () {
        handleDrawOperationEvent(ctx);
    });
}

function handleDrawEvent(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    var x1 = parseFloat(document.getElementById('x-coordinate').value);
    var y1 = parseFloat(document.getElementById('y-coordinate').value);
    var x2 = parseFloat(document.getElementById('v2-x-coordinate').value);
    var y2 = parseFloat(document.getElementById('v2-y-coordinate').value);

    var v1 = new Vector3([x1, y1, 0]);
    var v2 = new Vector3([x2, y2, 0]);

    drawVector(ctx, v1, "red");
    drawVector(ctx, v2, "blue");
}

function handleDrawOperationEvent(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Create v1 and v2
    const x1 = parseFloat(document.getElementById('x-coordinate').value);
    const y1 = parseFloat(document.getElementById('y-coordinate').value);
    const x2 = parseFloat(document.getElementById('v2-x-coordinate').value);
    const y2 = parseFloat(document.getElementById('v2-y-coordinate').value);

    const v1 = new Vector3([x1, y1, 0]);
    const v2 = new Vector3([x2, y2, 0]);

    drawVector(ctx, v1, "red");
    drawVector(ctx, v2, "blue");

    // Get selected operation
    const operation = document.getElementById('operation').value;

    if (operation === "add") {
        const v3 = new Vector3(v1.elements).add(v2);
        drawVector(ctx, v3, "green");
    } else if (operation === "sub") {
        const v3 = new Vector3(v1.elements).sub(v2);
        drawVector(ctx, v3, "green");
    } else if (operation === "mul") {
        const scalar = parseFloat(document.getElementById('scalar').value);
        const v3 = new Vector3(v1.elements).mul(scalar);
        const v4 = new Vector3(v2.elements).mul(scalar);
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");
    } else if (operation === "div") {
        const scalar = parseFloat(document.getElementById('scalar').value);
        const v3 = new Vector3(v1.elements).div(scalar);
        const v4 = new Vector3(v2.elements).div(scalar);
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");
    } else if (operation === "magnitude") {
        console.log(`Magnitude of v1: ${v1.magnitude()}`);
        console.log(`Magnitude of v2: ${v2.magnitude()}`);
    } else if (operation === "normalize") {
        const v3 = new Vector3(v1.elements).normalize();
        const v4 = new Vector3(v2.elements).normalize();
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");
    } else if (operation === "angle") {
        const angle = angleBetween(v1, v2);
        console.log(`Angle between v1 and v2: ${angle.toFixed(2)} degrees`);
    } else if (operation === "area") {
        const area = areaTriangle(v1, v2);
        console.log(`Area of the triangle formed by v1 and v2: ${area.toFixed(2)}`);
    }
}

function drawVector(ctx, v, color) {
    const scale = 20;
    const x = v.elements[0] * scale;
    const y = v.elements[1] * scale;

    const canvasCenterX = ctx.canvas.width / 2;
    const canvasCenterY = ctx.canvas.height / 2;

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(canvasCenterX, canvasCenterY);
    ctx.lineTo(canvasCenterX + x, canvasCenterY - y);
    ctx.stroke();
}

function areaTriangle(v1, v2) {
    const crossProduct = Vector3.cross(v1, v2);
    const magnitudeCross = crossProduct.magnitude();
    return 0.5 * magnitudeCross; // Triangle area is half the parallelogram's area
}


function angleBetween(v1, v2) {
    const dotProduct = Vector3.dot(v1, v2);
    const magnitudeV1 = v1.magnitude();
    const magnitudeV2 = v2.magnitude();
    const cosTheta = dotProduct / (magnitudeV1 * magnitudeV2);
    const angleRadians = Math.acos(cosTheta); // Result is in radians
    const angleDegrees = (angleRadians * 180) / Math.PI; // Convert to degrees
    return angleDegrees;
}
