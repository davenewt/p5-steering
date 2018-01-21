let vehicle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(640, 360);
  vehicle = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(51);

  let target = createVector(mouseX, mouseY);

  vehicle.arrive(target);

  vehicle.update();
  vehicle.render();
}
