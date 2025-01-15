import * as THREE from 'three'
import  TWEEN from "@tweenjs/tween.js"
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// const gui = new GUI()


const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,10,3000)
camera.position.set(200,200,200)
camera.lookAt(0,0,0)

//创建一个方向
const dir=new THREE.Vector3()
//获得相机视线方向
camera.getWorldDirection(dir);
//平移一下
const v=dir.clone().multiplyScalar(150)
//用tween动画库实现一下动画
const tween=new TWEEN.Tween(camera.position).to(
camera.position.clone().add(v),3000
).start()

const pos=camera.position.clone()
// 用gui库调相机位置
// gui.add({ L: 0 }, 'L', 0, 200).onChange(function (value) {
//     const dis = dir.clone().multiplyScalar(value);//相机沿着视线偏移长度v
//     const newPos = pos.clone().add(dis);//相机初始位置+相机偏移向量    
//     console.log(pos);
//     camera.position.copy(newPos);//新的位置赋值给相机位置
// });
export {camera}