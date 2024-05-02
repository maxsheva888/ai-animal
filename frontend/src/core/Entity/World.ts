import { Layer } from "konva/lib/Layer";
import { Map } from "./Map";
import { Animal, AnimalOptions } from "./Animal";
import { Stage } from "konva/lib/Stage";

const width = window.innerWidth;
const height = window.innerHeight;


export class World {

    private map: Map;
    private animalLayer: Layer;

    constructor(
        private animals: Array<AnimalOptions>
    ) {
        console.log(animals)

        this.map = new Map(new Stage({
            container: 'app',
            width: width,
            height: height,
        }));


        this.animalLayer = new Layer({name: 'animals'});
    }

    generateAnimals(): void
    {
        this.animals.forEach((animalOption: AnimalOptions) => {
            let animal = new Animal(animalOption, {
                x: Math.random() * (width - 10),
                y: Math.random() * (height - 10),
            });

            this.animalLayer.add(animal.render())
        });

        this.map.addLayer(this.animalLayer);
    }



}