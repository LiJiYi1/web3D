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
const GlowLineInstances = [];
GlowLineInstances.push(
    new Cesium.GeometryInstance({
        geometry: new Cesium.PolylineGeometry({
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([-75, 38, 0, -125, 38, 0]),
            width: 20,
            vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
        }),
        attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.WHITE),
        }
    })
);

const GlowLinesPrimitive = new Cesium.Primitive({
    geometryInstances: GlowLineInstances,
    appearance: new Cesium.PolylineMaterialAppearance({
        material: new Cesium.Material({
            fabric: {
                uniforms: {
                    color: new Cesium.Color(1.0, 1.0, 0.0, 0.5),
                    centerColor: Cesium.Color.RED,
                    glowPower: 0.2,
                    taperPower: 0.5,
                },
                source: `
                uniform vec4 color;
                uniform float glowPower;
                uniform float taperPower;

                czm_material czm_getMaterial(czm_materialInput materialInput)
                {
                    czm_material material = czm_getDefaultMaterial(materialInput);

                    vec2 st = materialInput.st;
                    float glow = glowPower / abs(st.t - 0.5) - (glowPower / 0.5);
                    vec4 fragColor;
                    float c = step(glow,1.0);
                    fragColor.rgb = centerColor.rgb*c+color.rgb*(1.0-c);

                    fragColor.a = clamp(0.0, 1.0, glow) * color.a;
                    fragColor = czm_gammaCorrect(fragColor);
                    material.emission = fragColor.rgb;
                    material.alpha = fragColor.a;
                    return material;
                }`
            }
        })
    }),
    asynchronous: true
});
viewer.scene.primitives.add(GlowLinesPrimitive);
//设置初始位置
viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-100, 38, 5000000)
});
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