// Many Particle Systems (Emitters!)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/wDYD3JVtOys
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-emitters.html


let emitters = [];
let maxEmitters = 6;
let customFont;
let frameSpeed = 10;

function preload() {
    customFont = loadFont('assets/AdelleMono-Regular.otf');

}

function mousePressed() {
    emitters.push(new Emitter(mouseX, mouseY));

    if (emitters.length > maxEmitters) {
        emitters.splice(0, 1);
    }

    httpPost("/save", 'json', { mouseX, mouseY }, function(result) {
        console.log("posted");
    });
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(customFont);
    httpGet("/data", 'json', false, function(response) {

        console.log(response);
        // fill(255, 0, 0);
        for (var i = 0; i < response.length; i++) {
            emitters.push(new Emitter(response[i].mouseX, response[i].mouseY));
        }
    })
}

function draw() {
    background(0);
    // console.log(frameCount)

    for (let emitter of emitters) {
        emitter.emit();
        emitter.update();
        emitter.show();
    }
}