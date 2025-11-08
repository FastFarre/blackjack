import { Card } from "./types";

class Renderer {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
    }

    drawCard(card: Card, x: number, y: number) {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(x, y, 50, 50);
        this.ctx    
    }
}