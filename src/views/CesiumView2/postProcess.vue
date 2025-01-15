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
// 着色器叠加
// https://www.shadertoy.com/view/mtyGWy
// http://localhost:8000/Apps/Sandcastle/index.html?src=Fog%20Post%20Process.html&label=All

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

const fragmentShaderSource = `
uniform sampler2D colorTexture; 
in vec2 v_textureCoordinates; 

vec3 palette( float t ) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263,0.416,0.557);

    return a + b*cos( 6.28318*(c*t+d) );
}

void main() 
{
    vec2 iResolution = czm_viewport.zw;
    float iTime = czm_frameNumber*0.008;

    vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);
    for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.5) - 0.5;
        float d = length(uv) * exp(-length(uv0));
        vec3 col = palette(length(uv0) + i*.4 + iTime*.4);
        d = sin(d*8. + iTime)/8.;
        d = abs(d);
        d = pow(0.01 / d, 1.2);
        finalColor += col * d;
    }
    out_FragColor = vec4(finalColor, 1.0);
    // 场景颜色
    vec4 sceneColor = texture(colorTexture, v_textureCoordinates); 
    // 颜色混合-混合场景颜色和当前效果的颜色
    out_FragColor = mix(out_FragColor,sceneColor,0.9);
}`;

const ellipsoid = viewer.scene.globe.ellipsoid;
const postProcessStage = viewer.scene.postProcessStages.add(
    new Cesium.PostProcessStage({
        fragmentShader: fragmentShaderSource,
        uniforms: {
            // fogColor: Cesium.Color.BLACK,
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