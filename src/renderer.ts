import { sumOfHand } from "./game.js";
import { Card, Hand, Winner } from "./types.js";


const widthPadding: number = 5;
const heightPadding: number = 3;
const cardWidth: number = 70;
const cardHeight: number = 100;
const handOffset: number = 200;
export class Renderer {
    ctx: CanvasRenderingContext2D;
    canvasWidth: number;
    canvasHeight: number;
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
        this.ctx.fillRect(x, y, cardWidth, cardHeight);
        this.ctx.font = "15px serif";
        this.ctx.textAlign = "left";
        this.ctx.fillStyle = "black";
        this.ctx.textBaseline = "top";
        this.ctx.fillText(card.stringValue + "", x + widthPadding, y + heightPadding);
        this.ctx.fillText(this.suits.get(card.suit)!, x + widthPadding, y + heightPadding + 15);
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "bottom";
        this.ctx.fillText(card.stringValue + "", x + cardWidth - widthPadding, y + cardHeight - heightPadding - 15);
        this.ctx.fillText(this.suits.get(card.suit)!, x + cardWidth - widthPadding, y + cardHeight - heightPadding);
        this.ctx.font = "30px serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.suits.get(card.suit)!, x + cardWidth / 2, y + cardHeight / 2);
    }

    renderCardFaceDown(x: number, y: number) {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(x, y, cardWidth, cardHeight);
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(x, y, cardWidth, cardHeight);
    }

    renderSum(hand: Hand, x: number, y: number) {
        const txt = sumOfHand(hand) + "";
        this.ctx.textBaseline = "bottom";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px serif"
        this.ctx.clearRect(x - txt.length * 30 / 2, y, txt.length * 30, 30);
        this.ctx.fillText(txt, x, y);
    }

    renderPlayerHands(playerHands: Hand[]) {
        let x = 100;
        let y = 300;
        this.ctx.clearRect(0, this.canvasHeight / 2, this.canvasWidth, this.canvasHeight / 2);
        for (const hand of playerHands) {
            this.renderPlayerHand(hand, x, y);
            x += handOffset;
        }
    }

    renderPlayerHand(hand: Hand, x: number, y: number) {
        this.ctx.clearRect(x, y, 25 * (hand.cards.length - 1) + cardWidth, 25 * (hand.cards.length - 1) + cardHeight)
        this.renderSum(hand, x + 50, this.canvasHeight / 2 - 30);
        for(const card of hand.cards) {
            this.renderCard(card, x, y, true);
            x += 25;
            y += 25;
        }
    }

    renderDealerHand(hand: Hand, firstDraw: boolean) {
        this.ctx.clearRect(0,0,this.canvasWidth, 200);
        this.renderSum(hand, this.canvasWidth/2, 200);
        const y = 30;
        if (firstDraw) {
            let x = this.canvasWidth / 2 - 95 / 2;
            this.renderCard(hand.cards[0]!, x, y, false);
            this.renderCard(hand.cards[1]!, x + 25, y + 25, true);
        } else {
            let x = this.canvasWidth / 2 - hand.cards.length * (cardWidth + 10) / 2;
            for (const card of hand.cards) {
                this.renderCard(card, x, y, true);
                x += cardWidth + 10;
            }    
        }
    }

    renderWinner(winner: Winner, id: number) {
        const winnerText: string = Winner[winner];
        const x = 150 + id * handOffset;
        const y = this.canvasHeight / 2 - 30;
        this.ctx.clearRect(x - winnerText.length * 30 / 2, y - 30, winnerText.length * 30, 30);
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px serif";
        this.ctx.textBaseline = "bottom";
        this.ctx.fillText(winnerText, x, y);
    }

    reset() {
        this.ctx.reset();
    }
}