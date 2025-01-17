<template>
  <div id="main">
    <div id="cesiumContainer" ref="cesiumContainer"></div>
    <div id="click">点击屏幕创建模型</div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted,ref} from 'vue';
const cesiumContainer=ref(null)
let viewer;
onMounted(()=>{
let handler;
initCesium()
//添加点击事件
handler=new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
handler.setInputAction(async function(movement){
const result = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
const position = result;
const headingPositionRoll = new Cesium.HeadingPitchRoll();
const fixedFrameTransform = Cesium.Transforms.localFrameToFixedFrameGenerator(
  "north",
  "west"
);
let animations;
const model = await Cesium.Model.fromGltfAsync({
   url: "/../CesiumBasicSource/fly.glb",
     modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
     position,
     headingPositionRoll,
     Cesium.Ellipsoid.WGS84,
     fixedFrameTransform,

   ),
   gltfCallback:(gltf)=>{
    animations = gltf.animations
    //console.log(animations);
    
    
     },
   minimumPixelSize: 128,
   //clampAnimations:false
 });
 model.readyEvent.addEventListener(() => {
   model.activeAnimations.add({
     index: animations.length - 1,
     loop: Cesium.ModelAnimationLoop.REPEAT,
     multiplier: 0.5,
   });})
//重新计算矩阵
//中心点的位置
const center=new Cesium.Cartesian3.fromDegrees(120,39,20000.0)
//模型位置
const pos=position
//AB方向为Z轴方向
const AB=new Cesium.Cartesian3()
Cesium.Cartesian3.subtract(center,pos,AB)
const Z=new Cesium.Cartesian3()
Cesium.Cartesian3.normalize(AB,Z)
//X轴方向由Z和B位置叉乘得到
const X=new Cesium.Cartesian3()
const earthCenter=new Cesium.Cartesian3(0,0,0)
const pos1=new Cesium.Cartesian3()
Cesium.Cartesian3.subtract(earthCenter,pos,pos1)
Cesium.Cartesian3.normalize(pos1,pos1)
Cesium.Cartesian3.cross(pos1,Z,X)
Cesium.Cartesian3.normalize(X,X)
//Y轴方向由X和Z叉乘得到
const Y=new Cesium.Cartesian3()
Cesium.Cartesian3.cross(X,Z,Y)
Cesium.Cartesian3.normalize(Y,Y)
//计算出矩阵(列主序)
const matrix=new Cesium.Matrix3.fromArray([
  X.x,Y.x,Z.x,
  X.y,Y.y,Z.y,
  X.z,Y.z,Z.z,
])
const m=model.modelMatrix
Cesium.Matrix4.multiplyByMatrix3(m,matrix,m)
model.modelMatrix=m


 viewer.scene.primitives.add(model);
},Cesium.ScreenSpaceEventType.LEFT_CLICK)
//创建一个中心，所有的模型最后都指向这个中心
viewer.scene.primitives.add(new Cesium.Primitive({
  geometryInstances : new Cesium.GeometryInstance({
    geometry : Cesium.EllipsoidGeometry.createGeometry(new Cesium.EllipsoidGeometry({
      radii : new Cesium.Cartesian3(100.0, 100.0, 100.0),
      vertexFormat : Cesium.VertexFormat.POSITION_AND_NORMAL
    })),
    modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
      Cesium.Cartesian3.fromDegrees(120,39)), new Cesium.Cartesian3(0.0, 0.0, 200.0), new Cesium.Matrix4()),
    id : 'ellipsoid',
    attributes : {
      color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
    }
  }),
  appearance : new Cesium.PerInstanceColorAppearance(),
  asynchronous : false
}));
viewer.camera.setView({
  destination:Cesium.Cartesian3.fromDegrees(120,39,3000),
  orientation:{
    heading:Cesium.Math.toRadians(0),
    pitch:Cesium.Math.toRadians(-90),
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
#click{
  position: absolute;
  top:0px;
  left: 0px;
  height: 30px;
  width:200px;
  background-color: rgb(234, 18, 18);
}
#cesiumContainer{
    width: 98%;
    height: 91%;
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