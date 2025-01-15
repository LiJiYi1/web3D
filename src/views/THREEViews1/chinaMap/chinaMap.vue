<template>
  <div>
    <div ref="container"></div>
</div>
</template>

<script setup>
import {  onMounted,ref,onBeforeUnmount } from 'vue';
import {renderer,camera,CSSRenderer,scene} from './index.js'
import { model } from './model.js';
import * as THREE from 'three'
const container=ref(null)
onMounted(()=>{
initThree()
})
function initThree(){
container.value.appendChild(renderer.domElement)
container.value.appendChild(CSSRenderer.domElement)
}
window.onresize=()=>{
  renderer.setSize(window.innerWidth,window.innerHeight)
  const s=27
  const k=window.innerWidth/window.innerHeight
  camera.left=-s*k
  camera.right=s*k
  camera.top=s
  camera.bottom=-s
  camera.updateProjectionMatrix()
}
//实现射线拾取
document.addEventListener('click',(e)=>{
  const x=e.offsetX
  const y=e.offsetY
  //屏幕坐标转标准坐标
  const px=(x/window.innerWidth)*2-1
  const py=-(y/window.innerHeight)*2+1
  // console.log(px,py);
  const raycaster=new THREE.Raycaster()
  raycaster.setFromCamera(new THREE.Vector2(px,py),camera)
  //  console.log(model.getObjectByName('地区'));
  const area=model.getObjectByName('地区')
  const intersect=raycaster.intersectObjects(area.children)
  console.log(intersect);
  if(intersect.length>0){
    const obj=intersect[0].object
    obj.material.color.set(0xff0000)
    
  }
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
</script>

<style scoped>

</style>