// from Coding challenge #34 of Coding Train on Youtube
var scene15 = function(settings) {
    return function(p) {
        var tree = [];
        var walkers = [];
        // var r = 4;
        var maxWalkers = 500;
        var iterations = 5;
        var radius = 10;
        var shrink = 0.995;
        var hu = 0;
        var light = 0;
        var fontSize = 120;
        // var points = [];

        // text to points 
        let font;

        p.preload = function() {
            font = p.loadFont('assets/fonts/Noto/NotoSans-Thin.ttf');
        }

        p.setup = function() {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.colorMode(p.HSB);
            // for (var x = 0; x < width; x += r * 2) {
            //     tree.push(new Walker(x, height));
            // }

            // making text to points
            text2Point = font.textToPoints('COMMUNITIES', 0, 0, fontSize, {
                sampleFactor: 0.045,
                simplifyThreshold: 0
            })

            //getting text2point bounds
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

            // adding points to tree from texttopoints

            for (let i = 0; i < text2Point.length; i++) {
                tree.push(new Walker(p, radius, text2Point[i].x + text2pointXVal, text2Point[i].y + text2pointYVal));
            }


            radius *= shrink;
            for (var i = 0; i < maxWalkers; i++) {
                walkers[i] = new Walker(p, radius);
                radius *= shrink;
            }
        }

        p.draw = function() {
            if (!settings.enabled) {
                return;
            }
            p.background(0);
            //texttopoints
            p.textFont(font);
            p.textSize(fontSize);
            p.fill(255);


            for (var i = 0; i < tree.length; i++) {
                tree[i].show();

            }
            for (var i = 0; i < walkers.length; i++) {
                walkers[i].show();

            }
            for (var n = 0; n < iterations; n++) {
                for (var i = walkers.length - 1; i >= 0; i--) {
                    walkers[i].walk(p);
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

            while (walkers.length < maxWalkers && radius > 1) {
                radius *= shrink;
                walkers.push(new Walker(p, radius))

            }
        }
    }
}