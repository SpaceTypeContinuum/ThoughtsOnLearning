var scene13 = function(settings) {
    return function(p) {
        let spiralRadius;
        let vertCount = 200;
        let spiralVertices = [];
        let angle = 0;
        let angleIncrement = 0.01;
        let pointCount = 40;
        let agentNumPerPoint = 3;
        let vehicles = [];
        let paths = [];
        let trigger = false;


        p.setup = function() {
            p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
            // ORTHO CAM INIT
            //ortho([left], [right], [bottom], [top], [near], [far])

            // to do: figure out near/far values
            // console.log(width)
            // console.log(height)

            p.ortho(-p.width / 2, p.width / 2, p.height / 2, -p.height / 2, -2000, 2000);

            spiralRadius = p.width / 4;


            for (i = 0; i < pointCount; i++) {
                // SPIRAL PATH
                paths.push(new Path(p, spiralRadius, vertCount, i * 30));
                let agentVehicles = []
                    // agents
                for (j = 0; j < agentNumPerPoint; j++) {
                    let randomVector = p.createVector(p.random(p.width), p.random(p.height), p.random(-p.height, -p.height * 1.25))
                    agentVehicles.push(new thirteenVehicle(p, randomVector.x, randomVector.y, randomVector.z));
                }
                vehicles.push(agentVehicles)
            }
            // vehicle.vel.x = 2;

        }

        p.draw = function() {
            if (!settings.enabled) {
                return;
            }

            let spiralDepth = p.map(p.mouseY, 0, p.height, 0, p.PI / 2, true);
            p.background(0);

            // vehicle.edges();

            //ROTATE AND THEN SHOW PATH
            p.rotateX(-spiralDepth);
            p.rotateZ(p.frameCount * 0.005);
            // vehicle.show();

            // console.log(path);
            // console.log(futurePos);
            for (i = 0; i < paths.length; i++) {
                let frameNum = p.frameCount
                paths[i].update(frameNum, spiralDepth);
                // futurePos = paths[i].returnFuture(frameNum, spiralDepth, i * 30 + 20); //20 frames in future

                paths[i].show(spiralDepth);

                // PATH FOLLOWING
                for (j = 0; j < vehicles[i].length; j++) {
                    let randomPos = p.createVector(
                        paths[i].position.x + vehicles[i][j].rx,
                        paths[i].position.y + vehicles[i][j].ry,
                        paths[i].position.z + vehicles[i][j].rz)
                    let force = vehicles[i][j].follow(paths[i], randomPos);

                    // let randomfuturePos = createVector(
                    //     futurePos.x + vehicles[i][j].rx,
                    //     futurePos.y + vehicles[i][j].ry,
                    //     futurePos.z + vehicles[i][j].rz)
                    // let force = vehicles[i][j].follow(paths[i], randomfuturePos);
                    vehicles[i][j].applyForce(force);
                    vehicles[i][j].update();
                    vehicles[i][j].show();

                    // get rid of vehicles if they go off screen
                    if (vehicles[i][j].pos.z > p.height) {
                        console.log('spliced!');
                        vehicles[i].splice(j);
                    } else if (vehicles[i][j].pos.z < -p.height) {
                        // console.log(vehicles[i][j].pos.z)
                        console.log('stop adding');
                        trigger = false;
                    } else {
                        trigger = true;
                    }

                }
            }

            if (p.frameCount % 30 == 0 && trigger == true) {

                let minOffset = Math.min(...paths.map((path) => path.frameOffset))

                let frameOffset = minOffset - 30
                paths.push(new Path(p, spiralRadius, vertCount, frameOffset));
                let agentVehicles = []
                for (j = 0; j < agentNumPerPoint; j++) {
                    let randomVector = p.createVector(p.random(p.width), p.random(p.height), p.random(-100, 100))
                    agentVehicles.push(new thirteenVehicle(p, randomVector.x, randomVector.y, randomVector.z));
                }
                vehicles.push(agentVehicles);
                // console.log(paths.length);
            }
        }
    }
}