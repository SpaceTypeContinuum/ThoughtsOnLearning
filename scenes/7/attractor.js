class Attractor {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.origin = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(2));

    }


    update() {
        let mouse = createVector(mouseX, mouseY);
        if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 - 50 && mouseY < height / 2 + 50) {
            this.acc = p5.Vector.sub(mouse, this.pos);
            this.acc.setMag(1);
            this.vel.add(this.acc);
            this.vel.limit(5);
            this.pos.add(this.vel);
        } else {
            this.acc = p5.Vector.sub(this.origin, this.pos);
            this.acc.setMag(1);
            this.vel.add(this.acc);
            this.vel.limit(5);
            this.pos.add(this.vel);
        }
    }

    show() {
        fill(255, 100);
        ellipse(this.pos.x, this.pos.y, 5);
    }
}