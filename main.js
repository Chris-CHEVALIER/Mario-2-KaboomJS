import k from './kaboom.js';
import { LEVELS, levelConf } from "./gameConfiguration.js";
import { killed } from "./functions.js";

scene("start", () => {
    add([
        text("Press enter to start", { size: 24 }),
        pos(width() / 2, height() / 2),
        origin("center"),
        color(255, 255, 255),
    ]);

    onKeyRelease("enter", () => {
        go("game");
    })
});

go("start");

scene("game", (levelNumber = 0, lifeNumber = 3) => {
    layers(["bg", "game", "ui"], "game");

    const level = addLevel(LEVELS[levelNumber], levelConf);
    const music = play("theme", { loop: true })

    const scoreLabel = add([
        text("x0", { size: 12 }),
        pos(17, 5),
        layer("ui"),
        fixed(),
        { value: 0 }
    ]);

    const lifeLabel = add([
        text("x" + lifeNumber, { size: 12 }),
        pos(17, 20),
        layer("ui"),
        fixed(),
        { value: lifeNumber }
    ]);

    add([
        sprite("coin", { width: 12 }),
        pos(7, 5),
        layer("ui"),
        fixed(),
    ]);

    add([
        sprite("marioLife", { width: 12 }),
        pos(7, 20),
        layer("ui"),
        fixed(),
    ]);

    add([
        sprite("cloud"),
        pos(20, 200),
        layer("bg")
    ]);

    add([
        sprite("hill"),
        pos(32, 352),
        layer("bg"),
        origin("bot")
    ])

    add([
        sprite("shrubbery"),
        pos(200, 352),
        layer("bg"),
        origin("bot")
    ])

    add([
        text("Level " + (levelNumber + 1), { size: 24 }),
        pos(width() / 2, height() / 2),
        color(255, 255, 255),
        origin("center"),
        layer('ui'),
        lifespan(1, { fade: 0.5 })
    ]);

    const player = level.spawn("p", 1, 10);

    onKeyDown("right", () => {
        player.flipX(false);
        player.move(player.speed, 0);
    });

    onKeyDown("left", () => {
        player.flipX(true);
        if (toScreen(player.pos).x > 20) {
            player.move(-player.speed, 0);
        }
    });

    onKeyDown("down", () => {
        if (player.isBig) {
            player.isDown = true;
        }
    });

    onKeyRelease("down", () => {
        if (player.isBig) {
            player.isDown = false;
        }
    })

    onKeyDown("tab", () => {
        player.speed = 260;
    });

    onKeyRelease("tab", () => {
        player.speed = 120;
    })

    onKeyPress("space", () => {
        if (player.isGrounded()) {
            play(player.isBig ? "jumpBig" : "jumpSmall", { volume: 0.5 });
            player.jump();
            canSquash = true;
        }
    });

    onKeyPress("b", () => {
        if (player.isFlaming()) {
            //player.sendFireball();
        }
    });

    onKeyPress("s", () => {
        console.log("launch music");
        var audio = new Audio("./assets/musics/main-theme.mp3");
        audio.play();
    });

    player.onUpdate(() => {
        var currCam = camPos();
        if (currCam.x < player.pos.x) {
            camPos(player.pos.x, currCam.y);
        }
        if (player.isDown) {
            player.frame = 14;
        }
        if (player.isAlive) {
            canSquash = !player.isGrounded()
        } else {
            player.frame = 6;
        }
    });

    let canSquash = false;

    player.onCollide("goomba", (baddy) => {
        if (baddy.isAlive == false) return;
        if (player.isAlive == false) return;
        if (canSquash) {
            play("goombaStomp", { volume: 0.5 });
            baddy.squash();
        } else {
            if (player.isBig) {
                player.smaller();
            } else {
                play("marioDies", { volume: 1 });
                music.stop();
                killed(player);
                player.freeze();
                lifeLabel.value--;
                lifeNumber--;
                lifeLabel.text = "x" + lifeLabel.value;
                console.log(lifeLabel.value);
                if (lifeLabel.value <= 0 || lifeNumber <= 0) {
                    add([
                        text("Game Over...", { size: 24 }),
                        pos(toWorld(vec2(160, 120))),
                        color(255, 0, 0),
                        origin("center"),
                        layer('ui'),
                    ]);
                }
            }
        }
    });

    player.onCollide("koopa", (koopa) => {
        if (koopa.isAlive == false) return;
        if (player.isAlive == false) return;
        if (canSquash) {
            play("goombaStomp", { volume: 0.5 });
            koopa.toShell();
        } else {
            if (player.isBig) {
                player.smaller();
            } else {
                play("marioDies", { volume: 1 });
                music.stop();
                killed(player);
                player.freeze();
            }
        }
    });

    player.onCollide("bigMushy", (mushy) => {
        play("powerup", { volume: 0.5 });
        mushy.destroy();
        player.bigger();
    });

    player.onCollide("lifeMushy", (mushy) => {
        play("oneUp", { volume: 0.5 });
        mushy.destroy();
        lifeLabel.value++;
        lifeLabel.text = "x" + lifeLabel.value;
    });

    player.onCollide("flower", (flower) => {
        play("powerup", { volume: 0.5 });
        flower.destroy();
        player.flaming();
    });

    player.onCollide("coin", (coin) => {
        play("coin", { volume: 0.5 });
        coin.destroy();
        scoreLabel.value++;
        scoreLabel.text = "x" + scoreLabel.value;
    });

    player.onCollide("castle", (castle, side) => {
        play("stageClear");
        music.stop();
        player.freeze();
        add([
            text("Well Done!", { size: 24 }),
            pos(toWorld(vec2(160, 120))),
            color(255, 255, 255),
            origin("center"),
            layer('ui'),
        ]);
        wait(1, () => {
            let nextLevel = levelNumber + 1;

            if (nextLevel >= LEVELS.length) {
                go("start");
            } else {
                go("game", nextLevel);
            }
        })
    });

    player.on("headbutt", (obj) => {
        if (obj.is("questionBox")) {
            if (obj.is("coinBox")) {
                play("coin", { volume: 0.5 });
                let coin = level.spawn("c", obj.gridPos.sub(0, 1));
                coin.bump();
                coin.use(lifespan(0.4, { fade: 0.01 }));
                scoreLabel.value++;
                scoreLabel.text = "x" + scoreLabel.value;
            } else if (obj.is("mushyBox")) {
                play("powerupAppears", { volume: 0.5 })
                level.spawn("M", obj.gridPos.sub(0, 1));
            } else if (obj.is("lifeMushyBox")) {
                play("powerupAppears", { volume: 0.5 })
                level.spawn("L", obj.gridPos.sub(0, 1));
            } else if (obj.is("flowerBox")) {
                play("powerupAppears", { volume: 0.5 })
                level.spawn("F", obj.gridPos.sub(0, 1));
            }

            var pos = obj.gridPos;
            destroy(obj);
            var box = level.spawn("!", pos);
            box.bump();
        } else if (obj.is("brick")) {
            if (player.isBig) {
                obj.destroy();
                play("brick", { volume: 0.5 });
            }

        }
    });
});