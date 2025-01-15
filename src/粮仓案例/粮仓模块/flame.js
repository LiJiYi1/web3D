import * as THREE from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
function createFlame(){
//创建贴图
const texture = new THREE.TextureLoader().load('../../../public/粮仓资源/火焰.png')
//设置纹理重复
texture.repeat.set(1/15, 1)
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
const material=new THREE.SpriteMaterial({
    map:texture
})
const flame=new THREE.Sprite(material)
flame.scale.set(100, 100, 1)
flame.position.y+=45
const div=document.createElement('div')
div.innerHTML='着火了!'
const table=new CSS2DObject(div)
flame.add(table)
return flame
}

export {createFlame}