<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <div id="UNBOUNDED" @click="UNBOUNDED()">UNBOUNDED</div>
    <div id="LOOP" @click="LOOP()">LOOP_STOP</div>
    <div id="CLAMPED" @click="CLAMPED()">CLAMPED(一定要最后点)</div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
let czml=[
  {
    id: "document",
    name: "CZML Path",
    version: "1.0",
    clock: {
      interval: "2012-08-04T10:00:00Z/2012-08-04T10:00:20Z",
      currentTime: "2012-08-04T10:00:00Z",
      range: "LOOP_STOP",
      multiplier: 10,
    },
  },
  {
    id: "point 1",
    name: "point",
    position: {
      "cartographicDegrees": [ -122.93797, 39.50935, 1776],
    },
    point: {
      color: {
        rgba: [255, 255, 255, 255],
      },
      outlineColor: {
        rgba: [255, 0, 0, 255],
      },
      outlineWidth: 4,
      pixelSize: 20,
    },
  },
  {
    id: "path",
    name: "path with GPS flight data",
    description:
      "<p>Hang gliding flight log data from Daniel H. Friedman.<br>Icon created by Larisa Skosyrska from the Noun Project</p>",
    availability: "2012-08-04T10:00:00Z/2012-08-04T10:00:20Z",
    path: {
      material: {
        polylineOutline: {
          color: {
            rgba: [255, 255, 255, 255],
          },
          outlineColor: {
            rgba: [0, 255, 255, 255],
          },
          outlineWidth: 5,
        },
      },
      width: 8,
       leadTime: 0,
      trailTime:10,
      resolution: 1000,
    },
    billboard: {
      image:"/../CesiumBasicSource/kebi.jpg",
      scale: 0.2,
      eyeOffset: {
        cartesian: [0.0, 3.0, -10.0],
      },
    },
    // model:{
    //   gltf: "/../CesiumBasicSource/fly.glb",
    //   //orientation: new Cesium.VelocityOrientationProperty(property),
    // },
    position: {
      epoch: "2012-08-04T10:00:00Z",
      cartographicDegrees: [ 0.0, 121.7, 36.5, 0.0, 20.0, 121.7, 37.0, 0.0],
    },
  }
]
async function UNBOUNDED(){
    viewer.dataSources.removeAll(true)
//czml[0].clock.range="UNBOUNDED"
czml=[
  {
    id: "document",
    name: "CZML Path",
    version: "1.0",
    clock: {
      interval: "2012-08-04T10:00:00Z/2012-08-04T10:00:20Z",
      currentTime: "2012-08-04T10:00:00Z",
      range: "UNBOUNDED",
      multiplier: 10,
    },
  },
  {
    id: "point 1",
    name: "point",
    position: {
      "cartographicDegrees": [ -122.93797, 39.50935, 1776],
    },
    point: {
      color: {
        rgba: [255, 255, 255, 255],
      },
      outlineColor: {
        rgba: [255, 0, 0, 255],
      },
      outlineWidth: 4,
      pixelSize: 20,
    },
  },
  {
    id: "path",
    name: "path with GPS flight data",
    description:
      "<p>Hang gliding flight log data from Daniel H. Friedman.<br>Icon created by Larisa Skosyrska from the Noun Project</p>",
    availability: "2012-08-04T10:00:00Z/2012-08-04T10:00:20Z",
    path: {
      material: {
        polylineOutline: {
          color: {
            rgba: [255, 255, 255, 255],
          },
          outlineColor: {
            rgba: [0, 255, 255, 255],
          },
          outlineWidth: 5,
        },
      },
      width: 8,
      leadTime: 0,
      trailTime: 100,
      resolution: 1,
    },
    billboard: {
      image:"/../CesiumBasicSource/kebi.jpg",
      scale: 0.2,
      eyeOffset: {
        cartesian: [0.0, 3.0, -10.0],
      },
    },
    // model:{
    //   gltf: "/../CesiumBasicSource/fly.glb",
    //   //orientation: new Cesium.VelocityOrientationProperty(property),
    // },
    position: {
      epoch: "2012-08-04T10:00:00Z",
      cartographicDegrees: [ 0.0, 121.7, 36.5, 0.0, 20.0, 121.7, 37.0, 0.0],
    },
  }
]
const dataSource=await Cesium.CzmlDataSource.load(czml);
viewer.dataSources.add(dataSource)
}
async function LOOP(){
    viewer.dataSources.removeAll(true)
//czml[0].clock.range="UNBOUNDED"
czml=[
  {
    id: "document",
    name: "CZML Path",
    version: "1.0",
    clock: {
      interval: "2012-08-04T10:00:00Z/2012-08-04T10:00:20Z",
      currentTime: "2012-08-04T10:00:00Z",
      range: "LOOP_STOP",
      multiplier: 10,
    },
  },
  {
    id: "point 1",
    name: "point",
    position: {
      "cartographicDegrees": [ -122.93797, 39.50935, 1776],
    },
    point: {
      color: {
        rgba: [255, 255, 255, 255],
      },
      outlineColor: {
        rgba: [255, 0, 0, 255],
      },
      outlineWidth: 4,
      pixelSize: 20,
    },
  },
  {
    id: "path",
    name: "path with GPS flight data",
    description:
      "<p>Hang gliding flight log data from Daniel H. Friedman.<br>Icon created by Larisa Skosyrska from the Noun Project</p>",
    availability: "2012-08-04T10:00:00Z/2012-08-04T10:00:20Z",
    path: {
      material: {
        polylineOutline: {
          color: {
            rgba: [255, 255, 255, 255],
          },
          outlineColor: {
            rgba: [0, 255, 255, 255],
          },
          outlineWidth: 5,
        },
      },
      width: 8,
      leadTime: 0,
      trailTime: 100,
      resolution: 1,
    },
    billboard: {
      image:"/../CesiumBasicSource/kebi.jpg",
      scale: 0.2,
      eyeOffset: {
        cartesian: [0.0, 3.0, -10.0],
      },
    },
    // model:{
    //   gltf: "/../CesiumBasicSource/fly.glb",
    //   //orientation: new Cesium.VelocityOrientationProperty(property),
    // },
    position: {
      epoch: "2012-08-04T10:00:00Z",
      cartographicDegrees: [ 0.0, 121.7, 36.5, 0.0, 20.0, 121.7, 37.0, 0.0],
    },
  },
]
const dataSource=await Cesium.CzmlDataSource.load(czml);
viewer.dataSources.add(dataSource)
}
async function CLAMPED(){
//czml[0].clock.range="UNBOUNDED"
viewer.dataSources.removeAll(true)
czml=[
  {
    id: "document",
    name: "CZML Path",
    version: "1.0",
    clock: {
      interval: "2012-08-04T10:00:00Z/2012-08-04T10:00:20Z",
      currentTime: "2012-08-04T10:00:00Z",
      range: "CLAMPED",
      multiplier: 10,
    },
  },
  {
    id: "point 1",
    name: "point",
    position: {
      "cartographicDegrees": [ -122.93797, 39.50935, 1776],
    },
    point: {
      color: {
        rgba: [255, 255, 255, 255],
      },
      outlineColor: {
        rgba: [255, 0, 0, 255],
      },
      outlineWidth: 4,
      pixelSize: 20,
    },
  },
  {
    id: "path",
    name: "path with GPS flight data",
    description:
      "<p>Hang gliding flight log data from Daniel H. Friedman.<br>Icon created by Larisa Skosyrska from the Noun Project</p>",
    availability: "2012-08-04T10:00:00Z/2012-08-04T10:00:20Z",
    path: {
      material: {
        polylineOutline: {
          color: {
            rgba: [255, 255, 255, 255],
          },
          outlineColor: {
            rgba: [0, 255, 255, 255],
          },
          outlineWidth: 5,
        },
      },
      width: 8,
      leadTime: 0,
      trailTime: 11,
      resolution: 1,
    },
    billboard: {
      image:"/../CesiumBasicSource/kebi.jpg",
      scale: 0.2,
      eyeOffset: {
        cartesian: [0.0, 3.0, -10.0],
      },
    },
    // model:{
    //   gltf: "/../CesiumBasicSource/fly.glb",
    //   //orientation: new Cesium.VelocityOrientationProperty(property),
    // },
    position: {
      epoch: "2012-08-04T10:00:00Z",
      cartographicDegrees: [ 0.0, 121.7, 36.5, 0.0, 20.0, 121.7, 37.0, 0.0],
    },
  }
]
const dataSource=await Cesium.CzmlDataSource.load(czml);
viewer.dataSources.add(dataSource)
}
onMounted(async()=>{
initCesium()

const dataSource=await Cesium.CzmlDataSource.load(czml);
viewer.dataSources.add(dataSource)

viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(120.9,37,100000),
    orientation:{
        heading:Cesium.Math.toRadians(90),
        pitch:Cesium.Math.toRadians(-60),
    }
})
})
function initCesium(){
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
viewer=new Cesium.Viewer('cesiumContainer',{
    //animation:false,//动画控件
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
#UNBOUNDED{
    position: absolute;
    left: 0px;
    top:0px;
    cursor: pointer;
    background-color: aqua;
}
#LOOP{
    position: absolute;
    left: 0px;
    top:30px;
    cursor: pointer;
    background-color: aqua;
}
#CLAMPED{
    position: absolute;
    left: 0px;
    top:60px;
    cursor: pointer;
    background-color: rgb(219, 105, 11);
}
#UNBOUNDED:hover{
    position: absolute;
    left: 0px;
    top:0px;
    cursor: pointer;
    background-color: rgb(26, 255, 0);
}
#LOOP:hover{
    position: absolute;
    left: 0px;
    top:30px;
    cursor: pointer;
    background-color:  rgb(26, 255, 0);
}
#CLAMPED:hover{
    position: absolute;
    left: 0px;
    top:60px;
    cursor: pointer;
    background-color:  rgb(0, 0, 255);
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