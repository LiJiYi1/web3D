<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <video ref="vide" autoplay loop crossorigin controls>
        <source src="../../../CesiumBasicSource/vedio.mp4" type="video/mp4">
    </video>
  </div>
</template>


<script setup>
import * as Cesium from 'cesium'
import { onMounted,ref } from 'vue';
let viewer;
const vide=ref(null)
onMounted(()=>{
initCesium()
var scene = viewer.scene;

var dimensions = new Cesium.Cartesian3(400000.0, 400000.0, 1.0);
var positionOnEllipsoid = Cesium.Cartesian3.fromDegrees(116.3912, 39.920);
var translateMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(positionOnEllipsoid);
var rotationXMatrix = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(90.0)));
var rotationYMatrix = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(90.0)));
var scaleMatrix = Cesium.Matrix4.fromScale(dimensions);

var planeZModelMatrix = new Cesium.Matrix4();
Cesium.Matrix4.multiply(translateMatrix, scaleMatrix, planeZModelMatrix);

var planeXModelMatrix = new Cesium.Matrix4();
Cesium.Matrix4.multiply(translateMatrix, rotationXMatrix, planeXModelMatrix);
Cesium.Matrix4.multiply(planeXModelMatrix, scaleMatrix, planeXModelMatrix);

var planeYModelMatrix = new Cesium.Matrix4();
Cesium.Matrix4.multiply(translateMatrix, rotationYMatrix, planeYModelMatrix);
Cesium.Matrix4.multiply(planeYModelMatrix, scaleMatrix, planeYModelMatrix);

var videoElement = document.getElementById('trailer');

// createPlane(planeZModelMatrix, new Cesium.Color(0.0, 0.0, 1.0, 1.0));
createPlane(planeXModelMatrix, new Cesium.Color(1.0, 0.0, 0.0, 1.0));
//createPlane(planeYModelMatrix, new Cesium.Color(0.0, 1.0, 0.0, 1.0));

function createPlane(planeModelMatrix) {
    // 创建平面
    var planeGeometry = new Cesium.PlaneGeometry({
        vertexFormat : Cesium.MaterialAppearance.VERTEX_FORMAT,
    });

    var planeGeometryInstance = new Cesium.GeometryInstance({
        geometry : planeGeometry,
        modelMatrix : planeModelMatrix
    });

    var material = Cesium.Material.fromType('Image');
    material.uniforms.image = vide.value;

    material.shaderSource = `
    uniform vec4 color_2;
    uniform vec2 repeat_1;
    uniform sampler2D image_0;
    czm_material czm_getMaterial(czm_materialInput materialInput)
    {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        if(st.s<0.2 || st.s>0.8||st.t<0.2 || st.t>0.8){
            material.diffuse = vec3(1.0,1.0,1.0);
        }else{
            material.diffuse = czm_gammaCorrect(texture(image_0, fract(repeat_1 * materialInput.st)).rgb * color_2.rgb); 
        }
        material.alpha = texture(image_0, fract(repeat_1 * materialInput.st)).a * color_2.a; 
        return material;
    }`


    scene.primitives.add(new Cesium.Primitive({
        geometryInstances : planeGeometryInstance,
        appearance : new Cesium.MaterialAppearance({
            closed: false,
            // translucent: false,
            material: material
        })
    }));
}

viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(positionOnEllipsoid, 300000));
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