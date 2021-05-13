gsap.registerPlugin(ScrollTrigger);

// let myp5 = new p5(scene1, document.getElementById('scene1')); doesn't work!

document.addEventListener("DOMContentLoaded", function(event) {

    // INITIALIZE ALL p5js SCENES
    settings = []
    scenes = [
        // naming info: [sceneVariableName, currentNum, nextSceneNum]
        [scene1, 1],
        [scene3, 3],
        [scene5, 5],
        [scene7, 7],
        [scene9, 9],
        [scene13, 13],
        [scene15, 15]
    ]
    p5scenes = []
    for (let [scene, num] of scenes) {
        let s = { enabled: false }
        let p5scene = new p5(scene(s), `scene${num}`)
        settings.push(s)
        p5scenes.push(p5scene)
        ScrollTrigger.create({
            trigger: `#scene${num}panel`,
            start: "top 100%",
            endTrigger: `#scene${num+1}panel`,
            end: "top 0%",
            // markers: true, // debugmode
            onToggle: self => {
                console.log(`scene${num}panel` + "isActive: ", self.isActive);
                s.enabled = self.isActive
            },
        });
    }

    // Sticky ScrollTrigger Animation


    function goToSection(i, anim) {
        // let w = window.innerWidth;
        // if (w < 800) {
        //     return;
        // }
        gsap.to(window, {
            scrollTo: {
                y: i * innerHeight,
                autoKill: false,
                // autoKill: true
            },
            duration: 1
        });

        if (anim) {
            anim.restart();
        }
    }

    const panels = gsap.utils.toArray(".panel")
    panels.forEach((panel, i) => {
        ScrollTrigger.create({
            trigger: panel,
            // markers: true,
            onEnter: () => {
                goToSection(i)
            }
        });

        ScrollTrigger.create({
            trigger: panel,
            start: "bottom bottom",
            // markers: true,
            onEnterBack: () => {
                goToSection(i);
            }
        });
    });
})