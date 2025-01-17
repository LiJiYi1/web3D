import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three'
const loader=new GLTFLoader()
//加载飞机并放入场景
const gltf=await loader.loadAsync('/../智慧城市资源/fly.glb')
const fly=gltf.scene
// const axes=new THREE.AxesHelper(200)
// fly.add(axes)
fly.position.set(13524790, 3664199, 400)
fly.scale.set(5,5,5)
fly.rotation.x=Math.PI/2
//创建信号波
const axes=new THREE.AxesHelper(200)
const geometry=new THREE.PlaneGeometry(50,50)
// geometry.rotateZ(Math.PI/2)
 geometry.translate(-25,0,0)
// geometry.rotateX(-Math.PI/3)
const texture=new THREE.TextureLoader().load('/../智慧城市资源/信号波.png')
const material=new THREE.MeshBasicMaterial({
    transparent:true,
    color:0x00ffff,
    side:THREE.DoubleSide,
    map:texture,
    depthTest:false
})
const mesh=new THREE.Mesh(geometry,material)
mesh.rotateZ(Math.PI/2)
mesh.rotateY(Math.PI/3)
mesh.position.set(30,0,0)
//mesh.add(axes)
fly.position.set(13524790, 3664199, 400)
fly.add(mesh)
//创建球体包裹无人机
const vertexShader=`
varying vec3 v_normal;
void main(){
v_normal=normalize(normalMatrix*normal);
gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fragmentShader=`
varying vec3 v_normal;
void main(){
float alpha=abs(dot(vec3(0.0,0.0,1.0),v_normal));
gl_FragColor=vec4(1.0,1.0,0.0,pow( 1.0-alpha, 3.0 ));
}
`
const geometry1 = new THREE.SphereGeometry(20, 32, 32)
const material1 = new THREE.ShaderMaterial({
    vertexShader:vertexShader,
    fragmentShader:fragmentShader,
    //side:THREE.DoubleSide,
    transparent:true
})
const spehere = new THREE.Mesh(geometry1, material1)
spehere.position.set(28, 0, -8)
fly.add(spehere)
//fly.rotation.y=Math.PI/2
//解析无人机的动画
const mixer=new THREE.AnimationMixer(gltf.scene)
//console.log(gltf);
const animate = mixer.clipAction(gltf.animations[0])
animate.play()
//无人机绕飞,并完成无人机的动画和信号波动,外部透明球波动。
const clock=new THREE.Clock()
let s=0
function flying(){
    if(s>4)s=0
    s+=0.08
    mesh.scale.set(1+s,1+s,1+s)
mixer.update(clock.getDelta())
fly.rotation.y-=0.03
requestAnimationFrame(flying)
}
flying()
export {fly}