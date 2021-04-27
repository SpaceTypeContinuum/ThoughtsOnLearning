// Adapted from Daniel Shiffman / Coding Train code
// Video: https://youtu.be/OAcXnzRNiCY

let attractors = [];
let particle;
let particles = [];
let font;
let fontSize = 150;
let textPoints = [];

function preload() {
    font = loadFont('assets/NotoSans-Thin.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(random(width), random(height)));
    }

    // background(50);

    // making text to points
    let points;
    points = font.textToPoints('WORRIES', width / 6, height / 1.78, fontSize, {
        sampleFactor: 0.045,
        simplifyThreshold: 0
    })
    for (let i = 0; i < points.length; i++) {
        attractors.push(new Attractor(points[i].x, points[i].y));
    }

}

// function mousePressed() {
//     attractors.push(createVector(mouseX, mouseY));
// }

function draw() {
    background(50)
    stroke(255);
    strokeWeight(4)
    for (var i = 0; i < attractors.length; i++) {
        // point(attractors[i].x, attractors[i].y);
        attractors[i].update();
        attractors[i].show();
    }

    // for (var i = 0; i < particles.length; i++) {
    //     particle = particles[i];
    //     for (var j = 0; j < attractors.length; j++) {
    //         particle.attracted(attractors[j].pos);
    //     }
    //     particle.update();
    //     particle.show();

    // }
    noFill();
    beginShape();

    for (var i = 0; i < particles.length; i++) {
        // console.log(particles[i].pos)
        curveVertex(particles[i].pos.x, particles[i].pos.y);
        particle = particles[i];
        for (var j = 0; j < attractors.length; j++) {
            particle.attracted(attractors[j].pos);
        }
        particle.update();
        particle.show();

    }
    endShape();



}