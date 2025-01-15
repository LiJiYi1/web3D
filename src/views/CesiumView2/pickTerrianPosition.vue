<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <div id="point">点击立方体在立方体上创建点</div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
onMounted(()=>{
initCesium()
const handler=new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
handler.setInputAction(function(movement) {
    const feature = viewer.scene.pickPosition(movement.position);
    console.log(feature);
    if(feature){
viewer.entities.add({
    position:feature,
    point:{
       pixelSize:30,
       color:Cesium.Color.RED,
       outlineColor:Cesium.Color.AZURE,
       outlineWidth:3
    }
})
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
viewer.entities.add({
    id:'box',
    position:Cesium.Cartesian3.fromDegrees(120.88,37,500),
    box:{
        dimensions:new Cesium.Cartesian3(1000,1000,1000),
        material:Cesium.Color.GOLD.withAlpha(0.3)
    }
})

viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(120.84,37,2000),
    orientation:{
        heading:Cesium.Math.toRadians(90),
        pitch:Cesium.Math.toRadians(-25),
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
 terrain:Cesium.Terrain.fromWorldTerrain(),
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
#point{
    position: absolute;
  left: 0px;
  top: 100px;
  background-color: chartreuse;

}
</style>