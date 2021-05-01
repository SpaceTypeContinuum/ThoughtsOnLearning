// Many Particle Systems (Emitters!)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/wDYD3JVtOys
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-emitters.html


class Emitter {
    constructor(p, frameSpeed, x, y) {
        this.p = p;
        this.position = this.p.createVector(x, y);
        this.particles = [];
        this.frameSpeed = frameSpeed;
    }

    emit() {
        if (this.p.frameCount % this.frameSpeed == 0) {
            this.particles.push(new nineParticle(this.p, this.position.x, this.position.y));
        }
    }

    update() {
        for (let particle of this.particles) {
            particle.applyMouseForce();
            particle.update();
            // particle.edges()
        }


        for (let i = this.particles.length - 1; i >= 0; i--) {
            if (this.particles[i].finished()) {
                this.particles.splice(i, 1);
            }
        }
    }

    show() {
        for (let particle of this.particles) {
            particle.show();
        }
    }
}