import * as THREE from 'three'
import { transform } from './transform'
import { createLightCircle } from './createLightCircle'
import { createLine } from './createLine'
import { createHotPoint } from './createHotPoint'
import HotNewsData from './HotNewsData'
import { createCircle } from './createCircle'
const R=80
const model=new THREE.Group()
const HotGroup=new THREE.Group()
HotGroup.name='热点'
model.add(HotGroup)
const Circle=new THREE.Group()
Circle.name='光圈'
model.add(Circle)
//解析geoJSON数据
const Loader=new THREE.FileLoader()
Loader.setResponseType('json')
//加载地球边界线资源
Loader.load('../../../public/地球大屏可视化资源/world.json',(data)=>{
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
const map=loader.load('../../../public/地球大屏可视化资源/earth (12).png')
const sphere = new THREE.SphereGeometry(R, 32, 32)
const material=new THREE.MeshLambertMaterial({
    transparent:true,
    map
})
const mesh=new THREE.Mesh(sphere,material)
model.add(mesh)
const lightCircle=createLightCircle(R)
model.add(lightCircle)
//根据数据获得中心
HotNewsData.forEach((data)=>{
    console.log(data);
    //获得经度纬度
    const lon=data.E
    const lat=data.N
    //经纬度转换
    const coord=transform(R,lon,lat)
    //创建热点
    const HOT=createHotPoint(coord.x,coord.y,coord.z,lon+lat,data.herf)
    //创建光圈
    const circle = createCircle(coord.x, coord.y, coord.z,lon+lat)
    //把圆放入层级模型方便管理
    Circle.add(circle)
    HotGroup.add(HOT)
})

export{model}