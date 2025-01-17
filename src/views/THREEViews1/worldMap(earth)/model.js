import * as THREE from 'three'
import { createLine } from './createLine.js'
import { createShape } from './createShape.js'
const model=new THREE.Group()
const Loader=new THREE.FileLoader()
Loader.setResponseType('json')
Loader.load('../../../地图大屏可视化资源/world.json',(data)=>{
    // console.log(data.features);
    //往下遍历一层
    data.features.forEach((item=>{
        //获得单区和多区
        const type = item.geometry.type
        if (type ==='Polygon'){
            // console.log(item);
            //数组存储边界线的顶点坐标
            const pointArr = []
            //数组存储填充几何体的顶点坐标
            const ShapeArr=[]
            item.geometry.coordinates[0].forEach(coord=>{   
                pointArr.push(coord[0],coord[1],0)
                ShapeArr.push(new THREE.Vector2(coord[0],coord[1]))
                    }
            ) 
            //创建边界线并加入层级模型
            const line = createLine(pointArr)
            //解决深度冲突问题
            line.position.z += 0
            // model.add(line)
            //创建填充shape并加入层级模型
            const shape=createShape(ShapeArr)
            model.add(shape)
        }
        else if (type ==='MultiPolygon'){
            item.geometry.coordinates.forEach(item => {
                item.forEach((item) => {
                    //数组存储边界线的顶点坐标
                    const pointArr = []
                    //数组存储填充几何体的顶点坐标
                    const ShapeArr = []
                    item.forEach((coord)=>{   
                        // console.log(point[0]);
                        pointArr.push(coord[0], coord[1], 0)
                        ShapeArr.push(new THREE.Vector2(coord[0], coord[1]))
                    })
                    //创建边界线并加入层级模型
                    const line = createLine(pointArr)
                    // model.add(line)
                    //解决深度冲突问题
                    line.position.z += 0
                    //创建填充shape并加入层级模型
                    const shape = createShape(ShapeArr)
                    model.add(shape)
                })
            
            })
      
        }
       
    }))
    const box=new THREE.Box3()
    box.expandByObject(model)
    //获得地图大小
    // const size=new THREE.Vector3()
    // box.getSize(size)
    // console.log('size',size);
    //获得地图中心
    // const center = new THREE.Vector3()
    // box.getCenter(center)
    // console.log('center', center);
    
})
export {model}