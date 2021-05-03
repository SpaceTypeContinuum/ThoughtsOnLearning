// Many Particle Systems (Emitters!)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/wDYD3JVtOys
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-emitters.html

var scene9 = function(settings) {
    return function(p) {
        let emitters = [];
        let maxEmitters = 6;
        let customFont;
        let frameSpeed = 10;

        p.preload = function() {
            customFont = p.loadFont('assets/fonts/AdelleMono-Regular.otf');

        }

        p.mousePressed = function() {
            emitters.push(new Emitter(p, frameSpeed, p.mouseX, p.mouseY));

            if (emitters.length > maxEmitters) {
                emitters.splice(0, 1);
            }
        }

        p.setup = function() {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.textFont(customFont);
            for (var i = 0; i < maxEmitters; i++) {

                emitters.push(new Emitter(p, frameSpeed, p.random(p.width * 0.15, p.width * 0.85), p.random(p.height * 0.15, p.height * 0.85)));
                // console.log(emitters[i])
            }
        }

        p.draw = function() {
            if (!settings.enabled) {
                return;
            }
            p.background(0);
            // console.log(frameCount)

            for (let emitter of emitters) {
                emitter.emit();
                emitter.update();
                emitter.show();
            }
        }
    }
}