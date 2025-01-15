import * as THREE  from 'three'
import { model } from './gltf.js'
const cubeTexture = new THREE.CubeTextureLoader().setPath('../../../public/环境贴图/环境贴图1/').load([
    'px.jpg',
    'nx.jpg',
    'py.jpg',
    'ny.jpg',
    'pz.jpg',
    'nz.jpg'
]);


const scene=new THREE.Scene()
scene.add(model)
const directLight1=new THREE.DirectionalLight()
directLight1.intensity=1
directLight1.position.set(-200,300,200)
scene.add(directLight1)
const directLight2 = new THREE.DirectionalLight()
directLight2.position.set(-200, -200, -200)
scene.add(directLight2)
//给场景里的所有物体加环境纹理贴图。
// scene.environment=cubeTexture
//创建一个地面并加入场景中
const land = new THREE.PlaneGeometry(4000, 4000)
const material = new THREE.MeshLambertMaterial()
const mesh = new THREE.Mesh(land, material)
mesh.rotateX(-Math.PI/2)
scene.add(mesh)
//给这个地面添加纹理
const texture=new THREE.TextureLoader().load('../../../public/汽车产品展示资源/瓷砖.jpg')
//纹理重复
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(16,16)
mesh.material.map=texture
//创建一个圆柱几何体充当隧道
const geometry=new THREE.CylinderGeometry(600,600,6000,99)
const material1=new THREE.MeshLambertMaterial({
    side:THREE.DoubleSide,
    map:texture
})
const mesh1=new THREE.Mesh(geometry,material1)
mesh1.rotateZ(Math.PI/2)
scene.add(mesh1)
//设置场景雾化
scene.fog=new THREE.Fog(0Xfffff1,200,3000)
//创建坐标系辅助可视化
// const axesHelper = new THREE.AxesHelper(2000)
// scene.add(axesHelper)
export{scene,directLight1,directLight2}