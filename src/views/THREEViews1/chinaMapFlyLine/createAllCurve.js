import * as THREE from 'three'
import { createCurve } from './createCurve'
function createAllCurve(chooseName,chooseCenter,num){
    const curveGroup=new THREE.Group()
    //加载数据
    const Loader = new THREE.FileLoader()
    Loader.setResponseType('json')
    Loader.load('../../../地图大屏可视化资源/china.json', (data) => {
        // console.log(data.features);
        data.features.forEach(ele => {
            //  console.log(ele.properties);
            //拿到属性
            const properties = ele.properties
            //拿到名称
            const name = properties.name
            //拿到中心
            const center = properties.cp
            //拿到没被选中的数量
            const numNoChoose = properties.childNum
            //如果他的名字不是我们选中省份的名字我们就创建柱子
            if (name !== chooseName) {
                // console.log(chooseCenter);
                const curve = createCurve(center, chooseCenter,(numNoChoose+num)/8)
                curveGroup.add(curve)
            }

        });

    })
return curveGroup
}
export {createAllCurve}