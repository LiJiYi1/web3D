<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <input type="number" name="" id="rotatex" v-model="rotateX" @input="rotatex()" placeholder="绕X转">
    <input type="number" name="" id="rotatey" v-model="rotateY" @input="rotatey()" placeholder="绕Y转">
    <input type="number" name="" id="rotatez" v-model="rotateZ" @input="rotatez()" placeholder="绕Z转">
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
let rotateX=0;
let rotateY=0;
let rotateZ=0;
function rotatex(){
    viewer.entities.removeById('box');
    viewer.entities.add({
    id:'box',
    position:Cesium.Cartesian3.fromDegrees(120.84,37,5000),
    orientation:Cesium.Quaternion.fromHeadingPitchRoll(Cesium.HeadingPitchRoll.fromDegrees(rotateX, rotateY, rotateZ)),
    box:{
      dimensions:new Cesium.Cartesian3(10000,10000,10000),
      material:Cesium.Color.RED,
      outline:true,
      outlineColor:Cesium.Color.GOLD,
      outerWidth:100
    }
})
}
function rotatey(){
    viewer.entities.removeById('box');
    viewer.entities.add({
    id:'box',
    position:Cesium.Cartesian3.fromDegrees(120.84,37,5000),
    orientation:Cesium.Quaternion.fromHeadingPitchRoll(Cesium.HeadingPitchRoll.fromDegrees(rotateX,rotateY, rotateZ)),
    box:{
      dimensions:new Cesium.Cartesian3(10000,10000,10000),
      material:Cesium.Color.RED,
      outline:true,
      outlineColor:Cesium.Color.GOLD,
      outerWidth:100
    }
})
}
function rotatez(){
    viewer.entities.removeById('box');
    viewer.entities.add({
    id:'box',
    position:Cesium.Cartesian3.fromDegrees(120.84,37,5000),
    orientation:Cesium.Quaternion.fromHeadingPitchRoll(Cesium.HeadingPitchRoll.fromDegrees(rotateX, rotateY, rotateZ)),
    box:{
      dimensions:new Cesium.Cartesian3(10000,10000,10000),
      material:Cesium.Color.RED,
      outline:true,
      outlineColor:Cesium.Color.GOLD,
      outerWidth:100
    }
})
}
onMounted(()=>{
initCesium()
viewer.scene.globe.depthTestAgainstTerrain=true
viewer.entities.add({
    id:'box',
    position:Cesium.Cartesian3.fromDegrees(120.84,37,5000),
    orientation:Cesium.Quaternion.fromHeadingPitchRoll(Cesium.HeadingPitchRoll.fromDegrees(0, 0, 0)),
    box:{
      dimensions:new Cesium.Cartesian3(10000,10000,10000),
      material:Cesium.Color.RED,
      outline:true,
      outlineColor:Cesium.Color.GOLD,
      outerWidth:100
    }
})
viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(120.5,37,40000),
    orientation:{
        heading:Cesium.Math.toRadians(90),
        pitch:Cesium.Math.toRadians(-55),
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
    sceneModePicker:false,//2D,3D转换按钮
    timeline:false,//时间线
    navigationHelpButton:false,//帮助按钮
    navigationInstructionsInitiallyVisible:false,//不知道什么控件
    selectionIndicator:false,//不知道什么控件
 
})

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
#rotatex{
    position: absolute;
    left: 2%;
    top: 0px;
}
#rotatey{
    position: absolute;
    left: 2%;
    top: 20px;
}
#rotatez{
    position: absolute;
    left: 2%;
    top: 40px;
}
</style>