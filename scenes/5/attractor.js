// Code adapted from
// The Coding Train / Daniel Shiffman
// https://youtu.be/oXwCVDXS2Lg
// https://thecodingtrain.com/learning/nature-of-code/3.3-angles-and-vectors.html


class Attractor {
    constructor(p, x, y, m, txt) {
        this.p = p;
        this.pos = this.p.createVector(x, y);
        this.mass = m;
        this.r = this.p.sqrt(this.mass) * 2;
        this.text = txt;

    }

    attract(mover) {
        let force = p5.Vector.sub(this.pos, mover.pos);
        let distanceSq = this.p.constrain(force.magSq(), 100, 1000);
        let G = 1;
        let strength = (G * (this.mass * mover.mass)) / distanceSq;
        force.setMag(strength);
        mover.applyForce(force);
    }

    show() {
        this.p.noStroke();
        this.p.fill(0);
        this.p.textSize(this.r);
        let txtWdth = this.p.textWidth(this.text);
        let txtHght = 20;
        this.p.fill(255);
        this.p.ellipse(this.pos.x, this.pos.y, this.r * 6)
        this.p.fill(0);
        this.p.text(this.text, this.pos.x - txtWdth / 2, this.pos.y + txtHght / 2);

    }
}