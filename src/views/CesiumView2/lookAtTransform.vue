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
//Set bounds of our simulation time
const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
const mid1 = Cesium.JulianDate.addSeconds(start,40,new Cesium.JulianDate());
const mid2 = Cesium.JulianDate.addSeconds(start,80,new Cesium.JulianDate());
const stop = Cesium.JulianDate.addSeconds(start, 120, new Cesium.JulianDate());
//Make sure viewer is at the desired time.
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
viewer.clock.multiplier = 30;
viewer.clock.shouldAnimate = true;
//路径
viewer.entities.add({
  id:'road',
  polyline:{
    positions:new Cesium.Cartesian3.fromDegreesArray([122,37,122,37.1,122.1,37.1,122.1,37,122,37]),
    material:new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED),
    width:10
  }
})
const pos1 = Cesium.Cartesian3.fromDegrees(122,37);
const pos2 = Cesium.Cartesian3.fromDegrees(122,37.1);
const pos3 = Cesium.Cartesian3.fromDegrees(122.1,37.1);
const pos4 = Cesium.Cartesian3.fromDegrees(122.1,37);
const position = new Cesium.SampledPositionProperty();
position.addSample(start, pos1);
position.addSample(mid1, pos2);
position.addSample(mid2, pos3);
position.addSample(stop, pos4);
//模型
const model=new Cesium.Entity({
  id:'model',
  position:position,
  model:{
    uri:'../../../CesiumBasicSource/无人机居中.glb',
    scale:100
  },
  orientation: new Cesium.VelocityOrientationProperty(position),
})
viewer.entities.add(model)
viewer.trackedEntity = model;

viewer.scene.preUpdate.addEventListener(()=>{
  //拿到模型的模型矩阵
const m=model.computeModelMatrix(viewer.clock.currentTime)
  console.log(m);
  viewer.camera.lookAtTransform(m, new Cesium.Cartesian3(-8000,0,2000))
})
viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(120.97,37,40000),
    orientation:{
        heading:Cesium.Math.toRadians(90),
        pitch:Cesium.Math.toRadians(-10),
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

</style>