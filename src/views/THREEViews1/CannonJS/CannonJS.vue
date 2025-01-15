<template>
  <div>
    <div ref="container">
    </div>
    <div class="pos" ref="pos">
      <div id="test" class="bu">下落</div>
    </div>
  </div>
</template>

<script setup>
import { camera } from './index';
import { renderer,sphereBody,world,scene} from './index';
import { ref,onMounted,onBeforeUnmount } from 'vue';
const container=ref(null)
const pos=ref(null)
let isadd=false
onMounted(()=>{
    initThree()
    pos.value.addEventListener('click', () => {
    sphereBody.position.set(0,100,0)
      if (!isadd) { 
        world.addBody(sphereBody)
        isadd=true
      }
  })
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
function initThree(){
container.value.appendChild(renderer.domElement)
}
window.onresize=()=>{
    renderer.setSize(window.innerWidth,window.innerHeight)
    const aspect=window.innerWidth/window.innerHeight
    camera.aspect=aspect
    camera.updateProjectionMatrix()
}
</script>

<style scoped>
 .bu {
   background: rgba(0, 0, 0, 0.3);
   width: 60px;
   height: 60px;
   line-height: 60px;
   text-align: center;
   color: #fff;
   display: inline-block;
   border-radius: 30px;
 }

 .bu:hover {
   cursor: pointer;
 }

 .pos {
   position: absolute;
   left: 50%;
   margin-left: -30px;
   bottom: 100px;
 }
</style>