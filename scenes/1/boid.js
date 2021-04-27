// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

class Boid {
    constructor(p, x, y) {
        this.p = p;
        this.position = this.p.createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(0);
        this.acceleration = this.p.createVector();
        this.maxForce = 0.1;
        this.maxSpeed = 3;
        this.activated = false;
        this.perceptionRadius = 25;
        this.activateDiameter = 10;
    }

    // top & bottom has border, left & right wrap

    edges() {

        if (this.position.x > this.p.width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = this.p.width;
        }
        if (this.position.y > this.p.height) {
            this.position.y = this.p.height;
            if (this.velocity.y > 0) {
                this.velocity.y *= -1;
            }
        } else if (this.position.y < 0) {
            this.position.y = 0;
            if (this.velocity.y < 0) {
                this.velocity.y *= -1;
            }
        }
    }


    // Alignment makes agents line up with agents close by
    align(boids) {
        let steering = this.p.createVector();
        let total = 0;
        for (let other of boids) {
            let d = this.p.dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < this.perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    //Separation gives each agent "personal space"

    separation(boids) {
        let steering = this.p.createVector();
        let total = 0;
        for (let other of boids) {
            let d = this.p.dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < this.perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d * d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    // Cohesion makes agents to steer towards the "center of mass"

    cohesion(boids) {
        let steering = this.p.createVector();
        let total = 0;

        for (let other of boids) {
            let d = this.p.dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < this.perceptionRadius * 3) {
                steering.add(other.position);
                total++;
                this.activated = true;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids, alignAmt, cohesionAmt, separationAmt) {

        if (this.activated == true) {
            let alignment = this.align(boids);
            let cohesion = this.cohesion(boids);
            let separation = this.separation(boids);


            alignment.mult(alignAmt);
            cohesion.mult(cohesionAmt);
            separation.mult(separationAmt);

            this.acceleration.add(alignment);
            this.acceleration.add(cohesion);
            this.acceleration.add(separation);
        }
    }

    update(speedLimit) {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed * speedLimit);
        this.acceleration.mult(0);
    }


    show(circleSize) {
        this.p.noStroke();
        this.p.fill(255);
        this.p.textSize(35);
        if (this.activated == false) {
            this.p.stroke(255);
            this.p.strokeWeight(1);
            this.p.noFill();
            this.p.circle(this.position.x, this.position.y, circleSize);
        }
        if (this.activated == true) {
            // Letters that rotate to the direction!

            // push();
            // translate(this.position.x, this.position.y);
            // rotate(this.velocity.heading());
            // text('ahh', 0, 0);
            // pop();

            this.p.text('type', this.position.x, this.position.y);
        }
    }

    // Below three functions make it possible for boids to 'activate' via mouse, and avoid it!

    behaviors(boids) {
        let mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
        // console.log(mouse)
        let desired = p5.Vector.sub(mouse, this.position);
        let d = desired.mag();
        if (d < 25) {
            this.activated = true;
        }

        for (let other of boids) {
            if (this.activated == false) {
                let d = this.p.dist(this.position.x, this.position.y, other.position.x, other.position.y);

                // activates if boid touches another in vicinity
                if (other != this && d < this.activateDiameter && other.activated == true) {
                    this.activated = true;
                }
            }
        }

        var flee = this.flee(mouse);
        flee.mult(5);
        this.applyForce(flee);
    }

    flee(target) {
        var desired = p5.Vector.sub(target, this.position);
        var d = desired.mag();
        if (d < 50) {
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            var steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxForce);
            return steer;
        } else {
            return this.p.createVector(0, 0);
        }
    }

    applyForce(f) {
        this.acceleration.add(f);
    }
}