function Ball(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.m = 3;
  this.vel = p5.Vector.random2D();
  this.vel.setMag(this.m);

  this.update = function() {
    this.vel.setMag(this.m);
    this.pos.add(this.vel);

    if (this.isEdgeX()) {
      while (this.pos.x - this.r <= 0) {
        this.pos.x += 0.1;
      }
      while (this.pos.x + this.r >= width) {
        this.pos.x -= 0.1;
      }
      this.vel.x *= -1;
    }

    if (this.isEdgeY()) {
      while (this.pos.y - this.r <= 0) {
        this.pos.y += 0.1;
      }
      while (this.pos.y + this.r >= height) {
        this.pos.y -= 0.1;
      }
      this.vel.y *= -1;
    }
  }

  this.show = function() {
    stroke(0);
    fill(0, 255, 0);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }

  this.calcVel = function(other) {
    var left_ball;
    var right_ball;

    if (this.pos.x <= other.pos.x) {
      left_ball = this;
      right_ball = other;
    } else {
      left_ball = other;
      right_ball = this;
    }

    var d = dist(left_ball.pos.x, left_ball.pos.y, right_ball.pos.x, right_ball.pos.y);
    var unit_v = p5.Vector.sub(right_ball.pos, left_ball.pos);
    unit_v.setMag(left_ball.r + right_ball.r - d + this.m);
    right_ball.pos.add(unit_v);

    // v is a vector from leftBall to rightBall
    var v = p5.Vector.sub(right_ball.pos, left_ball.pos);
    var k = p5.Vector.dot(left_ball.vel, v) / pow(v.mag(), 2);
    var vn1 = p5.Vector.mult(v, k, undefined);

    v.mult(-1);
    k = p5.Vector.dot(right_ball.vel, v) / pow(v.mag(), 2);
    var vn2 = p5.Vector.mult(v, k, undefined);

    vn1.setMag(left_ball.m);
    vn2.setMag(right_ball.m);
    left_ball.vel.add(vn2);
    right_ball.vel.add(vn1);
  }

  this.hit = function(other) {
    let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    return d < (this.r + other.r);
  }

  this.isEdgeX = function() {
    return this.pos.x - this.r <= 0 || this.pos.x + this.r >= width;
  }

  this.isEdgeY = function() {
    return this.pos.y - this.r <= 0 || this.pos.y + this.r >= height;
  }

}
