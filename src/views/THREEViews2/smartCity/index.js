import * as THREE from 'three'
import { model } from './model'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer'
const scene=new THREE.Scene()
scene.fog = new THREE.Fog(0x000000, 100, 8000);
scene.add(model)
const axes=new THREE.AxesHelper(200)
scene.add(axes)
const ambi=new THREE.AmbientLight()
scene.add(ambi)
const dirLight=new THREE.DirectionalLight()
dirLight.position.set(-100,-100,100)
dirLight.intensity=2
scene.add(dirLight)
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 100, 13527648)
camera.position.set(13524999.034157634,3661621.163970716,1017.3498355016538);//0.02是根据黄浦江尺寸范围设置  数量级对应即可 具体数值不用精准
camera.lookAt(13524998.770778058, 3662370.4907626663, 860.0689591960394);
const renderer=new THREE.WebGLRenderer({
    antialias:true
})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setClearColor(0x000000)
//创建CSS2D渲染器
const CSSRenderer=new CSS2DRenderer()
CSSRenderer.setSize(window.innerWidth,window.innerHeight)
CSSRenderer.domElement.style.position='absolute'
CSSRenderer.domElement.style.left = '0px'
CSSRenderer.domElement.style.top='0px'
CSSRenderer.domElement.style.pointerEvents='none'
const controls=new OrbitControls(camera,renderer.domElement)
//用相机控件设置相机位置
 controls.target.set(13524998.770778058,  3662370.4907626663, 860.0689591960394)
//   controls.addEventListener('change',(e)=>{
//      console.log(camera.position,controls.target);
//   })
controls.update();
function loop(){
    renderer.render(scene,camera)
    CSSRenderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()

export{renderer,camera,CSSRenderer,scene}