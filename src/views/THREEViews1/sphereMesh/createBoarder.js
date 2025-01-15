import * as THREE  from 'three'
import { transform } from './transform';
function createBoarder(data,R){
//创建一个数组存储顶点
const newArr=[]
//解析数据
const features=data.features
features.forEach((e)=>{
const geometry=e.geometry
const type=geometry.type
const coordinates=geometry.coordinates
    if (type ==='Polygon'){
    const pointArr=[]
    coordinates[0].forEach(e=>{
    const coord=transform(R+0.4,e[0],e[1])
    pointArr.push(coord.x,coord.y,coord.z)
    })
    //把顶点按特定格式存储起来方便线几何体的合并
    newArr.push(pointArr[0],pointArr[1],pointArr[2])
    for(let i=3;i<pointArr.length;i+=3){
       newArr.push(pointArr[i],pointArr[i+1],pointArr[i+2],pointArr[i],pointArr[i+1],pointArr[i+2])
    }
    newArr.push(pointArr[0], pointArr[1], pointArr[2])
    }
    else if (type ==='MultiPolygon'){
      coordinates.forEach(e=>{
        e.forEach((e)=>{
            const pointArr=[]
            e.forEach(e=>{
                const coord = transform(R+0.4, e[0], e[1])
                pointArr.push(coord.x, coord.y, coord.z)
            }) 
            //把顶点按特定格式存储起来方便线几何体的合并
            newArr.push(pointArr[0], pointArr[1], pointArr[2])
            for (let i = 3; i < pointArr.length; i += 3) {
                newArr.push(pointArr[i], pointArr[i + 1], pointArr[i + 2], pointArr[i], pointArr[i + 1], pointArr[i + 2])
            }
            newArr.push(pointArr[0], pointArr[1], pointArr[2])  
        })
      })
       
    }
})
//根据存储好的顶点创建合并后的几何体
const geometry=new THREE.BufferGeometry()
geometry.attributes.position=new THREE.BufferAttribute(new Float32Array(newArr),3)
const matrial=new THREE.LineBasicMaterial({
    color:0x444444,
})
const line=new THREE.LineSegments(geometry,matrial)
return line
}
export {createBoarder}