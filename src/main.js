import { ctx } from "./kaplay_ctx.js";
import { menu } from "./scenes/menu.js";


// Load Game Graphics Sprites and Configure Animations
ctx.loadSprite("background", "graphics/chemical-bg.png");
ctx.loadSprite("platform", "graphics/platform.png");
ctx.loadSprite("hedgehog", "graphics/hedgehog.png", {
    sliceX: 8,
    sliceY: 2,
    anims: {
        run: { from: 0, to: 7, loop: true, speed: 60 },
        jump: { from: 8, to: 15, loop: true, speed: 60 }
    }
});
ctx.loadSprite("ring", "graphics/ring.png", {
    sliceX: 16,
    sliceY: 1,
    anims: {
        spin: { from: 0, to: 15, loop: true, speed: 60 }
    }
});
ctx.loadSprite("motobug", "graphics/motobug.png", {
    sliceX: 5,
    sliceY: 1,
    anims: {
        run: { from: 0, to: 4, loop: true, speed: 60 }   
    }
});


// Load Game Fonts
ctx.loadFont("mania", "fonts/mania.ttf");


// Load Game Sounds
ctx.loadSound("city", "sounds/city.mp3");
ctx.loadSound("destroy", "sounds/destroy.wav");
ctx.loadSound("hurt", "sounds/hurt.wav");
ctx.loadSound("hyperring", "sounds/hyperring.wav");
ctx.loadSound("jump", "sounds/jump.wav");
ctx.loadSound("ring", "sounds/ring.wav");


// Game Scenes
ctx.scene("menu", menu);
ctx.scene("game", () => {});
ctx.scene("score", () => {});

// Default Game Scene
ctx.go("menu");