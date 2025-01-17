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
const position = Cesium.Cartesian3.fromDegrees(
    -123.0744619,
    44.0503706
);
const url = "/../CesiumBasicSource/fly.glb";
const entity = viewer.entities.add({
    name: url,
    position: position,
    model: {
        uri: url,
    },
});

// 添加entity-ellipsoid测试
const outlineOnly = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(
        -123.0743631,
        44.0503706,
        1.0
    ),
    ellipsoid: {
        radii: new Cesium.Cartesian3(1.0, 1.0, 2.0),
        material: "/../webGL资源/科比.jpg",
    },
});

//添加 Primitives 测试
scene.primitives.add(
    new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
            geometry: Cesium.BoxGeometry.fromDimensions({
                vertexFormat:
                    Cesium.PerInstanceColorAppearance
                        .VERTEX_FORMAT,
                dimensions: new Cesium.Cartesian3(
                    1.0,
                    1.0,
                    1.0
                ),
            }),
            modelMatrix: Cesium.Matrix4.multiplyByTranslation(
                Cesium.Transforms.eastNorthUpToFixedFrame(
                    Cesium.Cartesian3.fromDegrees(
                        -123.0742631,
                        44.0503706,
                        1.0
                    )
                ),
                new Cesium.Cartesian3(0.0, 0.0, 1),
                new Cesium.Matrix4()
            ),
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                    Cesium.Color.GREEN.withAlpha(0.5)
                ),
            },
        }),
        appearance: new Cesium.PerInstanceColorAppearance({
            closed: true,
        }),
    })
);

viewer.zoomTo(viewer.entities);

const fragmentShaderSource = `
uniform sampler2D colorTexture;
uniform vec3 defaultColor;

in vec2 v_textureCoordinates;
void main() {
    vec4 texel = texture(colorTexture, v_textureCoordinates);

    if(!czm_selected()) {
        out_FragColor = texel;
    }else{
        out_FragColor = vec4(defaultColor,1.0);
    }

}
`;

const stage = viewer.scene.postProcessStages.add(
    new Cesium.PostProcessStage({
        fragmentShader: fragmentShaderSource,
        uniforms: {
            defaultColor: function () {
                return new Cesium.Color(1.0, 0.0, 1.0);
            }
        },
    })
);
stage.selected = [];
const handler = new Cesium.ScreenSpaceEventHandler(
    viewer.scene.canvas
);

handler.setInputAction(function (movement) {
    const pickedObject = viewer.scene.pick(
        movement.endPosition
    );
    if (Cesium.defined(pickedObject)) {
        // 关键代码
        pickedObject.primitive.pickIds =
            pickedObject.primitive._pickIds;
        stage.selected = [pickedObject.primitive];
    } else {
        stage.selected = [];
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

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