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
async function main() {
// 添加一个球体作为示例对象
const entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(0, 0, 200000),
    ellipsoid: {
        radii: new Cesium.Cartesian3(
            200000.0,
            200000.0,
            200000.0
        ),
        material: Cesium.Color.RED,
    },
});

//添加一个球体作为示例对象
const entity1 = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(0, 11.1, 200000),
    ellipsoid: {
        radii: new Cesium.Cartesian3(
            200000.0,
            200000.0,
            200000.0
        ),
        material: Cesium.Color.GREEN,
    },
});

// 创建发光效果的着色器
const glowFS = `
    // 输入纹理，包含原始场景渲染结果
    uniform sampler2D colorTexture;
    // 发光颜色
    uniform vec4 glowColor;
    // 发光强度
    uniform float glowIntensity;
    // 发光范围大小
    uniform float glowSize;
    // 纹理坐标输入
    in vec2 v_textureCoordinates;
    void main() {
        // 获取当前像素的颜色
        vec4 color = texture(colorTexture, v_textureCoordinates);
        // 创建发光效果
        vec4 glow = vec4(0.0);
        // 9x9 像素采样，创建模糊发光效果
        for(int i = -4; i <= 4; i++) {
            for(int j = -4; j <= 4; j++) {
                // 计算偏移采样位置
                vec2 offset = vec2(float(i), float(j)) * glowSize;
                // 获取周围像素的颜色
                vec4 neighborColor = texture(colorTexture, v_textureCoordinates + offset);
                // 检查是否是目标颜色（这里检测红色物体）
                if (neighborColor.g < 0.5 && neighborColor.r > 0.5 && neighborColor.b < 0.5) {
                    glow += glowColor;
                }
            }
        }
        // 平均采样点的发光值
        glow /= 81.0; 
        
        // 混合原始颜色和发光效果
        out_FragColor = mix(color, glow, glowIntensity);
    }
`;

// 创建后处理阶段
const stage = viewer.scene.postProcessStages.add(
    new Cesium.PostProcessStage({
        fragmentShader: glowFS,
        uniforms: {
            glowColor: Cesium.Color.WHITE,
            glowIntensity: 0.6,
            glowSize: 0.001,
        },
    })
);

// 调整相机视角
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(0, 0, 10000000),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-90.0),
        roll: 0.0,
    },
});

}
main();
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