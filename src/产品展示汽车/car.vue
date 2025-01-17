<template>
  <div id="container" ref="container">
    <div id="rotateAudio">
      <div id="rotate">
        <img ref="rotation" id="rotateimg" src="../../汽车产品展示资源/停止旋转.png" alt="" width="24" style="vertical-align: middle;" @click="rotate()">
      </div>
      <div id="audio" style="margin-top: 20px;">
       <img ref="backgroundMusic" id="audioimg" src="../../汽车产品展示资源/关闭声音.png" alt="" width="24" style="vertical-align: middle;" @click="bgm()">
      </div>
      <div id="light" style="margin-top: 20px;">
       <img ref="light" id="lightimg" src="../../汽车产品展示资源/关车灯.png" alt="" width="24" style="vertical-align: middle;" @click="lights()">
      </div>
    </div>
    <div id="color" style="">
    <div class="colorChoose" id="color1"><img src="../../汽车产品展示资源/颜色选择/绿.jpg" @click="green()"></div>
    <div class="colorChoose" id="color2"><img src="../../汽车产品展示资源/颜色选择/灰.jpg" @click="gray()"></div>
    <div class="colorChoose" id="color3"><img src="../../汽车产品展示资源/颜色选择/红.jpg" @click="red()"></div>
    <div class="colorChoose" id="color4"><img src="../../汽车产品展示资源/颜色选择/黑.jpg" @click="black()"></div>
    <div class="colorChoose" id="color5"><img src="../../汽车产品展示资源/颜色选择/白.jpg" @click="white()"></div>
    </div>
    <div id="colorChange" class="colorChange">
       <img id="colorChageImg" src="../../汽车产品展示资源/变色.png" alt="" @click="colorAnimate()">
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { renderer } from './汽车模块/rendererloop.js';
import { backGround} from './汽车模块/BGM.js';
import { Rotate } from './汽车模块/rendererloop.js';
import { openLight,closeLight } from './汽车模块/light.js';
import { directLight1,directLight2 } from './汽车模块/scene.js';
import { model } from './汽车模块/gltf.js';
import { colorChange } from './汽车模块/changeColorAnimate.js';
const backgroundMusic=ref(null)
const rotation=ref(null)
const light=ref(null)
let haveBGM=null
let isRotate=null
let islight=null
function bgm(){
 if(haveBGM==='open'){
 backgroundMusic.value.src='../../汽车产品展示资源/关闭声音.png'
 backGround.pause()
 haveBGM='close'
 }
 else{
 backgroundMusic.value.src='../../汽车产品展示资源/打开声音.png'
 backGround.play()
 haveBGM='open'
 }
}
function rotate(){
if(isRotate==='rotate'){
isRotate='stopRotate'
rotation.value.src='../../汽车产品展示资源/停止旋转.png'
Rotate.rotate=false
}
else{
  isRotate='rotate'
  rotation.value.src='../../汽车产品展示资源/旋转.png'
  Rotate.rotate=true
}
}
function lights(){
if(islight==='close'){
light.value.src='../../汽车产品展示资源/开车灯.png'
openLight()
islight='open'
directLight1.intensity=0.2
directLight2.intensity=0.2
}
else{
  light.value.src='../../汽车产品展示资源/关车灯.png'
  closeLight()
  islight='close'
  directLight1.intensity=1
directLight2.intensity=1
}
}
const container=ref(null)
onMounted(()=>{

    initthree()
})
function initthree(){
container.value.appendChild(renderer.domElement)

}
//这些颜色改变其实是可以封装的，懒得封了，知道就行了
//改变其实也不用谢这么复杂可以直接拿到外壳，参考下面的colorChange那个封装
function green(){
  console.log(model);
  model.getObjectByName('外壳01').material.color.set(0,1,0)
  const leftFront= model.getObjectByName('左前门')
  const leftBack = model.getObjectByName('左后门')
  const rightFront = model.getObjectByName('右前门')
  const rigthBack = model.getObjectByName('右后门')
  const backBank = model.getObjectByName('后备箱')
  leftFront.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0,1,0)
    }
  })
    leftBack.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0,1,0)
    }
  })
    rightFront.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0,1,0)
    }
  })
    rigthBack.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0,1,0)
    }
  })
    backBank.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0,1,0)
    }
  })
  
}
function red(){
  console.log(model);
  model.getObjectByName('外壳01').material.color.set(1,0,0)
  const leftFront= model.getObjectByName('左前门')
  const leftBack = model.getObjectByName('左后门')
  const rightFront = model.getObjectByName('右前门')
  const rigthBack = model.getObjectByName('右后门')
  const backBank = model.getObjectByName('后备箱')
  leftFront.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(1,0,0)
    }
  })
    leftBack.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(1,0,0)
    }
  })
    rightFront.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(1,0,0)
    }
  })
    rigthBack.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(1,0,0)
    }
  })
    backBank.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(1,0,0)
    }
  })
  
}
function gray(){
  console.log(model);
  model.getObjectByName('外壳01').material.color.set(0.502,0.502,0.502)
  const leftFront= model.getObjectByName('左前门')
  const leftBack = model.getObjectByName('左后门')
  const rightFront = model.getObjectByName('右前门')
  const rigthBack = model.getObjectByName('右后门')
  const backBank = model.getObjectByName('后备箱')
  leftFront.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0.502,0.502,0.502)
    }
  })
    leftBack.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0.502,0.502,0.502)
    }
  })
    rightFront.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0.502,0.502,0.502)
    }
  })
    rigthBack.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0.502,0.502,0.502)
    }
  })
    backBank.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0.502,0.502,0.502)
    }
  })
  
}
function black(){
  console.log(model);
  model.getObjectByName('外壳01').material.color.set(0,0,0)
  const leftFront= model.getObjectByName('左前门')
  const leftBack = model.getObjectByName('左后门')
  const rightFront = model.getObjectByName('右前门')
  const rigthBack = model.getObjectByName('右后门')
  const backBank = model.getObjectByName('后备箱')
  leftFront.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0,0,0)
    }
  })
    leftBack.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0,0,0)
    }
  })
    rightFront.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0,0,0)
    }
  })
    rigthBack.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0,0,0)
    }
  })
    backBank.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(0,0,0)
    }
  })
  
}
function white(){
  console.log(model);
  model.getObjectByName('外壳01').material.color.set(1,1,1)
  const leftFront= model.getObjectByName('左前门')
  const leftBack = model.getObjectByName('左后门')
  const rightFront = model.getObjectByName('右前门')
  const rigthBack = model.getObjectByName('右后门')
  const backBank = model.getObjectByName('后备箱')
  leftFront.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(1,1,1)
    }
  })
    leftBack.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(1,1,1)
    }
  })
    rightFront.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(1,1,1)
    }
  })
    rigthBack.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(1,1,1)
    }
  })
    backBank.traverse((obj)=>{
    if(obj.isMesh&&obj.name.slice(0,2)==='外壳'){
      obj.material=obj.material.clone()
      obj.material.color.set(1,1,1)
    }
  })
  
}

function colorAnimate(){
  colorChange(model).start().onComplete(()=>{
  })
}
</script>

<style>
    #rotateAudio {
      position: absolute;
      left: 2%;
      top: 50%;
      margin-top: -55px;
    }

    #rotateAudio div {
      padding: 10px 10px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 22px;
      cursor: pointer;
    }
    #audio{
      position: absolute;
      left:0px;
      top:20px
    }
    #rotate{
      position: absolute;
      left:0px;
      top:-105px
    }
    #light{
      position: absolute;
      left:0px;
      top:-60px
    }
    .colorChoose {
     float: left;
    cursor: pointer;
    }

    .colorChoose img {
      margin-left: 15px;
      width: 50px;
      border-radius: 25px;
    }

    #color {
      width: 380px;
      position: absolute;
      background: rgba(0, 0, 0, 0.2);
      padding: 10px 16px;
      border-radius: 6px;
      right:2%;
      bottom: 20%;
    
    }
    #colorChange{
      position: absolute;
      right: 6%;
      top:2%;
      background-color:rgba(0, 0, 0, 0.8);
      opacity: 0.9;
      width: 50px;
      border-radius: 25px;
    }
    .colorChange img{
      width: 50px;
      border-radius: 25px;
    }
</style>