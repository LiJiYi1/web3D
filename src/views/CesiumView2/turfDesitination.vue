<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <input type="number" id='radians' placeholder="输入创建点的角度" @input="createPoint()" v-model="value">
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
import * as turf from '@turf/turf'
let viewer;
let value;
function createPoint(){
const point = turf.point([120, 34]);
const bearing = value;
const options = {units: 'kilometers'};
const destination = turf.destination(point, 555.0, bearing, options);
console.log(destination);
viewer.entities.removeById('point3')
viewer.entities.removeById('line2')
//根据turf找到第三个点
viewer.entities.add({
    id:'point3',
    position:new Cesium.Cartesian3.fromDegrees(destination.geometry.coordinates[0],destination.geometry.coordinates[1],0),
    point:{
    pixelSize:30,
    color:Cesium.Color.BLUE
    }
})
//根据找到的点更新线
viewer.entities.add({
    id:'line2',
    polyline:{
    positions:Cesium.Cartesian3.fromDegreesArray([120,34,destination.geometry.coordinates[0],destination.geometry.coordinates[1]]),
   
    }
})
}
onMounted(()=>{
initCesium()
//创建第一个点(圆心)
viewer.entities.add({
    id:'point1',
    position:new Cesium.Cartesian3.fromDegrees(120,34,0),
    point:{
    pixelSize:30
    }
})
//创建起点
viewer.entities.add({
    id:'point2',
    position:new Cesium.Cartesian3.fromDegrees(120,39,0),
    point:{
    pixelSize:30,
    color:Cesium.Color.RED
    }
})
//圆心和起点创建线
viewer.entities.add({
    id:'line1',
    polyline:{
    positions:Cesium.Cartesian3.fromDegreesArray([120,34,120,39]),
   
    }
})
const point = turf.point([120, 34]);
const bearing = 30;
const options = {units: 'kilometers'};
const destination = turf.destination(point, 555.0, bearing, options);
console.log(destination);
//根据turf找到第三个点
viewer.entities.add({
    id:'point3',
    position:new Cesium.Cartesian3.fromDegrees(destination.geometry.coordinates[0],destination.geometry.coordinates[1],0),
    point:{
    pixelSize:30,
    color:Cesium.Color.BLUE
    }
})
//第三点和起点创建线
viewer.entities.add({
    id:'line2',
    polyline:{
    positions:Cesium.Cartesian3.fromDegreesArray([120,34,destination.geometry.coordinates[0],destination.geometry.coordinates[1]]),
   
    }
})
viewer.camera.setView({
  destination:Cesium.Cartesian3.fromDegrees( 120,39.9,2000000),
  orientation:{
heading:Cesium.Math.toRadians(-30),
pitch:Cesium.Math.toRadians(-100),
roll:Cesium.Math.toRadians(0),
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
#radians{
    position: absolute;
    left: 0px;
    top: 0px;
}
</style>