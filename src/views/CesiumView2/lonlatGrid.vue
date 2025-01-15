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
const scene = viewer.scene;
// 北京市大概范围
let startLon = 115.5;
let startLat = 39.5;
let endLon = 117.5;
let endLat = 41 ;
// 区域范围
const rectangle = viewer.entities.add({
    name: "Red translucent rectangle",
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
            startLon,
            startLat,
            endLon,
            endLat
        ),
        material: Cesium.Color.GREEN.withAlpha(0.15),
    },
});
// 四个角上绘制 1km为半径的球，用来检查网格正确性
function addSphere(lon,lat){
    viewer.entities.add({
        name: "Red sphere with black outline",
        position: Cesium.Cartesian3.fromDegrees(lon,lat),
        ellipsoid: {
            radii: new Cesium.Cartesian3(1000.0, 1000.0, 1000.00),
            material: Cesium.Color.RED.withAlpha(0.5),
            outline: true,
            outlineColor: Cesium.Color.BLACK,
        },
    });
}

addSphere(startLon,startLat);
addSphere(startLon,endLat);
addSphere(endLon,startLat);
addSphere(endLon,endLat);
let radius = viewer.scene.globe.ellipsoid.radii.x;
// dis 米为单位
function GetStep(radius,dis){
    return Cesium.Math.toDegrees(Math.acos(1-dis*dis/(2*radius*radius)));
}
// 纬度差
let stepLat = GetStep(radius,1000);

for(let i = startLat;i<endLat;i+=stepLat){
    viewer.entities.add({
        polyline: {
            positions:  Cesium.Cartesian3.fromDegreesArray([
                startLon,i,
                endLon,i,
            ]),
            width: 1,
            arcType: Cesium.ArcType.RHUMB,
            material: Cesium.Color.RED, 
            granularity:0.001,
            // clampToGround: true,
        },
    });
}

// 经度差
// let stepLon = GetStep(radius*Math.cos(Cesium.Math.toRadians(startLat)),1000);
let stepLonStart = GetStep(radius*Math.cos(Cesium.Math.toRadians(startLat)),1000);
let stepLonEnd = GetStep(radius*Math.cos(Cesium.Math.toRadians(endLat)),1000);

for(let j = startLon,k=startLon;j<endLon,k<endLon;j+= stepLonStart,k+=stepLonEnd){
    viewer.entities.add({
        polyline: {
            positions:  Cesium.Cartesian3.fromDegreesArray([
                j,startLat,
                k,endLat,
            ]),
            width: 1,
            arcType: Cesium.ArcType.RHUMB,
            material: Cesium.Color.RED, 
            granularity:0.001,
            // clampToGround: true,
        },
    });
}
viewer.zoomTo(viewer.entities);
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