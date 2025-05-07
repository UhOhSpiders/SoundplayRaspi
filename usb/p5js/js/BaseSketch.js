class BaseSketch {
  constructor() {}
  setup() {
    console.log("implement a setup function");
  }
  draw() {
    console.log("implement a draw function");
  }

  // implement these in your child class
  // -------- input 1 ----------
  input1On() {}
  input1Off() {}
  // -------- input 2 ----------
  input2On() {}
  input2Off() {}
  // -------- input 3 ----------
  input3On() {}
  input3Off() {}
}
