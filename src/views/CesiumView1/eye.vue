<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <div id="cesiumContainer1"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
onMounted(()=>{
const viewer=initCesium().viewer
const bottom=document.getElementsByClassName("cesium-viewer-bottom")
bottom[1].style.display='none'
// const viewer1=initCesium().viewer1
})
function initCesium(){
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
const viewer=new Cesium.Viewer('cesiumContainer',{
    animation:false,//动画控件
    baseLayerPicker:false,//基础图层选择器
    fullscreenButton:false,//全屏按钮
    vrButton:false,//vr按钮
    geocoder:false,//搜索框
    homeButton:false,//主页按钮
    infoBox:false,//infoBox按钮
    sceneModePicker:false,//2D,3D转换按钮
    timeline:false,//时间线
    navigationHelpButton:false,//帮助按钮
    navigationInstructionsInitiallyVisible:false,//不知道什么控件
    selectionIndicator:false,//不知道什么控件
 
})
const viewer1=new Cesium.Viewer('cesiumContainer1',{
    animation:false,//动画控件
    baseLayerPicker:false,//基础图层选择器
    fullscreenButton:false,//全屏按钮
    vrButton:false,//vr按钮
    geocoder:false,//搜索框
    homeButton:false,//主页按钮
    infoBox:false,//infoBox按钮
    sceneModePicker:false,//2D,3D转换按钮
    timeline:false,//时间线
    navigationHelpButton:false,//帮助按钮
    navigationInstructionsInitiallyVisible:false,//不知道什么控件
    selectionIndicator:false,//不知道什么控件
 
})
function syncView(){
   viewer1.camera.flyTo({
                destination:viewer.camera.position,
                orientation:viewer.orientation,
                duration:0.0
            });
}
const control=viewer1.scene.screenSpaceCameraController
control.enableTranslate=false
 control.enableRotate=false
control.enableZoom=false
control.enableTilt=false
 control.enableLook=false
viewer.entities.add({
    id:'label',
    position:new Cesium.Cartesian3.fromDegrees(0,0),
    label:{
        text:new Cesium.CallbackProperty(()=>{
            syncView()
            return ""
        },false)
    }
})
return viewer
}
</script>

<style scoped>
#main{
    width:100%;
    height: 100%;
}
#cesiumContainer{
    width: 98%;
    height: 98%;
}
#cesiumContainer1{
    border:1px solid red;
    position: absolute;
    right: 2%;
    bottom: 12%;
    width: 20%;
    height: 20%;
}
      /* 不占据空间，无法点击 */
      .cesium-viewer-toolbar,             /* 右上角按钮组 */
      .cesium-viewer-animationContainer,  /* 左下角动画控件 */
      .cesium-viewer-timelineContainer,   /* 时间线 */
      .cesium-viewer-bottom               /* logo信息 */
      {
        display: none;
      }
      .cesium-viewer-fullscreenContainer  /* 全屏按钮 */
      { position: absolute; top: -999em;  }
.cesium-viewer-bottom{
            display: none;
            visibility: hidden;
        }

</style>