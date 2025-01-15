import * as THREE from 'three'
import { renderer } from './renderer'
import { scene } from './scene'
import { camera } from './camera'
import { modelType } from './modelType'

// //创建一个移动速度
// const v = new THREE.Vector3(0, 0, 1)
// //创建一个后退速度
// const v1=new THREE.Vector3(0,0,-1)
// //创建一个前进加速度
// const a=new THREE.Vector3(0,0,2)
// //创建一个变量提供给减速
// const stop=0.2
//创建加速度
const a=0.5
//创建最大速度
const vmax=5
//时间对象
const clock=new THREE.Clock()
const stop=0.9
//创建一个移动加速度
function loop(){
//获得两次渲染的时间间隔
const spt=clock.getDelta()
//调用封装的函数实现人物移动和视角变化
modelType(a, vmax, stop, spt)
renderer.render(scene,camera)
requestAnimationFrame(loop)
}
loop()
export {renderer}