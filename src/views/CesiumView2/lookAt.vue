<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
// function getModelMatrix4(pointA, pointB) {
//     const vecAB = Cesium.Cartesian3.subtract(pointB, pointA, new Cesium.Cartesian3());
//     const normalAB = Cesium.Cartesian3.normalize(vecAB, new Cesium.Cartesian3());
//     const rotationMatrix3 = Cesium.Transforms.rotationMatrixFromPositionVelocity(pointA,normalAB);
//     const modelMatrix4 = Cesium.Matrix4.fromRotation(rotationMatrix3);
//     return modelMatrix4;
// }
function getModelMatrix4(pointA, pointB) {
    const vecAB = Cesium.Cartesian3.subtract(pointB, pointA, new Cesium.Cartesian3());
    const normalAB = Cesium.Cartesian3.normalize(vecAB, new Cesium.Cartesian3());
    const rotationMatrix3 = Cesium.Transforms.rotationMatrixFromPositionVelocity(pointA, normalAB);
    const modelMatrix4 = Cesium.Matrix4.fromRotationTranslation(rotationMatrix3, pointA);
    return modelMatrix4;
}

onMounted(()=>{
initCesium()
const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
const mid = Cesium.JulianDate.addSeconds(start,6, new Cesium.JulianDate());
const stop = Cesium.JulianDate.addSeconds(start,12, new Cesium.JulianDate());
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
//viewer.clock.currentTime = start.clone();
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
viewer.clock.multiplier = 3;
viewer.clock.shouldAnimate = true;
const position = new Cesium.SampledPositionProperty();
position.addSample(start, new Cesium.Cartesian3.fromDegrees(121.2,37.0,-110))
position.addSample(mid, new Cesium.Cartesian3.fromDegrees(121.7,37.0,0))
position.addSample(stop, new Cesium.Cartesian3.fromDegrees(121.7,37.5,0))
//创建路
viewer.entities.add({
    id:'road',
    polyline:{
        positions:Cesium.Cartesian3.fromDegreesArray([121.2,37.0,121.7,37.0,121.7,37.5]),
        width:20,
        material:new Cesium.PolylineOutlineMaterialProperty({
            color:Cesium.Color.WHITE,
            outlineColor:Cesium.Color.RED,
            outlineWidth:10
        }),
        arcType:Cesium.ArcType.GEODESIC
    }
})
//创建模型
const model=new Cesium.Entity({
    id:'car',
    model:{
    uri:'../../../public/CesiumBasicSource/无人机居中.glb',
    scale:100
},
position:position,
orientation:new Cesium.VelocityOrientationProperty(position)
})
viewer.entities.add(model)
//创建数组储存这一堆圆锥以及一堆圆锥的位置
const cylinderArr=[]

//创建一堆圆锥
const cylinder = new Cesium.CylinderGeometry({
    length: 10000,
    topRadius: 600,
    bottomRadius: 0,
});
const geometry = Cesium.CylinderGeometry.createGeometry(cylinder);
let lon=121.2
let lat=37.02
for(let i=0;i<10;i++){
const x=lon+0.05*i
for(let i=0;i<10;i++){
const y=lat+0.02*i
const instance = new Cesium.GeometryInstance({
  geometry : geometry,
   modelMatrix : Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(x, y,4000)),
    id : 'object returned when this instance is picked and to get/set per-instance attributes',
    attributes : {
    color : new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.4)
  }
});
const primitive=new Cesium.Primitive({
  geometryInstances : instance,
  appearance : new Cesium.MaterialAppearance({
    material : new Cesium.Material({
  fabric: {
    type: 'Color',
    uniforms: {
      color: new Cesium.Color(1.0, 1.0, 0.0, 0.4)
    }
  }
})
  }),
  asynchronous:false,
  //debugShowBoundingVolume :true
})
cylinderArr.push({
  position:new Cesium.Cartesian3.fromDegrees(x,y,4000),
  cylinder:primitive,
  m:null
})
viewer.scene.primitives.add(primitive);
}
}
viewer.scene.preUpdate.addEventListener(()=>{
let modelposition = model.position.getValue(viewer.clock.currentTime);
for (let i = 0; i < cylinderArr.length; i++) {
let cylinder = cylinderArr[i];
//获取这个几何体的中心
if(cylinder.cylinder._boundingSpheres[0]){
//获得primitive的模型矩阵
const m=cylinder.cylinder.modelMatrix
const center=cylinder.cylinder._boundingSpheres[0].center
//从第二次开始,模型矩阵就已经变化掉了,我们需要用上次的矩阵的逆让模型矩阵归位
if(cylinder.cylinder.m ){
  Cesium.Matrix4.multiply(m,cylinder.cylinder.m,m)
}
//先把几何体移到球心再旋转
const toCenter=new Cesium.Matrix4()
Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(-center.x,-center.y,-center.z),toCenter)
Cesium.Matrix4.multiply(m, toCenter, m)
const rotation=getModelMatrix4(cylinder.cylinder._boundingSpheres[0].center,modelposition.clone());
Cesium.Matrix4.multiply(rotation,m, m)
//旋转之后的中心并不在球心,获得此时包围盒中心位置
const spehere=new Cesium.BoundingSphere()
Cesium.BoundingSphere.transform(cylinder.cylinder._boundingSpheres[0], m, spehere)
//把包围盒的中心再移回球心
const toCenter1=new Cesium.Matrix4()
Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(-spehere.center.x,-spehere.center.y,-spehere.center.z),toCenter1)
Cesium.Matrix4.multiply(toCenter1,m , m)
//移回原来的位置
 const back=new Cesium.Matrix4()
 Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(center.x,center.y,center.z),back)
 Cesium.Matrix4.multiply(back, m, m)
cylinder.cylinder.modelMatrix = m;
//获得逆矩阵
const inverse=new Cesium.Matrix4()
Cesium.Matrix4.inverse(m, inverse)
//Cesium.Matrix4.multiply(m,inverse,m)
//逆矩阵给圆锥的m属性
cylinder.cylinder.m = inverse;
}
}
})

viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(120.9,37,70000),
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