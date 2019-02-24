let points = [];
let v;
let speed = 100;

function setup() {
  createCanvas(400, 400);
  points[0] = createVector(width / 2, 0);
  points[1] = createVector(0, height);
  points[2] = createVector(width, height);
  v = createVector(random(width), random(height));
  strokeWeight(1);
}

function draw() {
  for (let i = 0; i < speed; i++) {
    v.add(points[floor(random(3))]);
    v.mult(0.5);
    stroke(floor(random(256)), floor(random(256)), floor(random(256)));
    point(v.x, v.y);
  }
}
