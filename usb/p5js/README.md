# p5js structure:

## Adding new sketches

`main.js` calls the setup and draw functions and allows the user to cycle through any number of sketches.
The sketches are defined as classes to avoid conflicting variable names. 

To add a sketch:
1. Convert it to a class. ChatGPT can do this ok.
2. Make sure it has a `setup()` and `draw()` method.
3. Instantiate it, and it to the `sketches` array at the top `main.js`.

## Input

- The p5js sketch handles input from a MIDI controller using [WEB MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API)

- Call functions you want to be triggered inside of the `keyPressed()`.
- Any mode switch input from a MIDI device with switch to a new visual.