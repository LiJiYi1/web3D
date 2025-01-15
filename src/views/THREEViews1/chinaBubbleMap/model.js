import * as THREE from 'three'
import { createLine } from './createLine.js'
import { createShape } from './createShape.js'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import {createBubble} from './createBubble.js'
const model=new THREE.Group()
const lineGroup=new THREE.Group()
const shapeGroup=new THREE.Group()
const bubbleGroup=new THREE.Group()
shapeGroup.name='地区'
bubbleGroup.name='气泡'
const Loader=new THREE.FileLoader()
Loader.setResponseType('json')
//加载PM2.5的JSON数据
Loader.load('../../../public/地图大屏可视化资源/PM2.5.json',(data)=>{
    //PM2.5的JSON数组
    const value=data.arr
    //遍历value创建PM2.5的气泡图放到正确位置
    value.forEach((data)=>{
        //颜色比例
        const lerp=data.value/279
        //把气泡的坐标和大小都传给创建气泡的函数
        const bubble=createBubble(data.coordinate,data.value,lerp)
        bubbleGroup.add(bubble)
        //把位置,城市，PM2.5量绑给气泡，方便射线拾取，时给标签
        bubble.center=data.coordinate
        bubble.city=data.name
        bubble.PM=data.value
    })
    
})
Loader.load('../../../public/地图大屏可视化资源/china详细.json',(data)=>{
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
            //创建第一层边界线
            const line=createLine(pointArr)
            lineGroup.add(line)
            const shape=createShape(shapeArr)
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
            const shape = createShape(shapeArr)
            //填充几何体加入层级模型
            shapeGroup.add(shape)
        })
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
model.add(bubbleGroup)
model.add(lineGroup)
model.add(shapeGroup)
//创建一个CSS2Dobject
const div=document.createElement('div')
div.style.textAlign='center'
div.style.verticalAlign='center'
div.style.backgroundColor='black'
div.style.color='white'
div.style.borderRadius='2px'
div.style.opacity=0.6
div.innerHTML='郑州'
const label=new CSS2DObject(div)
label.position.y += 1.4
label.position.x-= 0.5
label.position.z+=3
label.name='标签'
model.add(label)


export {model,div}