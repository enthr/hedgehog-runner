import { ctx } from "./kaplay_ctx.js";
import { menu } from "./scenes/menu.js";
import { game } from "./scenes/game.js";
import { score } from "./scenes/score.js";
import { sprite_background, sprite_platform, sprite_hedgehog, sprite_ring, sprite_motobug, font_mania, sound_city, sound_destroy, sound_hurt, sound_hyperring, sound_jump, sound_ring } from "./assets.js";

// Load Game Graphics Sprites/Assets and Configure Animations
ctx.loadSprite("background", sprite_background);
ctx.loadSprite("platform", sprite_platform);
ctx.loadSprite("hedgehog", sprite_hedgehog, {
    sliceX: 8,
    sliceY: 2,
    anims: {
        run: { from: 0, to: 7, loop: true, speed: 40 },
        jump: { from: 8, to: 15, loop: true, speed: 80 }
    }
});
ctx.loadSprite("ring", sprite_ring, {
    sliceX: 16,
    sliceY: 1,
    anims: {
        spin: { from: 0, to: 15, loop: true, speed: 32 }
    }
});
ctx.loadSprite("motobug", sprite_motobug, {
    sliceX: 5,
    sliceY: 1,
    anims: {
        run: { from: 0, to: 4, loop: true, speed: 5 }   
    }
});

// Load Game Fonts
ctx.loadFont("mania", font_mania);

// Load Game Sounds
ctx.loadSound("city", sound_city);
ctx.loadSound("destroy", sound_destroy);
ctx.loadSound("hurt", sound_hurt);
ctx.loadSound("hyperring", sound_hyperring);
ctx.loadSound("jump", sound_jump);
ctx.loadSound("ring", sound_ring);

// Game Scenes
ctx.scene("menu", menu);
ctx.scene("game", game);
ctx.scene("score", score);

// Setting Default Game Scene - Menu
ctx.go("menu", { ctx });