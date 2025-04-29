# p5js structure:

`main.js` calls the setup and draw functions and allows the user to cycle through any number of sketches.
The sketches are defined as classes to avoid conflicting variable names.

## Adding new sketches

To add a sketch:
1. Convert it to a [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). 
2. Make sure this class has a `setup()` and `draw()` method.
3. Instantiate it, and it to the `sketches` array in `main.js`: 
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
  sketches[sketchIndex].draw(input.notes);
}
```
4. Add an `input` argument to your class's `draw()` method and use this to drive the interactivity of your sketch. 

## Input

- The `MIDI.js` implements a class which handles input from a MIDI controller using [WEB MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API)
