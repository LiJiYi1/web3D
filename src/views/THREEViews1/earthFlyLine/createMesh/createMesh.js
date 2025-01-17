import * as THREE from 'three'
import { tranglePou } from './tranglePou'
import { transform } from '../transform'
import { betterIndex } from './betterIndex'
import config from '../config'
//创建一个层级模型存储创造的网格模型
const meshGroup=new THREE.Group()
const Loader = new THREE.FileLoader()
Loader.setResponseType('json')
const data =await Loader.loadAsync('/地球大屏可视化资源/worldZh.json')
function createMesh(){
    const features=data.features
    features.forEach(e=>{
        const geometry=e.geometry
        const type=geometry.type
        const coordinates=geometry.coordinates
        if(type==='Polygon'){
            //创建一个数组存储边界
            const pointArr=[]
            coordinates[0].forEach(e=>{
              pointArr.push(e)
            })
            //三角剖分返回的索引和顶点
            const trangleObj=tranglePou(pointArr)
            //拿到三角剖分后的索引
            const Index=trangleObj.index
            //拿到三角剖分后的顶点
            const arr=trangleObj.arr
            //创建数组存储坐标转换后的顶点
            const coord=[]
            //顶点进行坐标转换
            for(let i=0;i<arr.length;i+=2){
                const pos=transform(config.R,arr[i],arr[i+1])
                coord.push(pos.x,pos.y,pos.z)
            }
            const RealIndex = betterIndex(Index, arr, pointArr)
            //根据索引和顶点创建Mesh网格模型
            const geometry=new THREE.BufferGeometry()
            geometry.attributes.position=new THREE.BufferAttribute(new Float32Array(coord),3)
            geometry.index=new THREE.BufferAttribute(new Uint16Array(RealIndex),1)
            const material=new THREE.MeshBasicMaterial({
                color:0x880000,
                side:THREE.BackSide,
                //wireframe:true
            })
            const mesh=new THREE.Mesh(geometry,material)
            meshGroup.add(mesh)
            
        }
        else if(type==='MultiPolygon'){
           coordinates.forEach(e=>{
            e.forEach((e)=>{
                const pointArr=[]
                e.forEach((e)=>{
                   pointArr.push(e)          
                })
                const trangleObj=tranglePou(pointArr)
                const arr=trangleObj.arr
                const index=trangleObj.index
                const RealIndex=betterIndex(index,arr,pointArr)
                //把坐标进行坐标转换并放入数组
                const coord=[]
                for(let i=0;i<arr.length;i+=2){
                    const pos=transform(config.R,arr[i],arr[i+1])
                    coord.push(pos.x,pos.y,pos.z)
                }
                //根据索引和顶点创建Mesh网格模型
                const geometry = new THREE.BufferGeometry()
                geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(coord), 3)
                geometry.index = new THREE.BufferAttribute(new Uint16Array(RealIndex), 1)
                const material = new THREE.MeshBasicMaterial({
                    color: 0x880000,
                    side: THREE.BackSide,
                    // wireframe: true
                })
                const mesh = new THREE.Mesh(geometry, material)
                meshGroup.add(mesh)
                
            })
            
           })

        }
        
    })
    

    return meshGroup
}
export {createMesh}