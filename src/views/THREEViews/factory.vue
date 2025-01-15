<template>
<div>      
    <!-- CSS布局方式写法很多，不一定和课程一致 -->
    <div  id="tag" ref="tag" style="display:none">
         <div ref="close" style="position:absolute;left:350px;top:20px;"  @click="Planclose">
                <img  id="close" src="../../public/初级篇学习资源/关闭.png" width="32" style="pointer-events: auto;" >
            </div>
        <!-- position:relative;约束子元素绝对定位参照点 -->
        <div style="position:relative;width:400px;height:322px;color: #fff;">
            <!-- 图片绝对定位100%填充父元素，作为标签的背景 -->
            <img src="../../public/初级篇学习资源/信息背景.png" alt="" style="width:100%;position: absolute;left: 0px;top: 0px;">

            <!-- 名称、存储量、设备状态、等信息叠加到背景图上即可 -->
            <div style="position:absolute;left:48px;top:36px;font-size:16px;">
                <div style="font-size:20px;font-weight: 400;">
                    <span ref="shebei">设备A</span>
                </div>
                <div style="margin-top: 30px;">
                    <span style="font-weight: 400;margin-left: 80px;font-size: 40px;color: #00ffff;">276559 L</span>
                </div>
                <div style="margin-top: 20px;">
                    <span style="color: #ccc;font-weight: 300;">管理</span><span
                        style="font-weight: 400;margin-left: 30px;">李某</span>
                </div>
                <div style="margin-top: 10px;">
                    <span style="color: #ccc;font-weight: 300;">工号</span><span
                        style="font-weight: 400;margin-left: 30px;">114514</span>
                </div>
            </div>
            <div style="position:absolute;left:285px;top:35px;">
                <span style="color: #ffff00;">异常</span>
            </div>
        </div>
    </div>
    <div id="container" ref="container"></div>
    <div id="stat" ref="stateref"></div>
    <div class="pos">
        <div id="A" class="bu" @click="planA">设备A</div>
        <div id="B" class="bu" style="margin-left: 10px;" @click="planB">设备B</div>
    </div>

</div>

</template>
<script setup>
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//引入组合器
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js'
//引入renderPass
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js'
//引入闪屏
import {GlitchPass} from 'three/addons/postprocessing/GlitchPass.js'
//引入发光线
import {OutlinePass} from 'three/addons/postprocessing/OutlinePass.js'
// 伽马校正后处理Shader
import {GammaCorrectionShader} from 'three/addons/shaders/GammaCorrectionShader.js';
// ShaderPass功能：使用后处理Shader创建后处理通道
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
//引入FXAA抗锯齿shader
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
//引入SMAApass抗锯齿
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
//引入CSS2DObject
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
//引入CSS2D渲染器
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
//引入stats库
import State from 'three/addons/libs/stats.module'

