import * as THREE from 'three'
import { transform } from './transform'
import { createLightCircle } from './createLightCircle'
import { createLine } from './createLine'
import { createRoad } from './createRoad'
const R=80
const model=new THREE.Group()
//解析geoJSON数据
const Loader=new THREE.FileLoader()
Loader.setResponseType('json')
//加载地球边界线资源
Loader.load('/../地球大屏可视化资源/world.json',(data)=>{
    const features=data.features
    //把点的数组处理一下生成一个新的数组才能实现数组合并
    const newArr = []
    features.forEach(ele=>{
        const geometry=ele.geometry
        if (geometry.type ==='Polygon'){
            const pointArr = []
            geometry.coordinates[0].forEach((ele)=>{
            const coord=transform(R,ele[0],ele[1])
            pointArr.push(coord.x,coord.y,coord.z)
            })
            //把这个区域的顶点变成lineSegments适用的格式
            newArr.push(pointArr[0], pointArr[1], pointArr[2])
            for (let i = 3; i < pointArr.length; i += 3) {
                newArr.push(pointArr[i], pointArr[i + 1], pointArr[i + 2], pointArr[i], pointArr[i + 1], pointArr[i + 2])
            }
            newArr.push(pointArr[0], pointArr[1], pointArr[2])
        }
        else if (geometry.type ==='MultiPolygon'){
            
             geometry.coordinates.forEach((e)=>{
                e.forEach((e)=>{
                    const pointArr = []
                    e.forEach((ele)=>{
                        const coord = transform(R, ele[0], ele[1])
                        pointArr.push(coord.x, coord.y, coord.z)   
                    })
                    //把这个区域的顶点变成lineSegments适用的格式
                    newArr.push(pointArr[0], pointArr[1], pointArr[2])
                    for (let i = 3; i < pointArr.length; i += 3) {
                        newArr.push(pointArr[i], pointArr[i + 1], pointArr[i + 2], pointArr[i], pointArr[i + 1], pointArr[i + 2])
                    }
                    newArr.push(pointArr[0], pointArr[1], pointArr[2])
                })
             })
        }
       
    })
    const line = createLine(newArr)
    model.add(line)
   
})
const loader=new THREE.TextureLoader()
const map=loader.load('/../地球大屏可视化资源/earth (12).png')
const sphere = new THREE.SphereGeometry(R, 32, 32)
const material=new THREE.MeshLambertMaterial({
    transparent:true,
    map
})
//加载铁路线资源GeoJSON
Loader.load('/../地球大屏可视化资源/铁路线.json',(data)=>{
    //创建数组存储处理过的点方便用lineSegment渲染
    const newArr=[]
    const features=data.features
    // console.log(features);
    features.forEach((e)=>{
        const geometry=e.geometry
        //这个数据只有一条线的几何体所以不用分开解析
        if(geometry.type==='LineString'){
            const coordinates=geometry.coordinates
            //创建数组存储点坐标
            const pointArr=[]
            coordinates.forEach((coord)=>{
                const pos=transform(R,coord[0],coord[1])
                pointArr.push(pos.x,pos.y,pos.z)
            })
            newArr.push(pointArr[0],pointArr[1],pointArr[2])
            for(let i=3;i<pointArr.length-1;i+=3){
                newArr.push(pointArr[i], pointArr[i + 1], pointArr[i + 2], pointArr[i], pointArr[i + 1], pointArr[i + 2])
            }
            newArr.push(pointArr[pointArr.length - 3], pointArr[pointArr.length - 2], pointArr[pointArr.length - 1])
        }
    })
 const Road=createRoad(newArr)
 model.add(Road)
})
const mesh=new THREE.Mesh(sphere,material)
model.add(mesh)
const lightCircle=createLightCircle(R)
model.add(lightCircle)

export{model}