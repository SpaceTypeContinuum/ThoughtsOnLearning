// from Coding challenge #34 of Coding Train on Youtube

var tree = [];
var walkers = [];
// var r = 4;
var maxWalkers = 1000;
var iterations = 1000;
var radius = 10;
var shrink = 0.9999;
var hu = 0;
var light = 0;
var size = 120;
// var points = [];

// text to points 
let font;

function preload() {
    font = loadFont('assets/NotoSans-Thin.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    // for (var x = 0; x < width; x += r * 2) {
    //     tree.push(new Walker(x, height));
    // }

    // making text to points
    points = font.textToPoints('WORRIES', width / 4, height / 1.78, size, {
            sampleFactor: 0.045,
            simplifyThreshold: 0
        })
        // print(font)

    // adding points to tree from texttopoints

    for (let i = 0; i < points.length; i++) {
        tree.push(new Walker(points[i].x, points[i].y));
    }
    // tree[0] = new Walker(width / 2, height / 2);


    radius *= shrink;
    for (var i = 0; i < maxWalkers; i++) {
        walkers[i] = new Walker();
        radius *= shrink;
    }
}

function draw() {
    background(0);
    //texttopoints
    textFont(font);
    textSize(size);
    fill(255);
    for (let i = 0; i < points.length; i++) {
        let pt = points[i];
        ellipse(pt.x, pt.y, 3);
        // print(pt.x, pt.y)
    }


    for (var i = 0; i < tree.length; i++) {
        tree[i].show();

    }
    for (var i = 0; i < walkers.length; i++) {
        walkers[i].show();

    }
    for (var n = 0; n < iterations; n++) {
        for (var i = walkers.length - 1; i >= 0; i--) {
            walkers[i].walk();
            if (walkers[i].checkStuck(tree)) {
                walkers[i].setHue(((hu % 100) + 300) % 360);
                walkers[i].setLightness(light % 100)
                hu += 2;
                light += 2;
                tree.push(walkers[i]);
                walkers.splice(i, 1);
            }
        }
    }

    var r = walkers[walkers.length - 1].r;
    while (walkers.length < maxWalkers && radius > 1) {
        radius *= shrink;
        walkers.push(new Walker())
        print('push');

    }
}