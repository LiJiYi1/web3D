import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const texture=new THREE.TextureLoader().load('../../../几何计算资源/乒乓球.png')
const texture1 = new THREE.TextureLoader().load('../../../几何计算资源/瓷砖.jpg')
texture1.wrapS=THREE.RepeatWrapping
texture1.wrapT = THREE.RepeatWrapping
texture1.repeat.set(2,2)
const model=new THREE.Group()
const sphere=new THREE.SphereGeometry(1)
const material=new THREE.MeshLambertMaterial({map:texture})
const material1=new THREE.MeshLambertMaterial({ map:texture1 })
const sphereMesh=new THREE.Mesh(sphere,material)
const plane=new THREE.PlaneGeometry(100,100)
const planeMesh=new THREE.Mesh(plane,material1)
sphereMesh.position.set(0,100,0)
planeMesh.rotateX(-Math.PI/2)
model.add(sphereMesh)
model.add(planeMesh)
const loader=new GLTFLoader()
loader.load('../../../几何计算资源/箱子.glb',(gltf)=>{
//设置箱子位置和姿态
gltf.scene.position.set(20,12,20)
gltf.scene.rotation.set(Math.PI / 3, Math.PI / 3, Math.PI / 3)
model.add(gltf.scene)
//看看箱子的大小
// const box=new THREE.Box3()
// box.expandByObject(gltf.scene)
// const size=new THREE.Vector3()
// box.getSize(size)
// console.log(size)
})
//加载多面体
const gltf=await loader.loadAsync('../../../几何计算资源/凸多面体.glb')
const ConvexPolyhedron = gltf.scene.getObjectByName('多面体')
//设置多面体位置
ConvexPolyhedron.position.set(30, 12, 20)
model.add(ConvexPolyhedron)
export{model}