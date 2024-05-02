import { AnimalOptions } from "./Entity/Animal";
import { World } from "./Entity/World";
import Animals from "./data/animal.d.json"



const world =
    new World(Animals as Array<AnimalOptions>)
        .generateAnimals();


