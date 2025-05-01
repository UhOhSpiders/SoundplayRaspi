# p5js structure:

The sketches are defined as classes to avoid conflicting variable names. `main.js` calls the setup and draw functions of each sketch and allows the user to cycle through any number of sketches.


`MIDI.js` defines a class which handles the input from a MIDI controller, listens for specific notes, and triggers the functions listed in `BaseSketch.js` whenever specific controller buttons are pressed or released.

## Adding new sketches

To add a sketch:
1. Convert it to a [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). 
2. Extend `BaseSketch.js`.
3. Make sure this class has a `setup()` and `draw()` method.
4. Instantiate it, and add it to the `sketches` array in `main.js`: 
```javascript
let yourSketch
...

function setup() {
  ...
  yourSketch = new YourSketch();
  sketches = [yourSketch, anotherSketch, ...];

  for (const sketch of sketches) {
    // if your class doesn't have a setup method this will break
    sketch.setup();
  }
}
```
5. Your sketches draw method will be called inside of the main draw function when its index is set. 
```javascript
function draw() {
  // if your class doesn't have a draw method this will break
  sketches[sketchIndex].draw(input.notes);
}
```

## Input & Interactivity

- `MIDI.js` defines a class which handles input from a MIDI controller using the [WEB MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API).
- The notes it for are passed as an array of integers when the class is instantiated in `main.js`.
- You don't need to edit `MIDI.js` to make your sketch interactive. Instead, implement/override the input functions listed in `BaseSketch.js` within your new class (see `Waves.js` as an example).
- This pattern means new sketches can do their own thing without breaking any of the old ones.