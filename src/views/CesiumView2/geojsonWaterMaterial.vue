<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
//import createPropertyDescriptor from "./createPropertyDescriptor.js";
let viewer;
onMounted(()=>{
console.log(Cesium.Material);
initCesium()
function WaterMaterialProperty(options) {
    options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);
    this._definitionChanged = new Cesium.Event();
}
var defaultColor = Cesium.Color.WHITE;
Object.defineProperties(WaterMaterialProperty.prototype, {
    isConstant: {
        get: function() {
            return false;
        }
    },
    definitionChanged: {
        get: function() {
            return this._definitionChanged;
        }
    },
});
WaterMaterialProperty.prototype.getType = function(time) {
    return 'PolygonWater';
}
WaterMaterialProperty.prototype.getValue = function(time, result) {
    if (!Cesium.defined(result)) {
        result = {};
    }
    return result;
}
WaterMaterialProperty.prototype.equals = function(other) {
    return this === other || (other instanceof WaterMaterialProperty);
}
//Cesium.Material.PolygonWaterType = 'PolygonWater';
let m = Cesium.Material._materialCache.getMaterial("Water");
m.fabric.uniforms.normalMap = Cesium.buildModuleUrl('/../CesiumBasicSource/normalmap.png');
//使用自定义参数
m.fabric.uniforms.animationSpeed = 0.01;
m.fabric.uniforms.amplitude = 100.0;
m.fabric.uniforms.frequency = 1000;
Cesium.Material._materialCache.addMaterial('PolygonWater', m);

const promise=Cesium.GeoJsonDataSource.load('/../CesiumBasicSource/polygon.json', {
  stroke: Cesium.Color.HOTPINK,
  fill: Cesium.Color.PINK,
  strokeWidth: 3,
  markerSymbol: '?'
});
promise.then((data)=>{
    const entity=data._entityCollection._entities._array[0]
    console.log(entity._polygon.material);
    entity._polygon.material=new WaterMaterialProperty()
    viewer.entities.add(entity)
})
viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(90.9,37,7000000),
    orientation:{
        heading:Cesium.Math.toRadians(90),
        pitch:Cesium.Math.toRadians(-90),
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