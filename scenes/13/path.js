//from path following by Coding Train
//https://editor.p5js.org/codingtrain/sketches/dqM054vBV


class Path {
    constructor(p, r, verticeNumCount, frameOffset) {
        this.p = p;
        let startX = this.radius * this.p.cos(this.angle);
        let startY = this.radius * this.p.sin(this.angle);
        let startZ = -this.p.height / 2;
        this.position = this.p.createVector(startX, startY, startZ);
        this.radius = r;
        this.length = verticeNumCount;
        this.angle = 0;
        this.frameOffset = frameOffset;
    }
    update(frameNum, yOffset) {
        // let i = frameCount / 5;
        let i = (frameNum + this.frameOffset) / 5;
        let x = this.radius * this.p.cos(this.angle - i / 12);
        let y = this.radius * this.p.sin(this.angle - i / 12);
        let z = (-this.p.height / 2) + (this.p.height / this.length) * i;
        this.position = this.p.createVector(x, y, z + yOffset)
    }

    // returnFuture(frameNum, yOffset, futureFrames) {
    //     let i = (frameNum + futureFrames) / 5;
    //     let x = this.radius * cos(this.angle - i / 12);
    //     let y = this.radius * sin(this.angle - i / 12);
    //     let z = (-height / 2) + (height / this.length) * i;
    //     let tempPos = createVector(x, y, z + yOffset)
    //     return tempPos
    // }

    show(yOffset) {
        this.p.stroke(255);
        this.p.strokeWeight(2);
        this.p.fill(0, 0)
        this.p.beginShape(this.p.POINTS);
        for (let i = 0; i < this.length; i++) {
            let x = this.radius * this.p.cos(this.angle - i / 12);
            let y = this.radius * this.p.sin(this.angle - i / 12);
            let z = (-this.p.height / 2) + (this.p.height / this.length) * i;
            this.p.vertex(x, y, z + yOffset);
        }
        this.p.endShape();

        // SPIRAL SPHERE PATH
        // for (let i = 0; i < this.length; i++) {
        //     let x = this.radius * cos(this.angle - i / 12);
        //     let y = this.radius * sin(this.angle - i / 12);
        //     let z = (-height / 2) + (height / this.length) * i;
        //     push();
        //     translate(x, y, z + yOffset);
        //     sphere(5);
        //     pop();
        // }

    }
}