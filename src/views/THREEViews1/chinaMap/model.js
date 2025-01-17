import * as THREE from 'three'
import { createLine } from './createLine.js'
import { createShape } from './createShape.js'
import { ExtrudeMesh } from './ExtrudeMesh.js'
import { createPoint } from './createCircle.js'
import { createAperture } from './aperture.js'
import { createCone } from './createCone.js'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
const model=new THREE.Group()
const lineGroup=new THREE.Group()
const shapeGroup=new THREE.Group()
shapeGroup.name='地区'
const Loader=new THREE.FileLoader()
Loader.setResponseType('json')
Loader.load('../../../地图大屏可视化资源/china详细.json',(data)=>{
    const features=data.features
    features.forEach((ele)=>{
        //通过geoJSON获得区域形状数据
        const geometry=ele.geometry
        //通过geoJSON获得区域属性数据
        //获得中国省级行政区省会地点
        const center = ele.properties.center
        // console.log(center);
        //解析形状顶点位置变成数组，创建边界线和填充几何体
        if (geometry.type ==='Polygon'){
          const pointArr=[]
          const shapeArr=[]
            geometry.coordinates[0].forEach((point)=>{
                pointArr.push(point[0],point[1],0)
                shapeArr.push(new THREE.Vector2(point[0],point[1]))
            })
            //创建省会的点
            const cityPoint=createPoint(center[0],center[1],2)
            //创建第一层边界线
            const line=createLine(pointArr)
            lineGroup.add(line)
            //第二层边界线
            const line1 = createLine(pointArr)
            lineGroup.add(line1)
            line1.position.z -=1.45
            const shape=ExtrudeMesh(shapeArr)
            //把省会的点加入形状填充几何体内
            shape.add(cityPoint)
            //填充几何体加入层级模型
            shapeGroup.add(shape)
        }
       //解析形状顶点位置变成数组，创建边界线和填充几何体
       else if (geometry.type === 'MultiPolygon'){
       geometry.coordinates.forEach((e)=>{
        e.forEach(ele=>{
            const pointArr = []
            const shapeArr=[]
            ele.forEach((point)=>{
                 pointArr.push(point[0], point[1], 0)
                shapeArr.push(new THREE.Vector2(point[0], point[1]))
            })
            // console.log(center);
            //第一层边界线
            const line = createLine(pointArr)
            lineGroup.add(line)
            //第二层边界线
            const line1 = createLine(pointArr)
            line1.position.z-=1.45
            lineGroup.add(line1)
            const shape = ExtrudeMesh(shapeArr)
            //填充几何体加入层级模型
            shapeGroup.add(shape)
        })
        //如果有省会数据就加上点没有就算了
        if(center){
        //创建一下省会的点
        const cityPoint = createPoint(center[0], center[1], 1.2)
        //把省会的点加入层级对象
        model.add(cityPoint)
        // //创建热点光圈
        // const aperture = createAperture(center[0], center[1], 2.1)
        // aperture.name = '光圈'
        // model.add(aperture)
        }
       })
        }
    })
    // //包围盒获得中心和大小
    // const box = new THREE.Box3()
    // box.expandByObject(lineGroup)
    // //获得中心
    // const center= new THREE.Vector3()
    // box.getCenter(center)
    // console.log('中心',center);
    // //获得大小
    // const size = new THREE.Vector3()
    // box.getSize(size)
    // console.log('大小',size);
})
//把边界线偏移防止出现被覆盖的情况
lineGroup.position.z+=1.1
model.add(lineGroup)
model.add(shapeGroup)
// 标注出来省份的行政中心(光圈在哪个地方)
const pos = [113.68, 34.77];//省份行政中心位置经纬度
//创建光圈
const aperture = createAperture(pos[0], pos[1], 1.3)
aperture.name = '光圈'
model.add(aperture)
//创建一个棱锥指向中心
const cone =createCone(pos[0],pos[1],2)
cone.name='棱锥'
model.add(cone);
//创建一个CSS2Dobject
const div=document.createElement('div')
div.style.width='50px'
div.style.textAlign='center'
div.style.verticalAlign='center'
div.style.height='20px'
div.style.backgroundColor='black'
div.style.color='white'
div.style.borderRadius='2px'
div.style.opacity=0.6
div.innerHTML='郑州'
const label=new CSS2DObject(div)
label.position.copy(aperture.position)
label.position.y += 1.4
label.position.x-= 0.5
label.position.z+=3
model.add(label)


export {model}