<template>
  <div>
    <div ref="contianer"></div>
  </div>
</template>

<script setup>
import { onMounted,ref,onBeforeUnmount} from 'vue';
import { renderer,camera,scene} from './index.js';
import { model } from './model.js';
import * as THREE from 'three'
const contianer=ref(null)
const ray=(e)=>{
const x=e.offsetX
const y=e.offsetY
//设备坐标转屏幕坐标
const px=x/window.innerWidth*2-1
const py=-y/window.innerHeight*2+1
//拿到热点
const hot=model.getObjectByName('热点')
// console.log(hot);
//创建raycaster
const raycaster=new THREE.Raycaster()
raycaster.setFromCamera(new THREE.Vector2(px,py),camera)
const intersect=raycaster.intersectObjects(hot.children)
if(intersect.length>0){
  const herf=intersect[0].object.herf
  window.open(herf)
}



}
onMounted(()=>{
  initThree()
  document.addEventListener('click',ray)
})
function initThree(){
  contianer.value.appendChild(renderer.domElement)
}
onBeforeUnmount(()=>{
    renderer.dispose()
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