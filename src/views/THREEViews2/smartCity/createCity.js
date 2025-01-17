import * as THREE from 'three'
import { lon2xy } from './transform'
import opaque_fragmentGlsl from './shader/opaque_fragment.glsl'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import mingzhuopaque_fragmentGlsl from './shader/mingzhuopaque_fragment.glsl';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer'
const cityGroup=new THREE.Group()
const loader = new THREE.FileLoader()
loader.setResponseType('json')
const data = await loader.loadAsync('../../../../public/智慧城市资源/上海/上海0.02.json')
const features=data.features;
//共用一个材质
const material = new THREE.MeshLambertMaterial({
    color: 0xfff222
})
//改变材质的着色器,实现材质的颜色区分效果
material.onBeforeCompile = (shader) => {
     //console.log(shader.fragmentShader);
    // console.log(shader.vertexShader);
    shader.vertexShader=shader.vertexShader.replace('void main() {',
        `varying vec3 v_position;
        void main(){
        v_position=position;
        `
    )
    shader.fragmentShader=shader.fragmentShader.replace('void main() {',
        `varying vec3 v_position;
        uniform float R;
        void main(){
        `
    )
    shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>',opaque_fragmentGlsl)
    //给shader传值，初始化值
    shader.uniforms.R={value:2000.0}
    //把shader绑给材质
    material.shader=shader
}
//创建几何体数组
const geometryArr=[]
features.forEach((e)=>{
    const geometry=e.geometry
    const type=geometry.type
    const coordinates=geometry.coordinates
    if(type==='Polygon'){
    //获得楼层数
    const Floor = e.properties.Floor
    //不渲染东方明珠
        if (Floor !== 70) {
            coordinates.forEach((e) => {
                const pointArr = []
                e.forEach((pos) => {
                    const coord = lon2xy(pos[0], pos[1])
                    pointArr.push(new THREE.Vector2(coord.x, coord.y))
                })
                const shape = new THREE.Shape(pointArr)
                const geometry = new THREE.ExtrudeGeometry(shape, { depth: Floor * 3 })
                geometryArr.push(geometry)
            })
}
    }  
})
const geometry = new BufferGeometryUtils.mergeGeometries(geometryArr)
const city=new THREE.Mesh(geometry,material)
cityGroup.add(city)
//创建城市边界线
 const edgeGeometry=new THREE.EdgesGeometry(geometry)
 const material3=new THREE.MeshBasicMaterial({
     color:0xff0000
 })
 const edge=new THREE.LineSegments(edgeGeometry,material3)
 cityGroup.add(edge)
 //加载东方明珠放入地图里。
const loader1 = new GLTFLoader()
const gltf=await loader1.loadAsync('../../../../public/智慧城市资源/东方明珠.glb')
const center=gltf.scene
const mingzhu=center.getObjectByName('东方明珠')
//创建标签标注东方明珠
const div = document.createElement('div')
div.innerHTML='东方明珠'
div.style.width='100px'
div.style.textAlign='center'
div.style.color='white'
div.style.backgroundColor='black'
div.style.opacity='0.6'
const label = new CSS2DObject(div)
label.position.set(13524790, 3664199, 750)
cityGroup.add(label)
//对东方明珠材质shader进行改造实现扫光效果
mingzhu.material.onBeforeCompile=(shader)=>{
//console.log(shader.fragmentShader);
    shader.vertexShader = shader.vertexShader.replace('void main() {',
    `varying vec3 v_position;
    void main() {
    v_position=position;
    `)
shader.fragmentShader=shader.fragmentShader.replace('void main() {',
    `varying vec3 v_position;
    uniform float H;
    void main() {
    `
)
shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>',mingzhuopaque_fragmentGlsl)
//初始化shader的uniform参数
shader.uniforms.H={value:0}
//把shader绑给明珠的材质方便后面动画使用
mingzhu.material.shader=shader;
}
mingzhu.position.set(13524790, 3664199, 0)
mingzhu.rotation.x = Math.PI / 2
//改明珠的材质颜色
mingzhu.material.color.set(0.3,0,1)
mingzhu.material.wireframe =true
//mingzhu.material.depthTest=false
cityGroup.add(mingzhu)
// const loader=new GLTFLoader()
// const gltf=await loader.loadAsync('../../../public/智慧城市资源/上海0.10.glb')
// const city=gltf.scene
// city.remove(city.getObjectByName('黄浦江'))
// console.log(city);
// console.log(city.getObjectByName(''));
cityGroup.add(city)
//用包围盒查看坐标,从而方便调整相机
// const box3=new THREE.Box3()
// box3.expandByObject(cityGroup)
// console.log(box3);
//在渲染循环里更新shader
let s=0.0;
let s1=0.0
function animates(){
    if(s===2800.0)s=0.0
    if(s1>=40000.0)s1=0.0
    s+=10.0
    s1+=400.0
    if(material.shader)material.shader.uniforms.R.value=s
    if (mingzhu.material.shader) mingzhu.material.shader.uniforms.H.value = s1
    requestAnimationFrame(animates)
}
animates()
export { cityGroup}