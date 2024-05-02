import { Circle } from "konva/lib/shapes/Circle";
import { BaseComponent } from "./BaseComponent";
import { Shape } from "konva/lib/Shape";
import { Animation } from "konva/lib/Animation";


export interface RenderOptions {
    image?: string,
    pointColor: string,
    position: {
        x: number,
        y: number,
    }
};


export class RenderComponent extends BaseComponent {

    private shape: Circle;

    constructor(
        private options: RenderOptions,
    ) {
        super();

        this.shape = new Circle({
            ...this.options.position,
            radius: 2,
            fill: this.options.pointColor
        });

        const pulseAnimation = new Animation(() => {
            const scale = 2 + Math.abs(Math.sin((new Date().getTime() * 2 * Math.PI) / 5000)) * 2;
            this.shape.scaleX(scale);
            this.shape.scaleY(scale);

            const opacity = Math.abs(Math.sin(new Date().getTime() / 1000)); // Use sine function for smooth blinking
            this.shape.opacity(opacity);

        });
        pulseAnimation.start();
    }

    render(): Shape {
        return this.shape;
    }

}