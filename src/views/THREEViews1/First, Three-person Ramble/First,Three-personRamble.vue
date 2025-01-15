<template>
  <div id="mian">
    <div ref="container">
  </div>
  <div id="alert">WSAD控制移动,V切视角,M招手,单击进入鼠标指针状态(剩下动作懒得做了)</div>
</div>
</template>

<script setup>
import { onMounted,onUnmounted,ref,onBeforeUnmount } from 'vue';
import { renderer } from './renderloop.js';
import {camera} from './camera.js'
import { key,eye } from './modelType.js';
import { Animations } from './mesh.js';
import { scene } from './scene.js';
const container=ref(null)
//创建一个bool值控制是否为一三人称
let  isThree=true
//添加键盘事件控制移动
document.addEventListener('keydown',(e)=>{
  //W实现前进
  if(e.code==='KeyW')key.W=true
  //S实现后退
  else if(e.code==='KeyS')key.S=true
  //按A向左运动
  else if(e.code==='KeyA')key.A=true
  //按D像右运动
  else if(e.code==='KeyD')key.D=true
  //按M招手
  else if(e.code==='KeyM'){
         for (let key in Animations) {
            if (Animations[key]._clip.name ==='Wave') {
              console.log(Animations[key].weight);
              Animations[key].weight = 1
            }
            else {
              Animations[key].weight = 0
            }
        }
  }
  //按V实现视角切换
  else if(e.code==='KeyV'){
    if(isThree){
      camera.position.set(0, 2, 1)
    console.log(111);
    
    }
    else{
      camera.position.set(0, 2, -2)
    console.log(222);
    }
    isThree=!isThree
  }
})
document.addEventListener('keyup',(e)=>{
  //松W停止前进
   if(e.code==='KeyW')key.W=false
  //松S停止后退
  else if(e.code==='KeyS') key.S=false
  //松A停止向左运动
  else if(e.code==='KeyA')key.A=false
  //松D停止像右运动
  else if(e.code==='KeyD')key.D=false

})
//添加键盘事件控制视角
document.addEventListener('mousemove',(e)=>{
  // console.log(e.movementX);
   eye.leftRight=e.movementX
   eye.upDown=e.movementY
})
//按住左键才能转视角
document.addEventListener('mousedown',(e)=>{
eye.click=true
})
document.addEventListener('mouseup',(e)=>{
  eye.click=false
})

//路由切换时销毁dom页面,解决性能问题
onBeforeUnmount(()=>{
  // 清理场景中的对象
  //递归遍历场景,清除GPU负载的THREE.js几何体,材质和贴图等数据
  if(scene){
    scene.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if (object.material) {
              //如果材质有纹理就清除纹理
              if(object.material.map){
                object.material.map.dispose();
                //object.material.map=null
              }
                object.material.dispose();
            }
        });
        //scene.dispose()
  }
        // 清理WebGL渲染器
        if (renderer&&renderer.domElement) {
            renderer.dispose();
            renderer.domElement.remove()
            // if (renderer.getContext()) {
            //     renderer.getContext().getExtension('WEBGL_lose_context').loseContext();
            // }
        }
})
onUnmounted(()=>{
  if(document.pointerLockElement===container.value){ 
    document.exitPointerLock()
    console.log(111);
    
  }
})
onMounted(()=>{
initThree()
})
function initThree(){
container.value.appendChild(renderer.domElement)
container.value.addEventListener('mousedown',()=>{
container.value.requestPointerLock()
container.value.requestFullscreen()
})
}
window.onresize=()=>{
    renderer.setSize(window.innerWidth,window.innerHeight)
    const aspect=window.innerWidth/window.innerHeight
    camera.aspect=aspect
    camera.updateProjectionMatrix()
}
</script>

<style scoped>
#alert{
  position: absolute;
  top: 2%;
  left: 2%;
  color: white;
}
</style>