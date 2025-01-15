<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';

let viewer;
onMounted(()=>{
initCesium()
viewer.scene.globe.depthTestAgainstTerrain=true;
let height=1000;
//创建一个polygon
viewer.entities.add({
    id:'water',
    polygon:{
        hierarchy:new Cesium.Cartesian3.fromDegreesArrayHeights([113,37,2000,113,37.04,2000,113.04,37.04,2000,113.04,37,2000]),
        material:Cesium.Color.SKYBLUE.withAlpha(0.8),
        extrudedHeight:new Cesium.CallbackProperty(()=>{
            if(height<1300)
            height+=1
         return height
        },false)
    }
})
viewer.camera.setView({
    destination :Cesium.Cartesian3.fromDegrees(113.02,37.02,6000),
    orientation: {
        heading : Cesium.Math.toRadians(8.0), // east, default value is 0.0 (north)
        pitch : Cesium.Math.toRadians(-80),    // default value (looking down)
        roll : 0.0                             // default value
    }
});
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
 terrain:Cesium.Terrain.fromWorldTerrain({
     requestWaterMask: true,
    requestVertexNormals: true,
 }),

})
}

</script>

<style scoped>
#main{
    width:100%;
    height: 100%;
}
#cesiumContainer{
    width: 100%;
    height: 93%;
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