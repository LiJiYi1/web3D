import * as THREE from 'three'
import { createShape } from './createShape'
import { createLine } from './createLine'
const model=new THREE.Group()
const shapeGroup=new THREE.Group()
shapeGroup.name='形状填充'
const lineGroup=new THREE.Group()
model.add(shapeGroup)
model.add(lineGroup)
//创建两个颜色用作最高和最低GDP的颜色方便混合
const color1=new THREE.Color(1,1,1)
const color2=new THREE.Color(1,0,0)
//把广东GDP作为最高标准
const gdpMax = 107671.07
const loader = new THREE.FileLoader()
loader.setResponseType('json')
//创建一个对象把地名和GDP数据对上
const obj={}
//加载地图geojson数据
loader.load('/../地图大屏可视化资源/china详细.json',(data)=>{
const features = data.features
//加载GDP的JSON数据
loader.load('/../地图大屏可视化资源/gdp.json', (data) => {
        const arr = data.arr
        //把值赋给OBJ
        arr.forEach(ele => {
            obj[ele.name] = ele.value
        })
    features.forEach((ele) => {
        //拿到geojson的地名属性方便进行可视化
        const name = ele.properties.name
        //拿到geojson数据中的中心方便后期射线拾取时拾取模型拿到中心
        const center=ele.properties.center
        //拿到geojson的形状进行形状渲染
        const geometry = ele.geometry
        //对连续区域进行解析并创建形状
        if (geometry.type === 'Polygon') {
            geometry.coordinates.forEach((ele) => {
                //创建一个数组储存形状
                const pointArr = []
                //创建一个数组储存线形
                const lineArr=[]
                ele.forEach((coord) => {
                    //把坐标转换为vector2存在数组中方便创建shape
                    pointArr.push(new THREE.Vector2(coord[0], coord[1]))
                    lineArr.push(coord[0],coord[1],0)
                })
                //调用创建形状的方法创建形状
                const shape = createShape(pointArr)
                const line=createLine(lineArr)
                //形状加入层级模型
                shapeGroup.add(shape)
                lineGroup.add(line)
                //形状网格模型的名称
                shape.name = name
                //模型的中心
                shape.center = center
                //根据区域的名称来拿到GDP
                const gdp = obj[name]
                console.log(gdp);
                //拿到GDP的比例
                const float = gdp / gdpMax
                //设置区域的颜色
                const shapeColor = color1.clone().lerp(color2.clone(), float)
                shape.material.color.copy(shapeColor)
            })
        }
        //对非连续区域进行解析并创建形状
        else if (geometry.type === 'MultiPolygon') {
            geometry.coordinates.forEach((ele) => {
                ele.forEach((ele) => {
                    //创建数组储存坐标
                    const pointArr = []
                    //创建一个数组储存线形
                    const lineArr = []
                    ele.forEach((coord) => {
                        //把坐标转换为Vector2放在数组里方便创建形状
                        pointArr.push(new THREE.Vector2(coord[0], coord[1]))
                        lineArr.push(coord[0], coord[1], 0)
                    })
                    //创建地图形状
                    const shape = createShape(pointArr)
                    const line = createLine(lineArr)
                    //把形状放入层级模型里
                    shapeGroup.add(shape)
                    lineGroup.add(line)
                    //形状网格模型的名称
                    shape.name = name
                    //模型的中心
                    shape.center=center
                    //如果有名字就进行一个颜色混合
                    if (obj[name]){
                    //根据区域的名称来拿到GDP
                    const gdp = obj[name]
                    //模型的GDP
                    shape.gdp=gdp
                    // console.log(gdp);
                    //拿到GDP的比例
                    const float = gdp / gdpMax
                    //设置区域的颜色
                    const shapeColor = color1.clone().lerp(color2.clone(), float)
                    shape.material.color.copy(shapeColor)
                }
                })

            })

        }
    })
    //通过包围盒获得中心
    const box = new THREE.Box3()
    box.expandByObject(shapeGroup)
    const center = new THREE.Vector3()
    box.getCenter(center)
    console.log(center);

    })


    

})
export {model}
