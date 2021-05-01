class Walker {

    constructor(p, radius, x, y) {
        this.p = p;
        this.r = radius;
        if (arguments.length == 4) {
            this.pos = this.p.createVector(x, y);
            this.stuck = true;
        } else {
            this.pos = randomPoint(this.p);

            this.stuck = false;
        }
    }



    setHue(hu) {
        this.hu = hu;
    }
    setLightness(light) {
        this.light = light;
    }

    walk(p) {
        this.p = p;
        var vel = p5.Vector.random2D();
        // var vel = createVector(random(-1, 1), random(-0.5, 1));
        this.pos.add(vel.mult(5));
        this.pos.x = this.p.constrain(this.pos.x, 0, this.p.width);
        this.pos.y = this.p.constrain(this.pos.y, 0, this.p.height);
    }
    checkStuck(others) {

        for (var i = 0; i < others.length; i++) {
            var d = distSq(this.pos, others[i].pos);
            if (d < (this.r * this.r + others[i].r * others[i].r + 2 * others[i].r * this.r)) {
                // if (random(1) < 0.1) { 
                this.stuck = true;
                return true;
            }
        }
        return false;
    }

    show() {
        this.p.noStroke(255, 100);
        if (this.stuck && typeof this.hu !== 'undefined' && typeof this.light !== 'undefined') {
            this.p.fill(this.hu, this.light, 100, 1);
        } else {
            this.p.fill(360, 0, 255);
        }
        this.p.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
}

function distSq(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    return dx * dx + dy * dy;
}

function randomPoint(p) {
    this.p = p;
    var i = this.p.floor(this.p.random(4));

    // Points generating from random points
    // var x = random(width);
    // var y = random(height);
    // return createVector(x, y);

    if (i === 0) {
        let x = this.p.random(this.p.width);
        return this.p.createVector(x, 0);
    } else if (i === 1) {
        let x = this.p.random(this.p.width);
        return this.p.createVector(x, this.p.height);
    } else if (i === 2) {
        let y = this.p.random(this.p.height);
        return this.p.createVector(0, y);
    } else {
        let y = this.p.random(this.p.height);
        return this.p.createVector(this.p.width, y);
    }


}