<template>
  <div id="container" ref="container">
    <div id="color">
    <!-- 四个按钮 -->
    <div class="colorChoose" id="map1"><img src="/手机产品展示资源/手机颜色纹理贴图/极光紫.png" @click="change1()"></div>
    <div class="colorChoose" id="map2"><img src="/手机产品展示资源/手机颜色纹理贴图/幻夜黑.png" @click="change2()"></div>
    <div class="colorChoose" id="map3"><img src="/手机产品展示资源/手机颜色纹理贴图/珊瑚红.png" @click="change3()"></div>
    <div class="colorChoose" id="map4"><img src="/手机产品展示资源/手机颜色纹理贴图/极光蓝.png" @click="change4()"></div>
  </div>
    <div id="rotate"><img id="img" src="/手机产品展示资源/rotate/旋转.png" @click="rotate"></div>
  <div id="camera" ref="cameraB">
    <div>
      <div style="height:1px;width:130px;background: #00ffff;margin-top:68px"></div>
    </div>
    <div id="message" style="width:350px;height:120px;">
      <div style="padding: 10px 4px;font-size:18px;">双摄像头</div>
      <div style="padding: 10px 24px;font-size:16px;">后置主摄像头——1300万像素(F/1.8光圈)</div>
      <div style="padding: 10px 24px;font-size:16px;">后置副摄像头——200万像素的</div>
    </div>
    <!-- 设置一个关闭按钮 -->
    <div style="position:relative;">
      <div style="position: absolute;left: -30px;top: 10px;" @click="close()">
        <img id="close" src="/手机产品展示资源/关闭.png" alt="" width="18" style="cursor: pointer;">
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { gui } from './手机产品展示模块/scene.js';
import { onUnmounted, ref } from 'vue';
import { onMounted } from 'vue';
import { renderer,rotates,cssRender} from './手机产品展示模块/renderer.loop.js';
import { model } from './手机产品展示模块/model.js';
import { CSS3DRenderer ,CSS3DObject} from 'three/addons/renderers/CSS3DRenderer.js';
import * as THREE from 'three'
import { scene } from './手机产品展示模块/scene.js';
import { camera } from './手机产品展示模块/camera.js';
const loader=new THREE.TextureLoader(
)
const map1=loader.load('/手机产品展示资源/手机颜色纹理贴图/极光紫 copy.png')
const map2=loader.load('/手机产品展示资源/手机颜色纹理贴图/幻夜黑 copy.png')
const map3=loader.load('/手机产品展示资源/手机颜色纹理贴图/珊瑚红 copy.png')
const map4=loader.load('/手机产品展示资源/手机颜色纹理贴图/极光蓝 copy.png')
map1.flipY=false
map2.flipY=false
map3.flipY=false
map4.flipY=false
const container=ref(null)
const cameraB=ref(null)
function rotate(e){
// console.log(rotates.rotates);
if(rotates.rotates){
  e.target.src='/手机产品展示资源/rotate/旋转.png';
  rotates.rotates= false
}
else{
  e.target.src='/手机产品展示资源/rotate/停止旋转.png'
  rotates.rotates=true
}
}
onUnmounted(()=>{
 if(gui){ 
  gui.close()
 }
})


function close(){
  cameraB.value.style.visibility='hidden'
}
function change1(){
  const phone=model.getObjectByName('手机')
  console.log(phone);
  console.log(map1);
phone.material.map=map1
}
function change2(){
  const phone=model.getObjectByName('手机')
  phone.material.map=map2
}
function change3(){
  const phone=model.getObjectByName('手机')
  phone.material.map=map3
}
function change4(){
  const phone=model.getObjectByName('手机')
  phone.material.map=map4
}
gui.domElement.style.position='absolute'
gui.domElement.style.top='10%'
gui.domElement.style.right='0px'
onMounted(()=>{
  gui.domElement.style.visibility='visible'
    initThree()
})

function initThree(){
cameraB.value.pointerEvents='none'
const obj=new CSS3DObject(cameraB.value)
obj.scale.set(0.2,0.2,0.2)
obj.position.x=66
obj.position.y=47
obj.position.z=-6
model.add(obj)
container.value.appendChild(renderer.domElement)
container.value.appendChild(cssRender.domElement)
container.value.appendChild(gui.domElement)
}
//射线拾取模型
document.addEventListener('click', (e) => {
        const x = e.offsetX
        const y = e.offsetY
        const px = 2*(x/window.innerWidth) - 1
        const py = -2*(y/window.innerHeight) + 1
        const rayCaster = new THREE.Raycaster()
        rayCaster.setFromCamera(new THREE.Vector2(px, py), camera)
        const light = model.getObjectByName('光点')
        console.log(light);
        
        const intersect = rayCaster.intersectObject(model)
        console.log(px,py);
        
        console.log(intersect);
if(intersect.length>0){
  if(intersect[0].object.name==='光点')cameraB.value.style.visibility='visible'
}
  })
</script>

<style scoped>
 /* 旋转UI按钮样式 */
    #rotate {
       position: absolute;
       top:30%;
       right: 6%;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 30px;
      padding: 12px;
    }
    #rotate img{
      cursor: pointer;
      width:26px;
    }    
    #color{
      position: absolute;
      top:66px;
      left: 2%;
    }
     #camera {
      position: absolute;
      display: flex;
      /* row是flex-direction默认值,可以不设置，表示主轴为水平方向，从左向右排列*/
      flex-direction: row;
      /*space-between表示*/
      justify-content: space-between;
      /* visibility: hidden; */
      visibility: hidden
    }

    #message {
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      padding: 0px;
      /* 边框 */
      background: linear-gradient(#00ffff, #00ffff) left top,
        linear-gradient(#00ffff, #00ffff) left top,
        linear-gradient(#00ffff, #00ffff) right bottom,
        linear-gradient(#00ffff, #00ffff) right bottom;
      background-repeat: no-repeat;
      background-size: 2px 20px, 36px 2px;
      background-color: rgba(255, 255, 255, 0.1);
      color: #ffffff;
      font-size: 18px;
      padding: 8px 12px;
    }
</style>