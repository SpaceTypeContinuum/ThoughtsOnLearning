// Many Particle Systems (Emitters!)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/wDYD3JVtOys
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-emitters.html

// var mouseDist;
// var currentWord;

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(0.5, 2));
        this.acc = createVector(0, 0);
        this.r = 20;
        this.lifetime = 255;
        this.mouse = createVector(mouseX, mouseY);
        this.desired = p5.Vector.sub(this.mouse, this.pos);
        this.steer = p5.Vector.sub(this.desired, this.vel);
        this.mouseDist = this.desired.mag();

        //adding from here
        this.maxspeed = 1;
        this.maxforce = 0.75;

        // changing the word
        this.word = 'not set';
        if (this.mouseDist < 50) {
            this.word = 'ahhh';
        } else {
            this.word = 'worry';
        }
    }

    finished() {
        return this.lifetime < 0;
    }

    applyGravity(force) {
        this.acc.add(force);
    }

    applyMouseForce() {
        if (this.mouseDist < 50) {
            this.desired.setMag(this.maxspeed);
            this.desired.mult(-1);
            this.steer.limit(this.maxforce);
            this.acc.add(this.steer);
        } else {
            var noSpeed = createVector(0, 0);
            this.acc.add(noSpeed);
        }
    }

    // bounces off edges
    // edges() {
    //     if (this.pos.y >= height - this.r) {
    //         this.pos.y = height - this.r;
    //         this.vel.y *= -1;
    //     }

    //     if (this.pos.x >= width - this.r) {
    //         this.pos.x = width - this.r;
    //         this.vel.x *= -1;
    //     } else if (this.pos.x <= this.r) {
    //         this.pos.x = this.r;
    //         this.vel.x *= -1;
    //     }
    // }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
        this.lifetime -= 5;
    }

    show() {
        // stroke(255, this.lifetime);
        // strokeWeight(2);
        fill(255, this.lifetime);
        textSize(this.r);
        text(this.word, this.pos.x, this.pos.y);
        // ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}