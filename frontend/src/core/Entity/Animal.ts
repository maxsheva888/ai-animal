import { Shape } from "konva/lib/Shape";
import { RenderComponent } from "../components/RenderComponent";
import { animals } from "../data/animalsType.list";
import { BaseBehaviorComponent } from "../components/BaseBehaviorComponent";

export interface AnimalOptions {
    name: string,
    type: keyof typeof animals
    view: {
        image?: string,
        pointColor: string
    },
    speed?: number,
    health?: number,
};

export type Position = {
    x: number;
    y: number;
}

export class Animal {

    private renderComponent: RenderComponent;
    //private behavior: BaseBehaviorComponent;

    constructor(
        private animalOptions: AnimalOptions,
        private position: Position
    ) { 
        this.renderComponent = new RenderComponent({
            ...this.animalOptions.view,
            position,
        });
    }

    render(): Shape {
        return this.renderComponent.render();
    }
}
