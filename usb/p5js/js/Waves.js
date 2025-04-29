class Waves {
  constructor(particleCount = 50, shape = "circle") {
    this.PARTICLE_COUNT = particleCount;
    // this sketch has the shape option of circle or square
    this.shape = shape;
    this.particles = [];
    this.amplitude = 50;
    this.frequency = 0.04;
    this.speed = 2;
    this.amplitudeGrowing = false;
    this.frequencyGrowing = false;
  }
  setup() {
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles[i] = new Particle(this);
    }
  }

  input1On() {
    this.amplitudeGrowing = true;
  }
  input2On() {
    this.frequencyGrowing = true;
  }
  input3On() {
    this.speed = -2;
  }
  input1Off() {
    this.amplitudeGrowing = false;
  }
  input2Off() {
    this.frequencyGrowing = false;
  }
  input3Off() {
    this.speed = 2;
  }

  draw() {
    if (this.amplitudeGrowing) {
      this.amplitude += 1;
    } else {
      this.resetAmplitude()
    }
    if(this.frequencyGrowing){
      this.frequency += 0.00005
    }else{
      this.resetFrequency()
    }
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles[i].move();
      this.particles[i].draw();
    }
  }
  resetAmplitude() {
    if (this.amplitude > 0) {
      this.amplitude -= 1;
    }
  }

  resetFrequency() {
    if (this.frequency > 0.04) {
      this.frequency -= 0.001;
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
    this.scaleFactor = random(30);

    this.scale = 3;
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

    this.position.y =
      Math.sin(this.position.x * this.parent.frequency) * this.parent.amplitude;
    this.position.y += this.yOffset;
  }
  draw() {
    fill(this.r, this.g, this.b, this.a);
    if (this.parent.shape === "circle") {
      circle(this.position.x, this.position.y, random(30, 40));
    } else if (this.parent.shape === "square") {
      square(this.position.x, this.position.y, random(30, 40));
    }
  }
  changeScale() {
    this.scale = Math.sin(this.position.x * (this.parent.amplitude / 100));
  }
}
