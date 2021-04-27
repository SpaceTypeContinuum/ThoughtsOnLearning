// Adapted from Coding Train AKA Daniel Shiffman
// Inspired by code from: https://youtu.be/kKT0v3qhIQY

function Tree(density, startPosX, startPosY, charWidth, char, wordSize) {
    this.leaves = [];
    this.branches = [];

    // BOUNDARY CHECK using a background layer
    let tempCanvas = createGraphics(width, height);
    tempCanvas.fill(100);
    tempCanvas.textFont(myFont);
    tempCanvas.textSize(wordSize);
    tempCanvas.text(char, startPosX, startPosY);

    // MAKE LEAVES

    for (var i = 0; i < density; i++) {
        let tempPos = createVector(random(startPosX, startPosX + charWidth), random(startPosY, startPosY - charWidth * 1.25));
        // check if tempPos is within B/W bounds
        let sampleColor = tempCanvas.get(tempPos.x, tempPos.y);

        if (sampleColor[0] == 100) {
            this.leaves.push(new Leaf(tempPos.x, tempPos.y));
        } else {
            density += 1;
        }
    }
    // console.log('density Count is ' + density)

    // MAKE ROOT
    let rootNum = startRootNum; // could change later
    let rootPos = [];
    for (let i = 0; i < rootNum; i++) {

        // making sure sketch doesn't crash!
        if (i > 100) {
            console.log("Something is wrong, can't find a place to place roots!")
            break;
        }

        // making a 'root' start from inside the letter
        let tempPos = createVector(random(startPosX, startPosX + charWidth), random(startPosY, startPosY - charWidth));

        // check if tempPos is within B/W bounds
        let sampleColor = tempCanvas.get(tempPos.x, tempPos.y);

        // Resample root pos if tempPos is not within bounds
        if (sampleColor[0] == 100) {
            rootPos.push(tempPos);
        } else {
            rootNum += 1;
        }

    }


    let roots = [];
    var dir = createVector(0, -1);
    for (let i = 0; i < rootPos.length; i++) {
        let root = new Branch(null, rootPos[i], dir)
        this.branches.push(root);
        var current = root;
        var found = false;
        let failCount = 0;
        while (!found) {

            for (let i = 0; i < this.leaves.length; i++) {
                var d = p5.Vector.dist(current.pos, this.leaves[i].pos);

                if (d < max_dist) {
                    found = true;
                }
            }
            if (!found) {
                // failCount += 1;
                console.log("failcount is " + failCount);

                // if I delete it it still works, what's this doing??

                var branch = current.next();
                current = branch;
                this.branches.push(current);
                // if (failCount > 10) {
                //     console.log("failcount is " + failCount);
                //     break;
                // }
            }

        }
    }

    this.grow = function() {
        for (var i = 0; i < this.leaves.length; i++) {
            var leaf = this.leaves[i];
            var closestBranch = null;
            var record = max_dist;

            for (var j = 0; j < this.branches.length; j++) {
                var branch = this.branches[j];
                var d = p5.Vector.dist(leaf.pos, branch.pos);
                if (d < min_dist) {
                    leaf.reached = true;
                    closestBranch = null;
                    break;
                } else if (d < record) {
                    closestBranch = branch;
                    record = d;
                }
            }

            if (closestBranch != null) {
                var newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
                newDir.normalize();
                closestBranch.dir.add(newDir);
                closestBranch.count++;
            }
        }

        for (var i = this.leaves.length - 1; i >= 0; i--) {
            if (this.leaves[i].reached) {
                this.leaves.splice(i, 1);
            }
        }

        for (var i = this.branches.length - 1; i >= 0; i--) {
            var branch = this.branches[i];
            if (branch.count > 0) {
                branch.dir.div(branch.count + 1);
                this.branches.push(branch.next());
                branch.reset();
            }
        }
    }





    this.show = function(debugView) {

        if (debugView) {
            // DEBUGGING VIEW FOR LETTERS!
            image(tempCanvas, 0, 0);

            // root start points are RED
            tempCanvas.noStroke();
            tempCanvas.fill(255, 0, 0);
            for (let i = 0; i < rootPos.length; i++) {
                tempCanvas.ellipse(rootPos[i].x, rootPos[i].y, 10);
            }

            // shows unreached leaves in GREEN
            for (var i = 0; i < this.leaves.length; i++) {
                this.leaves[i].showDebug();
            }
        }

        for (var i = 0; i < this.branches.length; i++) {
            this.branches[i].show();
        }

    }

}