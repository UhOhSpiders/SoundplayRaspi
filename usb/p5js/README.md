# p5js structure:

`main.js` calls the setup and draw functions and allows the user to cycle through any number of sketches.
The sketches are defined as classes to avoid conflicting variable names.

## Adding new sketches

To add a sketch:
1. Convert it to a [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). 
2. Extend BaseSketch.js and impliment its `setup`, `draw` and `input` methods in your class (the input methods mean your sketch can reliably interface with the MIDI logic without breaking any of the other sketches).
4. Instantiate it, and add it to the `sketches` array in `main.js`: 
```
let sketchIndex = 0;
let bouncingShapes;
let bouncingShapes2;
let bouncingShapes3;
let waves;
let wave2
...

function setup() {
  bouncingShapes = new BouncingShapes(5, "square");
  bouncingShapes2 = new BouncingShapes(10, "circle");
  bouncingShapes3 = new BouncingShapes(4, "triangle");
  waves = new Waves();
  waves2 = new Waves(10, "square");
  sketches = [bouncingShapes, waves2, bouncingShapes2, bouncingShapes3, waves];
  createCanvas(windowWidth, windowHeight);
  for (const sketch of sketches) {
    sketch.setup();
  }
}
```
4. Your sketches draw method will be called inside of the main draw loop when its index is set. 
```
function draw() {
  sketches[sketchIndex].draw();
}
```

## Input

- Specify the MIDI notes all of the sketches listen for in `main.js` by passing the MIDI class an array of numbers. Eg:
  `input = new MIDI([36,37,38,39,40])`
- This class handles input from a MIDI controller using [WEB MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API)
- It calls the input methods listed in `BaseSketch.js` when a note is pressed or released. 
