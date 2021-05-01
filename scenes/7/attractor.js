class sevenAttractor {

    constructor(p, x, y) {
        this.p = p;
        this.pos = this.p.createVector(x, y);
        this.origin = this.p.createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(p.random(2));

    }


    update() {
        let mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
        if (this.p.mouseX > this.p.width / 2 - 50 && this.p.mouseX < this.p.width / 2 + 50 && this.p.mouseY > this.p.height / 2 - 50 && this.p.mouseY < this.p.height / 2 + 50) {
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
        this.p.fill(255, 100);
        this.p.ellipse(this.pos.x, this.pos.y, 5);
    }
}