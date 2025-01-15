import { camera } from "./camera.js";
import { control, renderer } from "./renderer.js";
import { scene } from "./scene.js";
import { model } from "./gltf.js";
import { TWEEN } from "./openCloseAnimation.js";


const Rotate={
    rotate:false
}
let s=0
function loop(){
//更新tween动画
TWEEN.update()
s+=0.01
//这里存在一个异步问题，我们的gltfLoader是异步的所以我们要等模型加载完了之后再对光标进行一个缩放
if (model.getObjectByName('左前光标') && model.getObjectByName('左后光标') && model.getObjectByName('右前光标') && model.getObjectByName('右后光标')){
if(s<0.5){
    model.getObjectByName('左前光标').scale.set(1 + s,1+ s,0)
    model.getObjectByName('右前光标').scale.set(1 + s, 1 + s, 0)
    model.getObjectByName('左后光标').scale.set(1 + s, 1 + s, 0)
    model.getObjectByName('右后光标').scale.set(1 + s, 1 + s, 0)
    model.getObjectByName('后备箱光标').scale.set(1 + s, 1 + s, 0)
}
else if(s>0.5&&s<=1){
    model.getObjectByName('左前光标').scale.set(2-s, 2 - s, 0)
    model.getObjectByName('右前光标').scale.set(2- s, 2 -s, 0)
    model.getObjectByName('左后光标').scale.set(2- s, 2- s, 0)
    model.getObjectByName('右后光标').scale.set(2- s, 2- s, 0)
    model.getObjectByName('后备箱光标').scale.set(2 - s, 2-s, 0)
}
else{
    s=0
}
}
control.update()
if(Rotate.rotate){
    control.autoRotate=true
}
else{
    control.autoRotate = false
}
renderer.render(scene,camera)
renderer.setSize(window.innerWidth,window.innerHeight)
requestAnimationFrame(loop)
camera.aspect=window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()
}
loop()
export {renderer,Rotate}