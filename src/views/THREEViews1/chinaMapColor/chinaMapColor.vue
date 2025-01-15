<template>
  <div>
    <div ref="container"></div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted,ref } from 'vue';
import { renderer,camera,CSSRenderer,cssObj,div,scene} from './index.js';
import { model } from './model.js';
import * as THREE from 'three'
const container=ref(null)
//创建一个变量确定是否有选中网格模型
let choose=null
//创建一个颜色变量储存颜色
let color=null
const ray=(e)=>{
    const x=e.offsetX
    const y=e.offsetY
    //设备坐标转屏幕坐标
    const px=x/window.innerWidth*2-1
    const py=-y/window.innerHeight*2+1
    //创建rayCaster
    const raycaster=new THREE.Raycaster()
    raycaster.setFromCamera(new THREE.Vector2(px,py),camera)
    const intersect=raycaster.intersectObjects(model.getObjectByName('形状填充').children)
    if(intersect.length>0){
        //如果选中了网格模型就让他的颜色变回去
        if(choose){ 
        div.style.visibility='visible'
        choose.material.color.copy(color)
        //选中的几何体和颜色都变回空色
        choose=null
        color=null
        }
     
        //选中之后先储存几何体颜色
        color=intersect[0].object.material.color.clone()
        //选中之后改变选中几何体的颜色
        intersect[0].object.material.color.set(0,0.7,1)
        choose=intersect[0].object
        //选中模型的中心
        const center=intersect[0].object.center
        //对CSS2DObject的位置进行调整
        cssObj.position.set(center[0],center[1],0)
        //对标签内容进行改变
        div.innerHTML=intersect[0].object.name+'GDP:'+intersect[0].object.gdp+'亿元'
    }
    else{
        div.style.visibility='hidden'
        if(choose){ 
        div.style.visibility='visible'
        choose.material.color.copy(color)
        //选中的几何体和颜色都变回空色
        choose=null
        color=null
        }
        }
}
onMounted(()=>{
initThree()
document.addEventListener('mousemove',ray)
})
//路由切换时销毁dom页面,解决性能问题
onBeforeUnmount(()=>{
    document.removeEventListener('mousemove',ray)
    container.value.removeChild(renderer.domElement)
    choose=null
    //创建一个颜色变量储存颜色
    color=null
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


</script>

<style scoped>

</style>