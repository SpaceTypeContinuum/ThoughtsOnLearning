// Adapted from Coding Train AKA Daniel Shiffman
// Inspired by code from: https://youtu.be/kKT0v3qhIQY

function Leaf(Xpos, Ypos) {
    this.reached = false;
    this.pos = createVector(Xpos, Ypos);

    this.show = function() {
        fill(255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 10, 10);
    }

    // shows leaves that were not reached
    this.showDebug = function() {
        fill(0, 255, 0);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 10, 10);
    }

}