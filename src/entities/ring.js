export const make_ring = (position, ctx) => {
    // Configure Ring Sprite
    return ctx.add([
        ctx.sprite("ring", { anim: "spin" }),
        ctx.area(),
        ctx.scale(4),
        ctx.anchor("center"),
        ctx.pos(position),
        ctx.offscreen(),
        "ring"
    ]);
}