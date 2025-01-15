import * as THREE from 'three'
import { earth } from './earth'
import { boarder } from './boarder'
import { Mesh } from './createMesh/countryMesh'
import { createAllCurve } from './createCurve/createAllCurve'
import { labelGroup } from './createLabel/createAllLabel'
import { ZHUI } from './createZHUI'
const model=new THREE.Group()
//把创建的地球加入层级模型中
model.add(earth)
//把边界线加入地球层级模型中
model.add(boarder)
//把国家的网格模型加入层级中
model.add(Mesh)
//把曲线加入层级模型中
const curve = createAllCurve('中国', [116.20, 39.55])
model.add(curve)
//把标注加入层级中
model.add(labelGroup)
//起始点标注棱锥加入模型中
model.add(ZHUI)
export {model}
