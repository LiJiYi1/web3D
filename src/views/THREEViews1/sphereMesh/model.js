import * as THREE from 'three'
import { createBoarder } from './createBoarder'
import { trangleIndex } from './trangleIndex'
import { betterIndex } from './betterIndex'
import { transform } from './transform'
import { createMesh } from './createMesh'
import { createBox } from './createBox'
const model=new THREE.Group()
const meshGroup=new THREE.Group()
meshGroup.name='Mesh'
model.add(meshGroup)
const boxGroup=new THREE.Group()
model.add(boxGroup)
//创建地球球体
const R=100
const sphereGeometry=new THREE.SphereGeometry(R,32,32)
const matrial=new THREE.MeshLambertMaterial()
const sphere=new THREE.Mesh(sphereGeometry,matrial)
model.add(sphere)
//加载数据,相当于Ajax请求
const loader = new THREE.FileLoader()
loader.setResponseType('json')
loader.load('../../../public/地球大屏可视化资源/worldZh.json', (data1) => {
    //创建两个颜色用户颜色混合
    const color1=new THREE.Color(1,0.9,0.9)
    const color2=new THREE.Color(1,0,0)
    //加载GDP数据
    loader.load('../../../public/地球大屏可视化资源/gdp.json',(data)=>{
    loader.load('../../../public/地球大屏可视化资源/首都经纬度.json',(data2)=>{
        //创建位置对象
        const posObj=data2
        //创建gdp对象
        const obj = {}
        //解析数据
        data.Root.data.record.forEach(e => {
            const name = e.field[0].text
            const gdp = e.field[3].text
            if (gdp) {
                obj[name] = parseInt(gdp)
            }
        })
        const max = obj['美国']
        //创建国家边界线
        const border = createBoarder(data1, R)
        //边界线加入模型之中
        model.add(border)
        const features = data1.features
        features.forEach((e) => {
            const geometry = e.geometry
            const type = geometry.type
            const name = e.properties.nameZh
            const coordinates = geometry.coordinates
            if (type === 'Polygon') {
                //创建一个数组以数组的形式存储顶点
                const pointArr = []
                //储存转换后的球面顶点
                const points = []
                coordinates[0].forEach(e => {
                    //三角剖分要的是x,y坐标,所以pointArr只要两个坐标
                    pointArr.push([e[0], e[1]])
                    const coord = transform(R + 0.3, e[0], e[1])
                    points.push(e[0], e[1], 110)
                })
                //调用三角剖分函数拿到剖分后的索引
                const index = trangleIndex(pointArr).delaunay
                //拿到所有点的数组
                const AllArr = trangleIndex(pointArr).AllArr
                const arr = []
                for (let i = 0; i < AllArr.length; i += 2) {
                    //把点的坐标转换一下
                    const coord = transform(R + 0.3, AllArr[i], AllArr[i + 1])
                    arr.push(coord.x, coord.y, coord.z)
                }
                //最终用于渲染的索引
                const finalIndex = betterIndex(index, AllArr, pointArr)
                //console.log(finalIndex);
                //用最终的索引和顶点创建几何体
                const mesh = createMesh(finalIndex, arr)
                //通过GDP获得颜色
                const Color = color1.clone().lerp(color2.clone(), obj[name] * 3 / max)
                mesh.material.color.copy(Color)
                mesh.name = name
                const center=posObj[name]
                console.log(center);
                
                if(obj[name]&&center){
                const box = createBox(obj[name]/182000000000/2, Color,center[0],center[1])
                boxGroup.add(box)}
                meshGroup.add(mesh)
            }
            else if (type === 'MultiPolygon') {
                coordinates.forEach(e => {
                    e.forEach((e) => {
                        const pointArr = []
                        const points = []
                        e.forEach(e => {
                            //三角剖分要的是x,y坐标,所以pointArr只要两个坐标
                            pointArr.push([e[0], e[1]])
                            const coord = transform(R + 0.3, e[0], e[1])
                            points.push(e[0], e[1], 110)
                        })
                        //调用三角剖分函数拿到剖分后的索引
                        const index = trangleIndex(pointArr).delaunay
                        //拿到所有点的数组
                        const AllArr = trangleIndex(pointArr).AllArr
                        const arr = []
                        for (let i = 0; i < AllArr.length; i += 2) {
                            const coord = transform(R + 0.3, AllArr[i], AllArr[i + 1])
                            arr.push(coord.x, coord.y, coord.z)
                        }
                        //最终用于渲染的索引
                        const finalIndex = betterIndex(index, AllArr, pointArr)
                        // console.log(finalIndex);
                        //用最终的索引和顶点创建几何体
                        const mesh = createMesh(finalIndex, arr)
                        mesh.name = name
                        
                        //通过GDP获得颜色
                        if (obj[name]) {
                            const Color = color1.clone().lerp(color2.clone(), obj[name] * 3 / max)
                            mesh.material.color.copy(Color)
                            const center = posObj[name]
                            const box = createBox(obj[name] / 182000000000/2, Color, center[0], center[1])
                            boxGroup.add(box)
                        }
                        else { mesh.material.color.set(1, 1, 1) }

                        meshGroup.add(mesh)
                    })
                })
            }
        })

    })


    })
 



})
export {model}