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
const scene = viewer.scene;
scene.globe.depthTestAgainstTerrain = true;
// 构建视锥体
 viewer.extend(Cesium.viewerCesiumInspectorMixin);
const frustum = new Cesium.PerspectiveFrustum({
    fov : Cesium.Math.PI_OVER_THREE,  // 视场角
    // aspectRatio : canvas.clientWidth / canvas.clientHeight,
    aspectRatio : 2,  // 长宽比
    near : 10.0,
    far : 1000.0      // 远平面距离
});
let Matrix3 = Cesium.Matrix3;
let Quaternion=Cesium.Quaternion;
let Cartesian3=Cesium.Cartesian3;
let camera = viewer.scene.camera;
//获得三个方向
// let heading = 45
// let pitch = 30
// let roll = 0
// let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
// let orientation = Cesium.Quaternion.fromHeadingPitchRoll(hpr)
// let matrix = Cesium.Matrix3.fromQuaternion(orientation,new Cesium.Matrix3());
// let right1= Cesium.Matrix3.getColumn(matrix, 0, new Cesium.Cartesian3());
// let up1 = Cesium.Matrix3.getColumn(matrix, 1, new Cesium.Cartesian3());
// let direction  = Cesium.Matrix3.getColumn(matrix, 2, new Cesium.Cartesian3());

const position = Cesium.Cartesian3.fromDegrees(-105.0, 45.0,1200);      // 中心点位
const direction = new Cartesian3(-0.10668226241650887,0.8103322335050215,-0.5761775474872814); // 视角前方向
const up = new Cartesian3(-0.07520626131620274,0.5712482686952298,0.8173245584047634);         // 上方向
let right = new Cartesian3(0.9914448613738105,0.13052619222005152,0);
right = Cartesian3.negate(right, new Cartesian3());
const rotation = new Matrix3();
Matrix3.setColumn(rotation, 0, right, rotation);
Matrix3.setColumn(rotation, 1, up, rotation);
Matrix3.setColumn(rotation, 2, direction, rotation);
const orientation = Quaternion.fromRotationMatrix(
    rotation,
    new Quaternion()
);
let geo = new Cesium.FrustumOutlineGeometry({
    origin: position,
    orientation: orientation,
    frustum: frustum,
});
scene.primitives.add(
    new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
            geometry: geo,
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.RED.withAlpha(0.5)
                ),
            }
        }),
        appearance: new Cesium.PerInstanceColorAppearance({
            translucent: true,
            flat: true,
        }),
        asynchronous: false,
    })
);
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-105.0, 45.0, 500.0),
    duration:0.1
});

function AddPoint(pos,txt=""){
    viewer.entities.add({
        position: pos,
        point: {
            pixelSize: 10,
            color: Cesium.Color.YELLOW,
        },
        label: {
            text: txt,
        },
    });
}

// 计算各个点位
AddPoint(position);
let frontDirect = Cartesian3.multiplyByScalar(direction,frustum.far,new Cesium.Cartesian3());
let bottomCenter = Cartesian3.add(position,frontDirect,new Cesium.Cartesian3());
AddPoint(bottomCenter,"bottomCenter");

let rightLength = frustum.far* Math.tan(frustum.fov/2);
let rightDirect = Cartesian3.multiplyByScalar(right,rightLength,new Cesium.Cartesian3());
let rightCenter = Cartesian3.add(bottomCenter,rightDirect,new Cesium.Cartesian3());
AddPoint(rightCenter,"rightCenter");

let upLength = rightLength/frustum.aspectRatio;
let upDirect = Cartesian3.multiplyByScalar(up,upLength,new Cesium.Cartesian3());
let upRightPt = Cartesian3.add(rightCenter,upDirect,new Cesium.Cartesian3());
AddPoint(upRightPt,"upRightPt");

let downRightPt = Cartesian3.subtract(rightCenter,upDirect,new Cesium.Cartesian3());
AddPoint(downRightPt,"downRightPt");

let leftCenter = Cartesian3.subtract(bottomCenter,rightDirect,new Cesium.Cartesian3());
AddPoint(leftCenter,"leftCenter");

let upLeftPt = Cartesian3.add(leftCenter,upDirect,new Cesium.Cartesian3());
AddPoint(upLeftPt,"upLeftPt");

let downLeftPt = Cartesian3.subtract(leftCenter,upDirect,new Cesium.Cartesian3());
AddPoint(downLeftPt,"downLeftPt");
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