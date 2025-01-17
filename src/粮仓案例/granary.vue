<template>
  <div id="container" ref="container">
    <div id="messageTag" style="position: absolute;width:500px;height:200px;color: #fff;z-index: 2;font-size: 16px;visibility:hidden" ref="tag">
    <div style="position:relative;">
      <div style="position: absolute;left: 0px;top: 0px;">
        <img src="../../粮仓资源/信息背景.png" alt="" style="width:400px;opacity: 1.0;">
      </div>
      <div id="granaryName" style="position:absolute;left:25px;top:40px;font-size:16px" ref="tag1">平房仓 P_01</div>
      <div style="position:absolute;left:290px;top:25px">
        <img src="../../粮仓资源/温度.png" alt="" style="width:50px;">
      </div>
      <div id="temperature" style="position:absolute;left:330px;top:40px">19℃</div>
      <div id="grain" style="position:absolute;left:170px;top:50px">红豆(吨)</div>
      <div style="position:absolute;left:80px;top:85px;font-size:60px;color:#00ffff;vertical-align:middle">
        <img id="grainImg" src="../../粮仓资源/豆子/红豆.png" alt="" style="width:60px;">
      </div>
      <div ref="weight" id="weight" style="position:absolute;left:155px;top:80px;font-size:60px;color:#00ffff;vertical-align:middle">
        3600 t</div>
      <div id="granaryHeight" style="position:absolute;left:70px;top:170px;padding:8px 25px;border-radius:30px;border:1px solid #00ffff;">
        仓高—12m</div>
      <div id="grainHeight" style="position:absolute;left:225px;top:170px;padding:8px 25px;">粮高— 5 m</div>
    </div>
  </div>
  </div>
</template>

<script  setup>
import { ref } from 'vue';
import * as THREE from 'three'
import {renderer,cssRenderer} from './粮仓模块/renderloop.js'
import { onMounted } from 'vue';
import { camera } from './粮仓模块/camera.js';
import { model } from './粮仓模块/mesh.js';
import { flame } from './粮仓模块/renderloop.js';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
model.add(flame)
const container=ref(null)
const tag=ref(null)
const tag1=ref(null)
const weight=ref(null)
document.addEventListener('click',(e)=>{
const x=e.offsetX
const y=e.offsetY
const px=2*x/window.innerWidth-1
const py=-2*y/window.innerHeight+1
console.log(px,py);
//创建射线拾取
const raycaster = new THREE.Raycaster();
raycaster.setFromCamera(new THREE.Vector2(px,py),camera)
// console.log(raycaster);
// console.log(model.getObjectByName('Scene').getObjectByName('粮仓').children);
const garnary=model.getObjectByName('Scene').getObjectByName('粮仓')
// console.log(garnary);
//开始拾取
const intersect=raycaster.intersectObject(garnary)
console.log(intersect);
if(intersect.length>0){
  tag.value.style.visibility='visible'
  garnary.traverse((obj)=>{
    if(obj.isMesh){
      obj.material.color.set(1,1,1)
    }
  })
  // console.log(intersect[0].object);
  intersect[0].object.material=intersect[0].object.material.clone()
  intersect[0].object.material.color.set(0,1,1)
  tag1.value.innerHTML=intersect[0].object.name
  const v=new THREE.Vector3()
  intersect[0].object.getWorldPosition(v)
  model.children[1].position.copy(v)
  //火焰位置
  flame.position.copy(v)
  flame.position.y+=54
  //  console.log(model.children[0]);
  weight.value.innerHTML=0
  let weights=0;
  const interval= setInterval(() => {
    if(weights<3600){
          weights+=100
          weight.value.innerHTML=weights 
    }
    else{
      clearInterval(interval)
    }
  }, 5);
}

})
function initThree(){
    //创建一个标签mesh
    const tagl=new CSS2DObject(tag.value)
    console.log(tagl.scale);
    tagl.scale.set(0.5,0.5,0.5)
    model.add(tagl)
    container.value.appendChild(renderer.domElement)
    container.value.appendChild(cssRenderer.domElement)
}
onMounted(()=>{
initThree()
})
</script>

<style>

</style>