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

  // instantiate midi input
  // you can set the input note codes here
  input = new MIDI([36, 37, 38, 39, 40]);
  input.activeSketch = bouncingShapes;
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

// keyboard events for developing sketches without a midi controller
document.addEventListener(
  "keydown",
  (event) => {
    const keyName = event.key;
    if (keyName === "1") {
      console.log(keyName + " on");
      input.activeSketch.input1On();
    }
    if (keyName === "2") {
      console.log(keyName + " on");
      input.activeSketch.input2On();
    }
    if (keyName === "3") {
      console.log(keyName + " on");
      input.activeSketch.input3On();
    }
    if (keyName === "4") {
      console.log(keyName + " on");
      input.activeSketch.input4On();
    }
    if (keyName === "5") {
      console.log(keyName + " on");
      cycleSketch()
    }
  },
  false
);

document.addEventListener(
  "keyup",
  (event) => {
    const keyName = event.key;
     if (keyName === "1") {
      console.log(keyName + " off");
      input.activeSketch.input1Off();
    }
    if (keyName === "2") {
      console.log(keyName + " off");
      input.activeSketch.input2Off();
    }
    if (keyName === "3") {
      console.log(keyName + " off");
      input.activeSketch.input3Off();
    }
    if (keyName === "4") {
      console.log(keyName + " off");
      input.activeSketch.input4Off();
    }
    if (keyName === "5") {
      console.log(keyName + " off");
      input.activeSketch.input5Off();
    }
  },
  false
);

function cycleSketch() {
  sketchIndex++;
  if (sketchIndex + 1 > sketches.length) {
    sketchIndex = 0;
  }
  input.activeSketch = sketches[sketchIndex];
  background(0, 0, 0);
}
