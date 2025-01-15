import { camera } from "./camera";
import { scene } from "./scene";
import { renderer } from "./renderer";
function loop(){
    renderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()
export {renderer}