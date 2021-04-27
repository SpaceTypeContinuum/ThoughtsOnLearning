var testScene = function(p) {
    var x = 100.0;
    var speed = 1.0;
    p.setup = function() {
        var canvasDiv = document.getElementById('scene1');
        var width = canvasDiv.offsetWidth;
        var height = canvasDiv.offsetHeight;
        var sketchCanvas = p.createCanvas(width, height);
        console.log(sketchCanvas);
        sketchCanvas.parent("scene1");

        // p.createCanvas(p.windowWidth, 400);
    };

    p.draw = function() {
        p.background(50);
        p.fill(150);
        p.textSize(100);
        p.text('PLACEHOLDER FOR SCENE', x, p.height / 2)
        x += speed;
        if (x > p.width) {
            x = 0;
        }
    };
};