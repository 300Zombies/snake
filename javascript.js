window.onload = function () {
    canvas = document.getElementById("gc");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000 / 15);
}
snakeX = snakeY = 10;
gridSize = tileCount = 20;
appleX = appleY = 15;
speedX = speedY = 0;
trail = [];
tail = 3;

function game() {
    snakeX += speedX;
    snakeY += speedY;
    // when snake reaches the border of canvas
    if (snakeX < 0) {
        snakeX = tileCount - 1;
    }
    if (snakeX > tileCount - 1) {
        snakeX = 0;
    }
    if (snakeY < 0) {
        snakeY = tileCount - 1;
    }
    if (snakeY > tileCount - 1) {
        snakeY = 0;
    }
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "lime";
    for (let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
        if (trail[i].x == snakeX && trail[i].y == snakeY) {
            tail = 3;
        }
    }
    trail.push({
        x: snakeX,
        y: snakeY
    });
    while (trail.length > tail) {
        trail.shift();
    }

    if (appleX == snakeX && appleY == snakeY) {
        tail++;
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2);
}

let direction

function keyPush(event) {
    if (event.keyCode === 37 && direction != "right") {
        direction = "left";
        speedX = -1;
        speedY = 0;
    }
    if (event.keyCode === 38 && direction != "down") {
        direction = "up";
        speedX = 0;
        speedY = -1;
    }
    if (event.keyCode === 39 && direction != "left") {
        direction = "right";
        speedX = 1;
        speedY = 0;
    }
    if (event.keyCode === 40 && direction != "up") {
        direction = "down";
        speedX = 0;
        speedY = 1;
    }
    // console.log(event.keyCode, direction);
}