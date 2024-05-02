import Konva from 'konva';
import smokeImage1 from '../assets/smoke1.png'
import smokeImage2 from '../assets/smoke2.png'


let width = window.innerWidth;
let height = window.innerHeight;

let wind = Math.floor(Math.random() * (50 - 20) + 1) // m/sec

let stage = new Konva.Stage({
  container: 'app',
  width: width,
  height: height,
});

let layer = new Konva.Layer();


setInterval(() => {
    Konva.Image.fromURL(Math.random() < 0.5 ? smokeImage1: smokeImage2, function (smoke) {
        smoke.setAttrs({
          x: width,
          y: Math.floor(Math.random() * (height - 100) + 10),
        });

        smoke.cache();
        smoke.filters([Konva.Filters.HSL]);
        smoke.luminance(-0.5);

        layer.add(smoke);

        let tween = new Konva.Tween({
            node: smoke,
            x: 0,
            easing: Konva.Easings.Linear,
            duration: 10 * wind,
            onFinish: () => {
                console.log('finished')

                smoke.remove();
            },
        });

        tween.play();

    });
}, 5000)

stage.add(layer);

console.log('HELLO !!!!!')
