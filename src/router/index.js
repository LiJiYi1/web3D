import { createRouter, createWebHashHistory } from 'vue-router'
const THREE = () => import('../components/THREEIntroduction.vue')
const Cesium = () => import('../components/CesiumIntroduction.vue')
const webGLImportance=()=>import('../components/webGLImportance.vue')
const LearningJourney=()=>import('../components/LearningJourney.vue')
const LearningScence = () => import('../components/LearningScence.vue')
const ResourceRecommendation=()=>import('../components/ResourceRecommendation.vue')
const TimeLine1=()=>import('../components/TimeLine.vue')
//THREE部分的组件
const main=()=>import('../components/enter.vue')
const Threebasic =()=>import( '../views/THREEViews/Threebasic.vue')
const Geometry =()=>import( '../views/THREEViews/geometry.vue')
const modelMaterial =()=>import( '@/views/THREEViews/model&material.vue')
const Group =()=>import( '@/views/THREEViews/group.vue')
const Texture =()=>import( '@/views/THREEViews/texture.vue')
const gltfLoader =()=>import( '@/views/THREEViews/gltfLoad.vue')
const PBR =()=>import( '@/views/THREEViews/PBR.vue')
const canvasUI =()=>import( '@/views/THREEViews/canvasUI.vue')
const curve =()=>import( '@/views/THREEViews/curve&geometry.vue')
const OrthographicCamera =()=>import( '@/views/THREEViews/OrthographicCamera.vue')
const cameraParameter =()=>import( '@/views/THREEViews/cameraParameter&control.vue')
const LightShadow  =()=>import( '@/views/THREEViews/light&shadow.vue')
const factory =()=>import( '@/views/THREEViews/factory.vue')
const spirite =()=>import( '@/views/THREEViews/spirite.vue')
const EffectComposer =()=>import( '@/views/THREEViews/EffectComposer.vue')
const ray =()=>import( '@/views/THREEViews/ray.vue')
const label =()=>import( '@/views/THREEViews/label.vue')
const keyFrameAnimation =()=>import( '@/views/THREEViews/keyFrameAnimation.vue')
const granary =()=>import( '@/粮仓案例/granary.vue')
const phone =()=>import( '@/产品展示手机/phone.vue')
const car =()=>import( '@/产品展示汽车/car.vue')
const basic =()=>import( '@/views/THREEViews1/basicVector/basicVector.vue')
const speedAddspeed =()=>import( '@/views/THREEViews1/speed&addspeed/speed&addspeed.vue')
const dotCross =()=>import( '@/views/THREEViews1/dot&cross/dot&cross.vue')
const EulerQuaternion =()=>import( '@/views/THREEViews1/Euler&Quaternion/Euler&Quaternion.vue')
const Matrix =()=>import( '@/views/THREEViews1/matrix.js/matrix.vue')
const Ramble =()=>import( '@/views/THREEViews1/First, Three-person Ramble/First,Three-personRamble.vue')
const Ortree =()=>import( '@/views/THREEViews1/Octree/Octree.vue')
const CannonJS =()=>import( '@/views/THREEViews1/CannonJS/CannonJS.vue')
const worldMap =()=>import( '@/views/THREEViews1/worldMap/worldMap.vue')
const ChinaMap =()=>import( '@/views/THREEViews1/chinaMap/chinaMap.vue')
const ChinaMapColor =()=>import( '@/views/THREEViews1/chinaMapColor/chinaMapColor.vue')
const ChinaMapHeight =()=>import( '@/views/THREEViews1/chinaMapHeight/chinaMapHeight.vue')
const ChinaBubbleMap =()=>import( '@/views/THREEViews1/chinaBubbleMap/chinaBubbleMap.vue')
const ChinaColumnMap =()=>import( '@/views/THREEViews1/chinaColumnMap/chinaColumnMap.vue')
const ChinaPointMap =()=>import( '@/views/THREEViews1/chinaPointMap/chinaPointMap.vue')
const ChinaLineMap =()=>import( '@/views/THREEViews1/chinaLineMap/chinaLineMap.vue')
const WorldPeople =()=>import( '@/views/THREEViews1/worldPeople/worldPeople.vue')
const ChinaMapFlyLine =()=>import( '@/views/THREEViews1/chinaMapFlyLine/chinaMapFlyLine.vue')
const EarthCoordinates =()=>import( '@/views/THREEViews1/earthCoordinates/earthCoordinates.vue')
const worldMapEarth =()=>import(  '../views/THREEViews1/worldMap(earth)/worldMap.vue')
const WorldMapSepherLine=()=>import('@/views/THREEViews1/worldMapSepherLine/worldMapSepherLine.vue')
const WorldMapSepherLines = () => import('@/views/THREEViews1/worldMapSepherLines/worldMapSepherLines.vue')
const WorldMapSepherLabel = () => import('@/views/THREEViews1/worldMapSepherLabel/worldMapSepherLabel.vue')
const triangulation=()=>import('@/views/THREEViews1/triangulation/triangulation.vue')
const sphereMesh = () => import('@/views/THREEViews1/sphereMesh/sphereMesh.vue')
const EarthPoints = () => import('@/views/THREEViews1/earthPoints/earthPoints.vue')
const EarthColumn =()=>import('@/views/THREEViews1/earthColumn/earthColumn.vue')
const earthFlyLine=()=>import('@/views/THREEViews1/earthFlyLine/earthFlyLine.vue')
const Gl_Point =()=>import('@/views/THREEViews2/gl_Point.vue')
const Gl_Rect=()=>import('@/views/THREEViews2/gl_Rect.vue')
const Gl_Matrix=()=>import('@/views/THREEViews2/gl_Matrix.vue')
const Gl_Coordinates=()=>import('@/views/THREEViews2/coordinateSystem.vue')
const Gl_Cube=()=>import('@/views/THREEViews2/gl_CubeIndex.vue')
const Gl_DepthTest=()=>import('@/views/THREEViews2/colorDepthTest.vue')
const Gl_PointLight=()=>import('@/views/THREEViews2/pointLight.vue')
const Gl_DirLight=()=>import('@/views/THREEViews2/dirLight.vue')
const Gl_RoateAnimate=()=>import('@/views/THREEViews2/rotateAniamtion.vue')
const Gl_Texture=()=>import('@/views/THREEViews2/gl_texture.vue')
const Gl_Program=()=>import('@/views/THREEViews2/gl_changeProgram.vue')
const Gl_aMix=()=>import('@/views/THREEViews2/gl_αMix.vue')
const Gl_DepthaMix=()=>import('@/views/THREEViews2/gl_Depth&aMix.vue')
const shaderMaterial=()=>import('@/views/THREEViews2/shaderMaterial.vue')
const onBeforeCompile=()=>import('@/views/THREEViews2/onBeforeCompile.vue')
const smartCity=()=>import('@/views/THREEViews2/smartCity/smartCity.vue')
//Cesium部分的组件
const cesiumBasic=()=>import('@/views/CesiumView/earthBasic.vue')
const earthMap=()=>import('@/views/CesiumView/earthMap.vue')
const Entity = () => import('@/views/CesiumView/Entity.vue')
const THREEDTile=()=>import('@/views/CesiumView/3DTile.vue')
const Material=()=>import('@/views/CesiumView/Material.vue')
const geojson=()=>import('@/views/CesiumView/GEOJSON.vue')
const arc=()=>import('@/views/CesiumView/customArc.vue')
const polylineType=()=>import('@/views/CesiumView/polylineType.vue')
const grdient=()=>import('@/views/CesiumView1/grident.vue')
const groundLine=()=>import('@/views/CesiumView1/groundLine.vue')
const earthTexture=()=>import('@/views/CesiumView1/earthTexture.vue')
const CZML=()=>import('@/views/CesiumView1/CZML.vue')
const HeatMap=()=>import('@/views/CesiumView1/HeatMap.vue')
const callbackProperty=()=>import('@/views/CesiumView1/callbackProperty.vue')
const eye=()=>import('@/views/CesiumView1/eye.vue')
const animation=()=>import('@/views/CesiumView2/animation.vue')
const singleColorEarth=()=>import('@/views/CesiumView2/singleColorEarth.vue')
const viewerFlyContinue=()=>import('@/views/CesiumView2/viewerFlyContinue.vue')
const picking=()=>import('@/views/CesiumView2/picking.vue')
const entitySelet=()=>import('@/views/CesiumView2/entitySelectType.vue')
const limitMap=()=>import('@/views/CesiumView2/limitMap.vue')
const primitive=()=>import('@/views/CesiumView2/primitive.vue')
const ray1=()=>import('@/views/CesiumView2/ray.vue')
const water=()=>import('@/views/CesiumView2/water.vue')
const dashCircle = () => import('@/views/CesiumView2/dashCircle.vue')
const bubbleWindow=()=>import('@/views/CesiumView2/bubbleWindow.vue')
const customPrimitive=()=>import('@/views/CesiumView2/customPrimitive.vue')
const customMaterial=()=>import('@/views/CesiumView2/customMaterial.vue')
const cylinder=()=>import('@/views/CesiumView2/cylinderMap.vue')
const modelRotation=()=>import('@/views/CesiumView2/modelRotation.vue')
const modelDirection=()=>import('@/views/CesiumView2/modelDirection.vue')
const polygonHole=()=>import('@/views/CesiumView2/polygonHole.vue')
const geojsonPointType=()=>import('@/views/CesiumView2/geojsonStyle.vue')
const particleSystem=()=>import('@/views/CesiumView2/particleSystem.vue')
const velocityOrientation=()=>import('@/views/CesiumView2/velocityOrientation.vue')
const timeLine=()=>import('@/views/CesiumView2/timeline.vue')
const turf=()=>import('@/views/CesiumView2/turf.vue')
const mapCenter=()=>import('@/views/CesiumView2/MapCenter.vue')
const textureClip = () => import('@/views/CesiumView2/rectangleTextureClip.vue')
const rainbow=()=>import('@/views/CesiumView2/rainbow.vue')
const transformScaleRotate=()=>import('@/views/CesiumView2/transformScaleRotate.vue')
const taichi=()=>import('@/views/CesiumView2/taichi.vue')
const lookAt=()=>import('@/views/CesiumView2/lookAt.vue')
const CZMLClockRange=()=>import('@/views/CesiumView2/CZMLClockRange.vue')
const geojsonWater=()=>import('@/views/CesiumView2/geojsonWaterMaterial.vue')
const intersectRay=()=>import('@/views/CesiumView2/intersectObjectRay.vue')
const lookAtTransform= () => import('@/views/CesiumView2/lookAtTransform.vue')
const CZMLPointsDivide=()=>import('@/views/CesiumView2/CZMLMovingPointDivide.vue')
const customGeometry=()=>import('@/views/CesiumView2/customGeometry.vue')
const hide=()=>import('@/views/CesiumView2/hide.vue')
const satelliteScan=()=>import('@/views/CesiumView2/satelliteScan.vue')
const cubeTexture=()=>import('@/views/CesiumView2/cubeTexture.vue')
const likeBufferGeometry=()=>import('@/views/CesiumView2/bufferGeometry.vue')
const ModelMaterial=()=>import('@/views/CesiumView2/modelMaterial.vue')
const textureOverlay=()=>import('@/views/CesiumView2/textureOverlay.vue')
const trangleByTwoPoints=()=>import('@/views/CesiumView2/tranglebyTwoPoint.vue')
const turfDesitination=()=>import('@/views/CesiumView2/turfDesitination.vue')
const terrianPosition=()=>import('@/views/CesiumView2/pickTerrianPosition.vue')
const entityRotate=()=>import('@/views/CesiumView2/entityRoate.vue')
const vectorExtrude=()=>import('@/views/CesiumView2/vectorExtrude.vue')
const LED=()=>import('@/views/CesiumView2/LED.vue')
const colorText=()=>import('@/views/CesiumView2/ColorText.vue')
const externalVariable=()=>import('@/views/webGLView/externalVariable.vue')
const coordinateCorrection=()=>import('@/views/webGLView/coordinateCorrection.vue')
const colorTransform=()=>import('@/views/webGLView/colorTransform.vue')
const abs=()=>import('@/views/webGLView/abs.vue')
const sign=()=>import('@/views/webGLView/sign.vue')
const ceil=()=>import('@/views/webGLView/ceil.vue')
const floor=()=>import('@/views/webGLView/floor.vue')
const step=()=>import('@/views/webGLView/step.vue')
const smoothstep=()=>import('@/views/webGLView/smoothstep.vue')
const minMax=()=>import('@/views/webGLView/minMax.vue')
const mod=()=>import('@/views/webGLView/mod.vue')
const mix=()=>import('@/views/webGLView/mix.vue')
const fract=()=>import('@/views/webGLView/fract.vue')
const clamp=()=>import('@/views/webGLView/clamp.vue')
const radiansAndDegrees=()=>import('@/views/webGLView/radiusAndDegrees.vue')
const sinAndCos=()=>import('@/views/webGLView/sinAndCos.vue')
const tan=()=>import('@/views/webGLView/tan.vue')
const asinAndAcos=()=>import('@/views/webGLView/asinAndAcos.vue')
const atan=()=>import('@/views/webGLView/atan.vue')
const lengthAndDistance=()=>import('@/views/webGLView/lengthAndDistance.vue')
const dotCrossNormalize=()=>import('@/views/webGLView/dotCrossNormalize.vue')
const faceforward = () => import('@/views/webGLView/faceforward.vue')
const reflect=()=>import('@/views/webGLView/reflect.vue')
const refract=()=>import('@/views/webGLView/refract.vue')
const exp=()=>import('@/views/webGLView/exp.vue')
const pow=()=>import('@/views/webGLView/pow.vue')
const log = () => import('@/views/webGLView/log.vue')
const vec = () => import('@/views/webGLView/vec.vue')
const random=()=>import('@/views/webGLView/random.vue')
const noise=()=>import('@/views/webGLView/noise.vue')
const genotyping = () => import('@/views/webGLView/genotyping.vue')
const fire=()=>import('@/views/webGLView/fire.vue')
const sun = () => import('@/views/webGLView/sun.vue')
const overlaySpecialEffect=()=>import('@/views/webGLView/overlaySpecialEffect.vue')
const fiveStarFlag=()=>import('@/views/webGLView/Five-starRedFlag.vue')
const batteryCharge=()=>import('@/views/webGLView/batteryCharge.vue')
const sea=()=>import('@/views/webGLView/sea.vue')
const rainGlass=()=>import('@/views/webGLView/rainGlass.vue')
const colorChange=()=>import('@/views/webGLView/colorChange.vue')
const radar=()=>import('@/views/webGLView/radar.vue')
const DynamicDashedLine=()=>import('@/views/CesiumView2/DynamicDashedLine.vue')
const changeGlowLineColor=()=>import('@/views/CesiumView2/changeGlowLineColor.vue')
const lightning=()=>import('@/views/CesiumView2/lightning.vue')
const lonlatGrid=()=>import('@/views/CesiumView2/lonlatGrid.vue')
const vertexShaderChangePoint=()=>import('@/views/CesiumView2/VertexShaderChangePoint.vue')
const CZMLConectMovingPoint=()=>import('@/views/CesiumView2/CZMLConnectingMovingPoints.vue')
const Road=()=>import('@/views/CesiumView2/Road.vue')
const Flag=()=>import('@/views/CesiumView2/Flag.vue')
const polygonChange=()=>import('@/views/CesiumView2/polygonChange.vue')
const TilePick=()=>import('@/views/CesiumView2/3DTilePick.vue')
const THREEDRadar=()=>import('@/views/CesiumView2/3DRadar.vue')
const pointInsideCylinder=()=>import('@/views/CesiumView2/pointInsideCylinder.vue')
const polylineVolumn=()=>import('@/views/CesiumView2/polylineVolumn.vue')
const path=()=>import('@/views/CesiumView2/path.vue')
const rayAndEarth=()=>import('@/views/CesiumView2/rayAndEarth.vue')
const polygonFull=()=>import('@/views/CesiumView2/polygonFull.vue')
const THREEDTileStyle=()=>import('@/views/CesiumView2/3DTileStyle.vue')
const cylinderTwoPoint=()=>import('@/views/CesiumView2/cylinderTwoPoint.vue')
const gltfColorGrident=()=>import('@/views/CesiumView2/gltfColorGridiendt.vue')
const postProcess=()=>import('@/views/CesiumView2/postProcess.vue')
const video=()=>import('@/views/CesiumView2/video.vue')
const lightningPlus=()=>import('@/views/CesiumView2/lightningPlus.vue')
const eyeCylinderBottom=()=>import('@/views/CesiumView2/eyeCylinderBottom.vue')
const eyeCylinderBottom1 = () => import('@/views/CesiumView2/eyeCylinderBottom1.vue')
const axes=()=>import('@/views/CesiumView2/axes.vue')
const Fog=()=>import('@/views/CesiumView2/Fog.vue')
const polygonBorderGrident=()=>import('@/views/CesiumView2/polygonBorderGrident.vue')
const volumnRendering=()=>import('@/views/CesiumView2/VolumeRendering.vue')
const explosion=()=>import('@/views/CesiumView2/Explosion.vue')
const explosionPlus=()=>import('@/views/CesiumView2/ExplosionPlus.vue')
const manyEarth=()=>import('@/views/CesiumView2/manyEarth.vue')
const turfTIN=()=>import('@/views/CesiumView2/turfTIN.vue')
const entitiesPostProcess=()=>import('@/views/CesiumView2/entitiesPostProcess.vue')
const HeatMap1=()=>import('@/views/CesiumView2/heatMap1.vue')
const tiandiMap=()=>import('@/views/CesiumView/tiandiMap.vue')
const baiduMap=()=>import('@/views/CesiumView/baiduMap.vue')
const lightStyle=()=>import('@/views/CesiumView2/lightStyle.vue')
const skyBox=()=>import('@/views/CesiumView2/skyBox.vue')
const rain=()=>import('@/views/CesiumView2/rain.vue')
const snow=()=>import('@/views/CesiumView2/snow.vue')
const ContourLine=()=>import('@/views/CesiumView1/ContourLine.vue')
const ElevationRamp=()=>import('@/views/CesiumView1/ElevationRamp.vue')
const ElevationBand = ()=> import('@/views/CesiumView1/elevationBand.vue')
const polylineUnderGround=()=>import('@/views/CesiumView1/polylineUnderGround.vue')
const ColumbusView=()=>import('@/views/CesiumView1/ColumbusView.vue')
const pin=()=>import('@/views/CesiumView1/pin.vue')
const polylineVolumn1=()=>import('@/views/CesiumView1/polylineVolumn.vue')
const clipPlane=()=>import('@/views/CesiumView1/clipPlane.vue')
const divideScreen = () => import('@/views/CesiumView1/divideScreen.vue')
const cluster=()=>import('@/views/CesiumView/cluster.vue')
const InundationAnalysis=()=>import('@/views/CesiumView1/InundationAnalysis.vue')
const router = createRouter({
  history:createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
     {
      path: '/THREEIntroduction',
      component: THREE
      },
    {
      path: '/CesiumIntroduction',
      component: Cesium
    },
    {
      path: '/webGLImportance',
      component: webGLImportance
    },
    {
      path: '/LearningJourney',
      component: LearningJourney
    },
    {
      path: '/LearningScence',
      component: LearningScence
    },
    {
      path: '/ResourceRecommendation',
      component: ResourceRecommendation
    },
    {
      path: '/TimeLine1',
      component: TimeLine1
    },
      {
        path:'/',
        component:main
      },
      {
        path: '/threeBasic',
        name: 'threeBasic',
        component: Threebasic
      },
      {
        path: '/geometry',
        name: 'geometry',
        component: Geometry
      },
      {
        path: '/model&material',
        name: 'model&material',
        component: modelMaterial
      },
      {
        path: '/group',
        name: 'group',
        component: Group
      },
      {
        path: '/texture',
        name: 'texture',
        component: Texture
      },
      {
        path: '/gltfLoader',
        name: '/gltfLoader',
        component: gltfLoader
      },
      {
        path: '/PBR',
        name: '/PBR',
        component: PBR
      },
      {
        path: '/canvas',
        name: '/canvas',
        component: canvasUI
      },
      {
        path: '/curve&geometry',
        name: '/curve&geometry',
        component: curve
      },
      {
        path: '/camera',
        name: '/camera',
        component: OrthographicCamera
      },
      {
        path: '/camera1',
        name: 'camera1',
        component: cameraParameter
      },
      {
        path: '/lightAndShadow',
        name: 'lightAndShadow',
        component: LightShadow
      },
      {
        path: '/factory',
        name: 'factory',
        component: factory
      },
      {
        path: '/factory',
        name: 'factory',
        component: factory
      },
      {
        path: '/spirite',
        name: 'spirite',
        component: spirite
      },
      {
        path: '/EffectComposer',
        name: 'EffectComposer',
        component: EffectComposer
      },
      {
        path: '/ray',
        name: 'ray',
        component: ray
      },
      {
        path: '/label',
        name: 'label',
        component: label
      },
      {
        path: '/keyFrameAnimation',
        name: 'keyFrameAnimation',
        component: keyFrameAnimation
      },
      {
        path: '/granary',
        name: "granary",
        component: granary
      },
      {
        path: '/phone',
        name: "phone",
        component: phone
      },
      {
        path: '/car',
        name: 'car',
        component: car
      }
    ,
    {
      path: '/basic',
      name: 'basic',
      component: basic
    },
    {
      path: '/speedAddspeed',
      name: 'speedAddspeed',
      component: speedAddspeed
    },
    {
      path: '/dotCross',
      name: 'dotCross',
      component: dotCross
    },
    {
      path: "/EulerQuaternion",
      name: 'EulerQuaternion',
      component: EulerQuaternion
    },
    {
      path: '/Matrix',
      name: 'Matrix',
      component: Matrix
    },
    {
      path: '/Ramble',
      name: 'Ramble',
      component: Ramble
    },
    {
      path: '/Ortree',
      name: 'Ortree',
      component: Ortree
    },
    {
      path: '/CannonJS',
      name: 'CannonJS',
      component: CannonJS
    },
    {
      path: '/worldMap',
      name: 'worldMap',
      component: worldMap
    },
    {
      path: '/chinaMap',
      name: 'chinaMap',
      component: ChinaMap
    },
    {
      path: '/chinaMapColor',
      name: 'chinaMapColor',
      component: ChinaMapColor
    },
    {
      path: '/chinaMapHeight',
      name: 'chinaMapHeight',
      component: ChinaMapHeight
    },
    {
      path: '/chinaBubbleMap',
      name: 'chinaBubbleMap',
      component: ChinaBubbleMap
    },
    {
      path: '/chinaColumnMap',
      name: 'chinaColumnMap',
      component: ChinaColumnMap
    },
    {
      path: '/chinaPointMap',
      name: 'chinaPointMap',
      component: ChinaPointMap
    },
    {
      path: '/chinaLineMap',
      name: 'chinaLineMap',
      component: ChinaLineMap
    },
    {
      path: '/worldPeople',
      name: 'worldPeople',
      component: WorldPeople
    },
    {
      path: '/chinaMapFlyLine',
      name: 'chinaMapFlyLine',
      component: ChinaMapFlyLine
    },
    {
      path: '/earthCoordinates',
      name: 'earthCoordinates',
      component: EarthCoordinates
    },
    {
      path: '/worldMapEarth',
      name: 'worldMapEarth',
      component: worldMapEarth
    },
    {
      path: '/worldMapSepherLine',
      name: 'worldMapSepherLine',
      component: WorldMapSepherLine
    }, {
      path: '/worldMapSepherLines',
      name: 'worldMapSepherLines',
      component: WorldMapSepherLines
    },
    {
      path: '/worldMapSepherLabel',
      name: 'worldMapSepherLabel',
      component: WorldMapSepherLabel
    },
    {
      path: '/triangulation',
      name: 'triangulation',
      component: triangulation
    },
    {
      path: '/sphereMesh',
      name: 'sphereMesh',
      component: sphereMesh
    },
    {
      path: '/earthPoints',
      name: 'earthPoints',
      component: EarthPoints
    },
    {
      path: '/earthColumn',
      name: 'earthColumn',
      component: EarthColumn
    },
    {
      path: '/earthFlyLine',
      name: 'earthFlyLine',
      component: earthFlyLine
    },
    {
      path: '/gl_Point',
      name: 'gl_Point',
      component: Gl_Point
    },
    {
      path: '/gl_Rect',
      name: 'gl_Rect',
      component: Gl_Rect
    },
    {
      path: '/gl_Matrix',
      name: 'gl_Matrix',
      component: Gl_Matrix
    },
    {
      path: '/gl_Coordinate',
      name: 'gl_Coordinate',
      component: Gl_Coordinates
    },
    {
      path: '/gl_CubeIndex',
      name: 'gl_CubeIndex',
      component: Gl_Cube
    },
    {
      path: '/gl_DepthTest',
      name: 'gl_DepthTest',
      component: Gl_DepthTest
    },
    {
      path: '/gl_PointLight',
      name: 'gl_PointLight',
      component: Gl_PointLight
    },
    {
      path: '/gl_DirLight',
      name: 'gl_DirLight',
      component: Gl_DirLight
    },
    {
      path: '/gl_Rotate',
      name: 'gl_Rotate',
      component: Gl_RoateAnimate
    },
    {
      path: '/gl_Texture',
      name: 'gl_Texture',
      component: Gl_Texture
    },
    {
      path: '/gl_Program',
      name: 'gl_Program',
      component: Gl_Program
    },
    {
      path: '/gl_aMix',
      name: 'gl_aMix',
      component: Gl_aMix
    },
    {
      path: '/gl_Depth&aMix',
      name: 'gl_Depth&aMix',
      component: Gl_DepthaMix
    },
    {
      path: '/shaderMaterial',
      name: 'shaderMaterial',
      component: shaderMaterial
    },
    {
      path: '/onBeforeCompile',
      name: 'onBeforeCompile',
      component: onBeforeCompile
    },
    {
      path: '/smartCity',
      name: 'smartCity',
      component: smartCity
    },
//Cesium组件
    {
      path:'/cesiumEarthBasic',
      name:'cesiumEarthBasic',
      component:cesiumBasic
    },
    {
      path: '/Entity',
      name: 'Entity',
      component: Entity
    },
    {
      path: '/3DTile',
      name: '3DTile',
      component: THREEDTile
    },
    {
      path: '/Material',
      name: 'Material',
      component: Material
    },
    {
      path: '/earthMap',
      name: 'earthMap',
      component: earthMap
    },
    {
      path: '/geojson',
      name: 'geojson',
      component: geojson
    },
    {
      path: '/arc',
      name: 'arc',
      component: arc
    },
    {
      path: '/polylineType',
      name: 'polylineType',
      component: polylineType
    },
    {
      path:'/gridentTexture',
      name: 'gridentTexture',
      component:grdient
    },
    {
      path:'/groundLine',
      name:"groundLine",
      component:groundLine
    },
    {
      path:'/globeTexture',
      name:'globeTexture',
      component:earthTexture
    },
    {
      path: '/CZML',
      name: 'CZML',
      component: CZML
    },
    {
      path: '/HeatMap',
      name: 'HeatMap',
      component: HeatMap
    },
    {
      path: '/callbackProperty',
      name: 'callbackProperty',
      component: callbackProperty
    },
    {
      path: '/eye',
      name: 'eye',
      component: eye
    },
    {
      path: '/animation',
      name: 'animation',
      component: animation
    },
    {
      path: '/singleColorEarth',
      name: 'singleColorEarth',
      component: singleColorEarth
    },
    {
      path: '/viewerFlyContinue',
      name: 'viewerFlyContinue',
      component: viewerFlyContinue
    },
    {
      path: '/picking',
      name: 'picking',
      component: picking
    },
    {
      path:'/entitySelect',
      name:'entitySelect',
      component:entitySelet
    },
    {
      path:'/limitMap',
      name:'limitMap',
      component:limitMap
    },
    {
      path: '/primitive',
      name: 'primitive',
      component: primitive
    },
    {
      path: '/ray1',
      name: 'ray1',
      component: ray1
    },
    {
      path: '/water',
      name: 'water',
      component: water
    },
    {
      path: '/bubbleWindow',
      name: 'bubbleWindow',
      component: bubbleWindow
    },
    {
      path: '/customPrimitive',
      name: 'customPrimitive',
      component: customPrimitive
    },
    {
      path: '/customMaterial',
      name: 'customMaterial',
      component: customMaterial
    },
    {
      path: '/cylinder',
      name: 'cylinder',
      component: cylinder
    },
    {
      path: '/modelRotation',
      name: 'modelRotation',
      component: modelRotation
    },
    {
      path: '/modelDirection',
      name: 'modelDirection',
      component: modelDirection
    },
    {
      path: '/polygonHole',
      name: 'polygonHole',
      component: polygonHole
    },
    {
      path: '/geojsonPointType',
      name: 'geojsonPointType',
      component: geojsonPointType
    },
    {
      path: '/geojsonPointType',
      name: 'geojsonPointType',
      component: geojsonPointType
    },
    {
      path: '/particleSystem',
      name: 'particleSystem',
      component: particleSystem
    },
    {
      path: '/velocityOrientation',
      name: 'velocityOrientation',
      component: velocityOrientation
    },
    {
      path: '/timeLine',
      name: 'timeLine',
      component: timeLine
    },
    {
      path: '/turf',
      name: 'turf',
      component: turf
    },
    {
      path: '/mapCenter',
      name: 'mapCenter',
      component: mapCenter
    },
    {
      path: '/textureClip',
      name: 'textureClip',
      component: textureClip
    },
    {
      path: '/rainbow',
      name: 'rainbow',
      component: rainbow
    },
    {
      path: '/transformScaleRotate',
      name: 'transformScaleRotate',
      component: transformScaleRotate
    },
    {
      path: '/taichi',
      name: 'taichi',
      component: taichi
    },
    {
      path: '/lookAt',
      name: 'lookAt',
      component: lookAt
    },
    {
      path: '/CZMLClockRange',
      name: 'CZMLClockRange',
      component: CZMLClockRange
    },
    {
      path: '/geojsonWater',
      name: 'geojsonWater',
      component: geojsonWater
    },
    {
      path: '/intersectRay',
      name: 'intersectRay',
      component: intersectRay
    },
    {
      path: '/lookAtTransform',
      name: 'lookAtTransform',
      component: lookAtTransform
    },
    {
      path: '/dashCircle',
      name: 'dashCircle',
      component: dashCircle
    },
    {
      path: '/CZMLPointsDivide',
      name: 'CZMLPointsDivide',
      component: CZMLPointsDivide
    },
    {
      path: '/customGeometry',
      name: 'customGeometry',
      component: customGeometry
    },
    {
      path: '/hide',
      name: 'hide',
      component: hide
    },
    {
      path: '/satelliteScan',
      name: 'satelliteScan',
      component: satelliteScan
    },
    {
      path: '/cubeTexture',
      name: 'cubeTexture',
      component: cubeTexture
    },
    {
      path: '/likeBufferGeometry',
      name: 'likeBufferGeometry',
      component: likeBufferGeometry
    },
    {
      path: '/ModelMaterial',
      name: 'ModelMaterial',
      component: ModelMaterial
    },
    {
      path: '/textureOverlay',
      name: 'textureOverlay',
      component: textureOverlay
    },
    {
      path: '/trangleByTwoPoints',
      name: 'trangleByTwoPoints',
      component: trangleByTwoPoints
    },
    {
      path: '/turfDesitination',
      name: 'turfDesitination',
      component: turfDesitination
    },
    {
      path: '/terrianPosition',
      name: 'terrianPosition',
      component: terrianPosition
    },
    {
      path: '/entityRotate',
      name: 'entityRotate',
      component: entityRotate
    },
    {
      path: '/LED',
      name: 'LED',
      component: LED
    },
    {
      path: '/vectorExtrude',
      name: 'vectorExtrude',
      component: vectorExtrude
    },
    {
      path: '/colorText',
      name: 'colorText',
      component: colorText
    },
    {
      path: '/externalVariable',
      name: 'externalVariable',
      component: externalVariable
    },
    {
      path: '/coordinateCorrection',
      name: 'coordinateCorrection',
      component: coordinateCorrection
    },
    {
      path: '/colorTransform',
      name: 'colorTransform',
      component: colorTransform
    },
    {
      path: '/abs',
      name: 'abs',
      component: abs
    },
    {
      path: '/sign',
      name: 'sign',
      component: sign
    },
    {
      path: '/ceil',
      name: 'ceil',
      component: ceil
    },
    {
      path: '/floor',
      name: 'floor',
      component: floor
    },
    {
      path: '/step',
      name: 'step',
      component: step
    },
    {
      path: '/smoothstep',
      name: 'smoothstep',
      component: smoothstep
    },
    {
      path: '/minMax',
      name: 'minMax',
      component: minMax
    },
    {
      path: '/mod',
      name: 'mod',
      component: mod
    },
      {
      path: '/mix',
      name: 'mix',
      component: mix
    },
    {
      path: '/fract',
      name: 'fract',
      component: fract
    },
    {
      path: '/clamp',
      name: 'clamp',
      component: clamp
    },
    {
      path: '/radiansAndDegrees',
      name: 'radiansAndDegrees',
      component: radiansAndDegrees

    },
    {
      path: '/sinAndCos',
      name: 'sinAndCos',
      component: sinAndCos
    },
    {
      path: '/tan',
      name: 'tan',
      component: tan
    },
    {
      path: '/asinAndAcos',
      name: 'asinAndAcos',
      component: asinAndAcos
    },
    {
      path: '/atan',
      name: 'atan',
      component: atan
    },
    {
      path: '/lengthAndDistance',
      name: 'lengthAndDistance',
      component: lengthAndDistance
    },
    {
      path: '/dotCrossNormalize',
      name: 'dotCrossNormalize',
      component: dotCrossNormalize
    },
    {
      path: '/faceforward',
      name: 'faceforward',
      component: faceforward
    },
    {
      path: '/reflect',
      name: 'reflect',
      component: reflect
    },
    {
      path: '/refract',
      name: 'refract',
      component: refract
    },
    {
      path: '/exp',
      name: 'exp',
      component: exp
    },
  {
    path: '/pow',
    name: 'pow',
    component: pow 
  },
  {
    path: '/log',
    name: 'log',
    component: log 
  },
  {
      path: '/vec',
      name: 'vec',
      component: vec
  },
  {
    path: '/random',
    name: 'random',
    component: random
  },
  {
    path: '/noise',
    name: 'noise',
    component: noise
  },
  {
    path: '/genotyping',
    name: 'genotyping',
    component: genotyping
  },
  {
    path: '/fire',
    name: 'fire',
    component: fire

  },
  {
    path: '/overlaySpecialEffect',
    name: 'overlaySpecialEffect',
    component: overlaySpecialEffect
  },
  {
    path: '/fiveStarFlag',
    name: 'fiveStarFlag',
    component: fiveStarFlag
  },
  {
    path: '/batteryCharge',
    name: 'batteryCharge',
    component: batteryCharge
  },
  {
      path: '/sea',
      name: 'sea',
      component: sea  
  },
  {
    path: '/sun',
    name: 'sun',
    component: sun  
  },
  {
    path: '/rainGlass',
    name: 'rainGlass',
    component: rainGlass  
  },
  {
    path: '/colorChange',
    name: 'colorChange',
    component: colorChange  
  },
  {
    path: '/radar',
    name: 'radar',
    component: radar 
  },
  {
    path: '/DynamicDashedLine',
    name: ' DynamicDashedLine',
      component: DynamicDashedLine
    },
    {
      path: '/changeGlowLineColor',
      name: 'changeGlowLineColor',
      component: changeGlowLineColor
    },
    {
      path: '/lightning',
      name: 'lightning',
      component: lightning
    },
    {
      path: '/lonlatGrid',
      name: 'lonlatGrid',
      component: lonlatGrid
    },
    {
      path: '/vertexShaderChangePoint',
      name: 'vertexShaderChangePoint',
      component: vertexShaderChangePoint
    },
    {
      path: '/CZMLConectMovingPoint',
      name: 'CZMLConectMovingPoint',
      component: CZMLConectMovingPoint
    },
    {
      path: '/Road',
      name: 'Road',
      component: Road
    },
    {
      path: '/Flag',
      name: 'Flag',
      component: Flag
    },
    {
      path: '/polygonChange',
      name: 'polygonChange',
      component: polygonChange
    },
    {
      path: '/TilePick',
      name: 'TilePick',
      component: TilePick
    },
    {
      path:'/THREEDRadar',
      name:'THREEDRadar',
      component:THREEDRadar
    },
    {
      path: '/pointInsideCylinder',
      name: 'pointInsideCylinder',
      component: pointInsideCylinder
    },
    {
      path: '/polylineVolumn',
      name: 'polylineVolumn',
      component: polylineVolumn
    },
    {
      path: '/path',
      name: 'path',
      component: path
    },
    {
      path: '/rayAndEarth',
      name: 'rayAndEarth',
      component: rayAndEarth
    },
    {
      path: '/polygonFull',
      name: 'polygonFull',
      component: polygonFull
    },
    {
      path: '/THREEDTileStyle',
      name: 'THREEDTileStyle',
      component: THREEDTileStyle
    },
    {
      path: '/cylinderTwoPoint',
      name: 'cylinderTwoPoint',
      component: cylinderTwoPoint
    },
    {
      path: '/gltfColorGrident',
      name: 'gltfColorGrident',
      component: gltfColorGrident
    },
    {
      path: '/postProcess',
      name: 'postProcess',
      component: postProcess
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/lightningPlus',
      name: 'lightningPlus',
      component: lightningPlus
    },
    {
      path: '/eyeCylinderBottom',
      name: 'eyeCylinderBottom',
      component: eyeCylinderBottom
    },
    {
      path: '/eyeCylinderBottom1',
      name: 'eyeCylinderBottom1',
      component: eyeCylinderBottom1
    },
    {
      path: '/axes',
      name: 'axes',
      component: axes
    },
    {
      path: '/Fog',
      name: 'Fog',
      component: Fog
    },
    {
      path: '/polygonBorderGrident',
      name: 'polygonBorderGrident',
      component: polygonBorderGrident
    },
    {
      path: '/volumnRendering',
      name: 'volumnRendering',
      component: volumnRendering
    },
    {
      path: '/explosion',
      name: 'explosion',
      component: explosion
    },
    {
      path: '/explosionPlus',
      name: 'explosionPlus',
      component: explosionPlus
    },
    {
      path: '/manyEarth',
      name: 'manyEarth',
      component: manyEarth
    },
    {
      path: '/turfTIN',
      name: 'turfTIN',
      component: turfTIN
    },
    {
      path: '/entitiesPostProcess',
      name: 'entitiesPostProcess',
      component: entitiesPostProcess
    },
    {
      path: '/HeatMap1',
      name: 'HeatMap1',
      component: HeatMap1
    },
    {
      path: '/tiandiMap',
      name: 'tiandiMap',
      component: tiandiMap
    },

    {
      path: '/baiduMap',
      name: 'baiduMap',
      component: baiduMap
    },
    {
      path: '/lightStyle',
      name: 'lightStyle',
      component: lightStyle
    },
    {
      path: '/skyBox',
      name: 'skyBox',
      component: skyBox
    },
    {
      path: '/rain',
      name: 'rain',
      component: rain
    },
    {
      path: '/snow',
      name: 'snow',
      component: snow
    },
    {
      path: '/ContourLine',
      name: 'ContourLine',
      component: ContourLine
    },
    {
      path: '/ElevationRamp',
      name: 'ElevationRamp',
      component: ElevationRamp
    },
    {
      path: '/ElevationBand',
      name: 'ElevationBand',
      component:  ElevationBand
    },
    {
      path: '/polylineUnderGround',
      name: 'polylineUnderGround',
      component: polylineUnderGround
    },
    {
      path: '/ColumbusView',
      name: 'ColumbusView',
      component: ColumbusView
    },
    {
      path: '/pin',
      name: 'pin',
      component: pin
    },
    {
      path: '/polylineVolumn1',
      name: 'polylineVolumn1',
      component: polylineVolumn1
    },
    {
      path: '/clipPlane',
      name: 'clipPlane',
      component: clipPlane
    },
    {
      path: '/divideScreen',
      name: 'divideScreen',
      component: divideScreen
    },
    {
      path: '/cluster',
      name: 'cluster',
      component: cluster
    },
    {
      path: '/InundationAnalysis',
      name: 'InundationAnalysis',
      component: InundationAnalysis
    },
  ]
})

let isRefreshing=false;
//监听路由变化
router.afterEach((to,from)=>{
  if(!isRefreshing){
    isRefreshing=true
  }
  else{
    window.location.reload(true);
  }
})
export default router
