<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
onMounted(async ()=>{
initCesium()

// 视角更改
viewer.scene.camera.setView({
  destination: new Cesium.Cartesian3(
    1216356.033078094,
    -4736402.278325668,
    4081270.375520902
  ),
  orientation: new Cesium.HeadingPitchRoll(
    0.08033365594766728,
    -0.29519015695063455,
    0.00027759141518046704
  ),
  endTransform: Cesium.Matrix4.IDENTITY,
});
// 是否支持深度纹理
if (!viewer.scene.context.depthTexture) {
  window.alert("This browser does not support the fog post process.");
}

// 着色器，重点
const fragmentShaderSource = `
  float getDistance(sampler2D depthTexture, vec2 texCoords) 
  { 
    // 获取深度值，解包，
    float depth = czm_unpackDepth(texture(depthTexture, texCoords)); 
    if (depth == 0.0) { 
        return czm_infinity; 
    } 
    // 为了解决深度值在非线性空间中导致的精度问题，深度值转换回线性空间，也就是从 NDC 空间再转换回相机空间中，转为当前视角的距离
    // https://juejin.cn/post/7295565904406102057
    vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth); 
    return -eyeCoordinate.z / eyeCoordinate.w; 
  } 

  // 线性插值
  float interpolateByDistance(vec4 nearFarScalar, float distance) 
  { 
    float startDistance = nearFarScalar.x; 
    float startValue = nearFarScalar.y; 
    float endDistance = nearFarScalar.z; 
    float endValue = nearFarScalar.w; 
    // 值限制在 0~1之间
    float t = clamp((distance - startDistance) / (endDistance - startDistance), 0.0, 1.0); 
    // 值混合
    return mix(startValue, endValue, t); 
  } 

  // 透明度混合
  vec4 alphaBlend(vec4 sourceColor, vec4 destinationColor) 
  { 
      return sourceColor * vec4(sourceColor.aaa, 1.0) + destinationColor * (1.0 - sourceColor.a); 
  } 

  uniform sampler2D colorTexture; 
  uniform sampler2D depthTexture; 
  uniform vec4 fogByDistance; 
  uniform vec4 fogColor; 
  in vec2 v_textureCoordinates; 
  void main(void) 
  { 
    // 获取距离
    float distance = getDistance(depthTexture, v_textureCoordinates); 
    // 获取场景当前点的像素值
    vec4 sceneColor = texture(colorTexture, v_textureCoordinates); 
    // 插值透明度
    float blendAmount = interpolateByDistance(fogByDistance, distance); 
    // 改掉当前场景的透明度
    vec4 finalFogColor = vec4(fogColor.rgb, fogColor.a * blendAmount); 
    // 和传入的颜色混合
    out_FragColor = alphaBlend(finalFogColor, sceneColor); 
  }
  `;

const ellipsoid = viewer.scene.globe.ellipsoid;
const postProcessStage = viewer.scene.postProcessStages.add(
  new Cesium.PostProcessStage({
    fragmentShader: fragmentShaderSource,
    uniforms: {
      fogByDistance: new Cesium.Cartesian4(10, 0.0, 2000, 1.0), // 根据着色器，分析出这四个值分别是  开始距离，开始值，结束距离，结束值
      fogColor: Cesium.Color.WHITE,  // 沙盒里是黑色，效果不好，这里我改成了白色，效果很好
    },
  })
);



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