import {Game} from "./game.js";
const canvas = document.querySelector("#gameCanvas") as HTMLCanvasElement;
const standBtn = document.querySelector("#standBtn")!;
const hitBtn = document.querySelector("#hitBtn")!;
const splitBtn = document.querySelector("#splitBtn")!;
const resetBtn = document.getElementById("resetBtn")!;

const game = new Game(canvas);

let currentHand = 0;

standBtn.addEventListener("click", () => {
    game.standPlayer(currentHand);
    currentHand++;
    
});

hitBtn.addEventListener("click", () => {
    game.hitPlayer(currentHand);
});


resetBtn.onclick = () => {
    game.reset(canvas);
};