import { patrol, enemy, bump, mario } from "./functions.js";

// Cartes des niveaux
export const LEVELS = [
    [
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "=                                                                                                ",
        "=                                                                                                ",
        "=                                                                                                ",
        "=                                                                                                ",
        "=                                                                                                ",
        "=                                                                                                ",
        "=                                                                                                ",
        "=               l                                                                                ",
        "=                                                                                                ",
        "=                                                                                                ",
        "=                                                                                                ",
        "=         ?   -b-?-        f                                                                     ",
        "=                                                                                                ",
        "=                               _                                                                ",
        "=                      g        |              k                                                 ",
        "================================================================================================",
        "================================================================================================",
    ],
    [
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "      -?-b-                                                                                     ",
        "                                                         ?    ?     c  c  c                     ",
        "                                      c                                                         ",
        "   c                             c    _                                                         ",
        "                           c     _    |                                                         ",
        "                           _     |    |                _                                        ",
        "       E                   |     |    |       E        |                            H           ",
        "================================================================================================",
        "================================================================================================",
    ],
    [
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                       ?                                                     ",
        "                                                                                             ",
        "                                   -?-                                                       ",
        "                                                                                             ",
        "      -?-b-                  -?-                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "       _                                            _                                        ",
        "       |                                            |          E    E            H           ",
        "================     ========================================================================",
        "================     ========================================================================",
    ]
];

export const levelConf = {
    // grid size
    width: 16,
    height: 16,
    pos: vec2(0, 0),
    // define each object as a list of components
    "=": () => [
        sprite("ground"),
        area(),
        solid(),
        origin("bot"),
        "ground"
    ],
    "-": () => [
        sprite("brick"),
        area(),
        solid(),
        origin("bot"),
        "brick"
    ],
    "H": () => [
        sprite("castle"),
        area({ width: 1, height: 240 }),
        origin("bot"),
        "castle"
    ],
    "?": () => [
        sprite("questionBox"),
        area(),
        solid(),
        origin("bot"),
        'questionBox',
        'coinBox'
    ],
    "b": () => [
        sprite("questionBox"),
        area(),
        solid(),
        origin("bot"),
        'questionBox',
        'mushyBox'
    ],
    "l": () => [
        sprite("questionBox"),
        area(),
        solid(),
        origin("bot"),
        'questionBox',
        'lifeMushyBox'
    ],
    "f": () => [
        sprite("questionBox"),
        area(),
        solid(),
        origin("bot"),
        'questionBox',
        'flowerBox'
    ],
    "!": () => [
        sprite("emptyBox"),
        area(),
        solid(),
        bump(),
        origin("bot"),
        'emptyBox'
    ],
    "c": () => [
        sprite("coin"),
        area(),
        //solid(),
        bump(64, 8),
        cleanup(),
        //lifespan(0.4, { fade: 0.01 }),
        origin("bot"),
        "coin"
    ],
    "M": () => [
        sprite("bigMushy"),
        area(),
        solid(),
        patrol(),
        body(),
        cleanup(),
        origin("bot"),
        "bigMushy"
    ],
    "L": () => [
        sprite("lifeMushy"),
        area(),
        solid(),
        patrol(),
        body(),
        cleanup(),
        origin("bot"),
        "lifeMushy"
    ],
    "F": () => [
        sprite("flower"),
        area(),
        solid(),
        body(),
        cleanup(),
        origin("bot"),
        "flower"
    ],
    "*": () => [
        sprite("fireball"),
        area(),
        solid(),
        scale(0.09),
        forward(),
        body(),
        cleanup(),
        origin("bot"),
        "flower"
    ],
    "|": () => [
        sprite("pipeBottom"),
        area(),
        solid(),
        origin("bot"),
        "pipe"
    ],
    "_": () => [
        sprite("pipeTop"),
        area(),
        solid(),
        origin("bot"),
        "pipe"
    ],
    "g": () => [
        sprite("enemies", { anim: 'Walking' }),
        area({ width: 16, height: 16 }),
        solid(),
        body(),
        patrol(),
        enemy(),
        origin("bot"),
        "goomba"
    ],
    "k": () => [
        sprite("enemies", { anim: 'Walk' }),
        area({ width: 16, height: 16 }),
        solid(),
        body(),
        patrol(),
        enemy(),
        origin("bot"),
        "koopa"
    ],
    "p": () => [
        sprite("mario", { frame: 0 }),
        area({ width: 16, height: 16 }),
        body(),
        mario(),
        bump(150, 20, false),
        origin("bot"),
        "player"
    ]
}