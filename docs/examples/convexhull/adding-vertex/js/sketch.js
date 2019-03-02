// variables for convex hull
var points;
var vertexs;
var startingVertex;
var currentVertex;
var nextVertex;
var finished;

function setup() {
  let btn_reset = createButton('reset');
  let cnv = createCanvas(400, 400);
  btn_reset.mousePressed(reset);
  cnv.mousePressed(createNewPoints);
  cnv.style('display', 'block');
  reset();
}

function draw() {
  init();
  createConvexHull();
}

function reset() {
  background(0);
  points = [];
}

function init() {
  if (points.length < 2) {
    finished = true;
    return;
  }
  vertexs = [];
  startingVertex = getStartingVertex();
  currentVertex = startingVertex;
  nextVertex = null;
  finished = false;
}

function createConvexHull() {
  while (!finished) {
    nextVertex = getNextVertex(currentVertex);
    vertexs.push(nextVertex);
    drawLine(currentVertex, nextVertex);
    currentVertex = nextVertex;
    if (currentVertex === startingVertex) {
      finished = true;
    }
  }
}

function createNewPoints() {
  points.push(new Vertex(mouseX, mouseY));
  background(0);
  for (let p of points) {
    p.show();
  }
}

function getStartingVertex() {
  var sv = null;
  for (let p of points) {
    if (!sv) {
      sv = p;
      continue;
    }
    if (p.x <= sv.x) {
      sv = p;
    }
  }
  return sv; // sv is a vertex on the far left.
}

function drawLine(v1, v2) {
  stroke(255);
  strokeWeight(1);
  line(v1.x, v1.y, v2.x, v2.y);
}

function getNextVertex(current) {
  var next;
  for (let p of points) {
    if (p === current) {
      continue;
    }
    if (!next) {
      next = p;
      continue;
    }
    if (onTheLeftSide(current, next, p) && !isVertex(p)) {
      next = p;
    }
  }
  return next;
}

//      p
// c --------> n
// This function return true if vertex p is on the left side of
// the vector whose direction is from vertex c to vertex n.
function onTheLeftSide(c, n, p) {
  let val = (n.x - c.x) * (p.y - c.y) - (n.y - c.y) * (p.x - c.x);
  return val < 0;
}

function isVertex(p) {
  if (!vertexs) {
    return false;
  }

  for (let v of vertexs) {
    if (v === p) {
      return true;
    }
  }
  return false;
}
