import { createCurve } from "./createCurve";
import * as THREE from 'three'
const Loader = new THREE.FileLoader()
const curves=new THREE.Group()
curves.name='曲线'
Loader.setResponseType('json')
const data = await Loader.loadAsync('../../../../地球大屏可视化资源/首都经纬度.json')
function createAllCurve(name,pos){
for(let key in data){
    // console.log(key,data[key]);
    if(key!==name){
        const curve = createCurve(pos, data[key])
        curves.add(curve)
    }
    
}
// console.log(data);
return curves
}
export {createAllCurve}