//引入GUI库
import * as dat from 'dat.gui';
import { onMounted,ref,onUnmounted} from 'vue';
//创建一个GUI对象
const gui = new dat.GUI();
gui.domElement.style.position='absolute'
gui.domElement.style.top='60.1px'
gui.domElement.style.right='2%'
const container=ref(null);
const tag=ref(null)
const shebei=ref(null)
const close=ref(null)
let axes=null
//拿到dom元素
const stateref=ref(null);
onMounted(()=>{
   initThree()
})
onUnmounted(()=>{
  if(gui){
  gui.close();
  gui.destroy(); 
}
})
//创建一个场景
const scene = new THREE.Scene();
//为透视投影相机准备宽高比
const width = window.innerWidth;
const height = window.innerHeight;
const k=width/height;
//创建一个相机(透视投影)
const camera = new THREE.PerspectiveCamera(30,k,1,8000)
//相机位置
camera.position.set(150, 150, 150);
//相机视线方向
camera.lookAt(0, 0, 0)
//这个group是用来储存model的
const model=new THREE.Group()
//加入一个outlinePass
const outline=new OutlinePass(new THREE.Vector2(window.innerWidth,window.innerHeight),scene,camera)
//设置发光线参数
//  outline.selectedObjects=[mesh1]
outline.edgeStrength=20
//强度设置
outline.edgeGlow=0.9
//粗细设置
outline.edgeThickness=9
//显隐设置
outline.clear=true
//颜色设置
outline.visibleEdgeColor.set(0x111fff)
//创建点击事件实现模型的拾取
document.addEventListener('click',(e)=>{
//获取x坐标
const px=e.offsetX/window.innerWidth*2-1;
//获取y坐标
const py=-e.offsetY/window.innerHeight*2+1;
// console.log('x',px,'y',py);
//创建一个rayCaster
const raycaster=new THREE.Raycaster()
raycaster.setFromCamera(new THREE.Vector2(px,py),camera)
// model.getObjectByName('设备A').traverse((obj)=>{
//     if(obj.isMesh){
//         obj.ancestor=model.getObjectByName('设备A')
//     }
// })
// model.getObjectByName('设备B').traverse((obj)=>{
//     if(obj.isMesh){
//         obj.ancestor=model.getObjectByName('设备B')
//     }
// })
for(let i=0;i<model.getObjectByName('存储罐').children.length;i++){
    const father=model.getObjectByName('存储罐').children[i]
    father.traverse((obj)=>{
        if(obj.isMesh){
            obj.ancestor=father
        }
    })
}
//用raycaster捕捉模型
const intersect=raycaster.intersectObjects(model.getObjectByName('存储罐').children)
console.log(intersect);
//创建CSS2Dobject
const CSSobj=new CSS2DObject(tag.value)
// //改一下位置
// tag.value.style.position='absolute'
// tag.value.style.top='-25px'

if(intersect.length>0){
if(axes)
{    axes.remove(axes.children[0])}
    //添加发光描边后处理
    outline.selectedObjects=[intersect[0].object.ancestor]
    //标签的名字就是我们选中物体的名字
    shebei.value.innerHTML=intersect[0].object.ancestor.name
    const name=intersect[0].object.ancestor.name
    // console.log(tag.value.style);
    // console.log(CSSobj.position);
    console.log(intersect[0].object.ancestor.getObjectByName(name+'标注'));
    axes=intersect[0].object.ancestor.getObjectByName(name+'标注')
    CSSobj.position.y+=window.innerHeight/90
    axes.add(CSSobj)
    const pos=new THREE.Vector3()
    axes.getWorldPosition(pos)
    console.log(pos);
       new TWEEN.Tween({opacity:0
    }).onUpdate((obj)=>{
        tag.value.style.opacity=obj.opacity
    })
    .to({opacity:1}).start().easing(TWEEN.Easing.Quadratic.Out)
    function loop1(){
        TWEEN.update()
        requestAnimationFrame(loop1)
    }
    loop1()
    new TWEEN.Tween({x:camera.position.x,y:camera.position.y,z:camera.position.z,
        tx:0,ty:0,tz:0
    }).onUpdate((obj)=>{
        camera.position.set(obj.x,obj.y,obj.z)
        camera.lookAt(obj.tx,obj.ty,obj.tz)
    })
    .to({x:pos.x+30,y:pos.y+30,z:pos.z+30,
        tx:pos.x,ty:pos.y,tz:pos.z}).start().easing(TWEEN.Easing.Quadratic.Out)
    function loop(){
        TWEEN.update()
        requestAnimationFrame(loop)
    }
    loop()
    //可视化坐标系
    // const axesHelper=new THREE.AxesHelper(5)
    // axes.add(axesHelper)
  
 
    // scene.add(axes)
    // intersect[0].object.ancestor.add()
}
// else{
//     if(choose){
//          console.log(scene);
//         //清除发光线
//         outline.selectedObjects=[]
//         //清除标签
//         scene.remove(scene.children[7])
//     } 
// }
})
function planA(){
    outline.selectedObjects=[model.getObjectByName('设备A')]
    console.log(model.getObjectByName('设备A'));
    
}
function planB(){
 outline.selectedObjects=[model.getObjectByName('设备B')]
    console.log(model.getObjectByName('设备B'));
}
//给close这个标签开启事件
console.log(close.value);

// closel.value.style.pointerEvents='auto'
function Planclose(){
    //清除发光线
    outline.selectedObjects=[]
    console.log(axes);
    //清除标注
    new TWEEN.Tween({opacity:1
    }).onUpdate((obj)=>{
        tag.value.style.opacity=obj.opacity
    })
    .to({opacity:0}).start().easing(TWEEN.Easing.Quadratic.Out).onComplete(()=>{
    axes.remove(axes.children[0])
    })
    function loop(){
        TWEEN.update()
        requestAnimationFrame(loop)
    }
    loop()
   
}

