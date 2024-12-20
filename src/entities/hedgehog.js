export const make_hedgehog = (position, ctx) => {
    // Configure Hedgehog Sprite
    const hedgehog = ctx.add([
        ctx.sprite("hedgehog", { anim: "run" }),
        ctx.scale(4),
        ctx.area(),
        ctx.anchor("center"),
        ctx.pos(position),
        ctx.body({ jumpForce: 1500 }),
        {
            ring_collect_ui: null,
            set_controls() {
                ctx.onButtonPress("jump", () => {
                    if (this.isGrounded()) {
                        this.play("jump");
                        this.jump();
                        ctx.play("jump", { volume: 0.2 });
                    }
                });
            },
            set_events() {
                this.onGround(() => {
                    this.play("run");
                });
            }
        }
    ]);

    // Configure UI To Display When Score Added
    hedgehog.ring_collect_ui = hedgehog.add([
        ctx.text("", { font: "mania", size: 24 }),
        ctx.color(255, 255, 0),
        ctx.anchor("center"),
        ctx.outline(6, ctx.Color.fromArray([0, 0, 0])),
        ctx.pos(30, -10)
    ]);

    return hedgehog;
};
