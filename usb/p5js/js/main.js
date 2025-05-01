let sketchIndex = 0;
let bouncingShapes;
let bouncingShapes2;
let bouncingShapes3;
let waves;
let wave2;
let sketches;
let input;

function setup() {
  // instantiate sketches
  // they must extend BaseSketch
  bouncingShapes = new BouncingShapes(5, "square");
  bouncingShapes2 = new BouncingShapes(10, "circle");
  bouncingShapes3 = new BouncingShapes(4, "triangle");
  waves = new Waves();
  waves2 = new Waves(10, "square");
  
  sketches = [bouncingShapes, waves2, bouncingShapes2, bouncingShapes3, waves];
  
  //instantiate midi input
  // you can set the input note codes here
  // back2back midi notes right (id:"-1588111152"): 36,37,38,39,40 left(id:"-743692278"): 36,37,38,39,40
  
  input = new MIDI([36, 37, 38, 39, 40]);
  input.activeSketch = bouncingShapes;
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(0.5);
  noSmooth();

  for (const sketch of sketches) {
    sketch.setup();
  }
}

function draw() {
  translate(-windowWidth/2, -windowHeight/2)
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
  input.activeSketch = sketches[sketchIndex];
  background(0, 0, 0);
}
