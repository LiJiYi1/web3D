import * as THREE from 'three'
import { transform } from './transform'
import { createLightCircle } from './createLightCircle'
import { createLine } from './createLine'
import { createPoints } from './createPoints'
const R=80
const model=new THREE.Group()
//解析geoJSON数据
const Loader=new THREE.FileLoader()
Loader.setResponseType('json')
//加载地图边界线资源
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
//加载密集点资源
Loader.load('/../地球大屏可视化资源/数据.json',(data)=>{
    // console.log(data);
    //创建数组存储点的坐标
    const pointArr=[]
    //创建数组储存周围点的数量
    const numArr=[]
    for(let i=0;i<data.points.length;i+=2){
        const lon=data.points[i]
        const lat=data.points[i+1]
        //把坐标转换一下
        const coord = transform(R, lon, lat)
        pointArr.push(coord.x, coord.y, coord.z) 
        
    }
    for (let i = 0; i < data.num.length; i ++) {
        const num = data.num[i]
        numArr.push(num)
    }
    //根据数据调用创建点的函数创建点
    const points=createPoints(pointArr,numArr)
    model.add(points)
    
})
const loader=new THREE.TextureLoader()
const map=loader.load('/../地球大屏可视化资源/earth (12).png')
const sphere = new THREE.SphereGeometry(R, 32, 32)
const material=new THREE.MeshLambertMaterial({
    transparent:true,
    map
})
const mesh=new THREE.Mesh(sphere,material)
model.add(mesh)
const lightCircle=createLightCircle(R)
model.add(lightCircle)

export{model}