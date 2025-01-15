import * as THREE from 'three'
import { transform } from './transform.js'
import inside from 'point-in-polygon'
const model=new THREE.Group()
const sphere=new THREE.SphereGeometry(100,32,32)
const material=new THREE.MeshBasicMaterial({
    transparent:true,
    opacity:0.1
})
const mesh=new THREE.Mesh(sphere,material)
model.add(mesh)
//点阵横纵之间的距离
const space=3
//经纬度方向上的点数
const lonNum=360/3
const latNum=180/3
const pointArr=[]
//for循环遍历点创建点阵
for(let i=0;i<lonNum;i++){
    const lon=-180+space*i
    for(let j=0;j<latNum;j++){
        const lat=-90+space*j
        pointArr.push(lon,lat)
    }
}
//储存转换之后点的数组
const realArr=[]
for(let i=0;i<pointArr.length;i+=2){
const lon=pointArr[i]
const lat=pointArr[i+1]
const coord=transform(100,lon,lat)
realArr.push(coord.x,coord.y,coord.z)
}
//加载数据进行数组过滤
const loader=new THREE.FileLoader()
loader.setResponseType('json')
//创建一个数组存储陆地上的点
const pointArr1 = []
loader.load('../../../public/地球大屏可视化资源/world.json',(data)=>{
const features=data.features
features.forEach(e=>{
    const coordinates=e.geometry.coordinates
    const type=e.geometry.type
    if (type === 'Polygon') { 
        const arr=[]
        coordinates[0].forEach((e) => {
            arr.push(e)
        })
        //根据arr判断点是不是在区域内如果在就放进数组如果不在就不放进去
        for(let i=0;i<pointArr.length;i+=2){
            const lon=pointArr[i]
            const lat=pointArr[i+1]
          if(inside([lon,lat],arr)){pointArr1.push(lon,lat)}
        }
     }
     else if(type==='MultiPolygon'){
        coordinates.forEach(e=>{
          
            e.forEach(ele=>{
                const arr = []
                ele.forEach(ele=>{
                    arr.push(ele)
                })
                for (let i = 0; i < pointArr.length; i += 2) {
                    if (inside([pointArr[i], pointArr[i + 1]], arr)) { pointArr1.push(pointArr[i], pointArr[i + 1]) }
                }
            })
           
        })
        
     }
})
    //储存转换之后点的数组
    const realArr1 = []
    for (let i = 0; i < pointArr1.length; i += 2) {
        const lon = pointArr1[i]
        const lat = pointArr1[i + 1]
        const coord = transform(100, lon, lat)
        realArr1.push(coord.x, coord.y, coord.z)
    }
    const geometry = new THREE.BufferGeometry()
    geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(realArr1), 3)
    const material1 = new THREE.PointsMaterial({
        color:0xff0000,
        size:2
    })
    const point = new THREE.Points(geometry, material1)
    model.add(point)
})










export {model}