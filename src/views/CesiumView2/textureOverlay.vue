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
//自定义材质
function OverlayMaterialProperty(options) {
    options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);
    this._definitionChanged = new Cesium.Event();
}
var defaultColor = Cesium.Color.WHITE;

Object.defineProperties(OverlayMaterialProperty.prototype, {
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
OverlayMaterialProperty.prototype.getType = function(time) {
    return 'PolygonOverlay';
}
OverlayMaterialProperty.prototype.getValue = function(time, result) {
    if (!Cesium.defined(result)) {
        result = {};
    }
    return result;
}
OverlayMaterialProperty.prototype.equals = function(other) {
    return this === other || (other instanceof OverlayMaterialProperty);
}
Cesium.Material._materialCache.addMaterial('PolygonOverlay', {
  fabric: {
    type: 'textureOverlay',
    uniforms: {
    image1: '../../../CesiumBasicSource/rada.png',
     image2:'../../../CesiumBasicSource/rada1.png',
    },
    source: `
uniform sampler2D image1;
uniform sampler2D image2;
czm_material czm_getMaterial(czm_materialInput materialInput)
{
    czm_material material = czm_getDefaultMaterial(materialInput);
    mat2 Matrix=mat2(cos(czm_frameNumber*0.01),sin(czm_frameNumber*0.01),-sin(czm_frameNumber*0.01),cos(czm_frameNumber*0.01));
    vec2 st = materialInput.st;
    vec4 map1=texture(image2,st);
    vec2 st1=st-0.5;
    vec2 st2=Matrix*st1;
    vec2 newst=st2+0.5;
    vec4 map2=texture(image1,newst);
    material.diffuse = mix(vec3(map1.rgb),vec3(map2.rgb),0.5);
    float dis=distance(vec2(0.5,0.5),st);
    if(dis>0.5){
    material.alpha=0.0;
    }
    else{
        material.alpha =mix(map2.a,map1.a,0.5);
    }

    return material;
}`,
  },
  translucent: true,
});

viewer.entities.add({
id:'plane',
position:Cesium.Cartesian3.fromDegrees(120,39.9,0),
orientation:new Cesium.Quaternion(1.0, 1.0, 1.0, 0),
plane:{
plane:new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0.0),
dimensions:new Cesium.Cartesian2(100,100),
material:new OverlayMaterialProperty()
}
})
viewer.camera.setView({
  destination:Cesium.Cartesian3.fromDegrees( 120,39.9,2000),
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

</style>