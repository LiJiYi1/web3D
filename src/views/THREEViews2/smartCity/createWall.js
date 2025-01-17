import * as THREE from 'three'
import { lon2xy } from './transform'
import wallopaque_fragmentGlsl from './shader/wallopaque_fragment.glsl'
import wallopaque_fragmentGlsl1 from './shader/wallopaque_fragment.glsl1'
const loader = new THREE.FileLoader()
loader.setResponseType('json')
const data = await loader.loadAsync('/../智慧城市资源/上海/上海0.02.json')
const features = data.features;
//创建一个数组存储经纬度值
const lonArr=[]
const latArr=[]
features.forEach((e) => {
    const geometry = e.geometry
    const type = geometry.type
    const coordinates = geometry.coordinates
    if (type === 'Polygon') {
        coordinates.forEach((e) => {
            e.forEach((pos) => {
                const coord = lon2xy(pos[0], pos[1])
                lonArr.push(coord.x)
                latArr.push(coord.y)
            })
        })
    }
})
//console.log(lonArr,latArr);
//排序两个数组
lonArr.sort((a,b)=>{return a-b})
latArr.sort((a,b)=>{return a-b})
const lonMax=lonArr[lonArr.length-1]
const lonMin=lonArr[0]
const latMax=latArr[latArr.length-1]
const latMin=latArr[0]
//根据最大最小获得八个顶点(四个底下的点,四个上面的点)
const PosArr=[
    lonMin, latMin, 0,   //0
    lonMin, latMin, 1000,//1
    lonMax, latMin, 0,   //2
    lonMax, latMin, 1000,//3
    lonMax, latMax, 0,   //4
    lonMax, latMax, 1000,//5
    lonMin, latMax, 0,   //6
    lonMin, latMax, 1000,//7
]
const PosArr1=[
    lonMin,latMin,0,     //0
    lonMin,latMin,1000,  //1
    lonMax,latMin,0,     //2
    lonMin, latMin, 1000,//1
    lonMax, latMin, 0,   //2
    lonMax, latMin, 1000,//3

    lonMax, latMin, 0,   //2
    lonMax, latMin, 1000,//3
    lonMax, latMax, 0,   //4
    lonMax, latMin, 1000,//3
    lonMax,latMax,1000,  //5
    lonMax, latMax, 0,   //4

    lonMax, latMax, 0,   //4
    lonMax, latMax, 1000,//5
    lonMin,latMax,0,     //6
    lonMax, latMax, 1000,//5
    lonMin, latMax, 0,   //6
    lonMin,latMax,1000,  //7

    lonMin, latMax, 0,   //6
    lonMin, latMax, 1000,//7
    lonMin, latMin, 0,   //0
    lonMin, latMax, 1000,//7
    lonMin, latMin, 1000,//1
    lonMin, latMin, 0,   //0
]
//创建一个索引数组
const index=[
0,1,2,1,2,3,
2,3,4,3,5,4,
4,5,6,5,6,7,
6,7,0,7,1,0
]
//创建一个透明度数组
// const transparent=[
//     1.0,
//     0.0,
//     1.0,
//     0.0,
//     1.0,
//     0.0,
//     1.0,
//     0.0
// ]
const uv=[
0.0,0.0,//0
0.0,1.0,//1
0.25,0.0,//2
0.0,1.0,//1
0.25,0.0,//2
0.25,1.1,//3

0.25, 0.0,//2
0.25, 1.0,//3
0.50,0.0,//4
0.25, 1.0,//3
0.50, 1.0,//5
0.50, 0.0,//4

0.50, 0.0,//4
0.50, 1.0,//5
0.75,0.0,//6
0.50, 1.0,//5
0.75, 0.0,//6
0.75, 1.0,//7

0.75, 0.0,//6
0.75, 1.0,//7
1.0, 0.0,//0
0.75, 1.0,//7
1.0, 1.0,//1
1.0, 0.0,//0
]
//根据八个点创建一个围墙
const wallGeometry=new THREE.BufferGeometry()
//自动计算法线
wallGeometry.computeVertexNormals()
wallGeometry.attributes.position=new THREE.BufferAttribute(new Float32Array(PosArr),3)
//wallGeometry.attributes.transparent=new THREE.BufferAttribute(new Float32Array(transparent),1)
//wallGeometry.attributes.uv=new THREE.BufferAttribute(new Float32Array(uv),2)
wallGeometry.index=new THREE.BufferAttribute(new Uint8Array(index),1)
//const texture=new THREE.TextureLoader().load('/../智慧城市资源/渐变.png')
const material=new THREE.MeshLambertMaterial({
    transparent:true,
    side:THREE.DoubleSide,
    color:0x00ff00,
    //map:texture,
    //depthTest:false
})
//修改材质的着色器(给顶点传透明度形式)
// material.onBeforeCompile=(shader)=>{
//     //console.log(shader.fragmentShader);
//     shader.vertexShader = shader.vertexShader.replace('void main() {',`
//         attribute float transparent;
//         varying float v_transparent;
//         void main() {
//          v_transparent=transparent;
//         `)
//     shader.fragmentShader = shader.fragmentShader.replace('void main() {',`
//         varying float v_transparent;
//         void main() {
//         `)
//     shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>',wallopaque_fragmentGlsl)
//     //#include < opaque_fragment >
    
// }
//修改材质的着色器(通过顶点坐标改)
material.onBeforeCompile=(shader)=>{
    //console.log(shader.fragmentShader);
    shader.vertexShader = shader.vertexShader.replace('void main() {',`
        varying vec3 v_position;
        void main() {
         v_position=position;
        `)
    shader.fragmentShader = shader.fragmentShader.replace('void main() {',`
        varying vec3 v_position;
        void main() {
        `)
    shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>',wallopaque_fragmentGlsl1)
    //#include < opaque_fragment >
}
const wall=new THREE.Mesh(wallGeometry,material)
const streamLightGeometry = new THREE.BufferGeometry()
streamLightGeometry.attributes.position = new THREE.BufferAttribute(new Float32Array(PosArr1), 3)
streamLightGeometry.attributes.uv=new THREE.BufferAttribute(new Float32Array(uv),2)
const texture1=new THREE.TextureLoader().load('/../智慧城市资源/流动.png')
texture1.wrapS=THREE.RepeatWrapping
texture1.wrapT=THREE.RepeatWrapping
texture1.repeat.set(18,1)
const material1 = new THREE.MeshLambertMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    color: 0x00ff00,
    map:texture1,
    //depthTest: false
})
const streamLightGeometry1 = new THREE.BufferGeometry()
streamLightGeometry1.attributes.position = new THREE.BufferAttribute(new Float32Array(PosArr1), 3)
streamLightGeometry1.attributes.uv = new THREE.BufferAttribute(new Float32Array(uv), 2)
const texture2 = new THREE.TextureLoader().load('/../智慧城市资源/流光.png')
texture2.wrapS = THREE.RepeatWrapping
texture2.wrapT = THREE.RepeatWrapping
texture2.repeat.set(8, 2)
const material2 = new THREE.MeshLambertMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    color: 0x00ff00,
    map: texture2,
    //depthTest: false
})
function animaties(){
    texture1.offset.y-=0.01
    texture2.offset.x-=0.01
    requestAnimationFrame(animaties)
}
animaties()
const streamLight=new THREE.Mesh(streamLightGeometry,material1)
const streamLight1 = new THREE.Mesh(streamLightGeometry1, material2)
wall.add(streamLight,streamLight1)
export{wall}
