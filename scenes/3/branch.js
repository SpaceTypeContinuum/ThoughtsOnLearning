// Adapted from Coding Train AKA Daniel Shiffman
// Inspired by code from: https://youtu.be/kKT0v3qhIQY

function Branch(p, parent, pos, dir) {
    this.p = p;
    this.pos = pos;
    this.parent = parent;
    this.dir = dir;
    // console.log(this.dir)
    this.origDir = this.dir.copy();
    this.count = 0;
    this.len = 5;

    this.reset = function() {
        this.dir = this.origDir.copy();
        this.count = 0;
    }


    this.next = function() {
        var nextDir = p5.Vector.mult(this.dir, this.len);
        var nextPos = p5.Vector.add(this.pos, nextDir);
        var nextBranch = new Branch(this.p, this, nextPos, this.dir.copy());
        return nextBranch;
    }

    this.show = function() {
        if (parent != null) {
            this.p.stroke(255);
            this.p.line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
        }

    }
}