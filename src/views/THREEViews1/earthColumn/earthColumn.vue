<template>
  <div>
    <div ref="contianer"></div>
  </div>
</template>

<script setup>
import { onMounted,ref,onBeforeUnmount} from 'vue';
import { renderer,camera,scene} from './index';
const contianer=ref(null)
onMounted(()=>{
   //如果上下文丢失我们要把上下文恢复
  if(renderer.getContext().isContextLost()){
     renderer.forceContextRestore() 
     //renderer.getContext().getExtension('WEBGL_lose_context').restoreContext();
  }
initThree()
})
function initThree(){
contianer.value.appendChild(renderer.domElement)
}
window.onresize=()=>{
  renderer.setSize(window.innerWidth,window.innerHeight)
  camera.aspect=window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
}
//路由切换时销毁dom页面,解决性能问题
onBeforeUnmount(()=>{
  // //清除请求动画帧
  // cancelAnimationFrame(id.has)
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
                // object.material.map=null
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
           // renderer.forceContextLoss () 
            //如果存在上下文，把上下文顺便也清除掉
            //renderer.forceContextLoss () 
//             if (renderer.getContext()) {
//      if(renderer.getContext().getExtension('WEBGL_lose_context')){
//           renderer.getContext().getExtension('WEBGL_lose_context').loseContext();
// }                         
//             }
        }
})
</script>

<style scoped>

</style>