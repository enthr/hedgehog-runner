import kaplay from "kaplay";

kaplay({
    width: 1920,
    height: 1080,
    canvas: document.querySelector("#app"),
    letterbox: true,
    background: [0, 0, 0]
});