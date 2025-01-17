<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
onMounted(async()=>{

initCesium()
//创建渐变
const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
const mid=Cesium.JulianDate.addSeconds(start, 6, new Cesium.JulianDate());
const mid1=Cesium.JulianDate.addSeconds(start, 12, new Cesium.JulianDate());
const mid2=Cesium.JulianDate.addSeconds(start, 18, new Cesium.JulianDate());
const stop = Cesium.JulianDate.addSeconds(start,24, new Cesium.JulianDate());
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
viewer.clock.multiplier = 1;
viewer.clock.shouldAnimate = true;
//Set timeline to simulation bounds
//viewer.timeline.zoomTo(start, stop);
//Create a linearly interpolated Cartesian2
//Populate it with data
const pos1 = Cesium.Cartesian3.fromDegrees(120, 39.999,3000);
const pos2 = Cesium.Cartesian3.fromDegrees(120, 40,3000);
const pos3 = Cesium.Cartesian3.fromDegrees(119.999, 40,3000);
const pos4 = Cesium.Cartesian3.fromDegrees(119.999, 39.999,3000);
const position = new Cesium.SampledPositionProperty();
position.addSample(start, pos1);
position.addSample(mid, pos2);
position.addSample(mid1, pos3);
position.addSample(mid2, pos4);
position.addSample(stop, pos1);
//用entity创建模型
const entity = viewer.entities.add({
    id:'model',
//     new Cesium.TimeInterval({
//       start: start,
//       stop: stop,
//     }),
//    ]),
  model: {
    uri: "../../../CesiumBasicSource/无人机居中.glb",
    //minimumPixelSize: 64,
  },
  //viewFrom:new Cesium.Cartesian3(-100.0, 0.0, 100.0),
  position:position,
  orientation: new Cesium.VelocityOrientationProperty(position),
  scale:1000
});
viewer.entities.add({
id:'recangle',
  rectangle: {
coordinates:new Cesium.Rectangle.fromDegrees(119.999, 39.999,120, 40),
material:Cesium.Color.RED.withAlpha(0.6),
extrudedHeight:3000.0
  },
})

viewer.camera.setView({
  destination:Cesium.Cartesian3.fromDegrees( 120,39.9,20000),
  orientation:{
heading:Cesium.Math.toRadians(-30),
pitch:Cesium.Math.toRadians(0),
roll:Cesium.Math.toRadians(0),
  }
})
viewer.trackedEntity = entity;
})

async function initCesium(){

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
    timeline:true,//时间线
    navigationHelpButton:false,//帮助按钮
    navigationInstructionsInitiallyVisible:false,//不知道什么控件
    selectionIndicator:false,//不知道什么控件
    shouldAnimate:true
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
#rotateX{
  position:absolute;
  left:0px;
  top:10px;
  width:110px;
  height: 30px;
  background-color: #fff;
  cursor: pointer;
}
#rotateX:hover{
  position:absolute;
  left:0px;
  top:10px;
  width:110px;
  height: 30px;
  background-color: #c41919;
  cursor: pointer;
}
#rotateY{
  position:absolute;
  left:120px;
  top:10px;
  width:110px;
  height: 30px;
  background-color: #fff;
  cursor: pointer;
}
#rotateY:hover{
  position:absolute;
  left:120px;
  top:10px;
  width:110px;
  height: 30px;
  background-color: #c41919;
  cursor: pointer;
}
#rotateZ{
  position:absolute;
  left:240px;
  top:10px;
  width:110px;
  height: 30px;
  background-color: #fff;
}
#rotateZ:hover{
  position:absolute;
  left:240px;
  top:10px;
  width:110px;
  height: 30px;
  background-color:#c41919;
}


#rotateX1{
  position:absolute;
  left:0px;
  top:80px;
  width:130px;
  height: 30px;
  background-color: #fff;
  cursor: pointer;
}
#rotateX1:hover{
  position:absolute;
  left:0px;
  top:80px;
  width:130px;
  height: 30px;
  background-color: #75d61f;
  cursor: pointer;
}
#rotateY1{
  position:absolute;
  left:140px;
  top:80px;
  width:130px;
  height: 30px;
  background-color: #fff;
  cursor: pointer;
}
#rotateY1:hover{
  position:absolute;
  left:140px;
  top:80px;
  width:130px;
  height: 30px;
  background-color:  #75d61f;
  cursor: pointer;
}
#rotateZ1{
  position:absolute;
  left:280px;
  top:80px;
  width:130px;
  height: 30px;
  background-color: #fff;
  cursor: pointer;
}
#rotateZ1:hover{
  position:absolute;
  left:280px;
  top:80px;
  width:130px;
  height: 30px;
  background-color:  #75d61f;
  cursor: pointer;
}
#rotateS{
  position:absolute;
  left:400px;
  top:10px;
  width:150px;
  height: 30px;
  background-color:#c41919;
}
#rotateS:hover{
  position:absolute;
  left:400px;
  top:10px;
  width:150px;
  height: 30px;
  background-color:#191ca6;
  cursor: crosshair;
}
</style>