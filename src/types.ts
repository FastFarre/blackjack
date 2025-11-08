export class Card {
    suit: string;
    value: number;
    
    constructor(suit: string, value: number) {
        this.suit = suit;
        this.value = value > 10 ? 10 : value;
    }

    getValue(currentHandTotal: number): number {
        if (this.value === 1) {  // Ace
            return currentHandTotal + 11 <= 21 ? 11 : 1;
        }
        return Number(this.value);
    }
}

export enum Winner {
    PLAYER,
    PUSH,
    DEALER
}

export const values = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

export const suits = ["Spades", "Clubs", "Hearts", "Diamonds"];