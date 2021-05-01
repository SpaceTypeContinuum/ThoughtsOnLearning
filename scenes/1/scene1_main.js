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
        let fontSize = 200;

        p.preload = function() {
            font = p.loadFont('assets/fonts/Noto/NotoSans-Thin.ttf');
        }

        p.setup = function() {
            var sectionDiv = document.getElementById('scene1panel');
            var sectionWidth = sectionDiv.offsetWidth;
            var sectionHeight = sectionDiv.offsetHeight;
            var sketchCanvas = p.createCanvas(sectionWidth, sectionHeight); // change this later
            sketchCanvas.parent("scene1");

            // making text to points
            text2Point = font.textToPoints('LEARNING', 0, 0, fontSize, {
                sampleFactor: 0.03,
                simplifyThreshold: 0
            })

            let pointTrackerX = [];
            let pointTrackerY = [];
            for (let i = 0; i < text2Point.length; i++) {
                // flock.push(new Boid(p, tempText2Point[i].x, tempText2Point[i].y));
                pointTrackerX.push(text2Point[i].x)
                pointTrackerY.push(text2Point[i].y)
            }

            // centering happens here!
            let text2pointWidth = p.max(pointTrackerX) - p.min(pointTrackerX);
            let text2pointHeight = p.max(pointTrackerY) - p.min(pointTrackerY);
            let text2pointXVal = (p.width - text2pointWidth) / 2;
            let text2pointYVal = (p.height - text2pointHeight) / 2 + text2pointHeight;

            for (let i = 0; i < text2Point.length; i++) {
                flock.push(new Boid(p, text2Point[i].x + text2pointXVal, text2Point[i].y + text2pointYVal));
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