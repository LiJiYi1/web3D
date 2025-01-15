import * as THREE from 'three'
import{water} from './createWater'
import{cityGroup} from './createCity'
import { wall } from './createWall'
import { landGroup } from './land';
import { fly } from './fly';
import { lineGroup } from './road';
import { sky } from './sky';
import { hotGroup } from './hot';
import { fireGroup } from './fireAnimation';
//创建跟层级储存所有模型
const model=new THREE.Group()
//把水体加入层级模型中
model.add(water)
//把城市加入层级模型中
model.add(cityGroup)
//把围墙加入层级模型中
model.add(wall)
//把城市地面加入层级模型中
model.add(landGroup)
//把无人机加入层级模型中
model.add(fly)
//把道路加入层级模型中
model.add(lineGroup);
//天空盒加入层级模型中
model.add(sky)
//把热点标注加入层级模型中
model.add(hotGroup)
//把火焰加入层级模型中
model.add(fireGroup)
export {model}
