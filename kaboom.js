import kaboom from './kaboom.mjs';

// Configurations globales
export const k = kaboom({
    
    fullscreen: true,
    scale: 2,
});

// Chargement des sprites
loadRoot('./assets/');
loadAseprite("mario", "sprites/Mario.png", "sprites/Mario.json");
loadAseprite("enemies", "sprites/enemies.png", "sprites/enemies.json");
loadSprite("ground", "sprites/ground.png");
loadSprite("questionBox", "sprites/questionBox.png");
loadSprite("emptyBox", "sprites/emptyBox.png");
loadSprite("brick", "sprites/brick.png");
loadSprite("coin", "sprites/coin.png");
loadSprite("bigMushy", "sprites/bigMushy.png");
loadSprite("lifeMushy", "sprites/lifeMushy.png");
loadSprite("marioLife", "sprites/marioLife.png");
loadSprite("flower", "sprites/flower.png");
loadSprite("fireball", "sprites/fireball.png");
loadSprite("pipeTop", "sprites/pipeTop.png");
loadSprite("pipeBottom", "sprites/pipeBottom.png");
loadSprite("shrubbery", "sprites/shrubbery.png");
loadSprite("hill", "sprites/hill.png");
loadSprite("cloud", "sprites/cloud.png");
loadSprite("castle", "sprites/castle.png");

loadSound("jumpSmall", "sounds/jumpSmall.wav");
loadSound("jumpBig", "sounds/jumpBig.mp3");
loadSound("gameover", "sounds/gameover.wav");
loadSound("coin", "sounds/coin.wav");
loadSound("marioDies", "sounds/marioDies.wav");
loadSound("oneUp", "sounds/oneUp.wav");
loadSound("pause", "sounds/pause.wav");
loadSound("powerup", "sounds/powerup.wav");
loadSound("powerupAppears", "sounds/powerupAppears.wav");
loadSound("stageClear", "sounds/stageClear.wav");
loadSound("pipe", "sounds/pipe.wav");
loadSound("goombaStomp", "sounds/goombaStomp.mp3");
loadSound("brick", "sounds/brick.mp3");

loadSound("theme", "musics/theme.mp3");

export default k