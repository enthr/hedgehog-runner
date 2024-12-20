export const make_motobug = (position, ctx) => {
    // Configure Motobug Sprite
    return ctx.add([
        ctx.sprite("motobug", { anim: "run" }),
        ctx.area({ shape: new ctx.Rect(ctx.vec2(-5, 0), 32, 32) }),
        ctx.scale(4),
        ctx.anchor("center"),
        ctx.pos(position),
        ctx.offscreen(),
        "enemy"
    ]);
}