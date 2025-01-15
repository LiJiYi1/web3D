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
let startPosition = Cesium.Cartesian3.fromDegrees(0, 0, 0);
viewer.entities.add({
    position: startPosition,
    point: {
        pixelSize: 10,
        color: Cesium.Color.YELLOW,
    },
});

let enfPosition = Cesium.Cartesian3.fromDegrees(0, 0.1, 100);
let itemPt = viewer.entities.add({
    position: enfPosition,
    point: {
        pixelSize: 10,
        color: Cesium.Color.GREEN,
    },
});

function GetTargeMM(pointA, pointB) {
    const vecAB = Cesium.Cartesian3.subtract(pointB, pointA, new Cesium.Cartesian3());
    const normalAB = Cesium.Cartesian3.normalize(vecAB, new Cesium.Cartesian3());
    const rotationMatrix3 = Cesium.Transforms.rotationMatrixFromPositionVelocity(pointA, normalAB);
    const modelMatrix4 = Cesium.Matrix4.fromRotationTranslation(rotationMatrix3, pointA);
    return modelMatrix4;
}
//获得中间点
function getMidpoint(startCartesian, endCartesian) {
    const geodesic = new Cesium.EllipsoidGeodesic();
    let startCartographic = Cesium.Cartographic.fromCartesian(startCartesian);
    let endCartographic = Cesium.Cartographic.fromCartesian(endCartesian);
    geodesic.setEndPoints(startCartographic, endCartographic);
    const midpointCartographic = geodesic.interpolateUsingFraction(0.5,new Cesium.Cartographic());
    return {
        midPosition: Cesium.Cartesian3.fromRadians(
            midpointCartographic.longitude,
            midpointCartographic.latitude
        ),
        distance:geodesic.surfaceDistance
    };
}
let result = getMidpoint(startPosition,enfPosition);
let midPosition = result.midPosition;
let distance = result.distance;

viewer.entities.add({
    position: midPosition,
    point: {
        pixelSize: 10,
        color: Cesium.Color.RED,
    },
});

function addCylinder() {
    //圆锥旋转，默认是朝上的
    var my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(90));
    var rotationY = Cesium.Matrix4.fromRotationTranslation(my);

    let geo = {
        geometry: new Cesium.CylinderGeometry({
            length: distance,
            topRadius: 0.0,
            bottomRadius: 3000.0,
            vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        }),
        modelMatrix: rotationY,
        attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED.withAlpha(0.5))
        }
    };

    return viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance(geo),
        appearance: new Cesium.PerInstanceColorAppearance({
            material: new Cesium.Material({
                fabric: {
                    type: 'Color',
                }
            })
        }),
    }));
}

let item = addCylinder();
item.modelMatrix = GetTargeMM(midPosition,enfPosition);

viewer.zoomTo(viewer.entities);
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