import { Card } from "./types";

export class Renderer {
    ctx: CanvasRenderingContext2D;
    cardPadding: number = 20;
    cardWidth: number = 70;
    cardHeight: number = 100;
    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!;
    }

    drawCard(card: Card, x: number, y: number) {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(x, y, this.cardWidth, this.cardHeight);
        this.ctx.font = "15px serif";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(card.suit + " " + card.value, x + this.cardWidth / 2, y + this.cardHeight / 2);
    }
}