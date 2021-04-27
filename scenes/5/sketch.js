// Code adapted from
// The Coding Train / Daniel Shiffman
// https://youtu.be/oXwCVDXS2Lg
// https://thecodingtrain.com/learning/nature-of-code/3.3-angles-and-vectors.html

let movers = [];
let attractor;


function setup() {
    createCanvas(600, 600);
    textFont(thinFont);
    for (let i = 0; i < 10; i++) {
        let x = random(width);
        let y = random(height);
        let m = random(50, 150);
        movers[i] = new Mover(x, y, m);
    }
    textFont(boldFont);
    attractor = new Attractor(width / 2, height / 2, 200, 'WORRIES');
    background(0);
}

function draw() {

    background(0);
    for (let mover of movers) {
        mover.update();
        mover.show();
        attractor.attract(mover);
    }
    if (mouseIsPressed) {
        attractor.pos.x = mouseX;
        attractor.pos.y = mouseY;
    }
    attractor.show();
}