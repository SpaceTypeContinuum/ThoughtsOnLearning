// Code adapted from
// The Coding Train / Daniel Shiffman
// https://youtu.be/oXwCVDXS2Lg
// https://thecodingtrain.com/learning/nature-of-code/3.3-angles-and-vectors.html


class Attractor {
    constructor(x, y, m, txt) {
        this.pos = createVector(x, y);
        this.mass = m;
        this.r = sqrt(this.mass) * 2;
        this.text = txt;

    }

    attract(mover) {
        let force = p5.Vector.sub(this.pos, mover.pos);
        let distanceSq = constrain(force.magSq(), 50, 500);
        let G = 1;
        let strength = (G * (this.mass * mover.mass)) / distanceSq;
        force.setMag(strength);
        mover.applyForce(force);
    }

    show() {
        noStroke();
        fill(255);
        textSize(this.r);
        let txtWdth = textWidth(this.text);
        let txtHght = 20;
        text(this.text, this.pos.x - txtWdth / 2, this.pos.y + txtHght / 2);
        noFill();
        stroke(255);
        ellipse(this.pos.x, this.pos.y, this.r * 6)

    }
}