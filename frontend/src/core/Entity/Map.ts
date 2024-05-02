import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";



export class Map {

    constructor(private map: Stage)
    {}

    getStage(): Stage
    {
        return this.map
    }

    addLayer(layer: Layer): Stage
    {
        return this.map.add(layer)
    }

}