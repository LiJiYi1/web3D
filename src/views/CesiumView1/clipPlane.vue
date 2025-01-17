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
// Add a clipping plane, a plane geometry to show the representation of the
// plane, and control the magnitude of the plane distance with the mouse.
const scene = viewer.scene;

viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("2022-08-01T00:00:00Z");

const viewModel = {
  debugBoundingVolumesEnabled: false,
  edgeStylingEnabled: true,

};
//裁剪平面起始
let targetY = 1088.0;
let selectedPlane;
let clippingPlanes;

// 鼠标按下选中平面
const downHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
downHandler.setInputAction(function (movement) {
  const pickedObject = scene.pick(movement.position);
  if (
    Cesium.defined(pickedObject) &&
    Cesium.defined(pickedObject.id) &&
    Cesium.defined(pickedObject.id.plane)
  ) {
    selectedPlane = pickedObject.id.plane;
    selectedPlane.material = Cesium.Color.WHITE.withAlpha(0.05);
    selectedPlane.outlineColor = Cesium.Color.WHITE;
    scene.screenSpaceCameraController.enableInputs = false;
  }
}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

// 鼠标抬起释放平面
const upHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
upHandler.setInputAction(function () {
  if (Cesium.defined(selectedPlane)) {
    selectedPlane.material = Cesium.Color.WHITE.withAlpha(0.1);
    selectedPlane.outlineColor = Cesium.Color.WHITE;
    selectedPlane = undefined;
  }

  scene.screenSpaceCameraController.enableInputs = true;
}, Cesium.ScreenSpaceEventType.LEFT_UP);

//当鼠标移动的时候更新平面
const moveHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
moveHandler.setInputAction(function (movement) {
  if (Cesium.defined(selectedPlane)) {
    const deltaY = movement.startPosition.y - movement.endPosition.y;
    targetY += deltaY;
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
//平面更新
function createPlaneUpdateFunction(plane) {
  return function () {
    plane.distance = targetY;
    return plane;
  };
}
//裁剪平面集合
clippingPlanes = new Cesium.ClippingPlaneCollection({
    planes: [
      new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -1.0), 0.0),
    ],
    edgeWidth: viewModel.edgeStylingEnabled ? 1.0 : 0.0,
  });
//创建模型并加载
const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 290.0);
const heading = Cesium.Math.toRadians(135.0);
const pitch = 0.0;
const roll = 0.0;
const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
const entity = viewer.entities.add({
    name: 'car',
    position: position,
    orientation: orientation,
    model: {
      uri: '/../CesiumBasicSource/轿车.glb',
      scale: 8,
      minimumPixelSize: 100.0,
      clippingPlanes: clippingPlanes,
    },
  });
//用callBackProperty不断更新裁剪平面
for (let i = 0; i < clippingPlanes.length; ++i) {
    const plane = clippingPlanes.get(i);
    //创建一个平面
    const planeEntity = viewer.entities.add({
    position: position,
    plane: {
        dimensions: new Cesium.Cartesian2(4000.0, 4000.0),
        material: Cesium.Color.WHITE.withAlpha(0.1),
        plane: new Cesium.CallbackProperty(
          createPlaneUpdateFunction(plane),
          false,
        ),
        outline: true,
        outlineColor: Cesium.Color.WHITE,
      },
    });
  }
  viewer.trackedEntity = entity;
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
    width: 100%;
    height: 93%;
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