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
viewer.scene.debugShowFramesPerSecond = true;
const particles = 10000;
const radius = 200;

const positions = [];
const colors = [];
const indices = [];
const normals=[]
//创建顶点,颜色,索引,法线等
for (let i = 0; i < particles; i++) {
    indices.push(i);

    positions.push((Math.random() * 2 - 1) * radius);
    positions.push((Math.random() * 2 - 1) * radius);
    positions.push((Math.random() * 2 - 1) * radius);
    normals.push(0.0);
    normals.push(0.0);
    normals.push(1.0);


    let color = Cesium.Color.fromHsl(i / particles, 1, 0.5);
    colors.push(
        Cesium.Color.floatToByte(color.red),
        Cesium.Color.floatToByte(color.green),
        Cesium.Color.floatToByte(color.blue),
    );
}

const geometry = new Cesium.Geometry({
    attributes: {
        position: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: new Float64Array(positions)
        }),
        color: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 3,
            normalize: true,
            values: new Float32Array(colors)
        }),
        normal: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            //normalize: true,
            values: new Float32Array(normals)
        }),
    },
    indices: new Uint16Array(indices),
    primitiveType: Cesium.PrimitiveType.POINTS,
    vertexFormat: Cesium.VertexFormat.POSITION_AND_COLOR,
    boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
});
const instance = new Cesium.GeometryInstance({
    geometry: geometry,
    modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(120, 40.0)), new Cesium.Cartesian3(0.0, 0.0, 0.0), new Cesium.Matrix4()),

});
//加入场景
const appearance=new Cesium.MaterialAppearance({
         //片段着色器
        fragmentShaderSource: `
            precision mediump float;
            in vec4 v_color;
            in vec2 v_st;
            void main()
            {
                // 按图元到圆心的距离修改透明度
                float d = distance(gl_PointCoord, vec2(0.5,0.5));
                if(d < 0.5){
                    out_FragColor = (1.0-d*2.0) * v_color;
                }else{
                    discard;
                }
            }
            `,
        //顶点着色器
        vertexShaderSource: `
            in vec3 position3DHigh;
            in vec3 position3DLow;
            in vec4 color;
            in vec2 st;
            out vec2 v_st;
            out vec4 v_color;
            in float batchId;
            void main()
            {
                vec4 p = czm_computePosition();
                v_color =color;
                v_st=st;
                p = czm_modelViewProjectionRelativeToEye * p;
                gl_Position = p;
                float time = czm_frameNumber * 0.008;
                gl_PointSize= 20.0 * (1.0 + sin(time)); // 根据时间调整点大小
            }
        `,
        flat:true
    })
console.log(appearance.vertexFormat);
viewer.scene.primitives.add(new Cesium.Primitive({
    geometryInstances: instance,
    appearance: appearance,
    asynchronous:false
}));


viewer.camera.setView({
  destination:Cesium.Cartesian3.fromDegrees(120, 40,2000),
  orientation:{
heading:Cesium.Math.toRadians(-30),
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