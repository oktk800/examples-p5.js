const fontSize = 40;
const animationSpeed = 1;
var numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
var bubbles = [];
var pivot = [];
var current = 0;
var next = 0;
var isSwapping = false;
var count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  numbers = shuffle(numbers);
  bubbles = createBubbles(numbers);
  pivot = deepCopy(bubbles);
}

function draw() {
  for (let i = 0; i < animationSpeed; i++) {
    background(255);
    displayTitle();
    for (let b of bubbles) {
      b.display();
    }
    displayMessage();
    bubbleSort();
  }
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
  stroke(0);
  fill(0, 255, 0);
  text('Bubble Sort', w, h);
}

function displayMessage() {
  let w = width / 2;
  let h = height * 0.75;
  let fontColor = 100;
  let message = '';
  textAlign(CENTER, CENTER);
  textSize(30);
  stroke(0);

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
  let dx = 0.5;
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
