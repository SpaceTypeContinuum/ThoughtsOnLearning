// Code adapted from
// The Coding Train / Daniel Shiffman
// https://youtu.be/oXwCVDXS2Lg
// https://thecodingtrain.com/learning/nature-of-code/3.3-angles-and-vectors.html



class Mover {
    constructor(p, x, y, m, word) {
        this.p = p;
        this.pos = this.p.createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(5);
        this.acc = this.p.createVector(0, 0);
        this.mass = m;
        this.r = this.p.sqrt(this.mass) * 2;
        this.word = word;
        this.angle = 0;
        this.angleV = 0;
        this.angleA = 0;
        this.wordWidth = this.p.textWidth(this.word);
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        //this.angleA = this.acc.y / 50.0;

        //this.angleV += this.angleA;
        //this.angle += this.angleV;

        this.acc.set(0, 0);
    }

    show() {
        this.p.noStroke();
        this.p.strokeWeight(2);
        this.p.fill(255);
        this.p.push();
        this.p.translate(this.pos.x, this.pos.y);
        this.angle = -1 * this.vel.heading();
        this.p.rotate(this.angle);
        this.p.textSize(this.r);
        this.p.text(this.word, this.wordWidth / 2, 0);
        // line(0, 0, this.r, 0);
        // stroke(255);
        // noFill();
        // ellipse(0, 0, this.r * 2);
        this.p.pop();
    }
}