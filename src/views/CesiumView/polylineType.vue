<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <div id="NONE" @click="none()">NONE直线</div>
    <div id="GEODESIC" @click="geodesic()">GEODESIC贴地球的曲线(默认)</div>
    <div id="RHUMB" @click="rhumb()">RHUMB墨卡托展开直线</div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
function none(){
viewer.entities.getById('polylineType')._polyline.arcType=Cesium.ArcType.NONE
viewer.scene.requestRender()
}
function geodesic(){
viewer.entities.getById('polylineType')._polyline.arcType=Cesium.ArcType.GEODESIC
viewer.scene.requestRender()
}
function rhumb(){
viewer.entities.getById('polylineType')._polyline.arcType=Cesium.ArcType.RHUMB
viewer.scene.requestRender()
}
onMounted(()=>{
initCesium()
viewer.entities.add({
  name:'polyLine',
  id:'polylineType',
  polyline:{
    positions:Cesium.Cartesian3.fromDegreesArray([-20,30,170,34]),
    material:new Cesium.PolylineGlowMaterialProperty({
      color:Cesium.Color.BLUE,
      glowPower:0.2,
      //taperPower:0.6
    }),
    width:20,
    distanceDisplayCondition:new Cesium.DistanceDisplayCondition(2500000, 80000000),
    arcType:Cesium.ArcType.GEODESIC
  }
})
viewer.zoomTo(viewer.entities)
})
function initCesium(){
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
}
</script>

<style scoped>
#NONE{
  width:100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  vertical-align:bottom;
  position: absolute;
  left: 2%;
  top:0px;
  background-color: #df0808;
  color: aquamarine;
}
#NONE:hover{
    width:100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  vertical-align:bottom;
  position: absolute;
  left: 2%;
  top:0px;
  background-color: #d37c7c;
}
#GEODESIC{
    width:100px;
  height: 60px;
    line-height: 60px;
  text-align: center;
  vertical-align:bottom;
  position: absolute;
  left: 2%;
  top:70px;
  background-color: #df0808;
   color: aquamarine;
}
#GEODESIC:hover{
    width:100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  vertical-align:bottom;
  position: absolute;
  left: 2%;
  top:70px;
  background-color: #d37c7c;
}
#RHUMB{
    width:100px;
  height: 120px;
    line-height: 60px;
  text-align: center;
  vertical-align:bottom;
  position: absolute;
  left: 2%;
  top:140px;
  background-color:  #df0808;
   color: aquamarine;
}
#RHUMB:hover{
    width:100px;
  height: 120px;
  line-height: 60px;
  text-align: center;
  vertical-align:bottom;
  position: absolute;
  left: 2%;
  top:140px;
  background-color: #d37c7c;
}
#main{
    width:100%;
    height: 100%;
}
#cesiumContainer{
    width: 98%;
    height: 90%;
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