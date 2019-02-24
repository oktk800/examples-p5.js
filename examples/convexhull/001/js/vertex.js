function Vertex(x, y) {
  this.x = x;
  this.y = y;

  this.show = function() {
    stroke(255);
    strokeWeight(4);
    point(this.x, this.y);
  }
}
