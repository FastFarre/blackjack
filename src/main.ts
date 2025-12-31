import {Game} from "./game.js";
const canvas = document.querySelector("#gameCanvas") as HTMLCanvasElement;
const standBtn = document.querySelector("#standBtn")!;
const hitBtn = document.querySelector("#hitBtn");
const resetBtn = document.getElementById("resetBtn")!;

const game = new Game(canvas);

let currentHand = 0;

standBtn.addEventListener("click", () => {
    game.standPlayer(currentHand);
    currentHand++;
    
});

resetBtn.onclick = () => {
    game.reset(canvas);
}