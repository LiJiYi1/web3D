import * as THREE from 'three'
//引入创建线的方法方便创建边界线
import { createLine } from './createLine'
//引入创建拉伸几何体方法方便创建几何体
import { createExtrude } from './createExtrude'
//引入创建光圈的方法创建光圈
import { createCircle } from './createCircle'
//引入标签OBJ
import {CSS2DObject} from 'three/addons/renderers/CSS2DRenderer.js'
//创建层级模型储存创建的模型方便管理
const model=new THREE.Group()
//创建二级层级模型存储数据形成树状结构
const lineGroup=new THREE.Group()
//将线层级的z坐标往上移动防止被覆盖
lineGroup.position.z+=0.8
const extrudeGroup=new THREE.Group()
//给extrudeGroup一个名字属性方便后续从model里拿到extrudeGroup
extrudeGroup.name='行政区'
const circleGroup=new THREE.Group()
//给circleGroup一个名字属性方便后续从model里拿到circleGroup
circleGroup.name='光圈'
//数据模型加入model里面
model.add(lineGroup)
model.add(extrudeGroup)
model.add(circleGroup)
//用FileLoader加载JSON数据(也可以用XHR,实际开发中多用axios请求)
const Loader=new THREE.FileLoader()
//设置请求数据的type不然请求的是字符串，不好处理
Loader.setResponseType('json')
Loader.load('/../地图大屏可视化资源/china.json',(data)=>{
//data就是我们请求到的GeoJSON数据我们下面就要对他解析，通过解析的数据来创建模型
const features=data.features
// console.log(features);
//遍历解析
features.forEach((ele)=>{
    // console.log(ele.properties.cp);
    //遍历后的ele是每个地区的数据包括地区的属性和边界
    //geometry是边界的顶点数据，我们要根据这个数据创建地图模型
    const geometry=ele.geometry
    //properties是属性数据我们可以根据这个属性拿到名字和中心这样的属性
    const properties=ele.properties
    //省会坐标
    const center=properties.cp
    //省份名称
    const name=properties.name
    //市数量
    const num=properties.childNum
    //geometry有不同的type不同type的顶点存储方式不一样。根据不同type进行数据解析
    const type=geometry.type
    //geometry的顶点数据
    const coordinates=geometry.coordinates
    if(type==='Polygon'){
        // console.log(coordinates);
        //创建数组存储每个区域的边界
        const pointArr=[]
        //创建数组存储每个区域的形状
        const shapeArr=[]
        //将顶点数据彻底遍历拿到x,y坐标也就是经纬度
        coordinates[0].forEach((pos)=>{
            // console.log(pos);
            //把区域点的坐标给pointArr
            pointArr.push(pos[0],pos[1],0)
            //形状点给shapeArr
            shapeArr.push(new THREE.Vector2(pos[0],pos[1]))
        })
        //根据边界数组调用封装的创建线函数实现边界线可视化
        const line=createLine(pointArr)
        const line1 = createLine(pointArr)
        line1.position.z-=1.05
        //根据vector2数组调用封装的创建形状函数实现地图可视化
        const map=createExtrude(shapeArr)
        //给map一个center属性方便射线拾取使用
        map.center=center
        //给map一个name属性方便射线拾取使用
        map.name = name
        //给map一个num属性方便射线拾取使用
        map.num = num
        //在中心处创建圆环
        const circle=createCircle(center[0],center[1])
        //加入层级模型
        lineGroup.add(line)
        lineGroup.add(line1)
        extrudeGroup.add(map)
        circleGroup.add(circle)
    }
    else if(type==='MultiPolygon'){
        coordinates.forEach(e=>{
            e.forEach(ele=>{
                const pointArr=[]
                const shapeArr=[]
                ele.forEach(pos=>{
                    pointArr.push(pos[0],pos[1],0)
                    shapeArr.push(new THREE.Vector2(pos[0],pos[1]))
                })
                const line=createLine(pointArr)
                const line1 = createLine(pointArr)
                line1.position.z -= 1.05
                const map=createExtrude(shapeArr)
                //给map一个center属性方便射线拾取使用
                map.center = center
                //给map一个name属性方便射线拾取使用
                map.name = name
                //给map一个num属性方便射线拾取使用
                map.num = num
                lineGroup.add(line)
                lineGroup.add(line1)
                extrudeGroup.add(map)
            })
            
        })
    }
})
//包围盒查看地图中心
// const box=new THREE.Box3()
// box.expandByObject(extrudeGroup)
// const center=new THREE.Vector3()
// box.getCenter(center)
// console.log(center);
//创建一个椎体实现热点指向效果
const geometry = new THREE.CylinderGeometry(0, 0.8, 2, 4)
geometry.rotateX(-Math.PI / 2)
const material = new THREE.MeshLambertMaterial({
        color: 0xff00f9
})
const Vertebrae = new THREE.Mesh(geometry, material)
Vertebrae.position.set(118.7402, 36.4307, 1.5)
Vertebrae.name = '椎体'
model.add(Vertebrae)
//创建一个标签对象实现一个标记效果
const label=new CSS2DObject(div)
label.name='标签'
label.position.set(119.7402+3,36.4307,2.5)
model.add(label)
})
const div = document.createElement('div')
div.innerHTML = '省份:山东省</br><hr>数量:22'
div.style.backgroundColor = 'black'
div.style.background
div.style.color = 'white'
div.style.opacity = 0.8
export{model,div}