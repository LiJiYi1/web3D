import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { renderer } from './renderloop.js';
import { scene } from './scene.js';
import { camera } from './camera.js';

const model=new THREE.Group()
const cameraGroup=new THREE.Group()
cameraGroup.add(camera)
model.add(cameraGroup)
const loader=new GLTFLoader()
//创建一个动画对象，把所有动画都放进去
const Animations = {}
loader.load('../../../几何计算资源/人.glb',(gltf)=>{
    // console.log('gltf',gltf);
    //创建mixer播放动画
    const mixer = new THREE.AnimationMixer(gltf.scene)
    //遍历动画
    for(let i=0;i<gltf.animations.length;i++){
        const ActionName=gltf.animations[i].name
        // console.log(ActionName);
        const action = gltf.animations[i]
        const Animate = mixer.clipAction(action)
        Animate.play()
        if (ActionName ==='Idle'){
           Animate.weight=1
        }
        else{
           Animate.weight=0
        }
        Animations[ActionName]=Animate
    }
    const clock = new THREE.Clock()
    function loop() {
        mixer.update(clock.getDelta())
        renderer.render(scene, camera)
        requestAnimationFrame(loop)
    }
    loop()
    model.add(gltf.scene)
})

export{model,cameraGroup,Animations}