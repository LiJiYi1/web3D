import * as THREE from 'three'
import { createLine } from './createLine.js'
import { createExtrude} from './createExtrude.js'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { createColumn } from './createColumn.js'
import { createLabel } from './createLabel.js'
const model=new THREE.Group()
const lineGroup=new THREE.Group()
lineGroup.position.z+=2.2
const shapeGroup=new THREE.Group()
const columnGroup=new THREE.Group()
const labelGroup = new THREE.Group()
const Loader=new THREE.FileLoader()
Loader.setResponseType('json')
//创建一个OBJ把gdp数据用键值对关联起来存起来
const obj={}
//创建两个颜色方便混合
const color1=new THREE.Color(1,0,0)
const color2=new THREE.Color(1,1,0)
const gdpMax = 107671.07
//加载GDP数据
Loader.load('../../../public/地图大屏可视化资源/gdp.json',(data)=>{
    const gdp=data.arr
    gdp.forEach((ele)=>{
          obj[ele.name]=ele.value
    })
    // console.log(obj);
    
    Loader.load('../../../public/地图大屏可视化资源/china详细.json', (data) => {
        const features = data.features
        features.forEach((ele) => {
            const name = ele.properties.name
            //通过geoJSON获得区域形状数据
            const geometry = ele.geometry
            //通过geoJSON获得区域属性数据
            //获得中国省级行政区省会地点
            const center = ele.properties.center
            // console.log(center);
            if(center){
            //解析形状顶点位置变成数组，创建边界线和填充几何体
            if (geometry.type === 'Polygon') {
                const pointArr = []
                const shapeArr = []
                geometry.coordinates[0].forEach((point) => {
                    pointArr.push(point[0], point[1], 0)
                    shapeArr.push(new THREE.Vector2(point[0], point[1]))
                })
                //创建第一层边界线
                const line = createLine(pointArr)
                lineGroup.add(line)
                const shape = createExtrude(shapeArr)
                //获得GDP数据
                const gdp = obj[name]
                //创建柱体
                const column = createColumn(center[0], center[1], gdp / 5000+2)
                //颜色
                const color=color1.clone().lerp(color2.clone(),gdp/gdpMax)
                column.material.color.copy(color)
                //创建标签
                const label = createLabel(name, center[0], center[1], gdp / 5000 + 2)
                //柱体加入shape里
                columnGroup.add(column)
                //填充几何体加入层级模型
                shapeGroup.add(shape)
                //标签加入
                labelGroup.add(label)
            }
            //解析形状顶点位置变成数组，创建边界线和填充几何体
            else if (geometry.type === 'MultiPolygon') {
                geometry.coordinates.forEach((e) => {
                    e.forEach(ele => {
                        const pointArr = []
                        const shapeArr = []
                        ele.forEach((point) => {
                            pointArr.push(point[0], point[1], 0)
                            shapeArr.push(new THREE.Vector2(point[0], point[1]))
                        })
                        // console.log(center);
                        //第一层边界线
                        const line = createLine(pointArr)
                        lineGroup.add(line)
                        const shape = createExtrude(shapeArr)
                        //获得GDP数据
                        const gdp=obj[name]
                        //创建柱体
                        const column = createColumn(center[0], center[1],gdp/5000+2)
                        const color = color2.clone().lerp(color1.clone(), gdp / gdpMax)
                        column.material.color.copy(color)
                        //创建标签
                        const label = createLabel(name, center[0], center[1], gdp / 5000 + 2)
                        //柱体加入Group里
                        columnGroup.add(column)
                        //填充几何体加入层级模型
                        shapeGroup.add(shape)
                        //标签加入
                        labelGroup.add(label)
                    })
                })
            }
    }})
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
})
model.add(labelGroup)
model.add(columnGroup)
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