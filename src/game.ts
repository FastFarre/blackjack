import { Renderer } from "./renderer.js";
import { Card, suits, Winner, values } from "./types.js";

export class Game {

    deck: Card[];
    playerHand: Card[];
    dealerHand: Card[];
    winner: Winner | null;
    renderer: Renderer;
    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new Renderer(canvas);
        this.deck = this.shuffleDeck(this.createDeck());
        this.playerHand = [this.deck.pop()!, this.deck.pop()!];
        this.renderer.drawCard(this.playerHand[0] as Card, 10, 10);
        this.renderer.drawCard(this.playerHand[1] as Card, 100, 10);
        this.dealerHand = [this.deck.pop()!, this.deck.pop()!];
        this.winner = null;
    }

    createDeck(): Card[] {
        const deck: Card[] = [];
        for (let j = 0; j < suits.length; j++) {
            const suit = suits[j]!;
            for (let i = 1; i < values.length + 1; i++) {
                deck.push(new Card(suit, i));
            }
        }
        return deck;
    }

    shuffleDeck(array: Card[]): Card[] {
        let currentIndex = array.length;
        while (currentIndex !== 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // Swap
            [array[currentIndex]!, array[randomIndex]!] = [array[randomIndex]!, array[currentIndex]!];
        }
        return array;
    }

    sumOfHand(array: Card[]): number {
        return array.reduce((acc, val) => acc + val.getValue(acc), 0);
    }

    drawDealer() {
        while (this.sumOfHand(this.dealerHand) < 17) {
            this.dealerHand.push(this.deck.pop()!);
        }
    }

    hitPlayer() {
        this.playerHand.push(this.deck.pop()!);
    }

    checkWinner() {
        const playerSum = this.sumOfHand(this.playerHand);
        const dealerSum = this.sumOfHand(this.dealerHand);

        const rules: [() => boolean, Winner][] = [
            // busts
            [() => playerSum > 21, Winner.DEALER],
            [() => dealerSum > 21, Winner.PLAYER],
            // blackjacks
            [() => playerSum === 21 && this.playerHand.length === 2, Winner.PLAYER],
            [() => dealerSum === 21 && this.dealerHand.length === 2, Winner.DEALER],
            // both finished: compare
            [() => playerSum >= 17 && dealerSum >= 17 && playerSum > dealerSum, Winner.PLAYER],
            [() => playerSum >= 17 && dealerSum >= 17 && dealerSum > playerSum, Winner.DEALER],
            [() => playerSum >= 17 && dealerSum >= 17 && playerSum === dealerSum, Winner.PUSH],
        ];

        const match = rules.find((rule) => rule[0]());
        this.winner = match ? match[1] : null;
        
        if (this.winner != null) {
            alert(Winner[this.winner]);
        }
    }
}