function initThree(){
//创建State对象
const state=new State();
state.domElement.style.left='2%'
state.domElement.style.top='60.1px'
//state对象加入dom
stateref.value.appendChild(state.domElement);
//创建坐标系
const axesHelper=new THREE.AxesHelper(180,180,180)
//将坐标系插入到场景中去
 scene.add(axesHelper);
// //创建光源
// const directionalLight = new THREE.DirectionalLight(0xf00000, 1);
// //光源位置设置、
// directionalLight.position.set(4,4,1)
// //将光源添加到场景中
// scene.add(directionalLight);

//创建环境光并加入场景
const light = new THREE.AmbientLight( 0x404040,1); // 柔和的白光
scene.add( light );
//创建环境贴图
const cubeTexture=new THREE.CubeTextureLoader()
    .setPath('../../public/环境贴图/环境贴图1/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
cubeTexture.encoding = THREE.sRGBEncoding;//和renderer.outputEncoding一致

const obj = {
        envMapIntensity:1.0,
    }
//用GUI库调节环境光和贴图的强度
gui.add(light,'intensity',0,100).name('环境光强度')
//加载工厂模型到场景中
const Loader=new GLTFLoader()
Loader.load('../../public/初级篇学习资源/工厂 copy.glb',(gltf)=>{
    console.log(gltf.animations);
    const mixer=new THREE.AnimationMixer(gltf.scene)
    const animate=mixer.clipAction(gltf.animations[0])
    animate.play()
    const clock=new THREE.Clock()
    function loop(){
        mixer.update(clock.getDelta())
        requestAnimationFrame(loop)
    }
    loop()
    //加入环境贴图
    gltf.scene.traverse((obj)=>{
        if(obj.isMesh){ 
            obj.material.envMap=cubeTexture
            obj.material.envMapIntensity = 1.0;
            obj.castShadow=true
            obj.receiveShadow=true
        }
    })
       gui.add(obj,'envMapIntensity',0,200).onChange(function(value){
        gltf.scene.traverse(function (obj) {
            if (obj.isMesh) {
                obj.material.envMapIntensity = value;
            }
        });
    })
    model.add(gltf.scene)
})
scene.add(model)

//创建平行光模拟光照
//从上方照射的白色平行光，强度为 0.5。
const directionalLight = new THREE.DirectionalLight( 0xffffff, 8 );
directionalLight.position.set(100,100,0)
//光线开启阴影
directionalLight.castShadow=true
scene.add( directionalLight );
//可视化光线
const helper = new THREE.DirectionalLightHelper( directionalLight, 50 );
scene.add( helper );
//可视化光线范围
 directionalLight.shadow.camera.left=-100
 directionalLight.shadow.camera.right=100
 directionalLight.shadow.camera.top=100
 directionalLight.shadow.camera.bottom=-100
// directionalLight.shadow.camera.near = 0.5;
// directionalLight.shadow.camera.far = 400;
const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add( cameraHelper );
// 平行光子菜单
const dirFolder = gui.addFolder('平行光');
dirFolder.add(directionalLight, 'intensity', 0, 2);
dirFolder.add(directionalLight.position, 'y', 0, 300).onChange(function(value){
 helper.update();
});
const obj1 = {
    R: 100,
    angle: 0,
};
dirFolder.add(obj1, 'R', 0, 300).onChange(function(value){
    directionalLight.position.x = value * Math.cos(obj1.angle);
    directionalLight.position.z = value * Math.sin(obj1.angle);
    helper.update();
});
dirFolder.add(obj1, 'angle', 0, Math.PI*2).onChange(function(value){
    directionalLight.position.x = obj1.R * Math.cos(value);
    directionalLight.position.z = obj1.R * Math.sin(value);
    helper.update();
});
// 阴影子菜单
const shadowFolder = gui.addFolder('平行光阴影');
const cam = directionalLight.shadow.camera;
// 相机left、right等属性变化执行.updateProjectionMatrix();
// 相机变化了，执行CameraHelper的更新方法.update();
shadowFolder.add(cam,'left',-500,0).onChange(function(v){
    cam.updateProjectionMatrix();//相机更新投影矩阵
    cameraHelper.update();//相机范围变化了，相机辅助对象更新
});
shadowFolder.add(cam,'right',0,500).onChange(function(v){
    cam.updateProjectionMatrix();
    cameraHelper.update();
});
shadowFolder.add(cam,'top',0,500).onChange(function(v){
    cam.updateProjectionMatrix();
    cameraHelper.update();
});
shadowFolder.add(cam,'bottom',-500,0).onChange(function(v){
    cam.updateProjectionMatrix();
    cameraHelper.update();
});
shadowFolder.add(cam,'far',0,1000).onChange(function(v){
    cam.updateProjectionMatrix();
    cameraHelper.update();
});
//创建并加载纹理
const TextureLoader=new THREE.TextureLoader()
const texture=TextureLoader.load('../../public/初级篇学习资源/雨滴.png')
//创建点精灵的材质
const material=new THREE.SpriteMaterial({
    map:texture
})
//创建一个层级模型储存雨滴
const group=new THREE.Group()
//利用for循环创建大量雨滴
for(let i=0;i<1200;i++){
//创建点精灵网格模型
const sprite=new THREE.Sprite(material)
//运用缩放属性对点精灵进行操作
sprite.scale.set(2,2)
//模型加入层级模型中统一管理
group.add(sprite)
//用位置属性对点精灵进行位置变化形成随机位置效果
sprite.position.x=(Math.random()-0.5)*200
sprite.position.y=Math.random()*200
sprite.position.z=(Math.random()-0.5)*200
}
//层级模型加入场景
scene.add(group)


//创建一个渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true,
});
//渲染器开启阴影
renderer.shadowMap.enabled=true
//缝隙问题设置可解决缝隙阴影问题
renderer.shadowMap.type = THREE.VSMShadowMap;  

