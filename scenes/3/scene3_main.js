// Adapted from Coding Train AKA Daniel Shiffman
// Inspired by code from: https://youtu.be/kKT0v3qhIQY
var scene3 = function(settings) {
    return function(p) {

        let font;
        let trees = [];
        var max_dist = 20;
        var min_dist = 5;
        let word = 'CAPTIVATING' // CAPTIVATING
        let fontSize = 180;
        let startRootNum = 7;
        let leafDensity = 800;

        p.preload = function() {
            font = p.loadFont('assets/fonts/BlobFont-Regular.otf')
        }

        p.setup = function() {
            var sectionDiv = document.getElementById('scene3panel');
            // var canvasDiv = document.getElementById('scene3');
            var sectionWidth = sectionDiv.offsetWidth;
            var sectionHeight = sectionDiv.offsetHeight;
            var sketchCanvas = p.createCanvas(sectionWidth, sectionHeight); // change this later
            // console.log(sketchCanvas);
            sketchCanvas.parent("scene3");
            p.textFont(font);
            p.textSize(fontSize);

            let text2Point = font.textToPoints(word, 0, 0, fontSize)
            let pointTrackerY = [];
            for (let i = 0; i < text2Point.length; i++) {
                pointTrackerY.push(text2Point[i].y)
            }
            let text2PointHeight = p.max(pointTrackerY) - p.min(pointTrackerY);

            // place each Char Tree
            // Tree(density, startPosX, startPosY, charWidth, char, wordSize)
            let wordStartXpos = (p.width - p.textWidth(word)) / 2;
            let wordStartYpos = (p.height - text2PointHeight) / 2 + text2PointHeight;

            for (let i = 0; i < word.length; i++) {
                let charWidth = p.textWidth(word[i]);
                tempTree = new Tree(p, font, startRootNum, leafDensity, wordStartXpos, wordStartYpos, charWidth, word[i], fontSize, max_dist, min_dist);
                trees.push(tempTree);
                wordStartXpos += charWidth;
            }
            console.log("trees.length is " + trees.length)

        }

        p.draw = function() {
            if (!settings.enabled) {
                return;
            }
            // console.log("drawing!")
            p.background(0);
            p.frameRate(10);
            for (let i = 0; i < trees.length; i++) {
                trees[i].show(); // put any value in here for debug view
                trees[i].grow();
            }
        }
    }
}