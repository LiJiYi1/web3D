import * as THREE from 'three'
import { model } from './model'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as CANNON from 'cannon-es'
const scene=new THREE.Scene()
scene.add(model)
const axes=new THREE.AxesHelper(100)
scene.add(axes)
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,3000)
camera.position.set(77,30,77)
camera.lookAt(0,0,0)
const renderer=new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
const dirLight=new THREE.DirectionalLight()
dirLight.intensity=1
dirLight.position.set(100,100,100)
scene.add(dirLight)
const ambi=new THREE.AmbientLight()
scene.add(ambi)
//球体的半径
const radius = 1
//创建cannon的物体
const sphereBody = new CANNON.Body({
    mass: 5, // kg
    position: new CANNON.Vec3(0, 100, 0), // m
    shape: new CANNON.Sphere(radius),
    material: new CANNON.Material({ restitution: 0.9 })
})
//创建cannon的箱子
const box = new CANNON.Body({
    mass: 5, // kg
    position: new CANNON.Vec3(20, 12, 20), // m
    shape: new CANNON.Box(new CANNON.Vec3(1.7408444752791645/2, 2.1650448453236883/2,1.75756713555068/2)),
    material: new CANNON.Material({ restitution: 0.1 })
})
box.quaternion.setFromEuler(Math.PI / 3, Math.PI / 3, Math.PI / 3)
//创建cannon的地面
const plane= new CANNON.Body({
    mass: 0, // kg//质量为0不会受重力影响(这是一个规则)
    position: new CANNON.Vec3(0, 0, 0), // m
    shape: new CANNON.Plane(100, 100),
    material:new CANNON.Material({restitution:1})
})
//根据四元数旋转地面
plane.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
//创建cannon的凸多面体
//先获得网格几何体的形状
const  ConvexPolyhedron = model.children[2]
//根据几何体获得顶点坐标
const pos=ConvexPolyhedron.geometry.attributes.position
//创建一个点数组存CANNON的点
const points=[]
//创建一个数组存三角形顶点
const faces=[]
for(let i=0;i<pos.count;i++){
    const x=pos.getX(i)
    const y = pos.getY(i)
    const z = pos.getZ(i)
    const v3=new CANNON.Vec3(x,y,z)
    points.push(v3)
}
// console.log(ConvexPolyhedron.geometry.attributes.position);
//根据几何体获得索引值
const index=ConvexPolyhedron.geometry.index.array
 for(let i=0;i<index.count;i+=3){
 const x=index[i]
 const y = index[i+1]
 const z = index[i+2]
 faces.push([x,y,z])
  }
//创建凸多面体
const Convex = new CANNON.Body({
    mass:3, // kg//质量为0不会受重力影响(这是一个规则)
    position: new CANNON.Vec3(30, 12, 20), // m
    shape: new CANNON.ConvexPolyhedron({
        vertices: points,
        faces: faces
    }),
    material: new CANNON.Material({ restitution: 0.2 })
})
// 设置凸多面体下落的初始姿态角度
ConvexPolyhedron.rotation.set(Math.PI / 3, Math.PI / 3, Math.PI / 3);
Convex.quaternion.setFromEuler(Math.PI / 3, Math.PI / 3, Math.PI / 3);
//创建cannon的物理世界
const  world = new CANNON.World({
    //物理世界的重力
    gravity: new CANNON.Vec3(0, -9.82, 0) // m/s²
});
//创建一个声音对象
// 创建一个 AudioListener 并将其添加到 camera 中
const listener = new THREE.AudioListener();
// 创建一个全局 audio 源
const sound = new THREE.Audio(listener);
// 加载一个 sound 并将其设置为 Audio 对象的缓冲区
const audioLoader = new THREE.AudioLoader();
audioLoader.load('../../../几何计算资源/碰撞声.wav', function (buffer) {
    sound.setBuffer(buffer);
});
//给小球添加碰撞事件
sphereBody.addEventListener('collide',(e)=>{
    console.log(e.contact.getImpactVelocityAlongNormal());
    sound.setVolume(e.contact.getImpactVelocityAlongNormal()/45)
    sound.play()
})
//物体加入世界中
// world.addBody(sphereBody)
world.addBody(plane)
world.addBody(box)
world.addBody(Convex)
const fixedTimeStep = 1 / 60;
function loop(){
    //物理世界开始运行
    world.step(fixedTimeStep);
    // console.log(sphereBody.position);
    //更新位置,使THREE小球的位置和Cannon小球位置一致
    model.children[0].position.copy(sphereBody.position)
    if(model.children[3]){
        model.children[3].position.copy(box.position)
        model.children[3].quaternion.copy(box.quaternion)
    }
    ConvexPolyhedron.position.copy(Convex.position)
    ConvexPolyhedron.quaternion.copy(Convex.quaternion)
    renderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()
const control=new OrbitControls(camera,renderer.domElement)
export{renderer,scene,camera,sphereBody,world}