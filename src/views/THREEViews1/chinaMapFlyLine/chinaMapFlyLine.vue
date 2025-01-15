<template>
  <div>
    <div ref="container"></div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted,ref } from 'vue';
import {renderer,camera,CSSRenderer,scene} from './index.js'
import { createAllBox } from './createAllBox.js';
import { model,div } from './model.js';
import { createAllCurve } from './createAllCurve.js';
import * as THREE from 'three'
const container=ref(null)
    const ray=(e)=>{
//设备坐标
const x=e.offsetX
const y=e.offsetY
//设备坐标转屏幕坐标
const px=x/window.innerWidth*2-1
const py=-y/window.innerHeight*2+1
//创建rayCaster
const rayCaster=new THREE.Raycaster()
rayCaster.setFromCamera(new THREE.Vector2(px,py),camera)
//拿到行政区地图的模型
const side=model.getObjectByName('行政区')
//给模型添加射线拾取
const intersect=rayCaster.intersectObjects(side.children)
if(intersect.length>0){
    //如果上次选中模型了就把上次选中的模型颜色变回去
    if(choose){
        choose.material.color.copy(color)
    }
    const mesh=intersect[0].object
    //把颜色和选中的模型存储起来
    choose=mesh
    color=mesh.material.color.clone()
    //改变选中模型的颜色
    mesh.material.color.set(0.5,0,0.5)
    //把棱锥放在选中地方的中心
    const zhui=model.getObjectByName('椎体')
    zhui.position.set(mesh.center[0],mesh.center[1])
    // console.log(mesh.name);
    //如果上一次选中了那这次就要从model中移除上次的层级模型
    if(boxGroup){model.remove(boxGroup)}
    const name=mesh.name
    const num=mesh.num
    //创建柱子
    boxGroup=createAllBox(name,num)
    //柱子加入model
    model.add(boxGroup)
    //创建曲线
    if(curveGroup){model.remove(curveGroup)}
    const center=mesh.center
    curveGroup=createAllCurve(name,center,num)
    //曲线加入model
    model.add(curveGroup)
}
//如果没有选中之前选中的也要变回去
else{
  if(choose){
        choose.material.color.copy(color)
    }
  choose=null
  color=null
}

    }
    const ray1=(e)=>{
//设备坐标
const x=e.offsetX
const y=e.offsetY
//设备坐标转屏幕坐标
const px=x/window.innerWidth*2-1
const py=-y/window.innerHeight*2+1
//创建rayCaster
const rayCaster=new THREE.Raycaster()
rayCaster.setFromCamera(new THREE.Vector2(px,py),camera)
//拿到行政区地图的模型
const side=model.getObjectByName('行政区')
//给模型添加射线拾取
const intersect=rayCaster.intersectObjects(side.children)
if(intersect.length>0){
    div.style.visibility='visible'
    const mesh=intersect[0].object
    //把标签内容改一下
    div.innerHTML='省份:'+mesh.name+'</br><hr>'+'数量:'+mesh.num
    //把标签放在选中地方的中心+3经度的地方
    const label=model.getObjectByName('标签')
    label.position.set(mesh.center[0]+3,mesh.center[1])
}
//没有选中就讲标签掩藏
else{
    div.style.visibility='hidden'
}
    }
onMounted(()=>{
    initThree()
    //射线拾取(点击拾取)
    let choose=null
    let color=null
    //创建的大量柱子层级模型,默认为山东的
    let boxGroup=createAllBox('山东',17)
    //加入model
    model.add(boxGroup)
    //创建的大量柱子层级模型,默认为山东的
    let curveGroup=createAllCurve('山东',[118.7402, 36.4307],17)
    //加入model
    model.add(curveGroup)

    document.addEventListener('click',ray)
    //射线拾取(鼠标滑动射线拾取)
    document.addEventListener('mousemove',ray1)
})
//路由切换时销毁dom页面,解决性能问题
onBeforeUnmount(()=>{
    document.removeEventListener('click',ray)
    document.removeEventListener('click',ray1)
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
//窗口大小改变后窗口实现自适应效果
window.onresize=()=>{
    //渲染器的dom元素大小改变
    renderer.setSize(window.innerWidth,window.innerHeight)
    //相机宽高比改变(不改变投影歪歪扭扭不正常)
    const aspect=window.innerWidth/window.innerHeight
    camera.aspect=aspect
    //更新相机投影矩阵否则上面代码无效
    camera.updateProjectionMatrix()
}



</script>

<style scoped>

</style>