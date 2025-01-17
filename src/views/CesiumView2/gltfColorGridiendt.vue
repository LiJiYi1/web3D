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
viewer.scene.postProcessStages.fxaa.enabled = true;

const scene = viewer.scene;
scene.globe.depthTestAgainstTerrain = true;

const position = Cesium.Cartesian3.fromDegrees(123.0744619, 44.0503706, 0);
const hpr = new Cesium.HeadingPitchRoll(0, 0, 0);
const fixedFrameTransform = Cesium.Transforms.localFrameToFixedFrameGenerator("north", "west");

let url = "/../CesiumBasicSource/fly.glb";
const textureUniformShader = new Cesium.CustomShader({
    uniforms: { },
    fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
    {
        vec4 position = czm_inverseModelView * vec4(v_positionEC,1);
        float stc_sd = position.y/0.1;
        material.diffuse = vec3(1.0, 0.0, 0.0)*stc_sd;// 基础颜色
    }
    `
});
async function showModel(url, customShader) { 
    try {
        const model = viewer.scene.primitives.add(await Cesium.Model.fromGltfAsync({
            url: url,
            customShader: customShader,
            modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(position, hpr, Cesium.Ellipsoid.WGS84, fixedFrameTransform)
        }));
    } catch (error) {
        console.log(`Error loading model: ${error}`);
    }
}
showModel(url, textureUniformShader);

viewer.camera.flyTo({destination: Cesium.Cartesian3.fromDegrees(123.0744619, 44.0503706, 5)});
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