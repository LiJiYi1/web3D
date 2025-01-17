<template>
  <div>
    <div ref="container"></div>
  </div>
</template>

<script setup>
import { onMounted,ref} from 'vue';
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const container=ref(null)
onMounted(()=>{
  initThree()
})
function initThree(){
const scene=new THREE.Scene()
const axes=new THREE.AxesHelper(100)
scene.add(axes)
const ambi=new THREE.AmbientLight()
scene.add(ambi)
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,3000)
camera.position.set(100,100,100)
camera.lookAt(0,0,0)
const renderer=new THREE.WebGLRenderer({
    antialias:true
})
renderer.setSize(window.innerWidth,window.innerHeight)
const controls=new OrbitControls(camera,renderer.domElement)
container.value.appendChild(renderer.domElement)
const geometry=new THREE.BoxGeometry(20,50,20)
geometry.translate(0,25,0)
const material=new THREE.MeshLambertMaterial()
const mesh=new THREE.Mesh(geometry,material)
//用onBeforeCompile改材质的着色器
material.onBeforeCompile=(shader)=>{
    // console.log(shader.fragmentShader);
    //console.log(shader.uniforms);
    
    shader.vertexShader=shader.vertexShader.replace('void main() {',`
    varying vec3 v_position;
      void main() {
        `)
     shader.vertexShader=shader.vertexShader.replace('#include <fog_vertex>',`
      #include <fog_vertex>
      //v_position=vec3(gl_Position);
      v_position=position;
        `)
    shader.fragmentShader=shader.fragmentShader.replace('void main() {',`
    varying vec3 v_position;
    uniform float h;
    void main() {
        `)
    shader.fragmentShader=shader.fragmentShader.replace('#include <dithering_fragment>',`
        #include <dithering_fragment>
        gl_FragColor.r=0.0;
        gl_FragColor.g=1.0;
        gl_FragColor.b=0.5;
        if(v_position.y>h&&v_position.y<h+12.0){
           float per=(v_position.y-h)/12.0;
           float percent=pow(per,0.5);
           vec3 c=mix(vec3(1.0,0.0,0.0),vec3(0.0,1.0,0.5),percent);
           gl_FragColor=vec4(c,1);  
        }
        else if(v_position.y<h&&v_position.y>h-12.0){
          float per=(h-v_position.y)/12.0;
          float percent=pow(per,0.5);
          vec3 c=mix(vec3(1.0,0.0,0.0),vec3(0.0,1.0,0.5),percent);
          gl_FragColor=vec4(c,1);  
        }
      
         `)
shader.uniforms.h = { value: 0 };
mesh.shader=shader  
}
//mesh.position.y+=25
scene.add(mesh)
const spehere=new THREE.SphereGeometry(6,30,30)
const texture=new THREE.TextureLoader().load('/地球大屏可视化资源/earth.jpg')
const material1=new THREE.MeshLambertMaterial({
  map:texture
})
material1.onBeforeCompile=(shader)=>{
  shader.fragmentShader=shader.fragmentShader.replace('#include <dithering_fragment>',
    `
    #include <dithering_fragment>
    float gray=0.299*gl_FragColor.r+0.597*gl_FragColor.g+0.114*gl_FragColor.b;
    gl_FragColor=vec4(gray,gray,gray,1);
    
    `)
  
}
const mesh1=new THREE.Mesh(spehere,material1)
mesh1.position.z+=20
scene.add(mesh1)
let h=0.0
function loop(){
    h+=0.1
    if(h>38){h=0.0}
    renderer.render(scene,camera)
    //console.log(mesh.shader.uniforms);
    mesh.shader.uniforms.h.value=h
    requestAnimationFrame(loop)
}
loop()
}
</script>

<style scoped>

</style>