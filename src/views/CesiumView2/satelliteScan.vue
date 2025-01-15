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
const cylinder = new Cesium.CylinderGeometry({
    length: 800000,
    topRadius: 80000,
    bottomRadius: 0,
    vertexFormat:Cesium.VertexFormat.ALL
});
const geometry = Cesium.CylinderGeometry.createGeometry(cylinder);
const appearance=new Cesium.MaterialAppearance({
    material : new Cesium.Material({
  fabric: {
    type: 'custom',
    uniforms: {
        R:0.0
    },
    source:`
    uniform float R;
     czm_material czm_getMaterial(czm_materialInput materialInput)
{
    czm_material material = czm_getDefaultMaterial(materialInput);
    //拿到UV坐标
    vec2 st = materialInput.st;
    float dis=distance(st,vec2(0.5,0.5));
    if(dis>R){
    material.diffuse = vec3(1.0,1.0,0.1);
    material.alpha = 0.0;
    }
    else{
    material.diffuse = vec3(1.0,0.0,0.1);
    material.alpha = dis;
    }

    //material.alpha = 1.0;
    return material;
}
    
    `
  }
}),
    faceForward : true
  })
const primitive=new Cesium.Primitive({
  geometryInstances : new Cesium.GeometryInstance({
    geometry : geometry,
    modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
      Cesium.Cartesian3.fromDegrees(121,37)), new Cesium.Cartesian3(0.0, 0.0, 500000.0), new Cesium.Matrix4()),
    id : 'cylinder',
    attributes : {
      color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
    }
  }),
  appearance :appearance,
  asynchronous : false
})
console.log(appearance.material.uniforms);
function loop(){
    if(appearance.material.uniforms.R>=1.0){
appearance.material.uniforms.R=0.0
    }
    appearance.material.uniforms.R+=0.01
    requestAnimationFrame(loop)
}
loop()
viewer.scene.primitives.add(primitive);

viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(110,37,2200000),
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