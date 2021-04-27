// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

var scene1 = function(settings) {
    return function(p) {
        const flock = [];
        // let mouse;

        let alignSlider, cohesionSlider, separationSlider;

        // text to points 
        let font;
        let fontSize = 300;

        p.preload = function() {
            font = p.loadFont('scenes/1/assets/NotoSans-Thin.ttf');
        }

        p.setup = function() {
            var sectionDiv = document.getElementById('scene1panel');
            var canvasDiv = document.getElementById('scene1');
            var sectionWidth = sectionDiv.offsetWidth;
            var sectionHeight = sectionDiv.offsetHeight;
            var sketchCanvas = p.createCanvas(sectionWidth, sectionHeight); // change this later
            // console.log(sketchCanvas);
            sketchCanvas.parent("scene1");


            // p.createCanvas(1200, 400);

            // mouse = new Obstacle(mouseX, mouseY, 20);
            // console.log(mouse);

            // making text to points
            points = font.textToPoints('KINETIC', 85, 300, fontSize, {
                sampleFactor: 0.03,
                simplifyThreshold: 0
            })
            for (let i = 0; i < points.length; i++) {
                flock.push(new Boid(p, points[i].x, points[i].y));
            }

        }

        p.draw = function() {
            if (!settings.enabled) {
                return;
            }

            p.background(0);

            // delaying the number of frames before it starts to flock
            let slowStartMultiplier = p.map(p.frameCount, 0, 150, 0, 1, true)

            // flocking parameters determined sudo-randomly

            let alignAmount = p.map(p.sin(p.frameCount * 0.01 + 30), -1, 1, 0.5, 1.5, true);
            let cohesionAmount = p.map(p.sin(p.frameCount * 0.005 + 20), -1, 1, 0, 1, true)
            let separationAmount = p.map(p.sin(p.frameCount * 0.02 + 150), -1, 1, 0.5, 2, true);
            let circleAnimate = p.map(p.sin(p.frameCount * 0.05), -1, 1, 3, 20, true);
            // console.log(alignAmount)
            for (let boid of flock) {
                boid.behaviors(flock);
                boid.edges();
                boid.flock(flock, alignAmount, cohesionAmount, separationAmount);
                boid.update(slowStartMultiplier);
                boid.show(circleAnimate);
            }
        }
    };
};