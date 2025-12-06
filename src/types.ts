export class Card {
    suit: string;
    value: number;
    stringValue: string;
    constructor(suit: string, value: number, stringValue: string) {
        this.suit = suit;
        this.value = value > 10 ? 10 : value;
        this.stringValue = stringValue;
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

export const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];

export const suits = ["Spades", "Clubs", "Hearts", "Diamonds"];