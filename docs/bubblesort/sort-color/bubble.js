function Bubble(val, x, y, w) {
  this.val = val;
  this.x = x;
  this.y = y;
  this.boxWidth = w;
  this.isBigger = false;
  this.finished = false;

  this.display = function() {
    rectMode(CENTER);
    stroke(colors[this.val]);
    fill(colors[this.val]);
    rect(this.x, this.y, this.boxWidth, this.boxHeight);
  }
}

Bubble.prototype.boxHeight = boxHeight;

function createBubbles(arg, w) {
  let middle = floor((arg.length - 1) / 2)
  let distance = w;
  let result = [];

  for (let i = 0; i < arg.length; i++) {
    let x = width / 2 + (i - middle) * distance;
    let y = height / 2;

    if (arg.length % 2 === 0) {
      x -= distance / 2;
    }

    result.push(new Bubble(arg[i], x, y, w));
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
