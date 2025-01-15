<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <div id="changehide" @click="hide()">改变透明物体遮挡(文档里是只读属性不好动态修改)</div>
    <div id="changeHide" @click="hide1()">改变地形遮挡</div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
function hide(){
// 方法二 动态改变
viewer.scene.orderIndependentTranslucency=true;
}
function hide1(){
if(viewer.scene.globe.depthTestAgainstTerrain===true){
    viewer.scene.globe.depthTestAgainstTerrain=false;
}
else if(viewer.scene.globe.depthTestAgainstTerrain===false){
    viewer.scene.globe.depthTestAgainstTerrain=true;
}
}
onMounted(()=>{
initCesium()
//创建两个透明物体
viewer.entities.add({
    id:'box1',
    position:Cesium.Cartesian3.fromDegrees(120,37,500),
    box:{
        dimensions:new Cesium.Cartesian3(1000,1000,1000),
        material:Cesium.Color.RED.withAlpha(0.5)
    }
})
//创建两个透明物体
viewer.entities.add({
    id:'box2',
    position:Cesium.Cartesian3.fromDegrees(120.1,37,500),
    box:{
        dimensions:new Cesium.Cartesian3(10,1000,1000),
        material:Cesium.Color.BLUE.withAlpha(0.5)
    }
})

viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(120.2,37,200),
    orientation:{
        heading:Cesium.Math.toRadians(-90),
        pitch:Cesium.Math.toRadians(0),
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
    orderIndependentTranslucency:false,
    terrain:Cesium.Terrain.fromWorldTerrain(),
})

}
</script>

<style scoped>
#changehide{
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: red;
    cursor: pointer;
}
#changehide:hover{
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: rgb(109, 201, 100);
    cursor: pointer;
}
#changeHide{
    position: absolute;
    left: 0px;
    top: 40px;
    background-color: red;
    cursor: pointer;
}
#changeHide:hover{
    position: absolute;
    left: 0px;
    top: 40px;
    background-color: rgb(81, 255, 0);
    cursor: pointer;
}
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