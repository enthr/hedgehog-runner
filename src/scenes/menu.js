import { make_hedgehog } from "../entities/hedgehog.js";

// Function For Setting Menu Screen
export const menu = ({ ctx }) => {
    // If No Best Score Set It To Zero
    if(!ctx.getData("best_score")) {
        ctx.setData("best_score", 0);
    }

    // On Button Press Start The Game
    ctx.onButtonPress("jump", function() {
        ctx.go("game", { ctx });
    });

    // Configure & Set The Background on Menu
    const background_width = 1920;
    const background_pieces = [
        ctx.add([ ctx.sprite("background"), ctx.pos(0, 0), ctx.scale(1), ctx.opacity(0.8) ]),
        ctx.add([ ctx.sprite("background"), ctx.pos(background_width, 0), ctx.scale(1), ctx.opacity(0.8) ])
    ];

    // Configure & Set The Platform on Menu
    const platform_width = 1280;
    const platform_position = 210;
    const platform_pieces = [
        ctx.add([ ctx.sprite("platform"), ctx.pos(0, platform_position), ctx.scale(4), ctx.opacity(1) ]),
        ctx.add([ ctx.sprite("platform"), ctx.pos(platform_width * 4, platform_position), ctx.scale(4), ctx.opacity(1) ])
    ];

    // Configure & Set Title and Play Info on Menu
    ctx.add([
        ctx.text("HEDGEHOG RUNNER", { font: "mania", size: 96 }),
        ctx.pos(ctx.center().x, 180),
        ctx.anchor("center")
    ]);
    ctx.add([
        ctx.text("Press Space/Touch/Click To Play", { font: "mania", size: 32 }),
        ctx.pos(ctx.center().x, 250),
        ctx.anchor("center")
    ]);

    // Set Hedgehog on Menu
    make_hedgehog(ctx.vec2(240, 510), ctx);

    // Create Infinite Scroll
    ctx.onUpdate(function() {
        // Infinite Scroll For Background
        if(background_pieces[1].pos.x < 0) {
            background_pieces[0].moveTo(background_pieces[1].pos.x + background_width, 0);
            background_pieces.push(background_pieces.shift());
        }
        background_pieces[0].move(-240, 0);
        background_pieces[1].moveTo(background_pieces[0].pos.x + background_width, 0);

        // Infinite Scroll For Platform
        if(platform_pieces[1].pos.x < 0) {
            platform_pieces[0].moveTo(platform_pieces[1].pos.x + (platform_width * 4), platform_position);
            platform_pieces.push(platform_pieces.shift());
        }
        platform_pieces[0].move(-320, 0);
        platform_pieces[1].moveTo(platform_pieces[0].pos.x + (platform_width * 4), platform_position);
    });
}