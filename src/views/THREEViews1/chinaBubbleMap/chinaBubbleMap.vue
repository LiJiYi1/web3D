<template>
  <div>
    <div ref="container"></div>
</div>
</template>

<script setup>
import {  onBeforeUnmount, onMounted,ref } from 'vue';
import {renderer,camera,CSSRenderer,scene} from './index.js'
import { model,div } from './model.js';
import * as THREE from 'three'
const container=ref(null)

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
let choose=null
let color=null
//标签
const label=model.getObjectByName('标签')
console.log(label);

const ray=(e)=>{
    const x=e.offsetX
    const y=e.offsetY
    //设备坐标转换为屏幕坐标
    const px=x/window.innerWidth*2-1
    const py=-y/window.innerHeight*2+1
    //创建射线拾取
    const raycaster=new THREE.Raycaster()
    raycaster.setFromCamera(new THREE.Vector2(px,py),camera)
    const intersect=raycaster.intersectObjects(model.getObjectByName('气泡').children)
    if(intersect.length>0){
        div.style.visibility='visible'
        div.innerHTML='城市:'+intersect[0].object.city+'</br><hr>'+'PM2.5:'+intersect[0].object.PM
        if(choose){
        choose.material.color.copy(color)
        choose=null
        color=null
        }
        choose=intersect[0].object
        color=intersect[0].object.material.color.clone()
        //改变选中的颜色
        intersect[0].object.material.color.set(0,0.5,1)
        const center=intersect[0].object.center
        //改便标签位置
        label.position.set(center[0],center[1],0)
    }
    else{
        div.style.visibility='hidden'
        if(choose){
        choose.material.color.copy(color)
        choose=null
        color=null
    }
    }
    
}
onMounted(()=>{
initThree()
//射线拾取
document.addEventListener('mousemove',ray)
})
//路由切换时销毁dom页面,解决性能问题
onBeforeUnmount(()=>{
    document.removeEventListener('mousemove',ray)
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