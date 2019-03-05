var balls = [];
var sliderNum;
var sliderRadius;
var preN;
var preR;

var points;
var vertexs;
var startingVertex;
var currentVertex;
var nextVertex;
var finished;

function setup() {
  createCanvas(400, 400);
  createSliderNum();
  createSliderRadius();
  preN = sliderNum.value();
  preR = sliderRadius.value();
  createNewBalls(preN, preR);
}

function draw() {

  if (preN !== sliderNum.value()) {
    changeBallCount();
  }

  if (preR !== sliderRadius.value()) {
    changeRadius();
  }

  init();

  for (let b of balls) {
    b.update();
    b.show();
    for (let other of balls) {
      if (b !== other && b.hit(other)) {
        b.calcVel(other);
        break;
      }
    }
  }

  while (!finished) {
    nextVertex = getNextVertex(currentVertex);
    vertexs.push(nextVertex);
    drawLine(currentVertex, nextVertex);
    currentVertex = nextVertex;
    if (currentVertex === startingVertex) {
      finished = true;
    }
  }

}

function init() {
  background(0);
  points = balls;
  vertexs = [];
  startingVertex = getStartingVertex();
  currentVertex = startingVertex;
  nextVertex = null;
  finished = false;
}

function getStartingVertex() {
  var sv = null;
  for (let p of points) {
    if (!sv) {
      sv = p;
      continue;
    }
    if (p.pos.x <= sv.pos.x) {
      sv = p;
    }
  }
  return sv; // sv is a vertex on the far left.
}

function drawLine(v1, v2) {
  stroke(255);
  strokeWeight(1);
  line(v1.pos.x, v1.pos.y, v2.pos.x, v2.pos.y);
}

function getNextVertex(current) {
  var next;
  for (let p of points) {
    if (p === current) {
      continue;
    }
    if (!next) {
      next = p;
      continue;
    }
    if (onTheLeftSide(current, next, p) && !isVertex(p)) {
      next = p;
    }
  }
  return next;
}

//      p
// c --------> n
// this function return true if vertex p is on the left side of
// the vector whose direction is from vertex c to vertex n.
function onTheLeftSide(c, n, p) {
  let val = (n.pos.x - c.pos.x) * (p.pos.y - c.pos.y) - (n.pos.y - c.pos.y) * (p.pos.x - c.pos.x);
  return val < 0;
}

function isVertex(p) {
  if (!vertexs) {
    return false;
  }

  for (let v of vertexs) {
    if (v === p) {
      return true;
    }
  }
  return false;
}

// create slider for number of balls
function createSliderNum() {
  var group = createDiv('');
  group.position(width + 10, height / 2);
  sliderNum = createSlider(2, 100, 8, 1);
  sliderNum.parent(group);
  var label = createSpan('Number of Balls');
  label.parent(group);
}

// create slider for radius of ball
function createSliderRadius() {
  var group = createDiv('');
  group.position(width + 10, height / 2 + 40);
  sliderRadius = createSlider(2, 50, 20, 1);
  sliderRadius.parent(group);
  var label = createSpan('Radius of ball');
  label.parent(group);
}

function changeBallCount() {
  if (preN > sliderNum.value()) {
    while (preN > sliderNum.value()) {
      balls.splice(balls.length - 1, 1);
      preN--;
    }
  } else {
    while (preN < sliderNum.value()) {
      addNewBall(sliderRadius.value());
      preN++;
    }
  }
}

function addNewBall(r) {
  var tryCount = 10;
  while (tryCount > 0) {
    var isNewBall = true;
    var newb = new Ball(random(r, width - r), random(r, height - r), r);
    for (let b of balls) {
      if (newb.hit(b)) {
        isNewBall = false;
      }
    }

    if (isNewBall) {
      balls.push(newb);
      break;
    }

    tryCount--;
  }
}

function changeRadius() {
  preR = sliderRadius.value();
  for (let b of balls) {
    b.r = preR;
  }
}

function createNewBalls(n, r) {
  balls = [];
  while (balls.length < n) {
    let newball = new Ball(random(r, width - r), random(r, height - r), r);

    let isTarget = true;
    for (let b of balls) {
      if (newball.hit(b)) {
        isTarget = false;
        break;
      }
    }

    if (isTarget) {
      balls.push(newball);
    }
  }
}
