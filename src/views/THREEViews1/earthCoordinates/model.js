import * as THREE from 'three'
import { transform } from './transform'
const model=new THREE.Group()
const loader=new THREE.TextureLoader()
const map=loader.load('../../../public/地球大屏可视化资源/earth.jpg')
const sphere = new THREE.SphereGeometry(80, 32, 32)
const material=new THREE.MeshBasicMaterial({
    transparent:true,
    opacity:0.5,
    map
})
const mesh=new THREE.Mesh(sphere,material)
//创建一个球表示球体上的点
const sphere1=new THREE.SphereGeometry(4,32,32)
const material1=new THREE.MeshBasicMaterial()
const mesh1=new THREE.Mesh(sphere1,material1)
//调用坐标转换的函数
const position = transform(80, 112, 39)
mesh1.position.set(position.x,position.y,position.z)
model.add(mesh)
model.add(mesh1)
export{model}