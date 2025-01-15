import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { model } from './model';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
//创建场景
const scene=new THREE.Scene()
//把创建的模型加入场景
scene.add(model)
//创建光源加入场景
const ambi=new THREE.AmbientLight()
ambi.intensity=1
scene.add(ambi)
const dirLight=new THREE.DirectionalLight()
dirLight.intensity=2
dirLight.position.set(200,-20,150)
scene.add(dirLight)
//创建辅助坐标系，并加入场景，方便进行位置安排
const axes=new THREE.AxesHelper(100)
scene.add(axes)
//创建相机,3维的效果用透视投影
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,3000)
camera.position.set(104.75370180602441,-4.5215272404279716,20.899350177995647)
camera.lookAt(104.2826156616211, 35.83130073547363,0)
//创建渲染器渲染场景
const renderer=new THREE.WebGLRenderer({
    antialias:true//开启抗锯齿效果
})
//设置渲染器画布的大小
renderer.setSize(window.innerWidth,window.innerHeight)
//创建CSS2Drenderer
const CSSRenderer=new CSS2DRenderer()
//设置CSS2Drenderer的大小
CSSRenderer.setSize(window.innerWidth,window.innerHeight)
//把CSS2DRenderer的DOM元素位置定好
CSSRenderer.domElement.style.position='absolute'
CSSRenderer.domElement.style.left = '0px'
CSSRenderer.domElement.style.top = '0px'
CSSRenderer.domElement.style.pointerEvents='none'
//相机辅助轨道控制工具,实现相机位置的改变
const controls=new OrbitControls(camera,renderer.domElement)
//设置control的target与camera一致
controls.target.set(104.2826156616211, 35.83130073547363,0)
// controls.addEventListener('change',()=>{
//     console.log(camera.position);
// })
//更新相机控件
controls.update()
//渲染循环(实现动画效果,实时更新渲染效果)
function loop(){
    //拿到所有光圈
    const circleAll = model.getObjectByName('光圈').children
    //对所有光圈进行遍历拿到所有光圈
    circleAll.forEach((cir)=>{
        if(cir.s>1)cir.s=0
        if(cir.size>2.5&&cir.size<3){cir.s+=0.01}
        else if(cir.size>2&&cir.size<2.5){cir.s+=0.025}
        else if(cir.size>1.5&&cir.size<2){cir.s+=0.015}
        else{cir.s+=0.03}
        //对光圈的缩放属性进行操作
        cir.scale.set(1+cir.s,1+cir.s,0)
        //光圈材质的透明度随缩放系数变化
        cir.material.opacity=1-cir.s
        
    })
    const zhui=model.getObjectByName('椎体')
    if(zhui) zhui.rotation.z+=0.01
    //实现渲染
    renderer.render(scene, camera)
    CSSRenderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()
//导出渲染器
export{renderer,camera,CSSRenderer,scene}