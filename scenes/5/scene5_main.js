// Code adapted from
// The Coding Train / Daniel Shiffman
// https://youtu.be/oXwCVDXS2Lg
// https://thecodingtrain.com/learning/nature-of-code/3.3-angles-and-vectors.html
var scene5 = function(settings) {
    return function(p) {
        let movers = [];
        let attractor;
        let thinFont;
        let boldFont;
        let words = ['reader', 'plants', 'cat', 'dog', 'typographer', 'teacher', 'student', 'climber', 'dancer', 'partner']

        p.preload = function() {
            thinFont = p.loadFont('assets/fonts/AdelleMonoFlex-Regular.woff');
            boldFont = p.loadFont('assets/fonts/AdelleMonoFlex-Bold.woff');
        }

        p.setup = function() {
            var sectionDiv = document.getElementById('scene5panel');
            var sectionWidth = sectionDiv.offsetWidth;
            var sectionHeight = sectionDiv.offsetHeight;
            var sketchCanvas = p.createCanvas(sectionWidth, sectionHeight); // change this later
            sketchCanvas.parent("scene5");
            p.textFont(thinFont);
            for (let i = 0; i < 10; i++) {
                let x = p.random(p.width);
                let y = p.random(p.height);
                let m = p.random(50, 150);
                movers[i] = new Mover(p, x, y, m, p.random(words));
            }
            p.textFont(boldFont);
            attractor = new Attractor(p, p.width / 2, p.height / 2, 200, 'Identity');
            p.background(0);
        }

        p.draw = function() {
            if (!settings.enabled) {
                return;
            }
            p.background(0);
            for (let mover of movers) {
                mover.update();
                mover.show();
                attractor.attract(mover);
            }
            if (p.mouseIsPressed) {
                attractor.pos.x = p.mouseX;
                attractor.pos.y = p.mouseY;
            }
            attractor.show();
        }
    }
}