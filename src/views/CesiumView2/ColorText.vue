<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <canvas ref="text" id="canvas" width="280px" height="50px"></canvas>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted,ref } from 'vue';
let viewer;
const text=ref(null)
onMounted(()=>{
//创建canvas画布
const ctx=text.value.getContext('2d')
//console.log(ctx);
ctx.font = "bold 48px serif";
ctx.fillText("没见过黑手！", 20, 40);
ctx.textAlign = "center"
ctx.textBaseline="middle"
let  img=new Image()
img.src=text.value.toDataURL()
//console.log(img.src)
//自定义材质
function TextMaterialProperty(options) {
    options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);
    this._definitionChanged = new Cesium.Event();
}
var defaultColor = Cesium.Color.WHITE;
Object.defineProperties(TextMaterialProperty.prototype, {
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
TextMaterialProperty.prototype.getType = function(time) {
    return 'Text';
}
TextMaterialProperty.prototype.getValue = function(time, result) {
    if (!Cesium.defined(result)) {
        result = {};
    }
    return result;
}
TextMaterialProperty.prototype.equals = function(other) {
    return this === other || (other instanceof TextMaterialProperty);
}
Cesium.Material._materialCache.addMaterial('Text', {
  fabric: {
    type:'Text',
    uniforms: {
        image:img.src,
    },
    source: `
    uniform sampler2D image;
czm_material czm_getMaterial(czm_materialInput materialInput)
{  
    czm_material material = czm_getDefaultMaterial(materialInput);
    float s=sin(czm_frameNumber*0.01);
    vec2 st=materialInput.st;
    //根据距离中心的距离实现一个渐变
    float dis=distance(vec2(.5,.5),st);
    vec4 map=texture(image,st);
    material.diffuse = vec3(sin(dis*20.0)*sin(czm_frameNumber*0.2),sin(dis*40.0)*sin(czm_frameNumber*0.2),sin(dis*20.0)*sin(czm_frameNumber*0.1));
    //根据图片透明度扣出来字体
    material.alpha = map.a;
    return material;
}`,
  },
  translucent: true,
});
initCesium()
viewer.entities.add({
    position:Cesium.Cartesian3.fromDegrees( 120.5,39.9,5000),
    plane:{
        plane:new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0.0),
        dimensions:new Cesium.Cartesian2(40000,16000),
        material:new TextMaterialProperty()
    }

})
viewer.camera.setView({
  destination:Cesium.Cartesian3.fromDegrees( 121,39.9,20000),
  orientation:{
heading:Cesium.Math.toRadians(-90),
pitch:Cesium.Math.toRadians(-20),
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
#canvas{
    position: absolute;
   left: 100px;
   top: 100px;
   visibility: hidden;
}
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