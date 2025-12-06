import { Card } from "./types";

export class Renderer {
    ctx: CanvasRenderingContext2D;
    widthPadding: number = 5;
    heightPadding: number = 3;
    cardWidth: number = 70;
    cardHeight: number = 100;
    suits: Map<string, string> = new Map([["Spades", "♠"], ["Hearts", "♥"], ["Diamonds", "♦"], ["Clubs", "♣"]]);
    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!;
    }

    drawCard(card: Card, x: number, y: number) {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(x, y, this.cardWidth, this.cardHeight);
        this.ctx.font = "15px serif";
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "black";
        this.ctx.textBaseline = "top";
        this.ctx.fillText(card.stringValue + "", x + this.widthPadding, y + this.heightPadding);
        this.ctx.fillText(this.suits.get(card.suit)!, x + this.widthPadding, y + this.heightPadding + 15);
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "bottom";
        this.ctx.fillText(card.stringValue + "", x + this.cardWidth - this.widthPadding, y + this.cardHeight - this.heightPadding - 15);
        this.ctx.fillText(this.suits.get(card.suit)!, x + this.cardWidth - this.widthPadding, y + this.cardHeight - this.heightPadding);
        this.ctx.font = "30px serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.suits.get(card.suit)!, x + this.cardWidth / 2, y + this.cardHeight / 2);
    }

    drawPlayerHand(cards: Card[], x: number, y: number) {
        for (const card of cards) {
            this.drawCard(card, x, y);
            x += 25;
            y += 25;
        }
    }
}