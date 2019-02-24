const animationSpeed = 5;
var completionMessage = 'is a sorting algorithm!'.split('');;
var numbers = [];
var bubbles = [];
var pivot = [];
var current = 0;
var next = 0;
var isSwapping = false;
var count = 0;
var fontSize = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  numbers = createNumbers(completionMessage);
  numbers = shuffle(numbers);
  bubbles = createBubbles(numbers);
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

function createNumbers(completionMessage) {
  let numbers = [];
  for (let i = 0; i < completionMessage.length; i++) {
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
