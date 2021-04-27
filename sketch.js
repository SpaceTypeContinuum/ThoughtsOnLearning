gsap.registerPlugin(ScrollTrigger);

// let myp5 = new p5(scene1, document.getElementById('scene1')); doesn't work!

document.addEventListener("DOMContentLoaded", function(event) {
    let settings1 = { enabled: false }
    let p5_scene1 = new p5(scene1(settings1), 'scene1');

    // let myp5 = new p5(testScene, 'scene1'); // TEST SCENE THAT WORKS
    ScrollTrigger.create({
        trigger: "#scene1panel",
        start: "top 100%",
        endTrigger: "#scene2panel",
        end: "top 0%",
        // markers: true, // debugmode
        onToggle: self => {
            console.log("scene1panel, isActive:", self.isActive);
            settings1.enabled = self.isActive
        },
        // onUpdate: self => {
        //     console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
        // }
    });

    function goToSection(i, anim) {
        gsap.to(window, {
            scrollTo: {
                y: i * innerHeight,
                autoKill: false
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
            markers: true,
            onEnterBack: () => {
                goToSection(i);
            }
        });
    });
})