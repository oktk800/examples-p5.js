function Ball(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.speed = p5.Vector.random2D();
  this.c = [random(256), random(256), random(256)];

  this.update = function() {
    this.pos.add(this.speed);
  }

  this.show = function() {
    noStroke();
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }

  this.isOffScreen = function() {
    return this.pos.x - this.r < 0 || this.pos.x + this.r > width ||
      this.pos.y - this.r < 0 || this.pos.y + this.r > height;
  }
}
