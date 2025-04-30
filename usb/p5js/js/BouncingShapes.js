class BouncingShapes extends BaseSketch {
  constructor(numShapes = 5, shapeType = "circle") {
    super();
    this.backgroundR = 0;
    this.backgroundG = 0;
    this.backgroundB = 0;
    this.shapes = [];
    this.numShapes = numShapes;
    this.shapeType = shapeType;
    this.spring = 0.05;
    this.gravity = createVector(0, 0.03);
    this.colorChanging = false;
    this.friction = -0.9;
  }

  setup() {
    stroke(255);
    fill(255, 204);

    this.backgroundR = 0;
    this.backgroundG = 0;
    this.backgroundB = 0;

    for (let i = 0; i < this.numShapes; i++) {
      this.shapes[i] = new BouncingShape(
        random(width),
        random(height),
        random(10, 300),
        i,
        this.shapes,
        this
      );
    }
  }

  draw(input) {
    if (this.colorChanging) {
      this.changeBackgroundColor();
    }
    fill(this.backgroundR, this.backgroundG, this.backgroundB);
    for (let shape of this.shapes) {
      shape.collide();
      shape.move();
      shape.display(0);

      // Mirror display
      let mirrorX = width - shape.pos.x * 2;
      shape.display(mirrorX);
    }
  }

  // input logic
  // -------- input 1 ----------
  input1On() {
    this.colorChanging = true;
    this.gravity = createVector(0, -3); // Reverse gravity
  }

  input1Off() {
    this.colorChanging = false;
    this.gravity = createVector(0, 0.03); // Reverse gravity
  }
  // -------- input 2 ----------
  input2On() {
    this.colorChanging = true;
    this.gravity = createVector(-3, 0);
  }

  input2Off() {
    this.colorChanging = false;
    this.gravity = createVector(0, 0.03);
  }
  // -------- input 3 ----------
  input3On() {
    this.colorChanging = true;
    this.gravity = createVector(3, 0);
  }

  input3Off() {
    this.colorChanging = false;
    this.gravity = createVector(0, 0.03);
  }

  changeBackgroundColor() {
    this.backgroundR += 1;
    this.backgroundG += 2;
    this.backgroundB += 3;

    if (this.backgroundR > 255) this.backgroundR -= 255;
    if (this.backgroundG > 255) this.backgroundG -= 255;
    if (this.backgroundB > 255) this.backgroundB -= 255;
  }
}

class BouncingShape {
  constructor(x, y, d, id, others, parent) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.diameter = d;
    this.id = id;
    this.others = others;
    this.parent = parent; // Reference to BouncingShapes instance
  }

  applyForce(force) {
    this.acc.add(force);
  }

  collide() {
    for (let i = this.id + 1; i < this.parent.numShapes; i++) {
      let other = this.others[i];
      let dir = p5.Vector.sub(other.pos, this.pos);
      let distance = dir.mag();
      let minDist = other.diameter / 2 + this.diameter / 2;

      if (distance < minDist) {
        let angle = dir.heading();
        let target = p5.Vector.add(
          this.pos,
          p5.Vector.fromAngle(angle, minDist)
        );
        let force = p5.Vector.sub(target, other.pos);
        force.mult(this.parent.spring);

        this.vel.sub(force);
        other.vel.add(force);
      }
    }
  }

  move() {
    // Apply gravity
    this.applyForce(this.parent.gravity);

    // Update velocity and position
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // Reset acceleration after each frame

    // Boundary checks
    if (this.pos.x + this.diameter / 2 > width / 2) {
      this.pos.x = width / 2 - this.diameter / 2;
      this.vel.x *= this.parent.friction;
    } else if (this.pos.x - this.diameter / 2 < 0) {
      this.pos.x = this.diameter / 2;
      this.vel.x *= this.parent.friction;
    }

    if (this.pos.y + this.diameter / 2 > height) {
      this.pos.y = height - this.diameter / 2;
      this.vel.y *= this.parent.friction;
    } else if (this.pos.y - this.diameter / 2 < 0) {
      this.pos.y = this.diameter / 2;
      this.vel.y *= this.parent.friction;
    }
  }

  display(mirrorOffset) {
    let x = this.pos.x + mirrorOffset;
    let shape = this.parent.shapeType;

    if (shape === "circle") {
      ellipse(x, this.pos.y, this.diameter, this.diameter);
    } else if (shape === "square") {
      rectMode(CENTER);
      rect(x, this.pos.y, this.diameter, this.diameter);
    } else if (shape === "triangle") {
      let halfD = this.diameter / 2;
      triangle(
        x,
        this.pos.y - halfD,
        x - halfD,
        this.pos.y + halfD,
        x + halfD,
        this.pos.y + halfD
      );
    }
  }
}
