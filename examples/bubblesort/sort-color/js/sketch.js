const boxWidth = 400;
const boxHeight = 40;
const colorVariation = 50;
const animationSpeed = 10;
var colors = [];
var numbers = [];
var bubbles = [];
var pivot = [];
var current = 0;
var next = 0;
var isSwapping = false;
var count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colors = createColors();
  numbers = createNumbers(colors);
  numbers = shuffle(numbers);
  bubbles = createBubbles(numbers, boxWidth / colors.length);
  pivot = deepCopy(bubbles);
}

function draw() {
  for (let i = 0; i < animationSpeed; i++) {
    background(55);
    displayTitle();
    for (let b of bubbles) {
      b.display();
    }
    displayMessage();
    bubbleSort();
  }
}

function createColors() {
  let start = 0;
  let end = 255;
  let colors = [];

  // colors based on red
  for (let g = start; g < end; g += colorVariation) {
    colors.push([255, g, 0]);
  }

  // colors based on green
  for (let r = end; r > start; r -= colorVariation) {
    colors.push([r, 255, 0]);
  }
  for (let b = start; b < end; b += colorVariation) {
    colors.push([0, 255, b]);
  }

  // colors based on blue
  for (let g = end; g > start; g -= colorVariation) {
    colors.push([0, g, 255]);
  }

  return colors;
}

function createNumbers(colors) {
  let numbers = [];
  for (let i = 0; i < colors.length; i++) {
    numbers.push(i);
  }
  return numbers;
}

function shuffle(arg) {
  for (let i = arg.length - 1; i > 0; i--) {
    let r = floor(random() * (i + 1));
    [arg[i], arg[r]] = [arg[r], arg[i]];
  }
  return arg;
}

function displayTitle() {
  let w = width / 2;
  let h = height * 0.25;
  textAlign(CENTER, CENTER);
  textSize(60);
  stroke(255, 255, 255);
  fill(255, 0, 255);
  text('Bubble Sort', w, h);
}

function displayMessage() {
  let w = width / 2;
  let h = height * 0.75;
  let fontColor = 100;
  let message = '';
  textAlign(CENTER, CENTER);
  textSize(30);
  stroke(255);

  if (bubbles[0].finished) {
    fontColor = [255, 255, 0];
    message = 'Congratulations!';
  } else {
    fontColor = 100;
    message = 'Sorting ...';
  }

  fill(fontColor);
  text(message, w, h);
}

function moveBubbles(left, right) {
  let dx = 0.1;
  let movingFinished = true;

  if (!isSwapping) {
    return false;
  }

  if (bubbles[left].x < pivot[right].x) {
    bubbles[left].x += dx;
    movingFinished = false;
  }

  if (pivot[left].x < bubbles[right].x) {
    bubbles[right].x -= dx;
    movingFinished = false;
  }

  return movingFinished;
}

function deepCopy(original) {
  let clone = [];
  for (let e of original) {
    clone.push(new Bubble(e.val, e.x, e.y));
  }
  return clone;
}
