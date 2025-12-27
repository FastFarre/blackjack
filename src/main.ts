import {Game} from "./game.js";
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const standBtn = document.getElementById("standBtn")!;
const hitBtn = document.getElementById("hitBtn")!;

const game = new Game(canvas);
console.log(game.playerHand);
console.log(game.dealerHand);
standBtn.onclick = () => {    
    game.drawDealer();
    game.checkWinner();
};

//TODO: alleen kijken vr speler blackjack en bust
hitBtn.onclick = () => {
    game.hitPlayer();
    game.checkWinner();
}

standBtn.onclick = () => {
    game.checkWinner();
    game.drawDealer();
}