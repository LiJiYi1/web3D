import {scene} from './scene.js'
import { camera } from './camera.js'
import {renderer,cssRenderer} from './renderer.js'
import { createFlame } from './flame.js';
import { model } from './mesh.js';
//窗口大小发生变化后renderer参数要变化，camera参数也要变化。
window.onresize=()=>{
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.render(scene,camera)
cssRenderer.setSize(window.innerWidth, window.innerHeight)
cssRenderer.render(scene, camera)
camera.aspect=window.innerWidth/window.innerHeight
}
const flame=createFlame()
let num=0;
function loop(){
    num+=0.01
    if(num>15)num=0
    // console.log(num);
    flame.material.map.offset.x+=Math.floor(num)/15
    renderer.render(scene,camera)
    cssRenderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()
export {renderer,cssRenderer,flame}