import { Card, Hand, Winner } from "./types.js";

export class Renderer {
    ctx: CanvasRenderingContext2D;
    canvasWidth: number;
    canvasHeight: number;
    widthPadding: number = 5;
    heightPadding: number = 3;
    cardWidth: number = 70;
    cardHeight: number = 100;
    suits: Map<string, string> = new Map([["Spades", "♠"], ["Hearts", "♥"], ["Diamonds", "♦"], ["Clubs", "♣"]]);

    constructor(canvas: HTMLCanvasElement) {
        this.canvasWidth = canvas.width
        this.canvasHeight = canvas.height;
        this.ctx = canvas.getContext('2d')!;
    }

    renderCard(card: Card, x: number, y: number, faceUp: boolean) {
        if (faceUp) {
            this.renderCardFaceUp(card, x, y);
        } else {
            this.renderCardFaceDown(x, y);
        }
    }

    renderCardFaceUp(card: Card, x: number, y: number) {
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

    renderCardFaceDown(x: number, y: number) {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(x, y, this.cardWidth, this.cardHeight);
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(x, y, this.cardWidth, this.cardHeight);
    }

    renderPlayerHands(playerHands: Hand[]) {
        let x = 100;
        let y = 300;
        for (const hand of playerHands) {
            this.renderPlayerHand(hand, x, y);
            x += 200;
        }
    }
    renderPlayerHand(hand: Hand, x: number, y: number) {
        for(const card of hand.cards) {
            this.renderCard(card, x, y, true);
            x += 25;
            y += 25;
        }
    }

    renderDealerHand(hand: Hand, firstDraw: boolean) {
        this.ctx.clearRect(0,0,this.canvasWidth, 300);
        const center = hand.cards.length * (this.cardWidth + 10) / 2;
        const y = 30;
        let x = this.canvasWidth / 2 - center;
        if (firstDraw) {
            this.renderCard(hand.cards[0]!, x, y, false);
            this.renderCard(hand.cards[1]!, x + 25, y + 25, true);
        } else {
            
            for (const card of hand.cards) {
                this.renderCard(card, x, y, true);
                x += this.cardWidth + 10;
            }    
        }
    }

    renderWinner(winner: Winner) {
        const winnerText: string = Winner[winner];
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(winnerText, this.canvasWidth / 2, this.canvasHeight / 2);
    }

    reset() {
        this.ctx.reset();
    }
}