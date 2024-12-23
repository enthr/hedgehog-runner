import kaplay from "kaplay";

// Function For Setting Up and Configuring Kaplay Context
export const ctx = kaplay({
    width: 1920,
    height: 1080,
    canvas: document.getElementById("app"),
    letterbox: true,
    background: [0, 0, 0],
    global: false,
    touchToMouse: true,
    buttons: {
        jump: {
            keyboard: ["space"],
            mouse: ["left"],
        }
    },
    debugKey: "d",
    debug: false
});