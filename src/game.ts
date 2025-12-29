import { Renderer } from "./renderer.js";
import { Card, suits, Winner, values } from "./types.js";

export class Game {

    deck: Card[] = [];
    playerHand: Card[] = [];
    dealerHand: Card[] = [];
    _winner: Winner | null = null;
    renderer!: Renderer;
    constructor(canvas: HTMLCanvasElement) {
        this.init(canvas)
    }

    init(canvas: HTMLCanvasElement) {
        this.renderer = new Renderer(canvas);
        this.renderer.reset();
        this.deck = this.shuffleDeck(this.createDeck());
        this.playerHand = [new Card("Spades", 10, "T"), new Card("Spades", 10, "T")];
        this.dealerHand = [this.deck.pop()!, this.deck.pop()!];
        this.renderer.drawPlayerHand(this.playerHand, 30, 30);
        this.renderer.drawDealerHand(this.dealerHand, 200, 30, true);
        this._winner = null;
    }

    get winner() {
        return this.winner;
    }

    set winner(newValue: Winner | null) {
        this._winner = newValue;
        this.onWinnerChanged(newValue);
    }

    private onWinnerChanged(newValue: Winner | null) {
        if (newValue != null) {
            this.renderer.drawWinner(newValue);
        }
    }
    createDeck(): Card[] {
        const deck: Card[] = [];
        for (let j = 0; j < suits.length; j++) {
            const suit = suits[j]!;
            for (let i = 1; i < values.length + 1; i++) {
                deck.push(new Card(suit, i, values[i-1]!));
            }
        }
        return deck;
    }

    shuffleDeck(array: Card[]): Card[] {
        let currentIndex = array.length;
        while (currentIndex !== 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex]!, array[randomIndex]!] = [array[randomIndex]!, array[currentIndex]!];
        }
        return array;
    }

    sumOfHand(array: Card[]): number {
        return array.reduce((acc, val) => acc + val.getValue(acc), 0);
    }

    drawDealer() {
        this.renderer.drawDealerHand(this.dealerHand, 200, 30, false);
        while (this.sumOfHand(this.dealerHand) < 17) {
            this.dealerHand.push(this.deck.pop()!);
            this.renderer.drawDealerHand(this.dealerHand, 200, 30, false);
        }
        this.checkWinner();
    }

    hitPlayer() {
        this.playerHand.push(this.deck.pop()!);
        this.renderer.drawPlayerHand(this.playerHand, 30, 30);
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
            [() => dealerSum >= 17 && playerSum > dealerSum, Winner.PLAYER],
            [() => dealerSum >= 17 && dealerSum > playerSum, Winner.DEALER],
            [() => dealerSum >= 17 && playerSum === dealerSum, Winner.PUSH],
        ];

        const match = rules.find((rule) => rule[0]());
        this.winner = match ? match[1] : null;
    }

    // Only check conditions for player since dealer still has one card hidden
    checkPlayerWon() {
        const sum = this.sumOfHand(this.playerHand);
        if (sum > 21) {
            this.winner = Winner.DEALER;
        }
        if (sum == 21 && this.playerHand.length == 2) {
            this.winner = Winner.PLAYER;
        }
    }

    reset(canvas: HTMLCanvasElement) {
        this.init(canvas);
    }
}



