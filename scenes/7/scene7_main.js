// Adapted from Daniel Shiffman / Coding Train code
// Video: https://youtu.be/OAcXnzRNiCY
var scene7 = function(settings) {
    return function(p) {
        let attractors = [];
        let particle;
        let particles = [];
        let font;
        let fontSize = 150;
        let textPoints = [];

        p.preload = function() {
            font = p.loadFont('assets/fonts/Noto/NotoSans-Thin.ttf');
        }

        p.setup = function() {
            var sectionDiv = document.getElementById('scene7panel');
            var sectionWidth = sectionDiv.offsetWidth;
            var sectionHeight = sectionDiv.offsetHeight;
            var sketchCanvas = p.createCanvas(sectionWidth, sectionHeight); // change this later
            sketchCanvas.parent("scene7");

            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(p, p.random(p.width), p.random(p.height)));
            }

            // background(50);

            // making text to points
            let points;
            points = font.textToPoints('ANXIETY', p.width / 6, p.height / 1.78, fontSize, {
                sampleFactor: 0.045,
                simplifyThreshold: 0
            })
            for (let i = 0; i < points.length; i++) {
                attractors.push(new sevenAttractor(p, points[i].x, points[i].y));
            }

        }

        // function mousePressed() {
        //     attractors.push(createVector(mouseX, mouseY));
        // }

        p.draw = function() {
            if (!settings.enabled) {
                return;
            }
            p.background(50)
            p.stroke(255);
            p.strokeWeight(4)
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
            p.noFill();
            p.beginShape();

            for (var i = 0; i < particles.length; i++) {
                // console.log(particles[i].pos)
                p.curveVertex(particles[i].pos.x, particles[i].pos.y);
                particle = particles[i];
                for (var j = 0; j < attractors.length; j++) {
                    particle.attracted(attractors[j].pos);
                }
                particle.update();
                particle.show();

            }
            p.endShape();



        }
    }
}