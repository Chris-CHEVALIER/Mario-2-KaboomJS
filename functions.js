export function patrol(speed = 50, dir = 1) {
    return {
        id: "patrol",
        require: ["pos", "area",],
        startingPos: vec2(0, 0),
        add() {
            this.startingPos = this.pos;
            this.on("collide", (obj, side) => {
                if (!obj.is("ground") && !obj.is("brick") && !obj.is("mushyBox") && !obj.is("coinBox")) {
                    if (side.isLeft() || side.isRight()) {
                        dir = -dir;
                    }
                }
            });
        },
        update() {
            if (Math.abs(this.pos.x - this.startingPos.x) >= 9999999) {
                dir = -dir;
            }
            this.move(speed * dir, 0);
        },
    };
}

export function enemy() {
    return {
        id: "enemy",
        require: ["pos", "area", "sprite", "patrol"],
        isAlive: true,
        update() {

        },
        squash() {
            this.isAlive = false;
            this.unuse("patrol");
            this.stop();
            this.frame = 2;
            this.area.width = 16;
            this.area.height = 8;
            this.use(lifespan(0.5, { fade: 0.1 }));
        },
        toShell() {
            this.unuse("patrol");
            this.stop();
            this.frame = 5;
            this.area.width = 16;
            this.area.height = 8;
            //this.use(lifespan(0.5, { fade: 0.1 }));
        }
    }
}

export function bump(offset = 4, speed = 2, stopAtOrigin = true) {
    return {
        id: "bump",
        require: ["pos"],
        bumpOffset: offset,
        speed: speed,
        bumped: false,
        origPos: 0,
        direction: -1,
        update() {
            if (this.bumped) {
                this.pos.y = this.pos.y + this.direction * this.speed;
                if (this.pos.y < this.origPos - this.bumpOffset) {
                    this.direction = 1;
                }
                if (stopAtOrigin && this.pos.y >= this.origPos) {
                    this.bumped = false;
                    this.pos.y = this.origPos;
                    this.direction = -1;
                }
            }
        },
        bump() {
            this.bumped = true;
            this.origPos = this.pos.y;
        }
    };
}

export function mario() {
    return {
        id: "mario",
        require: ["body", "area", "sprite", "bump"],
        smallAnimation: "Running",
        bigAnimation: "RunningBig",
        flamingAnimation: "RunningFlame",
        smallStopFrame: 0,
        bigStopFrame: 8,
        flamingStopFrame: 17,
        smallJumpFrame: 5,
        bigJumpFrame: 13,
        flamingJumpFrame: 22,
        isBig: false,
        isFlaming: false,
        isFrozen: false,
        isAlive: true,
        isDown: false,
        speed: 120,
        update() {
            if (this.isFrozen) {
                this.standing();
                return;
            }
            if (!this.isGrounded()) {
                this.jumping();
            }
            else {
                if (isKeyDown("left") || isKeyDown("right")) {
                    this.running();
                } else {
                    this.standing();
                }
            }
        },
        bigger() {
            this.isBig = true;
            this.area.width = 24;
            this.area.height = 32;
        },
        flaming() {
            this.isBig = true;
            this.isFlaming = true;
            this.area.width = 24;
            this.area.height = 32;
        },
        smaller() {
            this.isBig = false;
            this.area.width = 16;
            this.area.height = 16;
        },
        standing() {
            this.stop();
            this.frame = this.isBig ? this.isFlaming ? this.flamingStopFrame : this.bigStopFrame : this.smallStopFrame;
        },
        jumping() {
            this.stop();
            this.frame = this.isBig ? this.isFlaming ? this.flamingJumpFrame : this.bigJumpFrame : this.smallJumpFrame;
        },
        running() {
            const animation = this.isBig ? this.isFlaming ? this.flamingAnimation : this.bigAnimation : this.smallAnimation;
            if (this.curAnim() !== animation) {
                this.play(animation);
            }
        },
        freeze() {
            this.isFrozen = true;
        },
        die() {
            this.unuse("body");
            this.freeze();
            wait(0.8, () => {
                this.bump();
            });
            this.isAlive = false;
            //this.use(lifespan(1, { fade: 1 }));
        }
    }
}

export function killed(player) {
    if (player.isAlive == false) return;
    player.die();
    add([
        text("Game Over", { size: 24 }),
        pos(toWorld(vec2(160, 120))),
        color(255, 255, 255),
        origin("center"),
        layer('ui'),
    ]);
    wait(2, () => {
        go("start");
    })
}