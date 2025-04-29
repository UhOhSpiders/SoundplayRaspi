let sketchIndex = 0;
let bouncingShapes;
let bouncingShapes2;
let bouncingShapes3;
let waves;
let wave2
let sketches;
let input

function setup() {
  // instantiate sketches
  bouncingShapes = new BouncingShapes(5, "square");
  bouncingShapes2 = new BouncingShapes(10, "circle");
  bouncingShapes3 = new BouncingShapes(4, "triangle");
  waves = new Waves();
  waves2 = new Waves(10, "square");
  
  
  sketches = [bouncingShapes, waves2, bouncingShapes2, bouncingShapes3, waves];
  
  //instantiate midi input
  input = new MIDI()
  input.activeSketch = bouncingShapes
  createCanvas(windowWidth, windowHeight);

  for (const sketch of sketches) {
    sketch.setup();
  }
}

function draw() {
  sketches[sketchIndex].draw();
}

function mouseClicked() {
  cycleSketch();
}

function cycleSketch() {
  sketchIndex++;
  if (sketchIndex + 1 > sketches.length) {
    sketchIndex = 0;
  }
  input.activeSketch = sketches[sketchIndex]
  background(0,0,0)
}
