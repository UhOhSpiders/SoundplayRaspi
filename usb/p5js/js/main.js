let sketchIndex = 0;
let bouncingShapes;
let bouncingShapes2;
let bouncingShapes3;
let sketches;
const input = new MIDI();

function setup() {
  bouncingShapes = new BouncingShapes(5, "square");
  bouncingShapes2 = new BouncingShapes(10, "circle");
  bouncingShapes3 = new BouncingShapes(4, "triangle");
  sketches = [bouncingShapes, bouncingShapes2, bouncingShapes3];
  createCanvas(windowWidth, windowHeight);
  for (const sketch of sketches) {
    sketch.setup();
  }
}

function draw() {
  sketches[sketchIndex].draw(input.notes);
}

function mouseClicked() {
  cycleSketch();
}

function cycleSketch() {
  sketchIndex++;
  if (sketchIndex + 1 > sketches.length) {
    sketchIndex = 0;
  }
  background(0,0,0)
}
