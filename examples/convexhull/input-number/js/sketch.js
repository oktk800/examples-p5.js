// variables for convex hull
var points;
var vertexs;
var startingVertex;
var currentVertex;
var nextVertex;
var finished;

// dom elements
var input;
var button;

function setup() {
  input = createInput('20');
  button = createButton('create convex hull');
  button.mousePressed(createConvexHull);
  let cnv = createCanvas(400, 400);
  cnv.style('display', 'block');
  background(0);
  noLoop();
}

function init() {
  background(0);
  points = createNewPoints(parseInt(input.value()));
  vertexs = [];
  startingVertex = getStartingVertex();
  currentVertex = startingVertex;
  nextVertex = null;
  finished = false;
}

function createConvexHull() {
  init();

  for (let p of points) {
    p.show();
  }

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

function createNewPoints(MAXPOINTS) {
  var newpoints = [];
  var offset = 50;
  for (let i = 0; i < MAXPOINTS; i++) {
    let x = random(0 + offset, width - offset);
    let y = random(0 + offset, height - offset);
    newpoints[i] = new Vertex(x, y);
  }
  return newpoints;
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
// this function return true if vertex p is on the left side of
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
