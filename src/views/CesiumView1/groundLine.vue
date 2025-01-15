<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
onMounted(()=>{
const viewer=initCesium()
//用entites创建贴地线
viewer.entities.add({
    id:'ground',
    corridor:{
        positions:new Cesium.Cartesian3.fromDegreesArray([90,30,90.1,30]),
        width:100,
        material:new Cesium.PolylineGlowMaterialProperty({
      color:Cesium.Color.RED,
      glowPower:0.2,
      //taperPower:0.6
    }),
        //depthFailMaterial:Cesium.Color.RED.withAlpha(0.0)
       // height:1
    }
})
//用GeoJSON创建贴地线
viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../../../public/CesiumBasicSource/line.json', {
  stroke: Cesium.Color.YELLOW,
  fill: Cesium.Color.PINK,
  strokeWidth: 10,
  markerSymbol: '?',
  clampToGround:true
}));
//用primitive创建贴地线
const rectangleInstance = new Cesium.GeometryInstance({
  geometry : new Cesium.CorridorGeometry({
    positions:new Cesium.Cartesian3.fromDegreesArray([90,30,90.1,30.2]),
    width:400,
  }),
  id : 'rectangle',
  attributes : {
    color : new Cesium.ColorGeometryInstanceAttribute(0.0, 0.0, 1.0, 0.5)
  }
});
viewer.scene.primitives.add(new Cesium.GroundPrimitive({
  geometryInstances : rectangleInstance,
  
}));
//用CZML创建
const czml = [{
    "id": "document",
    "name": "CZML Geometries: Polyline",
    "version": "1.0",
  },
  {
    "id": "redCorridor",
    "name": "Red corridor on surface with rounded corners",
    "corridor": {
      "positions": {
        "cartographicDegrees": [90.1, 30.2, 0, 90.1, 30.07, 0],
      },
      "width": 200.0,
      material: {
        solidColor: {
          color: {
            rgba: [255, 0, 0, 127],
          },
        },
      },
    },
  }];
const dataSourcePromise = Cesium.CzmlDataSource.load(czml);
viewer.dataSources.add(dataSourcePromise);
viewer.zoomTo(viewer.entities)
viewer.entities.add({
  position:new Cesium.Cartesian3.fromDegrees(90.05,30,0),
  label:{
text:'entity创建',
scale:0.7,
fillColor:Cesium.Color.WHITE
  }
})
viewer.entities.add({
  position:new Cesium.Cartesian3.fromDegrees(90.1,30.035),
  label:{
text:'geoJSON创建',
scale:0.4,
fillColor:Cesium.Color.YELLOW
  }
})
viewer.entities.add({
  position:new Cesium.Cartesian3.fromDegrees(90.05,30.1),
  label:{
text:'primitive创建',
scale:0.4,
fillColor:Cesium.Color.BLUE
  }
})
viewer.entities.add({
  position:new Cesium.Cartesian3.fromDegrees(90.1,30.13),
  label:{
text:'CZML创建',
scale:0.4,
fillColor:Cesium.Color.RED
  }
})
})
function initCesium(){
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
const viewer=new Cesium.Viewer('cesiumContainer',{
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
return viewer
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