//设置canvas画布大小
renderer.setSize(width, height);
//设置设备像素比
renderer.setPixelRatio(window.devicePixelRatio);
// //刷个画布底色
renderer.setClearColor(0x000,1.);
//渲染
renderer.render(scene, camera);
//放入dom元素里面
container.value.appendChild(renderer.domElement);
//创建CSS2D渲染器
const CSSRenderer=new CSS2DRenderer()
CSSRenderer.setSize(width,height)
CSSRenderer.render(scene,camera)
//放入dom元素里面
container.value.appendChild(CSSRenderer.domElement);
//绝对定位改位置
CSSRenderer.domElement.style.position='absolute'
CSSRenderer.domElement.style.left=0
CSSRenderer.domElement.style.top=0
//让他不要阻挡事件执行
CSSRenderer.domElement.style.pointerEvents='none'

//实例化组合器
const composer=new EffectComposer(renderer)
//实例化renderpass
const  render=new RenderPass(scene, camera)
//renderpass加入组合器
composer.addPass(render)
//发光线加入组合器
composer.addPass(outline)
//实例化闪屏效果
const shan=new GlitchPass()
composer.addPass(shan)
// 创建伽马校正通道
const gammaPass= new ShaderPass(GammaCorrectionShader);
composer.addPass(gammaPass);
// //FXAA抗锯齿
// const FXAA=new ShaderPass(FXAAShader)
// FXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
// composer.addPass(FXAA)
//SMAA抗锯齿
const SMAA=new SMAAPass(window.innerWidth * renderer.getPixelRatio(), window.innerHeight * renderer.getPixelRatio())
composer.addPass(SMAA)
//创建相机轨道控制工具。
const controls = new OrbitControls(camera, renderer.domElement);



//相机位置与观察目标点最大值


// //相机距离观察目标点最小值
// controls.minDistance =200;
// //相机距离观察目标点最大值
// controls.maxDistance = 500;//更新相机
controls.update()
// //dom元素噶变后执行事件监听
// controls.addEventListener('change',()=>{
//   console.log(camera.position);
//   //改变后重新渲染
//   renderer.render(scene,camera);
// })
//创建一个请求动画帧以实现一个渲染循环。

function animation(){
//更新帧率
state.update();
//对group进行遍历
group.children.forEach((sprite)=>{
if(sprite.position.y>0){
    sprite.position.y-=2
}
else{
    sprite.position.y=200
}
})
//渲染器更新
// renderer.render(scene,camera);
CSSRenderer.render(scene,camera)
composer.render()
//执行渲染循环。
requestAnimationFrame(animation)
}
//调用函数
animation();

//画布大小随屏幕大小变化
window.onresize=()=>{
  //重新设置画布大小
  renderer.setSize(window.innerWidth,window.innerHeight);
  CSSRenderer.setSize(window.innerWidth,window.innerHeight)
  //重新设置相机宽高比
  const k = window.innerWidth / window.innerHeight; //canvas画布宽高比
  camera.aspect=k
  //透视投影矩阵更新
  camera.updateProjectionMatrix()
}



}

</script>

<style scoped>
#tag{
    position: absolute;
    top:0px;
    left:0px;
    z-index: 1;
    pointer-events: none;
}
#container{
    position: relative;
}
#stat{
float: left;
width: 10px;
}


        .bu:hover {
            cursor: pointer;
        }
         .bu {
            background: rgba(0, 0, 0, 0.3);
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            color: #fff;
            display: inline-block;
            border-radius: 30px;
        }

        .bu:hover {
            cursor: pointer;
        }

        .pos {
            position: absolute;
            left: 50%;
            margin-left: -65px;
            bottom: 100px;
        }
   
</style>