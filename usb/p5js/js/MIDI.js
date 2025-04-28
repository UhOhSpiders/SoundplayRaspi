class MIDI {
  constructor() {
    this.keyHeld = false;
    this.notes = new Map();
    this.setup();
  }

  setup() {
    navigator.requestMIDIAccess().then(
      (midiAccess) => {
        midiAccess.inputs.forEach((input) => {
          input.onmidimessage = (event) => {
            this.handleMidiMessage(event);
          };
        });
      },
      (error) => {
        console.error("Failed to access MIDI: ", error);
      }
    );
  }

  handleMidiMessage(event) {
    const [status, note, velocity] = event.data;
    const command = status & 0xf0; // Mask channel info
    if (command === 0x90 && velocity > 0) {
      this.notes.set(note, true);
      if (note === 5) {
        cycleSketch();
      }
    } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
      this.notes.delete(note);
    }
  }
}
