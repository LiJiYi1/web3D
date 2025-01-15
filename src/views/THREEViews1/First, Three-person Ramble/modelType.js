
import * as THREE from 'three'
import { model,cameraGroup } from "./mesh"
import { Animations } from './mesh'
let back=true
//创建一个状态对象控制移动
const key = {
    //默认都不移动
    W: false,
    S: false,
    A: false,
    D: false
}
//创建一个对象控制视角移动
const eye = {
    leftRight: 0,
    upDown: 0,
    click: false
}
//创建速度
let v=1
//创建减速用的速度
let v1 = 1;
function modelType(a,vmax,stop,spt){
    //按下W时运动
    if (key.W) {
        // //加速运动要获得在这个帧内物体运动速度变化到多快
        // if (v.length() <vmax)//设置速度上限为5
        // {
        //     v.add(a.clone().multiplyScalar(spt))
        // }
        // //速度乘以时间间隔获得在当前帧内的位移
        // const s = v.clone().multiplyScalar(spt)
        // //把当前帧的位移加在物体上
        // model.position.add(s)
        //获得模型的正面方向(沿Z轴)
        const dir = new THREE.Vector3()
        model.getWorldDirection(dir)
        // console.log(dir);
        //设置加速度
        if (v < vmax) {
            v += a * spt
        }
        //根据方向进行运动
        const s = dir.clone().multiplyScalar(v * spt)
        model.position.add(s)
        for(let key in Animations ){
            console.log();
        if (Animations[key]._clip.name =='Walk'){
            Animations[key].weight=1
         }
         else{
             Animations[key].weight = 0
         }
        }
        //让他归位
        back=true
        // Animations.Walk.weight=1
    }
     //当我们松开W时要逐渐停止
    else {
    //     // //让v乘这个减速参数
    //     // v.multiplyScalar(stop)
    //     // //计算减速期间的运动距离
    //     //const s=v.clone().multiplyScalar(spt)
    //     // //给物体位移加上
    //     // model.position.add(s)
           //让速度乘以减速参数  
           v1 *= stop
        //根据这个速度v1让物体运动
         const dir = new THREE.Vector3()
         model.getWorldDirection(dir)
         //根据方向进行运动
          const s = dir.clone().multiplyScalar(v1 * spt)
         // console.log(s);
         model.position.add(s)
         if(back){  
            for (let key in Animations) {
            console.log();
            if (Animations[key]._clip.name == 'Idle') {
                Animations[key].weight = 1
            }
            else {
                Animations[key].weight = 0
            }
        }
        back=false
    }
     }
    if (key.S) {
        // //后退距离
        // const s=v1.clone().multiplyScalar(spt)
        // //给模型加上后退距离
        // model.position.add(s)
        //
        const dir = new THREE.Vector3()
        model.getWorldDirection(dir)
        //后退距离
        const s = dir.multiplyScalar(-v * spt)
        model.position.add(s)
        for (let key in Animations) {
            console.log();
            if (Animations[key]._clip.name == 'Walk') {
                Animations[key].weight = 1
            }
            else {
                Animations[key].weight = 0
            }
        }
        //让他归位
        back = true
    }
    //按A向左运动
    if(key.A){
        //获得模型的前方
        const front=new THREE.Vector3()
        model.getWorldDirection(front)
        //模型的上方向
        const up=new THREE.Vector3(0,1,0)
        //根据模型的前方和上方获得模型的左方向
        const left=up.cross(front).normalize()
        //运动的距离
        const s=left.multiplyScalar(v*spt)
        //运动距离加到模型位置上
        model.position.add(s)
        for (let key in Animations) {
            console.log();
            if (Animations[key]._clip.name == 'Walk') {
                Animations[key].weight = 1
            }
            else {
                Animations[key].weight = 0
            }
        }
        //让他归位
        back = true
    }
    //按D向右运动
    if(key.D){
        //获得模型的前方
        const front = new THREE.Vector3()
        model.getWorldDirection(front)
        //模型的上方向
        const up = new THREE.Vector3(0, 1, 0)
        //根据模型的前方和上方获得模型的左方向
        const right = front.cross(up).normalize()
        //运动的距离
        const s = right.multiplyScalar(v * spt)
        //运动距离加到模型位置上
        model.position.add(s)
        for (let key in Animations) {
            if (Animations[key]._clip.name == 'Walk') {
                Animations[key].weight = 1
            }
            else {
                Animations[key].weight = 0
            }
        }
        //让他归位
        back = true
    }
    // if(eye.click){
    model.rotation.y -= eye.leftRight / 400
    //创建一个旋转的范围
    const angleMax = THREE.MathUtils.radToDeg(Math.PI / 12) / 30
    const angleMin = THREE.MathUtils.radToDeg(-Math.PI / 12) / 30
    // console.log(cameraGroup.rotation.x, radius, radius1);
    cameraGroup.rotation.x += eye.upDown / 400
    if (cameraGroup.rotation.x < angleMin) cameraGroup.rotation.x = angleMin;
    if (cameraGroup.rotation.x > angleMax) cameraGroup.rotation.x = angleMax;
}
export {modelType,eye,key}