import { camera } from "./camera";
import { renderer } from "./renderer";
import { scene } from "./scene";

function loop(){  
    renderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()
window.onresize=()=>{
    renderer.setSize(window.innerWidth,window.innerHeight)
}
export {renderer}