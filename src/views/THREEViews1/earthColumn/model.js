import * as THREE from 'three'
import { createEarth } from './createEarth.js'
import {transform} from './transform.js'
import { createBox } from './createBox.js'
//引入几何体合并对象
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
const model=new THREE.Group()
const earth=createEarth()
model.add(earth)
//解析world.json数据绘制边界线
const Loader=new THREE.FileLoader()
Loader.setResponseType('json')
Loader.load('../../../public/地球大屏可视化资源/world.json',(data)=>{
    const features=data.features
    //创建数组存储处理过的顶点坐标
    const newArr = []
    features.forEach((ele)=>{
       const geometry=ele.geometry
       const type=geometry.type
       const coordinates=geometry.coordinates
        //console.log(geometry);
       if(type==='Polygon'){
        const pointArr=[]
        // console.log(coordinates);
        coordinates[0].forEach((e)=>{
        const coord=transform(100,e[0],e[1])
         pointArr.push(coord.x,coord.y,coord.z)
        })
        //起始点
        newArr.push(pointArr[0],pointArr[1],pointArr[2])
        //通过for循环给中间点全部遍历两遍，便于用lineSegment
        for(let i=3;i<pointArr.length;i+=3){
         newArr.push(pointArr[i],pointArr[i+1],pointArr[i+2],pointArr[i],pointArr[i+1],pointArr[i+2])
        }
        //最后一个结束点与起始点重合实现一个闭环效果
        newArr.push(pointArr[0],pointArr[1],pointArr[2])
        
       }
       else if(type==='MultiPolygon'){
           coordinates.forEach(e=>{
            e.forEach(e=>{
                const pointArr=[]
                e.forEach((ele)=>{
                    const coord=transform(100,ele[0],ele[1])
                    pointArr.push(coord.x,coord.y,coord.z)
                })
                //起始点
                newArr.push(pointArr[0], pointArr[1], pointArr[2])
                //通过for循环给中间点全部遍历两遍，便于用lineSegment
                for (let i = 3; i < pointArr.length; i += 3) {
                    newArr.push(pointArr[i], pointArr[i + 1], pointArr[i + 2], pointArr[i], pointArr[i + 1], pointArr[i + 2])
                }
                //最后一个结束点与起始点重合实现一个闭环效果
                newArr.push(pointArr[0], pointArr[1], pointArr[2])
            })
           })
       }
       
       

    })
//创建边界线的几何体
const geometry=new THREE.BufferGeometry()
geometry.attributes.position=new THREE.BufferAttribute(new Float32Array(newArr),3)
const material=new THREE.MeshBasicMaterial({
    color:0xf90000
})
const line=new THREE.LineSegments(geometry,material)
model.add(line)

    
})
//请求人口密度数据,实现密集柱子可视化
Loader.load('../../../public/地球大屏可视化资源/人口密度.json',(data)=>{
    const population=data.population
// console.log(population);
// //创建数组存储人口密度
// const ARR=[]
//遍历population人口密度数据
const miMax=9745.6
//创建数组存储geometry方便后期进行几何体合并
const geometryArr=[]
population.forEach(e=>{
    //拿到经纬度
    const lon=e[0]
    const lat=e[1]
    //拿到人口密度
    const mi=e[2]
    // ARR.push(mi)
    //经纬度坐标转平面坐标
    const coord=transform(100,lon,lat)
    //根据人口密度创建柱子几何体
    const box=createBox(mi,coord,100,mi/miMax)
    geometryArr.push(box)
})
//对创建的几何体进行几何体合并,合并成一个几何体
const boxAllGeometry = BufferGeometryUtils.mergeGeometries(geometryArr)
const material=new THREE.MeshLambertMaterial({
    // color:0xff1222
    vertexColors:true
})
const mesh=new THREE.Mesh(boxAllGeometry,material)
model.add(mesh)
//对人口密度排序拿到最大值
// ARR.sort((a,b)=>a-b)
// console.log(ARR[ARR.length-1]);

})
export {model}