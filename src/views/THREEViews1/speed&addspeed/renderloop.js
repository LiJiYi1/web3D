import { model } from "./mesh";
import { camera } from "./camera";
import { renderer } from "./renderer";
import { scene } from "./scene";
import * as THREE from 'three'
//拿到正方体
const box=model.children[0]
const box1=model.children[1]
// console.log(box);
//创建一个速度
const v=new THREE.Vector3(10,0,0)
const g=new THREE.Vector3(0,-9.8,0)
const clock=new THREE.Clock()
const pos=box.position.clone()
const pos1 = box1.position.clone()
let spt=0
function loop(){
    //匀速运动
    //时间累加
    spt+=clock.getDelta()
    //计算位移
    const dis=v.clone().multiplyScalar(spt)
    //移动
    box.position.copy(pos.clone().add(dis))
    // //获取时间间隔
    // const spt=clock.getDelta()
    // //在间隔内移动的距离
    // const dis=v.clone().multiplyScalar(spt)
    // console.log(v);
    //几何体位置移动
    // box.position.add(dis)
    //平抛
    // spt += clock.getDelta()
    const dis1=v.clone().multiplyScalar(spt).add(g.clone().multiplyScalar(Math.pow(spt,2)/2))
    
    box1.position.copy(pos1.clone().add(dis1))
    if(box.position.y<0){
        box1.position.copy(pos1.clone())
        spt=0
    }
  
    renderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()
window.onresize=()=>{
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.render(scene,camera)
    camera.aspect=window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()

}
export {renderer}