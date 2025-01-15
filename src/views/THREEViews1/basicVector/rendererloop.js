import { camera } from "./camera";
import { renderer } from "./renderer";
import { scene } from "./scene";
function loop(){
    renderer.render(scene,camera)
requestAnimationFrame(loop)
}
loop()

export {renderer}