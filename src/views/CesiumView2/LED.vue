<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
//自定义材质
function LEDMaterialProperty(options) {
    options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);
    this._definitionChanged = new Cesium.Event();
}
var defaultColor = Cesium.Color.WHITE;
Object.defineProperties(LEDMaterialProperty.prototype, {
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
LEDMaterialProperty.prototype.getType = function(time) {
    return 'LEDLight';
}
LEDMaterialProperty.prototype.getValue = function(time, result) {
    if (!Cesium.defined(result)) {
        result = {};
    }
    return result;
}
LEDMaterialProperty.prototype.equals = function(other) {
    return this === other || (other instanceof LEDMaterialProperty);
}
Cesium.Material._materialCache.addMaterial('LEDLight', {
  fabric: {
    type:'LEDLight',
    uniforms: {
        image:'../../../CesiumBasicSource/kebi.jpg',
        speed:0.01
    },
    source: `
    #define PI 3.1415926
    uniform sampler2D image;
    uniform float speed;
    float angle=0.0;
czm_material czm_getMaterial(czm_materialInput materialInput)
{  
    czm_material material = czm_getDefaultMaterial(materialInput);
    float s=sin(czm_frameNumber*0.01);
    //计算旋转矩阵
    mat2 Matrix=mat2(cos(czm_frameNumber*0.01),sin(czm_frameNumber*0.01),-sin(czm_frameNumber*0.01),cos(czm_frameNumber*0.01));
    vec2 st = materialInput.st;
    vec2 newst=vec2(st.s-0.5,st.t-0.5);
    vec2 st1=Matrix*newst;
    vec2 st2=vec2(st1.s+0.5,st1.t+0.5);
    vec4 map=texture(image,st2);
    material.emission = map.rgb;
    material.alpha = 1.0;
    return material;
}`,
  },
  translucent: false,
});
onMounted(()=>{
initCesium()

viewer.scene.globe.depthTestAgainstTerrain=true
viewer.entities.add({
    id:'LED',
    position:Cesium.Cartesian3.fromDegrees(121,37.5,0),
    orientation:Cesium.Quaternion.fromHeadingPitchRoll(Cesium.HeadingPitchRoll.fromDegrees(0, 0, 0)),
    cylinder:{
        length:100000,
        topRadius:0,
        bottomRadius:10000,
        material:Cesium.Color.WHITE.withAlpha(0.15)
    },
})
viewer.entities.add({
    id:'LED1',
    position:Cesium.Cartesian3.fromDegrees(121,37.49,0),
    ellipse:{
semiMajorAxis:8500,
semiMinorAxis:5000,
rotation:Cesium.Math.toRadians(90),
outline:true,
outlineColor:Cesium.Color.RED,
outlineWidth:1000,
material:new LEDMaterialProperty()
    }
})
viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(120,37.5,200000),
    orientation:{
        heading:Cesium.Math.toRadians(90),
        pitch:Cesium.Math.toRadians(-60),
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