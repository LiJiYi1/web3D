import * as THREE from 'three'
import { createLine } from './createLine'
import { createExtrude } from './createExtrude'
import { createColumn } from './createColumn'
const model=new THREE.Group()
const lineGroup=new THREE.Group()
model.add(lineGroup)
lineGroup.position.z+=10
const extrudeGroup = new THREE.Group()
model.add(extrudeGroup)
const columnGroup = new THREE.Group()
model.add(columnGroup)
const loader=new THREE.FileLoader()
loader.setResponseType('json')
loader.load('/../地图大屏可视化资源/人口密度.json',(data)=>{
  const population=data.population
  const geometryArr=[]
const hmax = 97.456
  population.forEach(e=>{
    const h=e[2]/100
    const geometry=new THREE.BoxGeometry(0.3,0.3,h)
    geometry.translate(e[0], e[1], h/2+10);
    //改变几何体的颜色
    const count=geometry.attributes.position.count
    const arr=[]
    const color=new THREE.Color(0,0,0)
    const color1=new THREE.Color(0,1,1)
    //改变顶点坐标进行着色
    for(let i=0;i<count;i++){
        const c=color.clone().lerp(color1.clone(),e[2]/hmax)
        arr.push(c.r,c.g,c.b)
    }
    geometry.attributes.color=new THREE.BufferAttribute(new Float32Array(arr),3)
    geometryArr.push(geometry)
  })
const column=createColumn(geometryArr)
model.add(column)
    
})
loader.load('/../地图大屏可视化资源/world.json',(data)=>{
const features=data.features
features.forEach((e)=>{
    const geometry=e.geometry
    const type=e.geometry.type
    if (type ==='Polygon'){
        const coordinates = geometry.coordinates
        const arr=[]
        const arr1 = []
        coordinates[0].forEach((ele) => {
          arr.push(ele[0],ele[1],0)
          arr1.push(new THREE.Vector2(ele[0], ele[1]))
        })
        const line=createLine(arr)
        lineGroup.add(line)
        const extrude = createExtrude(arr1)
        extrudeGroup.add(extrude)
    }
    else if(type==='MultiPolygon'){
        const coordinates = geometry.coordinates
        coordinates.forEach(e=>{
           e.forEach(ele=>{
            const arr = []
            const arr1=[]
           ele.forEach(ele=>{
               arr.push(ele[0], ele[1], 0)
               arr1.push(new THREE.Vector2(ele[0],ele[1]))
           })
               const line = createLine(arr)
               lineGroup.add(line)
               const extrude = createExtrude(arr1)
               extrudeGroup.add(extrude)
           })
        
        })
        
        
    }


    
})


})
export {model}