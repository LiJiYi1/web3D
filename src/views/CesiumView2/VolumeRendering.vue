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

console.log(1);

var geometry = Cesium.BoxGeometry.fromDimensions({
    vertexFormat: Cesium.VertexFormat.POSITION_AND_NORMAL,
    dimensions: new Cesium.Cartesian3(20.0, 15.0, 10.0),
});

var instance = new Cesium.GeometryInstance({
    geometry: geometry,
    modelMatrix: Cesium.Matrix4.multiplyByTranslation(
        Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(
                124.21936679679918,
                45.85136872098397
            )
        ),
        new Cesium.Cartesian3(0.0, 0.0, 80.0),
        new Cesium.Matrix4()
    ),
    id: "lsh",
});

var material = new Cesium.Material({
    fabric: {
        uniforms: {
            u_time: 0.0
        }
    },
    translucent: true //开关双面渲染
});
// const aper = new Cesium.MaterialAppearance({
//     fragmentShaderSource: ` 
//         in vec3 wc_p;
//         void main()
//         {
//             //vec3 wc_p_lxs = (wc_p/vec3(10.0,7.5,5.0)+1.0)/2.0; // 计算三维坐标  类似二维 st
//             // float lxs_z = fract(wc_p_lxs.z - u_time_0);   // x,y,z 三个方向
//             //float dis = distance(wc_p_lxs,vec3(0.0));
//             // float dis = length(wc_p_lxs);
//             //float a = 1.0;
//             vec3 c=vec3(wc_p);
//             vec3 c1=vec3(distance(vec3(0.0),c));
//             out_FragColor = vec4(c,1.0);
//         }`,
//     vertexShaderSource: `
//         in vec3 position3DHigh;
//         in vec3 position3DLow;
//         in vec3 normal;
//         in vec2 st;
//         in float batchId;
//         out vec3 wc_p;
//         void main()
//         {   
//             vec4 p = czm_computePosition();  //世界坐标
//             wc_p = position3DHigh+position3DLow;
//             vec3 cameraPos = czm_encodedCameraPositionMCHigh + czm_encodedCameraPositionMCLow;
//             gl_Position = czm_modelViewProjectionRelativeToEye * p;
//         }`,
//     closed: false
// });


// const aper = new Cesium.MaterialAppearance({
//     fragmentShaderSource: ` 
//         in vec3 wc_p;
//         void main()
//         {
//             vec3 wc_p_lxs = (wc_p/vec3(10.0,7.5,5.0)+1.0)/2.0; // 计算三维坐标  类似二维 st
//             float lxs_z = fract(wc_p_lxs.z - u_time_0);   // x,y,z 三个方向
//             out_FragColor = vec4(vec3(0.,0.5,.9),lxs_z);
//         }`,
//     vertexShaderSource: `
//         in vec3 position3DHigh;
//         in vec3 position3DLow;
//         in vec3 normal;
//         in vec2 st;
//         in float batchId;
//         out vec3 wc_p;
//         void main()
//         {    
            
//             vec3 cameraPos = czm_encodedCameraPositionMCHigh + czm_encodedCameraPositionMCLow;
//             vec4 p = czm_computePosition();  //世界坐标
//             wc_p = position3DHigh + position3DLow;
//             gl_Position = czm_modelViewProjectionRelativeToEye * p;
//         }`,
//     closed: false
// });


const aper = new Cesium.MaterialAppearance({
    fragmentShaderSource: ` 
        in vec3 wc_p;
        void main()
        {
            vec3 wc_p_lxs = (wc_p/vec3(10.0,7.5,5.0)+1.0)/2.0; // 计算三维坐标  类似二维 st
            float lxs_z = fract(wc_p_lxs.z - u_time_0);   // x,y,z 三个方向
            out_FragColor = vec4(vec3(0.,0.5,.9),lxs_z);
        }`,
    vertexShaderSource: `
       in vec3 position3DHigh;
       in vec3 position3DLow;
       in vec3 normal;
       in vec2 st;
       in float batchId;
        out vec3 wc_p;
        void main()
        {    
            wc_p = position3DHigh + position3DLow;
            vec3 cameraPos = czm_encodedCameraPositionMCHigh + czm_encodedCameraPositionMCLow;
            vec4 p = czm_computePosition();  //世界坐标
            gl_Position = czm_modelViewProjectionRelativeToEye * p;
        }`,
    closed: false
});

const  lxs = viewer.scene.primitives.add(
    new Cesium.Primitive({
        geometryInstances: instance,
        appearance: aper,
        asynchronous: true,
    })
);
lxs.appearance.material = material;



viewer.camera.lookAt(new Cesium.Cartesian3.fromDegrees(124.21936679679918,
    45.85136872098397, 80), new Cesium.Cartesian3(-115, 12, 0));
viewer.scene.preRender.addEventListener(function (s, t) {
    var elaspTime = Cesium.JulianDate.now().secondsOfDay / 1.0;
    lxs.appearance.material.uniforms.u_time = elaspTime;
});

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
 scene3DOnly:true
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