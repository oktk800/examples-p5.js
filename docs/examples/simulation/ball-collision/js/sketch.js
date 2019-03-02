var balls = [];
var sliderNum;
var sliderRadius;
var preN;
var preR;

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

  background(0);

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
