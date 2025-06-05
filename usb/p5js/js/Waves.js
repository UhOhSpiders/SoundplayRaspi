class Waves extends BaseSketch {
  constructor(particleCount = 50, shape = "circle") {
    super();
    this.PARTICLE_COUNT = particleCount;
    // this sketch has the shape option of circle or square
    this.shape = shape;
    this.particles = [];
    this.amplitude = 50;
    this.frequency = 0.04;
    this.speed = 2;
    this.scale = 30;
    this.amplitudeGrowing = false;
    this.frequencyGrowing = false;
    this.colorChanging = false;
  }
  setup() {
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles[i] = new Particle(this);
    }
  }
  // -------- input 1 ----------
  input1On() {
    this.amplitudeGrowing = true;
  }
  input1Off() {
    this.amplitudeGrowing = false;
  }
  // -------- input 2 ----------
  input2On() {
    this.frequencyGrowing = true;
    this.colorChanging = true;
  }
  input2Off() {
    this.frequencyGrowing = false;
    this.colorChanging = false;
  }
  // -------- input 3 ----------
  input3On() {
    this.speed = -2;
  }
  input3Off() {
    this.speed = 2;
  }
  // -------- input 4 ----------
  input4On() {
    this.scale = 80;
  }
  input4Off() {
    this.scale = 30;
  }

  draw() {
    if (this.amplitudeGrowing) {
      this.amplitude += 3;
    } else {
      this.resetAmplitude();
    }
    if (this.frequencyGrowing) {
      this.frequency -= 0.00005;
    } else {
      this.resetFrequency();
    }
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles[i].move();
      this.particles[i].draw();
      if (this.colorChanging) {
        this.particles[i].changeColor();
      }
    }
  }
  resetAmplitude() {
    if (this.amplitude > 20) {
      this.amplitude -= 8;
    }
  }

  resetFrequency() {
    if (this.frequency < 0.04) {
      this.frequency += 0.001;
    }
  }

  resetSpeed() {
    this.speed = 2;
  }
}

class Particle {
  constructor(parent) {
    this.position = createVector(random(windowWidth), random(windowHeight));
    this.yOffset = random(windowHeight);
    this.xOffset = random(5);
    this.r = random(255);
    this.g = random(100, 255);
    this.b = random(100, 255);
    this.a = random(200, 255);
    this.parent = parent;
  }
  move() {
    this.position.x += this.parent.speed;
    if (this.position.x > windowWidth + 20) {
      this.position.x = 0;
    }
    if (this.parent.speed < 0 && this.position.x < 0) {
      this.position.x = windowWidth;
    }

    this.position.y =
      Math.sin(this.position.x * this.parent.frequency) * this.parent.amplitude;
    this.position.y += this.yOffset;
  }
  draw() {
    fill(this.r, this.g, this.b, this.a);
    if (this.parent.shape === "circle") {
      circle(
        this.position.x,
        this.position.y,
        random(this.parent.scale, this.parent.scale + 10)
      );
    } else if (this.parent.shape === "square") {
      square(
        this.position.x,
        this.position.y,
        random(this.parent.scale, this.parent.scale + 10)
      );
    }
  }
  changeColor() {
    this.r += 1;
    this.g += 1;
    this.b += 1;
    if (this.r > 255) this.r -= 255;
    if (this.g > 255) this.g -= 255;
    if (this.b > 255) this.b -= 255;
  }
}
