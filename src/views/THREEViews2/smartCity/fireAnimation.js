import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer'
import * as THREE from 'three'
const fireGroup=new THREE.Group()
//创建标签标注着火
const div = document.createElement('div')
div.innerHTML = '着火了!'
div.style.width = '100px'
div.style.textAlign = 'center'
div.style.color = 'white'
div.style.backgroundColor = 'black'
div.style.opacity = '0.6'
const label = new CSS2DObject(div)
label.position.set(13525600, 3663400,500)
//创建火焰效果
const geometry=new THREE.PlaneGeometry(120,120)
geometry.rotateX(Math.PI/2)
const texture=new THREE.TextureLoader().load('../../../public/智慧城市资源/火焰.png')
texture.wrapS=THREE.RepeatWrapping
texture.wrapT=THREE.RepeatWrapping
texture.repeat.set(1/15,1)
const material=new THREE.MeshBasicMaterial({
    transparent:true,
    side:THREE.DoubleSide,
    map:texture,
    depthWrite:false
})
const fire=new THREE.Mesh(geometry,material)
const fire1 = new THREE.Mesh(geometry, material)
fire1.rotation.z+=Math.PI/2
fire.position.set(13525600, 3663400, 420)
fire1.position.set(13525600, 3663400, 420)
fireGroup.add(fire)
fireGroup.add(fire1)
fireGroup.add(label)
function loop(){
    material.map.offset.x+=1/15
    requestAnimationFrame(loop)
}
loop()
export {fireGroup}