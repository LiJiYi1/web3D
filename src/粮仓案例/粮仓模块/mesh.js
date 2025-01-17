import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import * as THREE from 'three'
import { scene } from './scene.js';
const model=new THREE.Group()
const tag=new THREE.Group()
//实例化GLTFLoader
const loader=new GLTFLoader()
loader.load('../../../粮仓资源/model.gltf',(gltf)=>{
    //解决颜色偏差
    gltf.scene.traverse((obj)=>{
    if(obj.isMesh){
      if(obj.material.map)
      {
        obj.material.map.colorSpace = THREE.SRGBColorSpace;
      }
    }
    })
    const granary=gltf.scene.getObjectByName('粮仓')
    // granary.traverse((obj)=>{
    //   if(obj.isMesh)
    //   {//创建一个div元素
    //   const div = document.createElement('div')
    //   div.innerHTML=obj.name
    //   div.style.backgroundColor='green'
    //   div.style.borderRadius='4px'
    //   const label=new CSS2DObject(div)
    //   const v=new THREE.Vector3()
    //   obj.getWorldPosition(v)
    //   label.position.copy(v)
    //   if(obj.parent==='浅圆仓'){
    //     label.position.y+=20
    //   }
    //   else if (obj.parent.name == "立筒仓") {
    //       label.position.y += 36;
    //   } else if (obj.parent.name == "平房仓") {
    //       label.position.y += 17;
    //   }
    //   tag.add(label)
    // }
      
    // })
model.add(tag)
model.add(gltf.scene)
})
export {model}