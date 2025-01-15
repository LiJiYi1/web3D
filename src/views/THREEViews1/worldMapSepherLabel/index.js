 import * as THREE  from 'three'
 import { model } from './model'
 import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
 const scene=new THREE.Scene()
 scene.add(model)
 const ambi=new THREE.AmbientLight()
 scene.add(ambi)
 const axes=new THREE.AxesHelper(100)
 scene.add(axes)
 const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,3000)
 camera.position.set(200,200,200)
 camera.lookAt(0,0,0)
 const renderer=new THREE.WebGLRenderer({
    antialias:true
 })
 renderer.setSize(window.innerWidth,window.innerHeight)
 renderer.render(scene,camera)
const controls=new OrbitControls(camera,renderer.domElement)
function loop(){
    const circle = model.getObjectByName('光圈').children
    circle.forEach((c)=>{
       if(c.speed>3.5&&c.speed<4){
        if (c.s > 1) c.s = 0
        c.s+=0.002
        c.scale.set(1 + c.s, 1 + c.s, 0)
        c.material.opacity=1-c.s
       }
       else if (c.speed > 4 && c.speed < 4.5){
           if (c.s > 1) c.s = 0
           c.s += 0.0025
           c.scale.set(1 + c.s, 1 + c.s, 0)
           c.material.opacity = 1 - c.s
       }
       else if (c.speed > 4.5 && c.speed < 5) {
           if (c.s > 1) c.s = 0
           c.s += 0.003
           c.scale.set(1 + c.s, 1 + c.s, 0)
           c.material.opacity = 1 - c.s
       }
       else if (c.speed > 3 && c.speed < 3.5) {
           if (c.s > 1) c.s = 0
           c.s += 0.0035
           c.scale.set(1 + c.s, 1 + c.s, 0)
           c.material.opacity = 1 - c.s
       }
       else{
           if (c.s > 1) c.s = 0
           c.s += 0.0045
           c.scale.set(1 + c.s, 1 + c.s, 0)
           c.material.opacity = 1 - c.s
       }
    })

    

    // model.rotation.y+=0.01
    renderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()
export{renderer,camera,scene}