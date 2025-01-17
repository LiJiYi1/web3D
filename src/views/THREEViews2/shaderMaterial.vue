<template>
    <div>
        <div ref="container"></div>
    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const container=ref(null)
onMounted(()=>{ 
//内置变量position,矩阵,双面显示,透明度,uniform传值,gl_FragCoord的着色器。
const vertexShader=`
//attribute vec3 position;
//uniform mat4 modelMatrix;
//uniform mat4 viewMatrix;
//uniform mat4 projectionMatix;
void main(){
  //gl_Position = projectionMatrix*viewMatrix*modelMatrix*vec4( position, 1.0 );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fragmentShader=`
uniform vec3 color;
uniform float opacity;
void main() {
    if(gl_FragCoord.x>800.0){
    gl_FragColor = vec4(0,0,1,opacity);
    }
    else{
     gl_FragColor = vec4(color,opacity);
    }
   
}
`
//内置变量color的着色器
const vertexShader1=`
//attribute vec3 position;
//uniform mat4 modelMatrix;
//uniform mat4 viewMatrix;
//uniform mat4 projectionMatix;
varying vec3 v_color;
void main(){
  v_color=color;
  //gl_Position = projectionMatrix*viewMatrix*modelMatrix*vec4( position, 1.0 );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fragmentShader1=`
varying vec3 v_color;
uniform float opacity;
void main() {
    gl_FragColor = vec4(v_color,opacity);
}
`
//内置变量UV的着色器
const vertexShader2=`
varying vec2 v_uv;
void main(){
  v_uv=uv;
  //gl_Position = projectionMatrix*viewMatrix*modelMatrix*vec4( position, 1.0 );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fragmentShader2=`
varying vec2 v_uv;
uniform float opacity;
uniform sampler2D map;//颜色贴图变量
void main() {
    gl_FragColor = texture2D(map,v_uv);
}
`
//点材质着色器
const vertexShader3=`
attribute float size;
void main(){
  //gl_Position = projectionMatrix*viewMatrix*modelMatrix*vec4( position, 1.0 );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  gl_PointSize=size;
}
`
const fragmentShader3=`
void main() {
float r=distance(gl_PointCoord,vec2(0.5,0.5));
//如果在圆内取片元
if(r<0.5){
    gl_FragColor = vec4(0,1,0,1);
}
//不在圆内舍弃片元
else{
discard;
}
}
`
initThree(vertexShader,fragmentShader,vertexShader1,fragmentShader1,vertexShader2,fragmentShader2,vertexShader3,fragmentShader3)
})
function initThree(vs,fs,vs1,fs1,vs2,fs2,vs3,fs3){
const scene=new THREE.Scene()
const axes=new THREE.AxesHelper(220)
scene.add(axes)
const ambi=new THREE.AmbientLight()
ambi.intensity=100
scene.add(ambi)
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,3000)
camera.position.set(300,300,300)
camera.lookAt(0,0,0)
//shaderMaterial创建几何体
const geometry=new THREE.PlaneGeometry(100,100)
geometry.attributes.color=new THREE.BufferAttribute(new Float32Array([
    0,0,1,
    0,1,0,
    1,1,0,
    1,0,1]),3)
const material=new THREE.ShaderMaterial({
vertexShader:vs,
fragmentShader:fs,
side:THREE.DoubleSide,
transparent:true,
uniforms:{
    color:{value:new THREE.Color(0Xff1111)},
    opacity:{value:0.2}
}
})
const mesh=new THREE.Mesh(geometry,material)
//创建第二个几何体
const geometry1=new THREE.BufferGeometry()
geometry1.attributes.position=new THREE.BufferAttribute(new Float32Array([
    0,100,20,
    100,0,20,
    -100,0,20]),3)
geometry1.attributes.color=new THREE.BufferAttribute(new Float32Array([
    0,0,1,
    0,1,0,
    1,1,0]),3)
const material1=new THREE.ShaderMaterial({
vertexShader:vs1,
fragmentShader:fs1,
side:THREE.DoubleSide,
transparent:true,
uniforms:{
    opacity:{value:0.9}
},
vertexColors:true
})
const mesh1=new THREE.Mesh(geometry1,material1)
//创建第三个几何体
const geometry2=new THREE.PlaneGeometry(100,100)
//创建一个贴图
const texture=new THREE.TextureLoader().load('../../汽车产品展示资源/光点.png')
const material2=new THREE.ShaderMaterial({
vertexShader:vs2,
fragmentShader:fs2,
side:THREE.DoubleSide,
transparent:true,
uniforms:{
    opacity:{value:0.9},
    map:{value:texture}
},
})
const mesh2=new THREE.Mesh(geometry2,material2)
mesh2.position.z+=40
//创建第四个几何体
const geometry3=new THREE.BufferGeometry()
geometry3.attributes.position=new THREE.BufferAttribute(new Float32Array([
0,0,80,
0,30,80,
0,60,80,
0,90,80,
0,120,80
]),3)
geometry3.attributes.size=new THREE.BufferAttribute(new Float32Array([
1.0,
2.0,
3.0,
4.0,
5.0
]),1)
const material3=new THREE.ShaderMaterial({
    vertexShader:vs3,
    fragmentShader:fs3
})
const mesh3=new THREE.Points(geometry3,material3)
scene.add(mesh,mesh1,mesh2,mesh3)
const renderer=new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
const controls=new OrbitControls(camera,renderer.domElement)
container.value.appendChild(renderer.domElement)
function loop(){
renderer.render(scene,camera)
requestAnimationFrame(loop)
}
loop()
}
</script>

<style scoped>

</style>