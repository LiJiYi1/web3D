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
   const viewModel = {
        emissionRate: 200.0,
        gravity: -1200.0,
        minimumParticleLife: 12,
        maximumParticleLife: 12,
        minimumSpeed: 200.0,
        maximumSpeed: 400.0,
        startScale: 1.0,
        endScale: 3.0,
        particleSize: 5.0,
    };
    const emitterModelMatrix = new Cesium.Matrix4();
    const translation = new Cesium.Cartesian3();
    const rotation = new Cesium.Quaternion();
    let hpr = new Cesium.HeadingPitchRoll();
    const trs = new Cesium.TranslationRotationScale();

    function computeEmitterModelMatrix() {
        hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
        trs.translation = Cesium.Cartesian3.fromElements(-4.0, 0.0, 1.4, translation);
        trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

        return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
    }
    const gravityScratch =new  Cesium.Cartesian3.fromDegrees(114,30,400);

    function applyGravity(p, dt) {
        // We need to compute a local up vector for each particle in geocentric space.
        const position = p.position;
        Cesium.Cartesian3.normalize(position, gravityScratch);
        Cesium.Cartesian3.multiplyByScalar(
            gravityScratch,
            viewModel.gravity * dt,
            gravityScratch,
        );
        p.velocity = Cesium.Cartesian3.add(p.velocity, gravityScratch, p.velocity);
    }
 //粒子系统
viewer.scene.primitives.add(
        new Cesium.ParticleSystem({
            image: "/../CesiumBasicSource/雪花.png",
            startColor: Cesium.Color.WHITE.withAlpha(1.0),
            endColor: Cesium.Color.WHITE.withAlpha(1.0),

            startScale: viewModel.startScale,
            endScale: viewModel.endScale,

            minimumParticleLife: viewModel.minimumParticleLife,
            maximumParticleLife: viewModel.maximumParticleLife,
            modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(117.16, 32.71,4000)),
            minimumSpeed: viewModel.minimumSpeed,
            maximumSpeed: viewModel.maximumSpeed,

            imageSize: new Cesium.Cartesian2(
                viewModel.particleSize,
                viewModel.particleSize,
            ),

            emissionRate: viewModel.emissionRate,

            bursts: [
                // these burst will occasionally sync to create a multicolored effect
                new Cesium.ParticleBurst({
                    time: 5.0,
                    minimum: 10,
                    maximum: 100,
                }),
                new Cesium.ParticleBurst({
                    time: 10.0,
                    minimum: 50,
                    maximum: 100,
                }),
                new Cesium.ParticleBurst({
                    time: 15.0,
                    minimum: 200,
                    maximum: 300,
                }),
            ],

            //lifetime: 16000.0,

            emitter: new Cesium.CircleEmitter(40000.0),

            emitterModelMatrix: computeEmitterModelMatrix(),

            updateCallback: applyGravity,
        }),
    );
viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(117.16, 32.71, 1000),
      orientation:{
    heading:Cesium.Math.toRadians(20),
    pitch:Cesium.Math.toRadians(-10),
    rool:Cesium.Math.toRadians(0),
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
  shouldAnimate:true
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