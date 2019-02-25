function Leaf(x, y) {
  this.pos = createVector(x, y);
  this.offsetY = random(10, 20);
  this.r = random(3, 6);
  this.speed = random(1, 3);
  this.angle = 0;
  this.dir = random(0.01, 0.02);
  this.c = floor(random(0, 3));
  this.wide = random(3, 8);

  this.update = function() {
    this.pos.y += this.speed;
    this.angle += this.dir;
    if (abs(this.angle) > TWO_PI / this.wide) {
      this.dir *= -1;
    }
  }

  this.show = function() {
    push();
    translate(this.pos.x, this.pos.y - this.offsetY);
    noStroke();
    fill(this.leafColor[this.c]);
    rotate(this.angle);
    ellipse(0, this.offsetY, this.r * 2.5, this.r * 0.8);
    pop();
  }

  this.onBottom = function() {
    return this.pos.y > height;
  }
}

Leaf.prototype.leafColor = [
  [237, 211, 223],
  [209, 138, 181],
  [223, 170, 203]
];
