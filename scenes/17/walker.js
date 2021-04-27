class Walker {

    constructor(x, y) {
        if (arguments.length == 2) {
            this.pos = createVector(x, y);
            this.stuck = true;
        } else {
            this.pos = randomPoint();
            this.stuck = false;
        }
        this.r = radius;
    }



    setHue(hu) {
        this.hu = hu;
    }
    setLightness(light) {
        this.light = light;
    }

    walk() {
        var vel = p5.Vector.random2D();
        // var vel = createVector(random(-1, 1), random(-0.5, 1));
        this.pos.add(vel.mult(5));
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
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
        noStroke(255, 100);
        if (this.stuck && typeof this.hu !== 'undefined' && typeof this.light !== 'undefined') {
            fill(this.hu, this.light, 100, 1);
        } else {
            fill(360, 0, 255);
        }
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
}

function distSq(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    return dx * dx + dy * dy;
}

function randomPoint() {
    var i = floor(random(4));

    // Points generating from random points
    // var x = random(width);
    // var y = random(height);
    // return createVector(x, y);

    if (i === 0) {
        let x = random(width);
        return createVector(x, 0);
    } else if (i === 1) {
        let x = random(width);
        return createVector(x, height);
    } else if (i === 2) {
        let y = random(height);
        return createVector(0, y);
    } else {
        let y = random(height);
        return createVector(width, y);
    }


}