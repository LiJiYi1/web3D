<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <div id="change" @click="change()">网格结构与mesh切换</div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
//条带的长度
const length=100000.0;
//条带的宽度
const width=1000.0;
//多长的长度实现一个起伏效果的参数
const length1=200.0;
//条带最高点的高度
const HMax=300.0
//创建数组存储所有的点
const pointArr=[]
//根据条带的长度获得条带上的所有点(此处为保证平滑度创建2000个点)
for(let i=0;i<2000.0;i++){
  //A,B两点代表条带宽度的两边
  const Ax=(length/2000.0)*i
  const Ay=HMax*Math.sin(Ax/length1)
  const Az=-width

  const Bx=(length/2000.0)*i
  const By=HMax*Math.sin(Bx/length1)
  const Bz=width
  pointArr.push(Ax,Ay,Az,Bx,By,Bz)
}
//创建一个数组存储我们最后的顶点
const finallyArr=[]
//在不使用index索引绘制的情况下我们需要把所有顶点按照三角形的顺序处理一下(逆时针为正,顺时针为反)
for(let i=0;i<pointArr.length;i+=6){
//获得每个矩形所需要的点
if(i+11<pointArr.length){const ax=pointArr[i]
const ay=pointArr[i+1]
const az=pointArr[i+2]

const bx=pointArr[i+3]
const by=pointArr[i+4]
const bz=pointArr[i+5]

const cx=pointArr[i+6]
const cy=pointArr[i+7]
const cz=pointArr[i+8]

const dx=pointArr[i+9]
const dy=pointArr[i+10]
const dz=pointArr[i+11]

//这些点按照顺序放入数组里
finallyArr.push(
ax,ay,az,
bx,by,bz,
cx,cy,cz,
cx,cy,cz,
bx,by,bz,
dx,dy,dz,

)
}
}
// console.log(finallyArr);
//根据上面的顶点创建我们自定义的几何体
const positions = new Float32Array(finallyArr);
const geometry = new Cesium.Geometry({
  attributes : {
    position : new Cesium.GeometryAttribute({
      componentDatatype : Cesium.ComponentDatatype.DOUBLE,
      componentsPerAttribute : 3,
      values : positions
    }),
    normal:new Cesium.GeometryAttribute({
      componentDatatype : Cesium.ComponentDatatype.DOUBLE,
      componentsPerAttribute : 3,
      values : positions
    })
  },
  //indices : new Uint16Array([0, 1, 1, 2, 2, 0]),
  primitiveType : Cesium.PrimitiveType.LINE_STRIP,
  boundingSphere : Cesium.BoundingSphere.fromVertices(positions)
});
const instance = new Cesium.GeometryInstance({
  geometry : geometry,
  modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(120.59777, 37)), new Cesium.Cartesian3(0.0, 0.0, 1000.0), new Cesium.Matrix4()),
  attributes : {
    color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
  },
  id : 'bottom'
});
function change(){
viewer.scene.primitives.removeAll()
if(geometry.primitiveType===Cesium.PrimitiveType.LINE_STRIP)
{geometry.primitiveType=Cesium.PrimitiveType.TRIANGLE_STRIP
viewer.scene.primitives.add(new Cesium.Primitive({
  geometryInstances : instance,
  appearance : new Cesium.PerInstanceColorAppearance({
    flat:true,
    //translucent:false,
  }),
  asynchronous:false,
  shadows:Cesium.ShadowMode.ENABLED
}));
}
else if(geometry.primitiveType===Cesium.PrimitiveType.TRIANGLE_STRIP){
  geometry.primitiveType=Cesium.PrimitiveType.LINE_STRIP
  viewer.scene.primitives.add(new Cesium.Primitive({
  geometryInstances : instance,
  appearance : new Cesium.PerInstanceColorAppearance({
    flat:true,
    //translucent:false,
  }),
  asynchronous:false,
  shadows:Cesium.ShadowMode.ENABLED
}));
}
}
let viewer;
onMounted(()=>{
initCesium()


viewer.scene.primitives.add(new Cesium.Primitive({
  geometryInstances : instance,
  appearance : new Cesium.PerInstanceColorAppearance({
    flat:true,
    //translucent:false,
  }),
  asynchronous:false,
  shadows:Cesium.ShadowMode.ENABLED
}));
viewer.scene.light.intensity=1000.0
viewer.camera.setView({
    destination:new Cesium.Cartesian3.fromDegrees(121,36.5,110000),
    orientation:{
        heading:Cesium.Math.toRadians(0),   
        pitch:Cesium.Math.toRadians(-60),
        roll:Cesium.Math.toRadians(0)
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
    height: 92%;
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
#change{
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: aquamarine;
  cursor: pointer;
}
</style>