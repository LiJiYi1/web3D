<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted,ref } from 'vue';
let viewer;
onMounted(()=>{
initCesium()
//创建一个圆的entity
const centerlon=121
const centerlat=37
const R=0.3
const arr=[]
for(let i=0;i<2000;i++){
  const radian=(Math.PI/1000)*i
  const lon=centerlon+R*Math.cos(radian)
  const lat=centerlat+R*Math.sin(radian)
   arr.push(lon,lat)
}
viewer.entities.add({
  id:"circle",
  polyline:{
    positions:new Cesium.Cartesian3.fromDegreesArray(arr),
    material:new Cesium.PolylineDashMaterialProperty({
color:Cesium.Color.RED,
gapColor:Cesium.Color.WHITE.withAlpha(0),
dashLength:20
    })
  }
})
viewer.camera.setView({
    destination:new Cesium.Cartesian3.fromDegrees(121,36.5,110000),
    orientation:{
        heading:Cesium.Math.toRadians(0),   
        pitch:Cesium.Math.toRadians(-50),
        roll:Cesium.Math.toRadians(0)
    }
})


})
function initCesium(){
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
viewer=new Cesium.Viewer('cesiumContainer',{
    animation:false,//动画控件
    baseLayerPicker:false,//基础图层选择器
    fullscreenButton:false,//全屏按钮
    vrButton:false,//vr按钮
    geocoder:false,//搜索框
    homeButton:false,//主页按钮
    infoBox:false,//infoBox按钮
    //sceneModePicker:false,//2D,3D转换按钮
    timeline:false,//时间线
    navigationHelpButton:false,//帮助按钮
    navigationInstructionsInitiallyVisible:false,//不知道什么控件
    selectionIndicator:false,//不知道什么控件
 
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

</style>