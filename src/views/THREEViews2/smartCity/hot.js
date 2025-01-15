import * as THREE from 'three'
import cylinderopaque_fragmentGlsl from './shader/cylinderopaque_fragment.glsl'
const hotGroup=new THREE.Group()
//创建光圈
const plane=new THREE.PlaneGeometry(200,200)
const texture=new THREE.TextureLoader().load('../../../public/智慧城市资源/标注光圈.png')
const material=new THREE.MeshBasicMaterial({
    transparent:true,
    map:texture,
    color:0xffff00,
    side:THREE.DoubleSide,
    //depthTest:false
})
const circle=new THREE.Mesh(plane,material)
circle.position.set(13524790, 3664199,660)
hotGroup.add(circle)
//创建棱锥
const cylinderGroup=new THREE.Group()
cylinderGroup.position.set(13524790, 3664199, 556)
//透明度贴图
const texture1 = new THREE.TextureLoader().load('../../../public/智慧城市资源/渐变1.png')
//棱锥下半部分
const geometry = new THREE.CylinderGeometry(0, 50, 200, 4);
geometry.rotateX(-Math.PI/2)
const material1 = new THREE.MeshLambertMaterial({ 
    color: 0xffff00,
    transparent:true,
    map:texture1
});
const cylinder = new THREE.Mesh(geometry, material1);
//cylinder.position.set(13524790, 3664199, 520)
cylinderGroup.add(cylinder)
//棱锥下半部分
const geometry1 = new THREE.CylinderGeometry(0, 59, 88, 4);
geometry1.rotateX(Math.PI / 2)
const material2 = new THREE.MeshLambertMaterial({ 
    transparent:true,
    color: 0xffff00,
    map:texture1
});
const cylinder1 = new THREE.Mesh(geometry1, material2);
cylinderGroup.add(cylinder1)
//cylinder1.position.set(13524790, 3664199, 666)
cylinder1.position.z=133
hotGroup.add(cylinderGroup)
//创建一个没顶没底的圆柱
const geometry3 = new THREE.CylinderGeometry(150, 150, 50, 32,1,true);
geometry3.rotateX(Math.PI / 2)
geometry3.translate(0,0,25)
const material3= new THREE.MeshLambertMaterial({ 
    color: 0xffff00,
    side:THREE.DoubleSide,
    transparent:true
 });
material3.onBeforeCompile=(shader)=>{
    //console.log(shader.fragmentShader);
    shader.vertexShader = shader.vertexShader.replace('void main() {', 
        `
        varying vec3 v_position;
        void main() {
         v_position=position;
        `
    )
    shader.fragmentShader = shader.fragmentShader.replace('void main() {',`
        varying vec3 v_position;
        void main() {
        `)
    shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>',cylinderopaque_fragmentGlsl)
    
}
const cylinder3 = new THREE.Mesh(geometry3, material3);
cylinder3.position.set(13524790, 3664199, 0)
hotGroup.add(cylinder3)
//创建一个雷达效果。
const plane1=new THREE.PlaneGeometry(250,250)
const texture2=new THREE.TextureLoader().load('../../../public/智慧城市资源/雷达刻度.png')
const texture3 = new THREE.TextureLoader().load('../../../public/智慧城市资源/扫描雷达.png')
const material4=new THREE.MeshBasicMaterial({
transparent:true,
map:texture2,
depthTest:false,
color:0x00ff00
})
const material5 = new THREE.MeshBasicMaterial({
    transparent: true,
    map: texture3,
    depthTest: false,
    color: 0x00ff00
})
const radar=new THREE.Mesh(plane1,material4)
radar.position.set(13524790, 3664199, 0)
const radar1 = new THREE.Mesh(plane1, material5)
radar1.position.set(13524790, 3664199, 0)
hotGroup.add(radar)
hotGroup.add(radar1)
//实现光圈波动,和棱锥旋转效果
let s=0
let s1=0
function loop(){
    if(s>4)s=0
    if(s1>4)s1=0
    s1+=0.03
    s+=0.04
    //缩放光圈
    circle.scale.set(1+s,1+s,1+s)
    circle.material.opacity=4-s
    //圆柱缩放
    cylinder3.scale.set(1+s1,1+s1,1+s1)
    //console.log(cylinderGroup.rotation);
    //棱锥旋转效果
    cylinderGroup.rotation.z+=0.04
    //雷达旋转效果
    radar1.rotateZ(0.02)
    requestAnimationFrame(loop)
}
loop()
export {hotGroup}