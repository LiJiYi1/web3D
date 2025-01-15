<template>
  <div>
    <div ref="contianer"></div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted,ref } from 'vue';
import { renderer,camera,scene} from './index.js';
const contianer=ref(null)

onMounted(()=>{
  initThree()
})
function initThree(){
  contianer.value.appendChild(renderer.domElement)
}
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