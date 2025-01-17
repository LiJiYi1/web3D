import * as THREE from 'three'
import { createLabel } from './createLabel'
const Loader=new THREE.FileLoader()
Loader.setResponseType('json')
const labelGroup=new THREE.Group()
labelGroup.name='标注'
const data = await Loader.loadAsync('../../../../地球大屏可视化资源/首都经纬度.json')
//console.log(data);
for(let key in data ){
//console.log(data[key]);
const label=createLabel(data[key])
labelGroup.add(label)
}

export {labelGroup}