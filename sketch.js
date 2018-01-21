// Based on original code from Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 3: Flocking

// Demonstration of Craig Reynolds' "Flocking" behavior
// See: http://www.red3d.com/cwr/
// Rules: Cohesion, Separation, Alignment

// Additions by David - https://davenewt.github.io/steering-behaviours/

let flock;
let cohesionSlider;
let separationSlider;
let alignmentSlider;
let sepVal;
let aliVal;
let cohVal;
let currentBoids;
let numBoids = 100;
let boidMaxSize = 8.0;
let desiredSeparation = 50.0;
let separationRadiusShowState = true;

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
  boidsSlider = createSlider(0, 300, numBoids, 1).parent('numBoids');
  separationRadiusShow = createCheckbox("", separationRadiusShowState).parent('separationRadiusShow');
  separationRadiusSlider = createSlider(1, 100, desiredSeparation, 1).parent('separationRadius');
  separationSlider = createSlider(0, 10, 5, 0.1).parent('separation');
  alignmentSlider = createSlider(0, 5, 1, 0.1).parent('alignment');
  cohesionSlider = createSlider(0, 5, 1, 0.1).parent('cohesion');
  // Add spans for slider values and attach them to the pre-set '___V' spans...
  boidsVal = createSpan(boidsSlider.value()).parent('boidsV');
  sepRVal = createSpan(separationRadiusSlider.value()).parent('sepRV');
  sepVal = createSpan(separationSlider.value()).parent('sepV');
  aliVal = createSpan(alignmentSlider.value()).parent('aliV');
  cohVal = createSpan(cohesionSlider.value()).parent('cohV');

  saveButton = createButton('Save Image');
  saveButton.parent('saveBtn');
  saveButton.mousePressed(saveImage);

  flock = new Flock();
  // Add an initial set of boids into the system
  numBoids = boidsSlider.value();
  for (let i = 0; i < numBoids; i++) {
    let b = new Boid(floor(random(0, width)), floor(random(0, height)));
    flock.addBoid(b);
  }

}

function saveImage() {
  save('steering-behaviour.png');
}

function draw() {
  background(0);
  flock.run();


  numBoids = boidsSlider.value();
  currentBoids = flock.boids.length;
  if (numBoids !== currentBoids) {
    console.log("Desired: " + numBoids + " Flock: " + currentBoids);
    if (numBoids > currentBoids) {
      for (let i = 0; i < (numBoids - currentBoids); i++) {
        let b = new Boid(floor(random(0, width)), floor(random(0, height)));
        flock.addBoid(b);
      }
    } else if (numBoids < currentBoids) {
      flock.removeBoids(currentBoids - numBoids);
    }
  }

  desiredSeparation = separationRadiusSlider.value();
  separationRadiusShowState = separationRadiusShow.checked();

  boidsVal.html(boidsSlider.value());
  sepRVal.html(separationRadiusSlider.value());
  sepVal.html(separationSlider.value());
  aliVal.html(alignmentSlider.value());
  cohVal.html(cohesionSlider.value());
}
