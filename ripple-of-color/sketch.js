const MAX = 100;
const MAX_RADIUS = 5;
var balls = [];

function setup() {
  createCanvas(400, 400);
  createNewBalls();
}

function draw() {
  background(255);

  if (frameCount % 60 === 0) {
    createNewBalls();
  }

  for (let i = balls.length - 1; i >= 0; i--) {
    balls[i].show();
    balls[i].update();
    if (balls[i].isOffScreen()) {
      balls.splice(i, 1);
    }
  }
}

function createNewBalls() {
  let x = width / 2;
  let y = height / 2;
  for (let i = 0; i < MAX; i++) {
    let r = random(1, MAX_RADIUS);
    let b = new Ball(x, y, r);
    balls.push(b);
  }
}
