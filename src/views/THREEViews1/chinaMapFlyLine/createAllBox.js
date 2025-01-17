import * as THREE from 'three'
import { createBox } from './createBox'
function createAllBox(chooseName,num){
const boxGroup = new THREE.Group()
//加载数据
const Loader=new THREE.FileLoader()
Loader.setResponseType('json')
Loader.load('/../地图大屏可视化资源/china.json',(data)=>{
// console.log(data.features);
data.features.forEach(ele => {
    //  console.log(ele.properties);
    //拿到属性
    const properties=ele.properties
    //拿到名称
    const name=properties.name
    //拿到中心
    const center=properties.cp
    //拿到没被选中的数量
    const numNoChoose=properties.childNum
    //如果他的名字不是我们选中省份的名字我们就创建柱子
    if(name!==chooseName){
        // console.log(num);
        const h=(num+numNoChoose)/10
        const box=createBox(h,center[0],center[1])
        boxGroup.add(box)
    }
    
});

})
return boxGroup
}
export {createAllBox}