// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 3: Flocking

// Demonstration of Craig Reynolds' "Flocking" behavior
// See: http://www.red3d.com/cwr/
// Rules: Cohesion, Separation, Alignment

let flock;
let cohesionSlider;
let separationSlider;
let alignmentSlider;
let sepVal;
let aliVal;
let cohVal;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');

  // Implement a 'dismissable' modal control panel
  modalButton = createButton('Open Control Panel');
  modalButton.id('cpOpenButton');
  // Get the Control Panel modal
  let cpModal = document.getElementById('controlPanel');
  // Get the button that opens the modal
  let cpButton = document.getElementById("cpOpenButton");
  // Get the <span> element that closes the modal
  let cpCloseSpan = document.getElementsByClassName("close")[0];
  // When the user clicks the button, open the modal
  cpButton.onclick = function() {
    cpModal.style.display = "block";
  }
  // When the user clicks on <span> (x), close the modal
  cpCloseSpan.onclick = function() {
    cpModal.style.display = "none";
  }
  // Hide by default
  cpModal.style.display = "none";

  // ADD CONTROLS TO THE CONTROL PANEL
  // Add sliders to the pre-set (in index.html) spans...
  cohesionSlider = createSlider(0, 5, 1, 0.1).parent('cohesion');
  separationSlider = createSlider(0, 5, 1, 0.1).parent('separation');
  alignmentSlider = createSlider(0, 5, 1, 0.1).parent('alignment');
  // Add spans for slider values and attach them to the pre-set '___V' spans...
  sepVal = createSpan(separationSlider.value()).parent('sepV');
  aliVal = createSpan(alignmentSlider.value()).parent('aliV');
  cohVal = createSpan(cohesionSlider.value()).parent('cohV');
  // sepVal.parent('sepV');
  // aliVal.parent('aliV');
  // cohVal.parent('cohV');

  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 80; i++) {
    let b = new Boid(floor(random(0, width)), floor(random(0, height)));
    flock.addBoid(b);
  }

}

function draw() {
  background(51);
  flock.run();

  sepVal.html(separationSlider.value());
  aliVal.html(alignmentSlider.value());
  cohVal.html(cohesionSlider.value());
}
