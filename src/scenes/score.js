// Function For Setting Score Screen
export const score = ({ city_sfx, ctx }) => {
    // Pause The City Background Sound Effect
    city_sfx.paused = true;

    // Calculate Current and Best Rank From Current and Best Score
    const rank_grades = ["F", "E", "D", "C", "B", "A", "S"];
    const rank_values = [50, 80, 100, 200, 300, 400, 500];

    let best_score = ctx.getData("best_score");
    const current_score = ctx.getData("current_score");
    let current_rank = "F";
    let best_rank = "F";

    for (let i = 0; i < rank_values.length; i++) {
        if (rank_values[i] < current_score) {
            current_rank = rank_grades[i];
        }

        if (rank_values[i] < best_score) {
            best_rank = rank_grades[i];
        }
    }

    if (best_score < current_score) {
        ctx.setData("best_score", current_score);
        best_score = current_score;
        best_rank = current_rank;
    }

    // Set Game Over Scene and Display Current and Best Score with Current and Best Rank
    ctx.add([
        ctx.text("GAME OVER", { font: "mania", size: 96 }),
        ctx.anchor("center"),
        ctx.pos(ctx.center().x, ctx.center().y - 300)
    ]);
    ctx.add([
        ctx.text(`BEST SCORE : ${best_score}`, { font: "mania", size: 64 }),
        ctx.anchor("center"),
        ctx.pos(ctx.center().x - 400, ctx.center().y - 200)
    ]);
    ctx.add([
        ctx.text(`CURRENT SCORE : ${current_score}`, { font: "mania", size: 64 }),
        ctx.anchor("center"),
        ctx.pos(ctx.center().x + 400, ctx.center().y - 200)
    ]);

    // Setup Best Rank Box
    const best_rank_box = ctx.add([
        ctx.rect(200, 200, { radius: 4 }),
        ctx.color(0, 0, 0),
        ctx.area(),
        ctx.anchor("center"),
        ctx.outline(6, ctx.Color.fromArray([255, 255, 255])),
        ctx.pos(ctx.center().x - 400, ctx.center().y + 50)
    ]);

    // Add Best Rank in Best Rank Box
    best_rank_box.add([
        ctx.text(best_rank, { font: "mania", size: 100 }),
        ctx.anchor("center")
    ]);

    // Setup Current Rank Box
    const current_rank_box = ctx.add([
        ctx.rect(200, 200, { radius: 4 }),
        ctx.color(0, 0, 0),
        ctx.area(),
        ctx.anchor("center"),
        ctx.outline(6, ctx.Color.fromArray([255, 255, 255])),
        ctx.pos(ctx.center().x + 400, ctx.center().y + 50)
    ]);

    // Add Current Rank in Current Rank Box
    current_rank_box.add([
        ctx.text(current_rank, { font: "mania", size: 100 }),
        ctx.anchor("center")
    ]);

    // Wait One Second and Add Game Scene Restart UI and Restart Game on Button Press
    ctx.wait(1, () => {
        ctx.add([
            ctx.text("Press Space/Click/Touch to Play Again", { font: "mania", size: 64 }),
            ctx.anchor("center"),
            ctx.pos(ctx.center().x, ctx.center().y + 350)
        ]);
        ctx.onButtonPress("jump", () => ctx.go("game", { ctx }));
    });
}
