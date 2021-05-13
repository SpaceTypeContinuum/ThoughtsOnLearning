//from path following by Coding Train
//https://editor.p5js.org/codingtrain/sketches/dqM054vBV

class thirteenVehicle {
    constructor(p, x, y, z) {
        this.p = p;
        this.pos = this.p.createVector(x, y, z);
        this.vel = this.p.createVector(0, 0, 0);
        this.acc = this.p.createVector(0, 0, 0);
        this.maxSpeed = 5;
        this.maxForce = 1;
        this.r = this.p.random(1, 5);

        this.rx = this.p.random(-20, 20)
        this.ry = this.p.random(-20, 20)
        this.rz = this.p.random(-20, 20)
    }

    follow(path, futurePathPos) {
        // Path following algorithm here!!

        // Calculate future position of vehicle

        let future = this.vel.copy();
        future.mult(20);
        future.add(this.pos);

        // Represented in RED spheres
        // fill(255, 0, 0);
        // noStroke();
        // push();
        // translate(future.x, future.y, future.z);
        // sphere(5);
        // pop();

        // Current Position of vehicle
        let currentPos = path.position;

        // Represented in GREEN spheres
        // this.p.fill(0, 255, 0);
        // this.p.noStroke();
        // this.p.push();
        // this.p.translate(currentPos.x, currentPos.y, currentPos.z);
        // this.p.sphere(5);
        // this.p.pop();

        // Future Position represented in BLUE spheres
        let target = futurePathPos;
        // fill(0, 0, 255);
        // noStroke();
        // push();
        // translate(futurePathPos.x, futurePathPos.y, futurePathPos.z);
        // sphere(5);
        // pop();

        let d = p5.Vector.dist(future, target);
        // console.log(path.radius)
        if (d > path.radius / 4) {
            return this.seek(target);
        } else {
            return this.p.createVector(0, 0);
            // return createVector(random(1), random(1));
        }
    }

    seek(target, arrival = false) {
        let force = p5.Vector.sub(target, this.pos);
        let desiredSpeed = this.maxSpeed;
        if (arrival) {
            let slowRadius = 100;
            let distance = force.mag();
            if (distance < slowRadius) {
                desiredSpeed = this.p.map(distance, 0, slowRadius, 0, this.maxSpeed);
            }
        }
        force.setMag(desiredSpeed);
        force.sub(this.vel);
        force.limit(this.maxForce);

        //debug mode for showing line of force

        // fill('red')
        // stroke('red')
        // line(0, 0, 0, force.x * 20, force.y * 20, force.z * 20)
        // noFill()
        return force;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    show() {
        this.p.stroke(255);
        this.p.strokeWeight(2);
        this.p.fill(255);
        this.p.push();
        this.p.translate(this.pos.x, this.pos.y, this.pos.z);
        this.p.sphere(this.r);
        // rotate(this.vel.heading());
        this.p.pop();
    }

    // edges() {
    //     if (this.pos.x > width + this.r) {
    //         this.pos.x = -this.r;
    //     } else if (this.pos.x < -this.r) {
    //         this.pos.x = width + this.r;
    //     }
    //     if (this.pos.y > height + this.r) {
    //         this.pos.y = -this.r;
    //     } else if (this.pos.y < -this.r) {
    //         this.pos.y = height + this.r;
    //     }
    // }
}