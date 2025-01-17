import * as THREE from 'three'
import { lon2xy } from './transform'
const loader=new THREE.FileLoader()
loader.setResponseType('json')
const data=await loader.loadAsync('../../../智慧城市资源/路.geojson')
const features=data.features
const lineGroup=new THREE.Group()
const baseLineGroup=new THREE.Group()
const streamLineGroup=new THREE.Group()
lineGroup.add(baseLineGroup)
lineGroup.add(streamLineGroup)
//console.log(features);
features.forEach(e=> {
    const coordinates=e.geometry.coordinates
    //console.log(coordinates);
    const pointArr=[]
    coordinates.forEach((coord)=>{
        const pos=lon2xy(coord[0],coord[1])
        pointArr.push(new THREE.Vector3(pos.x,pos.y,0))
    })
    //根据点创建三维样条曲线
    const curve = new THREE.CatmullRomCurve3(pointArr);
    const points=curve.getSpacedPoints(100)
    const geometry=new THREE.BufferGeometry()
    geometry.setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
        color: 0xff00ff
    })
    const line = new THREE.Line(geometry, material)
    baseLineGroup.add(line)
    //从线上截取一段作为飞线
    const space=10
    let index=0
    const points1=points.slice(index,space)
    const geometry1 = new THREE.BufferGeometry()
    const material1 = new THREE.LineBasicMaterial({
        color: 0xffff00
    })
    geometry1.setFromPoints(points1)
    const line1 = new THREE.Line(geometry1, material1)
    streamLineGroup.add(line1)
    // function loop(){
    //     if(index>90)index=0
    //       index+=1
    //       const points1 = points.slice(index, space)
    //       geometry1.setFromPoints(points1)
    //       requestAnimationFrame(loop)
    // }
    // loop()
});
// //创建一个总数组存储顶点
// const allArr=[]
// features.forEach((e)=>{
//     const geometry=e.geometry
//     const type=geometry.type
//     //console.log(geometry);
//     if(type==='LineString'){
//     const coordinates=geometry.coordinates
//         //console.log(coordinates);
//         const pointArr=[]
//         coordinates.forEach((coord)=>{
//             const pos= lon2xy(coord[0],coord[1])
//           //  console.log(pos.x,pos.y);
//             pointArr.push(pos.x,pos.y,0)
//         })
//         allArr.push(pointArr[0],pointArr[1],pointArr[2])
//         for(let i=3;i<pointArr.length-3;i+=3){
//             allArr.push(pointArr[i], pointArr[i + 1], pointArr[i + 2], pointArr[i], pointArr[i + 1], pointArr[i + 2])
//         }
//         allArr.push(pointArr[pointArr.length-3], pointArr[pointArr.length-2], pointArr[pointArr.length-1])
//     }
// })
// //根据数组创建线模型
// const geometry=new THREE.BufferGeometry()
// geometry.attributes.position=new THREE.BufferAttribute(new Float32Array(allArr),3)
// const material=new THREE.LineBasicMaterial({
//     color:0xff00ff
// })
// const line=new THREE.LineSegments(geometry,material)
export {lineGroup}