// from Coding challenge #34 of Coding Train on Youtube
var scene17 = function(settings) {
    return function(p) {
        var tree = [];
        var walkers = [];
        // var r = 4;
        var maxWalkers = 50;
        var iterations = 1000;
        var radius = 10;
        var shrink = 0.995;
        var hu = 0;
        var light = 0;
        var size = 120;
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
            points = font.textToPoints('COMMUNITIES', p.width / 4, p.height / 1.78, size, {
                    sampleFactor: 0.045,
                    simplifyThreshold: 0
                })
                // print(font)

            // adding points to tree from texttopoints

            for (let i = 0; i < points.length; i++) {
                tree.push(new Walker(p, radius, points[i].x, points[i].y));
            }
            // tree[0] = new Walker(width / 2, height / 2);


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
            p.textSize(size);
            p.fill(255);
            for (let i = 0; i < points.length; i++) {
                let pt = points[i];
                p.ellipse(pt.x, pt.y, 3);
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