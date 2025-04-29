class BaseSketch {
  constructor() {}
  setup() {
    console.log("implement a setup function");
  }
  draw() {
    console.log("implement a draw function");
  }

  // implement these in your child class
  input1On() {}
  input2On() {}
  input3On() {}

  input1Off() {}
  input2Off() {}
  input3Off() {}
}
