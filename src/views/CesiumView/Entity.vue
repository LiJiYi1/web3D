<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
onMounted(()=>{
const Viewer=initCesium()
//entites的add方法参数可以是几何体，也可以是几何体的配置项
Viewer.entities.add({
name:'entities',
id:'entities',
position:new Cesium.Cartesian3.fromDegrees(114.25,39.95,300.0),
//box也一样可以是一个box,也可以是一个box的配置项
box:{
dimensions:new Cesium.Cartesian3(50000,40000,3000),
material:new Cesium.Color(0.0,1.0,1.0,0.7),
outline:true,
outlineColor:new Cesium.Color(1.0,1.0,0.0,1.0),
outlineWidth:100.0
},
ellipsoid:{
    radii:new Cesium.Cartesian3(1000,1000,4000),
    material:new Cesium.Color(1.0,1.0,0.0,1.0),
    outline:true,
    outlineColor:new Cesium.Color(0.0,1.0,0.0,1.0),
    outlineWidth:10000.0
},
wall:{
    positions:[new Cesium.Cartesian3.fromDegrees(114.0,39.9,5000),new Cesium.Cartesian3.fromDegrees(114.0,40,5000),new Cesium.Cartesian3.fromDegrees(114.5,40,5000),new Cesium.Cartesian3.fromDegrees(114.5,39.9,5000),new Cesium.Cartesian3.fromDegrees(114.0,39.9,5000)],
    material:new Cesium.Color(1.0,1.0,0.0,1.0),
    outline:true,
    outlineColor:new Cesium.Color(1.0,1.0,0.0,1.0),
    outlineWidth:100.0,
    
},
label:{
    text:'李某的Cesium学习',
    fillColor:Cesium.Color.RED,
    pixelOffset:new Cesium.Cartesian2(200,200)
},
billboard:{
    image:'../../../public/前端页面资源/image5.png',
    scale:0.6,
    pixelOffset:new Cesium.Cartesian2(-180,-180),
    scaleByDistance:new Cesium.NearFarScalar(1, 10,200000, 0)
},
model:{
    uri:'../../../public/CesiumBasicSource/fly.glb',
    scale:100.0,
    minimumPixelSize:300,
    color: Cesium.Color.BLUE,
    silhouetteColor: Cesium.Color.RED,
    silhouetteSize: 4,
    shadows: Cesium.ShadowMode.ENABLED,
    colorBlendMode: Cesium.ColorBlendMode.MIX,
    distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 3000000),
    maximumScale:500.0
}
})
const s=Viewer.scene.pick(new Cesium.Cartesian2(100.0, 200.0))
console.log(s);

//Viewer.scene.shadows=true
//Viewer的视角切到entities那
Viewer.flyTo(Viewer.entities)
})
function initCesium(){
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
    selectionIndicator:false,//控制entity是否可以被拾取
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
    width: 100%;
    height: 93%;
}
</style>