<template>
  <div>
    <div ref="container"></div>
  </div>
</template>

<script setup>
 import { onBeforeUnmount, onMounted,ref} from 'vue';
 import {renderer,camera,CSSRenderer,div,CSS2DObj,scene} from './index'
 import * as THREE from 'three'
 import { model } from './model';
 const container=ref()
 //存储上一个选中的mesh的颜色
 let choose=null
 let color=null
const ray=(e)=>{
const x=e.offsetX
const y=e.offsetY
//设备坐标转屏幕坐标
const px=x/window.innerWidth*2-1
const py=-y/window.innerHeight*2+1
console.log(px,py);
const rayCaster=new THREE.Raycaster()
rayCaster.setFromCamera(new THREE.Vector2(px,py),camera)
const mesh=model.getObjectByName('Mesh')
const intersect=rayCaster.intersectObjects(mesh.children)
if(intersect.length>0){
  //上一次选中了就把上次的颜色变回去
  if(choose){
    choose.material.color.copy(color)
    choose=null
    color=null
  }
  const mesh=intersect[0].object
  color=mesh.material.color.clone()
  choose=mesh
  mesh.material.color.set(0,1,1)
  div.innerHTML=mesh.name
  div.style.visibility='visible'
  CSS2DObj.position.copy(intersect[0].point)
  

}
//如果没选中就把上一次的颜色变回去
else{
  div.style.visibility='hidden'
  //上一次选中了就把上次的颜色变回去
  if(choose){
    choose.material.color.copy(color)
    choose=null
    color=null
  }
}

}
 onMounted(()=>{
  //射线拾取
  document.addEventListener('click',ray)
   initThree()
 })
 function initThree(){
  container.value.appendChild(renderer.domElement)
   container.value.appendChild(CSSRenderer.domElement)
 }
 onBeforeUnmount(()=>{
   document.removeEventListener('click',ray)
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
 window.onresize=()=>{
  renderer.setSize(window.innerWidth,window.innerHeight)
  camera.aspect=window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
 }
</script>

<style scoped>

</style>