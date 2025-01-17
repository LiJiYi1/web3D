<template>
  <div id="main">
       <div id="alert">点击3DTile创建一个圆。这个用了拾取地形方法,配上一个ClassificationPrimitive。这个实体可以理解为点击的时候创建一个几何体,和3DTile取交集。</div>
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
//viewer.scene.pickTranslucentDepth=true
viewer.scene.debugShowFramesPerSecond=true
const tileset = await Cesium.Cesium3DTileset.fromUrl(
     "/../CesiumBasicSource/3DTile/testm3DTiles.json"
);
// Mouse over the globe to see the cartographic position
let handler;
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (movement) {
const pos=new Cesium.Cartesian3()
viewer.scene.pickPosition(movement.position, pos)
viewer.scene.primitives.remove ( viewer.scene.primitives._primitives[1] )
viewer.scene.primitives.add(
  new Cesium.ClassificationPrimitive({
    geometryInstances: new Cesium.GeometryInstance({
      geometry: Cesium.SphereGeometry.createGeometry(new Cesium.SphereGeometry({
        radius : 2.0,
        vertexFormat : Cesium.VertexFormat.POSITION_ONLY
      })),
      modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame (pos ),
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
          new Cesium.Color(0.0,1.0, 0.0, 0.5)
        ),
        show: new Cesium.ShowGeometryInstanceAttribute(true),
      },
      id: "volume",
    }),
    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
    asynchronous: false,
    //debugShowBoundingVolume:true
  })
);

console.log(viewer.scene.primitives);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);



// const buildingHighlight = viewer.scene.primitives.add(
//   new Cesium.ClassificationPrimitive({
//     geometryInstances: new Cesium.GeometryInstance({
//       geometry: Cesium.SphereGeometry.createGeometry(new Cesium.SphereGeometry({
//         radius : 5.0,
//         vertexFormat : Cesium.VertexFormat.POSITION_ONLY
//       })),
//       modelMatrix: modelMatrix,
//       attributes: {
//         color: Cesium.ColorGeometryInstanceAttribute.fromColor(
//           new Cesium.Color(1.0,1.0, 0.0, 0.5)
//         ),
//         show: new Cesium.ShowGeometryInstanceAttribute(true),
//       },
//       id: "volume",
//     }),
//     classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
//     asynchronous: false
//   })
// );
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

    width:100%;
    height: 100%;
}
#cesiumContainer{
    position: absolute;
  left: 0px;
  top:0px;
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
#alert{
  position:absolute;
  width: 100px;
  height: 70%;
  left: 2%;
  opacity: 0.7;
  right: 0px;
background-color: #e21c1cc7;
color: wheat;
z-index: 2
}
</style>