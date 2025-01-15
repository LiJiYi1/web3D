import { camera } from "./camera.js";
import { renderer,cssRender } from "./renderer.js";
import { scene } from "./scene.js";
import { model } from "./model.js";
let rotates={
    rotates:false
}
let s=0
function loop(){
if(rotates.rotates){ model.rotateY(0.01)}
if (model.getObjectByName('光点')){
    s += 0.01
    if(s>0&&s<0.5){model.getObjectByName('光点').scale.set(6 * (1 + s), 6 * (1 + s),0)}
    else if (s > 0.5 && s < 1) { model.getObjectByName('光点').scale.set(6 * (2 - s), 6 * (2 - s), 0) }
    else{s=0}
}   
renderer.render(scene,camera)
cssRender.render(scene,camera)
requestAnimationFrame(loop)
}
loop()
window.onresize=()=>{
renderer.setSize(window.innerWidth,window.innerHeight)
cssRender.setSize(window.innerWidth, window.innerHeight)
camera.aspect=window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()
}
export {renderer,rotates,cssRender}