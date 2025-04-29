class MIDI {
  constructor(notes) {
    this.activeSketch = new BaseSketch()
    this.keyHeld = false;
    this.notes = notes
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
      if (note === this.notes[0]) {
        this.activeSketch.input1On()
      }
      if (note === this.notes[1]) {
        this.activeSketch.input2On()
      }
      if (note === this.notes[2]) {
        this.activeSketch.input3On()
      }
      if (note === this.notes[3]) {
        cycleSketch();
      }
    } else if (command === 0x80) {
      if(note === this.notes[0]){
        this.activeSketch.input1Off()
      }
      if(note === this.notes[1]){
        this.activeSketch.input2Off()
      }
      if (note === this.notes[2]) {
        this.activeSketch.input3Off()
      }
    }
  }
}
