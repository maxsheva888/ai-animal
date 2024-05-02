import Konva from 'konva';
import grass from '../assets/grass1.png';
//import tree from '../assets/tree.png';
import { Image as kanvaImage } from 'konva/lib/shapes/Image';
import { Shape, ShapeConfig } from 'konva/lib/Shape';


let width = window.innerWidth;
let height = window.innerHeight;

let stage = new Konva.Stage({
  container: 'app',
  width: width,
  height: height,
});

let layer = new Konva.Layer();

const groundGroup = new Konva.Group({
  draggable: true,
});
layer.add(groundGroup);
stage.add(layer);


/**
 * Texture interface
 */
type I_Texture = {
  src: string;
}


/**
 * Chunk class
 */
class Chunk {

  #texture: I_Texture;
  #position: { x: number, y: number};
  #imageObject: HTMLImageElement | null = null;
  #isLoaded: boolean = false;

  #kanvaImage: kanvaImage | null = null;

  constructor(texture: I_Texture = { src: grass }, position: { x: number, y: number }) {
    this.#texture = texture;
    this.#position = position;
  }

  #onLoad(load: () => void) {
    if (this.#imageObject) return;

    this.#imageObject = new Image();

    this.#imageObject.addEventListener('load', () => {
      this.#isLoaded = true;

      this.#kanvaImage = new Konva.Image({
        ...this.#position,
        image: this.#imageObject as CanvasImageSource,
      });

      load();
    });

    this.#imageObject.src = this.#texture.src;
  }

  startLoading(callback: () => void = () => {}) {
    return new Promise((resolve, reject) => {
      this.#onLoad(callback)
      let wait = setInterval(() => {
        if (this.#isLoaded) {
          clearInterval(wait);
          resolve(this);
        }
      }, 100)
    })
  }

  asKanvaObject(): kanvaImage {
    return this.#kanvaImage as kanvaImage;
  }
}



function generateCoverage() {

  const matrix = [
    [grass, grass, grass, grass, grass, grass, grass, grass, grass, grass],
    [grass, grass, grass, grass, grass, grass, grass, grass, grass, grass],
    [grass, grass, grass, grass, grass, grass, grass, grass, grass, grass],
    [grass, grass, grass, grass, grass, grass, grass, grass, grass, grass],
    [grass, grass, grass, grass, grass, grass, grass, grass, grass, grass],
  ];

  let startX = 1200;
  let startY = 700;

  const offsetX = 45;
  const offsetY = 26;

  matrix.forEach((row, rowIndex) => {

    row.forEach((col, colIndex) => {

      (async () => {
        let image = new Chunk({ src: grass }, {
          x: startX + ( offsetX * (colIndex + 1) ),
          y: startY + ( offsetY * (colIndex + 1) ),
        })
        await image.startLoading();

        groundGroup.add(image.asKanvaObject())
      })();

    });

    startX -= offsetX;
    startY += offsetY;

  });
}

generateCoverage();

console.log('HELLO !!!!!')

