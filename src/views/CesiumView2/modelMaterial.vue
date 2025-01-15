<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <div id="body" >车身颜色<input type="color" ref="body" value="#ff0000"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted,ref } from 'vue';
let viewer;
const glass=ref(null)
const detail=ref(null)
const body=ref(null)
onMounted(async()=>{
initCesium()
//加载GLTF模型
const position = Cesium.Cartesian3.fromDegrees(
  120,
  39.9,
  0
);
const headingPositionRoll = new Cesium.HeadingPitchRoll();
const fixedFrameTransform = Cesium.Transforms.localFrameToFixedFrameGenerator(
  "north",
  "west"
);
 const car = await Cesium.Model.fromGltfAsync({
   url: "../../../public/CesiumBasicSource/ferrari.glb",
   modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
     position,
     headingPositionRoll,
     Cesium.Ellipsoid.WGS84,
     fixedFrameTransform
   ),
   minimumPixelSize: 128,
 });

 
 let i=0
//让轮子转起来
viewer.clock.onTick.addEventListener((e)=>{
if(model.ready){
//拿到四个轮子对旋转矩阵操作让他转起来
 const wheel1=model.getNode('wheel_fl') 
 const wheel2=model.getNode('wheel_fr') 
 const wheel3=model.getNode('wheel_rr') 
 const wheel4=model.getNode('wheel_rl') 
 //console.log(wheel1);
 //让车轮子转
 i-=0.0005
const rotate=new Cesium.Matrix3()
Cesium.Matrix3.fromRotationX(i, rotate)
const m=wheel1.matrix
Cesium.Matrix4.multiplyByMatrix3(m,rotate,m)
wheel1.matrix=m

const m1=wheel2.matrix
Cesium.Matrix4.multiplyByMatrix3(m1,rotate,m1)
wheel2.matrix=m1
const m2=wheel3.matrix
Cesium.Matrix4.multiplyByMatrix3(m2,rotate,m2)
wheel3.matrix=m2

const m3=wheel4.matrix
Cesium.Matrix4.multiplyByMatrix3(m3,rotate,m3)
wheel4.matrix=m3





    }


    
});
const model=viewer.scene.primitives.add(car);


//改材质
body.value.addEventListener('input', function() {
    let color = Cesium.Color.fromCssColorString(this.value)
model.color=color
});

// glass.addEventListener('input', function() {
//     let color = Cesium.Color.fromCssColorString(this.value)
//     model.getMaterial("metal_gray").setValue('baseColorFactor', new Cesium.Cartesian4(color.red, color.green, color.blue, 1.0))
// });

// detail.addEventListener('input', function() {
//     let color = Cesium.Color.fromCssColorString(this.value)
//     model.getMaterial("Glass_Gray").setValue('baseColorFactor', new Cesium.Cartesian4(color.red, color.green, color.blue, 0.5))
// });

viewer.camera.setView({
  destination:Cesium.Cartesian3.fromDegrees( 120.0002,39.9,10),
  orientation:{
heading:Cesium.Math.toRadians(-90),
pitch:Cesium.Math.toRadians(-30),
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
#detail{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100px;
    height: 30px;
        color: aliceblue;
}
#glass{
    position: absolute;
    left: 0px;
    top: 50px;
    width: 100px;
    height: 30px;
    color: aliceblue;
}
#body{
    position: absolute;
    left: 2%;
    top: 100px;
    width: 100px;
    height: 30px;
        color: aliceblue;
}
</style>