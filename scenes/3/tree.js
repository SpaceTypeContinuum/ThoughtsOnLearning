// Adapted from Coding Train AKA Daniel Shiffman
// Inspired by code from: https://youtu.be/kKT0v3qhIQY

function Tree(p, font, startRootNum, density, startPosX, startPosY, charWidth, char, fontSize, max_dist, min_dist) {
    this.leaves = [];
    this.branches = [];
    this.p = p;
    this.font = font;
    this.startRootNum = startRootNum;
    this.max_dist = max_dist;
    this.min_dist = min_dist;
    this.fontSize = fontSize;
    this.density = density;

    // BOUNDARY CHECK using a background layer
    let tempCanvas = this.p.createGraphics(this.p.width, this.p.height);
    tempCanvas.fill(100);
    tempCanvas.textFont(this.font);
    tempCanvas.textSize(this.fontSize);
    tempCanvas.text(char, startPosX, startPosY);

    // MAKE LEAVES
    let leafNumCurrent = this.density;
    let leafMaxTries = leafNumCurrent * 1.5;

    for (var i = 0; i < leafNumCurrent; i++) {
        let tempPos = this.p.createVector(this.p.random(startPosX, startPosX + charWidth), this.p.random(startPosY, startPosY - this.fontSize));
        // check if tempPos is within B/W bounds
        let sampleColor = tempCanvas.get(tempPos.x, tempPos.y);
        if (leafNumCurrent < leafMaxTries && sampleColor[0] == 100) {
            this.leaves.push(new Leaf(p, tempPos.x, tempPos.y));
        } else if (leafNumCurrent > leafMaxTries) {
            console.log("leafNumCurrent exceeds leafMaxTries");
            break;
        } else {
            leafNumCurrent += 1;
        }
    }

    // console.log('density Count is ' + density)

    // MAKE ROOT
    let rootNumMaxTries = this.startRootNum + 20; // Maximum number of tries to make roots
    let rootNumCurrent = this.startRootNum;
    let rootPos = [];
    for (let i = 0; i < rootNumCurrent; i++) {

        // making a 'root' start from inside the letter
        let tempPos = this.p.createVector(this.p.random(startPosX, startPosX + charWidth), this.p.random(startPosY, startPosY - charWidth));

        // check if tempPos is within B/W bounds
        let sampleColor = tempCanvas.get(tempPos.x, tempPos.y);

        // Resample root pos if tempPos is not within bounds
        if (rootNumCurrent < rootNumMaxTries && sampleColor[0] == 100) {
            rootPos.push(tempPos);
        } else if (rootNumCurrent > rootNumMaxTries) {
            console.log("rootNumCurrent exceeds rootNumMax")
            break;
        } else {
            rootNumCurrent += 1;
        }

    }


    let roots = [];
    var dir = this.p.createVector(0, -1);
    for (let i = 0; i < rootPos.length; i++) {

        let root = new Branch(this.p, null, rootPos[i], dir)
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
                failCount += 1;
                console.log("failcount is " + failCount); // ERROR IS HERE

                // if I delete it it still works, what's this doing??

                var branch = current.next();
                current = branch;
                this.branches.push(current);
                if (failCount > 100) {
                    console.log("failcount is " + failCount);
                    break;
                }
            }

        }
    }

    this.grow = function() {
        for (var i = 0; i < this.leaves.length; i++) {
            var leaf = this.leaves[i];
            var closestBranch = null;
            var record = this.max_dist;

            for (var j = 0; j < this.branches.length; j++) {
                var branch = this.branches[j];
                var d = p5.Vector.dist(leaf.pos, branch.pos);
                if (d < this.min_dist) {
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
            this.p.image(tempCanvas, 0, 0);

            // root start points are RED
            tempCanvas.noStroke();
            tempCanvas.fill(255, 0, 0);
            for (let i = 0; i < rootPos.length; i++) {
                tempCanvas.ellipse(rootPos[i].x, rootPos[i].y, 5);
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