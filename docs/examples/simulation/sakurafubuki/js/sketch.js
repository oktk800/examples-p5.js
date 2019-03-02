const NUM = 300;
var leafList = [];

function setup() {
  createCanvas(400, 400);
  background(112, 172, 240);

  for (let i = 0; i < NUM; i++) {
    leafList.push(new Leaf(random(width), random(0, -500)));
  }
}

function draw() {
  background(112, 152, 240);
  for (let i = leafList.length - 1; i >= 0; i--) {
    leafList[i].show();
    leafList[i].update();
    if (leafList[i].onBottom()) {
      leafList.splice(i, 1);
      leafList.push(new Leaf(random(width), random(0, -500)));
    }
  }

  console.log(leafList.length);
}
