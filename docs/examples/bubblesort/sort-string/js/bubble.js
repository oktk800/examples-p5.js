function Bubble(val, x, y) {
  this.val = val;
  this.x = x;
  this.y = y;
  this.isBigger = false;
  this.finished = false;

  this.display = function() {
    textAlign(CENTER, CENTER);
    textSize(this.fontSize);
    stroke(this.colorForNumber);
    fill(this.colorForNumber);
    text(completionMessage[this.val], this.x, this.y);
  }
}

Bubble.prototype.colorForNumber = [0, 255, 255];
Bubble.prototype.colorForHighlight = [255, 0, 255];
Bubble.prototype.weightForHighlight = 3;
Bubble.prototype.fontSize = fontSize;

function createBubbles(arg) {
  let middle = floor((arg.length - 1) / 2)
  let distance = fontSize * 0.7;
  let result = [];

  for (let i = 0; i < arg.length; i++) {
    let x = width / 2 + (i - middle) * distance;
    let y = height / 2;

    if (arg.length % 2 === 0) {
      x -= distance / 2;
    }

    result.push(new Bubble(arg[i], x, y));
  }

  return result;
}

function bubbleSort() {
  if (moveBubbles(current, next)) {
    bubbles[current].isBigger = false;
    [bubbles[current], bubbles[next]] = [bubbles[next], bubbles[current]];
    pivot = deepCopy(bubbles);
    isSwapping = false;
  } else {
    next = current + 1;
    if (bubbles[current].val > bubbles[next].val) {
      bubbles[current].isBigger = true;
      isSwapping = true;
    } else {
      current = (next === bubbles.length - 1 ? 0 : next);
      count += (current === 0 ? 1 : 0);
      if (bubbles[bubbles.length - count]) {
        bubbles[bubbles.length - count].finished = true;
      }
    }
  }
}
