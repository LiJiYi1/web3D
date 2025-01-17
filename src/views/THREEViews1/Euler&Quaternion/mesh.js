import * as THREE from 'three'
import { scene } from './scene'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { renderer } from './renderer';
import { camera } from './camera';
const loader=new GLTFLoader()
const model=new THREE.Group()
//加载战斗机模型
loader.load('../../../几何计算资源/飞机.glb',(gltf)=>{
    const  fly=gltf.scene
    //调一下飞机位置
    fly.position.set(20,20,20)
    //给飞机加个本地坐标系
    const axes=new THREE.AxesHelper(20)
    fly.add(axes)
    // //创建欧拉角
    // const Euler=new THREE.Euler()
    // Euler.x=Math.PI/3
    // Euler.y = Math.PI / 3
    // Euler.z = Math.PI / 3
    // Euler.order='XZY'
    // //把欧拉角赋值给飞机实现旋转
    // fly.rotation.copy(Euler)
    // //创建四元数
    // const Quaternion=new THREE.Quaternion()
    // Quaternion.setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI/3)
    // //创建第二个四元数
    // const Quaternion1 = new THREE.Quaternion()
    // Quaternion1.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 3)
    // //创建第三个四元数
    // const Quaternion2 = new THREE.Quaternion()
    // Quaternion2.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 3)
    // //三个四元数相乘
    // const final=Quaternion.multiply(Quaternion2).multiply(Quaternion1)
    // //四元数参数赋给飞机模型
    // fly.quaternion.copy(final)
    // console.log('欧拉角',fly.rotation.z);
    //创建两个向量,并且进行一个可视化
    const  v1=new THREE.Vector3(0,0,-1)
    const arrow=new THREE.ArrowHelper(v1,fly.position,20,0x000111)
    const v2=new THREE.Vector3(-1,-1,-1)
    const arrow1 = new THREE.ArrowHelper(v2.normalize(), fly.position, 20, 0xff0000)
    model.add(arrow)
    model.add(arrow1)
    //创建一个四元数
    const Quaternion=new THREE.Quaternion()
    Quaternion.setFromUnitVectors(v1,v2)
    // fly.quaternion.copy(Quaternion)
    fly.quaternion.multiply(Quaternion)
    model.add(fly)
    
})
//加载无人机模型
loader.load('../../../几何计算资源/无人机.glb',(gltf)=>{
    //模型里面有动画属性可以这么玩，没有动画就算了。
    // const mixer=new THREE.AnimationMixer(gltf.scene)
    // const animate = mixer.clipAction(gltf.animations[0])
    // animate.play()
    const fly=gltf.scene
    // console.log('无人机',fly);
    fly.position.set(100,100,0)
    const axes=new THREE.AxesHelper(50)
    fly.add(axes)
    model.add(gltf.scene)
    //准备好半径和角度在下面渲染循环使用
    const R = 100
    let angle = 0
    //无人机默认姿态方向(死的方向)
    const dir=new THREE.Vector3(0,0,1)
    function loop() {
        //角度不断增加
        angle += 0.01
        //表示出X,Y,Z坐标
        const x = R * Math.cos(angle)
        const z = R * Math.sin(angle)
        //把坐标换成vector3矢量
        const vector3 = new THREE.Vector3(x, 100, z)
        //把vector3赋值给无人机位置属性
        fly.position.copy(vector3)
        // //一直面向中心旋转
        // //通过计算算出无人机位置指向圆心的方向
        // const v=new THREE.Vector3(0,100,0)
        // const dir1 = v.clone().sub(vector3)
        // //利用两个方向创建一个四元数
        // const quaternion=new THREE.Quaternion()
        // quaternion.setFromUnitVectors(dir.normalize(),dir1.normalize())
        // //把这个四元数送给模型用
        // fly.quaternion.copy(quaternion)

        //面向飞行方向旋转。
        const v = new THREE.Vector3(R * Math.cos(angle + 0.01), 100, R * Math.sin(angle+0.01))
        const dir1=v.clone().sub(vector3)
        //利用两个方向创建一个四元数
        const quaternion=new THREE.Quaternion()
        quaternion.setFromUnitVectors(dir.normalize(),dir1.normalize())
        //把这个四元数送给模型用
        fly.quaternion.copy(quaternion)
        
        renderer.render(scene, camera)
        requestAnimationFrame(loop)
    }
    loop()
    
})
//创建一个四元数
const Quaternion=new THREE.Quaternion()
Quaternion.setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI)
//创建一个向量。
const v=new THREE.Vector3(1,0,0)
const v1=v.clone().applyQuaternion(Quaternion)
const mesh=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshLambertMaterial())
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({color:0x11fff1}))
//四元数变化后的向量赋值给mesh的位置属性。
mesh.position.copy(v)
mesh1.position.copy(v1)
model.add(mesh)
model.add(mesh1)
// console.log('v',v);


export {model}