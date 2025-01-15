import * as THREE  from 'three'
import {camera} from './camera.js'
import {scene} from './scene.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
//创建渲染器
const renderer=new THREE.WebGLRenderer({
    antialias:true
})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setClearColor(0xffffff,1.)
renderer.render(scene,camera)
//解决颜色偏差
renderer.outputColorSpace =THREE.SRGBColorSpace
//创建相机轨道控制
const control = new OrbitControls(camera,renderer.domElement)
//创建CSS2D渲染器
const cssRenderer=new CSS2DRenderer()
cssRenderer.setSize(window.innerWidth,window.innerHeight)
cssRenderer.render(scene,camera)
cssRenderer.domElement.style.position='absolute'
cssRenderer.domElement.style.top=0
// cssRenderer.domElement.style.left = 0
cssRenderer.domElement.style.pointerEvents = 'none'
export    {renderer,cssRenderer}