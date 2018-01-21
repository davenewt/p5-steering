function Vehicle(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxSpeed = 4; // limit the max velocity of the vehicle
  this.maxForce = 0.2; // how quickly will the vehicle change direction?
  this.r = 10;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.arrive = function(target) {
    let desired = p5.Vector.sub(target, this.pos);

    // old behaviour: always going maxSpeed = repeatedly overshoots target!
    // desired.setMag(this.maxSpeed);

    // new behaviour: reducing speed as it gets closer to the target...
    let d = desired.mag();
    if (d <= 100) {
      let m = map(d, 0, 100, 0, this.maxSpeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxSpeed);
    }

    let steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxForce);
    this.applyForce(steering);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.render = function() {
    // fill(255, 10);
    // stroke(255);
    // ellipse(this.pos.x, this.pos.y, 48, 48);
    let theta = this.vel.heading() + PI / 2;
    fill(127);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}
