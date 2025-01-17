<template>
  <div id="main">
       <div id="alert">高版本的Cesium旋转绕着地球球心转,只用一次旋转矩阵会导致模型旋转不见。先移到球心旋转,之后再平移回去就可以解决这个问题。
      但额外注意的是如果我们平移到球心旋转,矩阵变化后球心与包围盒中心不重合,要再平移一次让他们重合,重合后再平移回原来的位置即可。</div>
    <div id="cesiumContainer"></div>
 
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
import * as dat from 'dat.gui'
// const GUI=new dat.GUI()
// GUI.domElement.style.position='absolute'
// GUI.domElement.style.top='200px'
// GUI.domElement.style.right='0px'
// GUI.domElement.style.zIndex=4
onMounted(()=>{
const viewer=initCesium()
})
async function initCesium(){
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
const viewer=new Cesium.Viewer('cesiumContainer',{
    animation:false,//动画控件
    baseLayerPicker:false,//基础图层选择器
    fullscreenButton:false,//全屏按钮
    vrButton:false,//vr按钮
    geocoder:false,//搜索框
    homeButton:false,//主页按钮
    infoBox:false,//infoBox按钮
    sceneModePicker:false,//2D,3D转换按钮
    timeline:false,//时间线
    //navigationHelpButton:false,//帮助按钮
    navigationInstructionsInitiallyVisible:false,//不知道什么控件
    selectionIndicator:false,//不知道什么控件
    //globe:false
})
viewer.scene.debugShowFramesPerSecond=true
const tileset = await Cesium.Cesium3DTileset.fromUrl(
     "../../../CesiumBasicSource/3DTile/testm3DTiles.json"
);


//改变3DTiles的位置(老版本)
// const arr=[
//   1.0,0.0,0.0,0.0,
//   0.0,1.0,0.0,0.0,
//   0.0,0.0,1.0,0.0,
//   0.0,-1800.0,0.0,1.0,
// ]
// const translation=new Cesium.Cartesian3.fromElements(0.0,-1800.0,0.0)
// tileset.modelMatrix=new Cesium.Matrix4.fromTranslation(translation)
//tileset.modelMatrix=new Cesium.Matrix4.fromArray(arr)
//改变3DTiles的角度
//老版本可以绕模型包围盒中心旋转
// const m=tileset.modelMatrix
// const rotation=new Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(20.0))
// Cesium.Matrix4.multiplyByMatrix3(m,rotation,m)
// tileset.modelMatrix=m
//新版本的旋转中心是地球的中心。
//把模型平移到地球的中心
const translation=new Cesium.Cartesian3.fromElements(1832281.5501070544, -4636037.35718105,-3967495.636982194)
const m=new Cesium.Matrix4.fromTranslation(translation)
//在地球中心进行旋转
const rotation=new Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(14.0))
Cesium.Matrix4.multiplyByMatrix3(m,rotation,m)
//旋转之后球心和包围盒的中心是不重合的,我们再把他放到球心。
//创建平移矩阵
const spehere=new Cesium.BoundingSphere()
Cesium.BoundingSphere.transform(tileset.boundingSphere, m, spehere)
//console.log(tileset.boundingSphere);
const translation1=new Cesium.Cartesian3.fromElements(-spehere.center.x,-spehere.center.y,-spehere.center.z)
const m1=new Cesium.Matrix4.fromTranslation(translation1)
//把两个矩阵相乘得到新的矩阵,这个复合矩阵保证旋转后的包围盒中心和球心重合
Cesium.Matrix4.multiply(m1,m,m)
Cesium.BoundingSphere.transform(tileset.boundingSphere, m, spehere)
console.log(spehere);
//旋转之后再平移回去
//已知两个点,根据这两个点得到平移矩阵
const point1=new Cesium.Cartesian3.fromElements(0.0,0,0)
const point2=new Cesium.Cartesian3.fromElements(-1832281.5501070544, 4634242.35718105,3967495.636982194)
const translate=new Cesium.Cartesian3()
Cesium.Cartesian3.subtract(point2, point1, translate)
const back=new Cesium.Matrix4.fromTranslation(translate)
Cesium.Matrix4.multiply(back,m,m)
//旋转和平移结合之后最后模型的中心
Cesium.BoundingSphere.transform(tileset.boundingSphere, m, spehere)
//console.log(spehere.center);
//把最后的合成的旋转矩阵给tileset就行了。
tileset.modelMatrix=m
viewer.scene.primitives.add(tileset)
// //用GUI调节 
const center=spehere.center
 center.x+=120
 center.y+=100
 center.z+=180
// const orientation={x:0,y:0,z:0}
// let x=0
// let y=0
// let z=0
// const Fold1=GUI.addFolder('desitination')
// Fold1.add(orientation,'x',-360,360).onChange((value)=>{
// x=value
// viewer.camera.setView({
//   destination:center,
//     orientation:{
//       heading:18,
//       pitch:23,
//       roll:x
//     }
// })
// }).step(0.01)
// Fold1.add(orientation,'y',-360,360).onChange((value)=>{
//   y=value
// viewer.camera.setView({
//   destination:center,
//     orientation:{
//       heading:-13.41,
//       pitch:value,
//       roll:-85
//     }
// })
// }).step(0.01)
// Fold1.add(orientation,'z',-360,360).onChange((value)=>{
//   z=value
// viewer.camera.setView({
//   destination:center,
//     orientation:{
//       heading:value,
//       pitch:10.34,
//       roll:-85
//     }
// })
// }).step(0.01)

//调整相机我们打开就能看到3DTile
//viewer.flyTo(tileset)
// viewer.zoomTo(tileset)
viewer.camera.setView({
  destination:center,
    orientation:{
      heading:-13.41,
      pitch:-21.33,
      roll:-85
    }
})
return viewer
}

</script>

<style scoped>
#main{
margin-left: 2%;
    width:100%;
    height: 100%;
}
#cesiumContainer{
  width: 96%;
  height: 88%;
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
#alert{
  position:absolute;
  margin-top: 2%;
  left: 2%;
  width: 100px;
  height: 70%;
  left: 0px;
  opacity: 0.7;
  right: 0px;
background-color: #e21c1cc7;
color: wheat;
z-index: 2
}
</style>