//创建世界上各个国家的边界线
import * as THREE from 'three'
import {transform} from './transform'
import config  from './config'

    //解析GeoJSON数据获得边界线数据
    const Loader = new THREE.FileLoader()
    Loader.setResponseType('json')
   
    const data=await Loader.loadAsync('/../地球大屏可视化资源/worldZh.json')
    //创建数组存储处理过的边界数组方便合并线
    const newArr = []
    const featrues = data.features
    featrues.forEach((e) => {
    const geometry = e.geometry
    const type = geometry.type
    const coordinates = geometry.coordinates
    if (type === 'Polygon') {
    const pointArr = []
    coordinates[0].forEach((e) => {
                        //坐标转换
                        const coord = transform(config.R+0.2, e[0], e[1])
                        pointArr.push(coord.x, coord.y, coord.z)                
    })
    newArr.push(pointArr[0], pointArr[1], pointArr[2])
    for (let i = 3; i < pointArr.length; i += 3) {
                        newArr.push(pointArr[i], pointArr[i + 1], pointArr[i + 2], pointArr[i], pointArr[i + 1], pointArr[i + 2])
                }
    newArr.push(pointArr[0], pointArr[1], pointArr[2])
                }
    else if (type === 'MultiPolygon') {
     coordinates.forEach((e)=>{
        e.forEach(e=>{
            const pointArr=[]
          e.forEach((e)=>{
            //坐标转换
           const coord=transform(config.R+0.2,e[0],e[1])
           pointArr.push(coord.x,coord.y,coord.z)
            
          })
            newArr.push(pointArr[0],pointArr[1],pointArr[2])
            for(let i=3;i<pointArr.length;i+=3){
                newArr.push(pointArr[i], pointArr[i + 1], pointArr[i + 2], pointArr[i], pointArr[i + 1], pointArr[i + 2])
            }
            newArr.push(pointArr[0],pointArr[1],pointArr[2])
        })
        
     })

                }
            })
    
        
const geometry = new THREE.BufferGeometry()
geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(newArr), 3)
const material = new THREE.LineBasicMaterial({
  color:0xff0000
})
const boarder = new THREE.LineSegments(geometry, material)
export {boarder}