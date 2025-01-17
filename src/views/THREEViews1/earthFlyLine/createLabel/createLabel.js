import * as THREE from 'three'
import { transform } from '../transform'
import config from '../config'
//创建点贴图
const texture1=new THREE.TextureLoader().load('//地球大屏可视化资源/贴图.png')
//创建光圈贴图
const texture2=new THREE.TextureLoader().load('//地球大屏可视化资源/标注光圈.png')
function createLabel(pos){
const geometry=new THREE.PlaneGeometry(3,3)
//把贴图赋值给材质
const material=new THREE.MeshBasicMaterial({
    map:texture1,
    transparent:true,
    color:0xff00ff
})
const label=new THREE.Mesh(geometry,material)
//创建一个光圈作为label的子对象实现波动效果
const geometry1=new THREE.PlaneGeometry(8,8)
const material1=new THREE.MeshBasicMaterial({
    color:0xffff00,
    transparent:true,
    map:texture2,
    depthWrite:false
})
const circle=new THREE.Mesh(geometry1,material1)
circle.z+=1
//circle设置两个属性为后面的波动做准备
//根据这个speed设置缩放速度
circle.speed=Math.random()*(4-2)+2
//根据S存储缩放倍数
circle.s=0
//把光圈作为点标签的子对象
label.add(circle)
const coord=transform(config.R,pos[0],pos[1])
label.position.set(coord.x,coord.y,coord.z)
//设置四元数
const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(coord.x,coord.y,coord.z).normalize())
//把四元数给label
label.quaternion.copy(q)
return label
}
export {createLabel}