import { Renderer } from "./renderer.js";
import { Card, suits, Winner, values, Hand } from "./types.js";

const dealerId: number = 0
export class Game {
    deck: Card[] = [];
    playerHands: Hand[] = [];
    dealerHand: Hand = new Hand(0, []);
    _winner: Winner | null = null;
    renderer!: Renderer;
    constructor(canvas: HTMLCanvasElement) {
        this.init(canvas)
    }

    init(canvas: HTMLCanvasElement) {
        this.renderer = new Renderer(canvas);
        this.renderer.reset();
        this.deck = this.shuffleDeck(this.createDeck());
        this.playerHands = [];
        // FOR TESTING
        this.playerHands.push(new Hand(this.playerHands.length, [new Card("Hearts", 4, "4"), new Card("Diamonds", 4, "4")]));
        // this.playerHands.push(new Hand(this.playerHands.length, [this.deck.pop()!, this.deck.pop()!]));
        this.dealerHand = new Hand(dealerId, [this.deck.pop()!, this.deck.pop()!]);
        this.renderer.renderPlayerHands(this.playerHands);
        this.renderer.renderDealerHand(this.dealerHand, true);
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

    sumOfHand(hand: Hand): number {
        return hand.cards.reduce((acc, val) => acc + val.getValue(acc), 0);
    }

    drawDealer() {
        this.renderer.renderDealerHand(this.dealerHand, false);
        while (this.sumOfHand(this.dealerHand) < 17) {
            this.dealerHand.cards.push(this.deck.pop()!);
            this.renderer.renderDealerHand(this.dealerHand, false);
        }
        for (let i = 0; i < this.playerHands.length; i++) {
            this.checkWinner(i);
        }
    }

    hitPlayer(id: number) {
        const hand = this.playerHands[id]!;
        hand.cards.push(this.deck.pop()!)
        this.checkPlayerWon(id);
        this.renderer.renderPlayerHands(this.playerHands);
    }

    standPlayer(id: number) {
        const hand = this.playerHands[id];
        if (hand) {
            hand.done = true;
        }
        if (id === this.playerHands.length - 1) {
            this.drawDealer();
        }
    }

    splitHand(id: number) {
        let currentHand: Hand = this.playerHands[id]!;
        if (currentHand.cards.length === 2 && currentHand.cards[0]?.stringValue === currentHand.cards[0]?.stringValue) {
            const card = currentHand.cards.pop()!
            this.playerHands.splice(id, 0, new Hand(id + 1, [card]));
            this.renderer.renderPlayerHands(this.playerHands);
        }
    }

    checkWinner(id: number) {
        const playerHand = this.playerHands[id]!
        const playerSum = this.sumOfHand(playerHand);
        const dealerSum = this.sumOfHand(this.dealerHand);

        const rules: [() => boolean, Winner][] = [
            // busts
            [() => playerSum > 21, Winner.DEALER],
            [() => dealerSum > 21, Winner.PLAYER],
            // blackjacks
            [() => playerSum === 21 && playerHand.cards.length === 2, Winner.PLAYER],
            [() => dealerSum === 21 && this.dealerHand.cards.length === 2, Winner.DEALER],
            // both finished: compare
            [() => dealerSum >= 17 && playerSum > dealerSum, Winner.PLAYER],
            [() => dealerSum >= 17 && dealerSum > playerSum, Winner.DEALER],
            [() => dealerSum >= 17 && playerSum === dealerSum, Winner.PUSH],
        ];

        const match = rules.find((rule) => rule[0]());
        const winner = match ? match[1] : null;
        playerHand.winner = winner;
        
        if (winner !== null) {
            this.renderer.renderDealerHand(this.dealerHand, false);
            this.renderer.renderWinner(winner, id);
        }
    }

    // Only check conditions for player since dealer still has one card hidden
    checkPlayerWon(id: number) {
        const playerHand = this.playerHands[id]!
        const sum = this.sumOfHand(playerHand);
        if (sum > 21) {
            playerHand.winner = Winner.DEALER;
        }
        if (sum === 21 && playerHand.cards.length === 2) {
            playerHand.winner = Winner.PLAYER;
        }
        if (playerHand.winner !== null) {
            this.renderer.renderWinner(playerHand.winner, id);
        }
    }

    reset(canvas: HTMLCanvasElement) {
        this.init(canvas);
    }
}



