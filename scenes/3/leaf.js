// Adapted from Coding Train AKA Daniel Shiffman
// Inspired by code from: https://youtu.be/kKT0v3qhIQY

function Leaf(p, Xpos, Ypos) {
    this.p = p;
    this.reached = false;
    this.pos = this.p.createVector(Xpos, Ypos);

    this.show = function() {
        this.p.fill(255);
        this.p.noStroke();
        this.p.ellipse(this.pos.x, this.pos.y, 10, 10);
    }

    // shows leaves that were not reached
    this.showDebug = function() {
        this.p.fill(0, 255, 0);
        this.p.noStroke();
        this.p.ellipse(this.pos.x, this.pos.y, 5, 5);
    }

}