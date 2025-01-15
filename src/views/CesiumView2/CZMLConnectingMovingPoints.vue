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

const czml = [
{
    id: "document",
    name: "CZML Polygon - Interpolating References",
    version: "1.0",
},
{
    id: "dynamicPolyline",
    name: "Dynamic Polygon with Reference Properties",
    availability: "2012-08-04T16:00:00Z/2012-08-04T17:00:00Z",
    polyline: {
    positions: {
        references: ["v1#position", "v3#position"],
    },
    perPositionHeight: true,
    material: {
        solidColor: {
        color: [
            {
            interval: "2012-08-04T16:00:00Z/2012-08-04T16:25:00Z",
            rgbaf: [1, 0, 1, 1],
            },
            {
            interval: "2012-08-04T16:30:00Z/2012-08-04T17:00:00Z",
            rgbaf: [0, 1, 1, 1],
            },
        ],
        },
    },
    },
},
{
    id: "v1",
    point: {
    color: {
        rgba: [255, 255, 255, 128],
    },
    outlineColor: {
        rgba: [255, 0, 0, 128],
    },
    outlineWidth: 3,
    pixelSize: 15,
    },
    path: {
    material: {
        polylineOutline: {
        color: {
            rgba: [255, 0, 255, 255],
        },
        outlineColor: {
            rgba: [0, 255, 255, 255],
        },
        outlineWidth: 5,
        },
    },
    width: 8,
    leadTime: 10,
    trailTime: 100,
    resolution: 5,
    },
    position: {
    interpolationAlgorithm: "LINEAR",
    interpolationDegree: 1,
    interval: "2012-08-04T16:00:00Z/2012-08-04T17:00:00Z",
    epoch: "2012-08-04T16:00:00Z",
    cartographicDegrees: [
        0,-60,35,30000,
        160,-65,35,5000000,
        400,-70,40,20000,800,
        -62,45,200000,1800,
        -65,40,650000,3600,
        -60,35,3000,
    ],
    },
},
{
    id: "v3",
    point: {
    color: {
        rgba: [255, 255, 255, 128],
    },
    outlineColor: {
        rgba: [255, 0, 0, 128],
    },
    outlineWidth: 3,
    pixelSize: 15,
    },
    path: {
    material: {
        polylineOutline: {
        color: {
            rgba: [255, 0, 255, 255],
        },
        outlineColor: {
            rgba: [0, 255, 255, 255],
        },
        outlineWidth: 5,
        },
    },
    width: 8,
    leadTime: 10,
    trailTime: 100,
    resolution: 5,
    },
    position: {
    interpolationAlgorithm: "LINEAR",
    interpolationDegree: 1,
    interval: "2012-08-04T16:00:00Z/2012-08-04T17:00:00Z",
    epoch: "2012-08-04T16:00:00Z",
    cartographicDegrees: [
        0,-45,60,4000,
        400,-40,70,2000000,
        1000,-35,75,100000,
        3600,-45,65,3000,
    ],
    },
},
];
const dataSource=await Cesium.CzmlDataSource.load(czml) 
viewer.dataSources.add(dataSource)

// viewer.camera.setView({
//   destination:Cesium.Cartesian3.fromDegrees(-45, 60,2000),
//   orientation:{
// heading:Cesium.Math.toRadians(-30),
// pitch:Cesium.Math.toRadians(-90),
// roll:Cesium.Math.toRadians(0),
//   }
// })
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
 shouldAnimate: true,
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