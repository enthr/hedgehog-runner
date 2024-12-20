import { make_hedgehog } from "../entities/hedgehog.js";
import { make_motobug } from "../entities/motobug.js";
import { make_ring } from "../entities/ring.js";

// Function For Setting Game Screen
export const game = ({ ctx }) => {
    // Plat City Background Sound Effect
    const city_sfx = ctx.play("city", { volume: 0.1, loop: true });

    // Configure & Set The Background on Game
    const background_width = 1920;
    const background_pieces = [
        ctx.add([
            ctx.sprite("background"),
            ctx.pos(0, 0),
            ctx.scale(1),
            ctx.opacity(0.8)
        ]),
        ctx.add([
            ctx.sprite("background"),
            ctx.pos(background_width, 0),
            ctx.scale(1),
            ctx.opacity(0.8)
        ])
    ];

    // Configure & Set The Platform on Game
    const platform_width = 1280;
    const platform_position = 210;
    const platform_pieces = [
        ctx.add([
            ctx.sprite("platform"),
            ctx.pos(0, platform_position),
            ctx.scale(4),
            ctx.opacity(1)
        ]),
        ctx.add([
            ctx.sprite("platform"),
            ctx.pos(platform_width * 4, platform_position),
            ctx.scale(4),
            ctx.opacity(1)
        ])
    ];

    // Configure Platform Speed
    let gameSpeed = 320;
    ctx.loop(2, function () {
        gameSpeed = gameSpeed + 25;
    });

    // Game Score, Multiplier Counter, Score Collect UI
    let score = 0, score_multiplier = 0;

    const score_text = ctx.add([
        ctx.text(`SCORE : 0`, { font: "mania", size: 64 }),
        ctx.pos(20, 20)
    ]);

    // Set Gravity For Hedgehog
    ctx.setGravity(3000);

    // Set Hedgehog and Collide Win-Lose Logic For Enemy and Ring on Game
    const hedgehog = make_hedgehog(ctx.vec2(240, 510), ctx);
    hedgehog.set_controls();
    hedgehog.set_events();
    hedgehog.onCollide("enemy", (enemy) => {
        if (!hedgehog.isGrounded()) {
            ctx.play("destroy", { volume: 0.2 });
            ctx.play("hyperring", { volume: 0.2 });
            ctx.destroy(enemy);
            hedgehog.play("jump");
            hedgehog.jump();
            score_multiplier = score_multiplier + 1;
            score = score + (score_multiplier * 10);
            score_text.text = `SCORE : ${score}`;
            hedgehog.ring_collect_ui.text = `+${score_multiplier * 10}`;
            ctx.wait(1, () => { 
                hedgehog.ring_collect_ui.text = "";
            });
            return;
        }
        ctx.play("hurt", { volume: 0.2 });
        ctx.setData("current_score", score);
        ctx.go("score", { city_sfx, ctx });
    });
    hedgehog.onCollide("ring", (ring) => {
        ctx.play("ring", { volume: 0.2 });
        ctx.destroy(ring);
        score = score + 1;
        score_text.text = `SCORE : ${score}`;
        hedgehog.ring_collect_ui.text = `+1`;
        ctx.wait(1, () => { 
            hedgehog.ring_collect_ui.text = "";
        });
    });

    // Set Enemy With Infinite Spawing and Destruction
    const spawn_motobug = () => {
        const motobug = make_motobug(ctx.vec2(1950, 530), ctx);
        motobug.onUpdate(() => {
            motobug.move(-gameSpeed, 0);
        });

        motobug.onExitScreen(() => {
            if (motobug.pos.x < 0) {
                ctx.destroy(motobug);
            }
        });

        const wait_time = ctx.rand(0.5, 2.5);
        ctx.wait(wait_time, spawn_motobug);
    };
    spawn_motobug();

    // Set Ring With Infinite Spawing and Destruction
    const spawn_ring = () => {
        const ring = make_ring(ctx.vec2(1950, 530), ctx);
        ring.onUpdate(() => {
            ring.move(-gameSpeed, 0);
        });

        ring.onExitScreen(() => {
            if (ring.pos.x < 0) {
                ctx.destroy(ring);
            }
        });

        const wait_time = ctx.rand(1, 3);
        ctx.wait(wait_time, spawn_ring);
    };
    spawn_ring();

    // Configure Platform Rectangle For Game Mechanic
    ctx.add([
        ctx.rect(1920, 260),
        ctx.pos(0, 590),
        ctx.opacity(0),
        ctx.area(),
        ctx.body({ isStatic: true })
    ]);

    // Update Function Runs For Every Frame
    ctx.onUpdate(function () {
        // Reset Score Multiplier When Hit The Ground
        if (hedgehog.isGrounded()) {
            score_multiplier = 0;
        }

        // Infinite Scroll For Background
        if (background_pieces[1].pos.x < 0) {
            background_pieces[0].moveTo(background_pieces[1].pos.x + background_width, 0);
            background_pieces.push(background_pieces.shift());
        }
        background_pieces[0].move(-240, 0);
        background_pieces[1].moveTo(background_pieces[0].pos.x + background_width, 0);

        // Move Background For Jump Effect
        background_pieces[0].moveTo(background_pieces[0].pos.x, -(hedgehog.pos.y / 50));
        background_pieces[1].moveTo(background_pieces[1].pos.x, -(hedgehog.pos.y / 50));

        // Infinite Scroll For Platform
        if (platform_pieces[1].pos.x < 0) {
            platform_pieces[0].moveTo(platform_pieces[1].pos.x + platform_width * 4, platform_position);
            platform_pieces.push(platform_pieces.shift());
        }
        platform_pieces[0].move(-gameSpeed, 0);
        platform_pieces[1].moveTo(platform_pieces[0].pos.x + platform_width * 4, platform_position);
    });
}
