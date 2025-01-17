import * as THREE from 'three'
import { createLine } from './createLine.js'
import { createExtrude} from './createExtrude.js'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { createPoint } from './createPoint.js'
const model=new THREE.Group()
const lineGroup=new THREE.Group()
lineGroup.position.z+=1
const shapeGroup=new THREE.Group()
const columnGroup=new THREE.Group()
const labelGroup = new THREE.Group()
const Loader=new THREE.FileLoader()
Loader.setResponseType('json')
//加载点数据
Loader.load('../../../地图大屏可视化资源/微博签到数据.json',(data)=>{
    const coordinate=data.coordinates
    const arr=[]
    for(let i=0;i<coordinate.length;i+=2){ 
            arr.push(coordinate[i],coordinate[i+1],0)     
    }
    const point=createPoint(arr)
    point.position.z+=1.4
    model.add(point)
})
Loader.load('../../../地图大屏可视化资源/china详细.json', (data) => {
    const features = data.features
    features.forEach((ele) => {
        const name = ele.properties.name
        //通过geoJSON获得区域形状数据
        const geometry = ele.geometry
        //通过geoJSON获得区域属性数据
        //获得中国省级行政区省会地点
        const center = ele.properties.center
        // console.log(center);
        if (center) {
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
                //填充几何体加入层级模型
                shapeGroup.add(shape)
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
                
                        
                        
                        //填充几何体加入层级模型
                        shapeGroup.add(shape)
                        //标签加入
                        labelGroup.add(label)
                    })
                })
            }
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