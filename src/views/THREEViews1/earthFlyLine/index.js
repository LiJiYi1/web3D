import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { model } from './model';
import { ZHUI } from './createZHUI';
const scene=new THREE.Scene()
scene.add(model)
const axes=new THREE.AxesHelper(150)
scene.add(axes)
const dirlight=new THREE.DirectionalLight()
scene.add(dirlight)
dirlight.position.set(150,112,-220)
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,3000)
camera.position.set(80,200,-150)
camera.lookAt(0,0,0)
const renderer=new THREE.WebGLRenderer({
    antialias:true
})

renderer.setSize(window.innerWidth,window.innerHeight)
const controls=new OrbitControls(camera,renderer.domElement)
function loop(){
    //拿到曲线遍历拿到曲线子对象的飞线实现飞线动态效果
    const curve=model.getObjectByName('曲线').children
    curve.forEach(e=>{
        if (e.children[0].rotation.z >e.children[0].angle) e.children[0].rotation.z = 0
         e.children[0].rotation.z+=0.01    
    })
    //拿到标注，遍历拿到标注的子对象的光圈实现光圈波动效果
    const label=model.getObjectByName('标注').children
    label.forEach((e)=>{
        const circle=e.children[0]
        if(circle.speed>=2&&circle.speed<2.5){
            if (circle.s > 1) circle.s = 0
            circle.s += 0.003
            circle.scale.set(1 + circle.s, 1 + circle.s, 0)
            //设置透明度随缩放变化
            circle.material.opacity = 1 - circle.s
        }
        else if (circle.speed >= 2.5 && circle.speed < 3) {
          if(circle.s>1)circle.s=0
          circle.s+=0.004
          circle.scale.set(1+circle.s,1+circle.s,0)
            //设置透明度随缩放变化
            circle.material.opacity = 1 - circle.s
         }
        else if (circle.speed >=3 && circle.speed < 3.5) { 
            if (circle.s > 1) circle.s = 0
            circle.s += 0.005
            circle.scale.set(1 + circle.s, 1 + circle.s, 0)
            //设置透明度随缩放变化
            circle.material.opacity = 1 - circle.s
        }
        else if (circle.speed >= 3.5 && circle.speed <= 4) { 
            if (circle.s > 1) circle.s = 0
            circle.s += 0.006
            circle.scale.set(1 + circle.s, 1 + circle.s, 0)
            //设置透明度随缩放变化
            circle.material.opacity=1-circle.s
        }
    })
ZHUI.rotateY(0.01)
    renderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()
export{renderer,camera,scene}