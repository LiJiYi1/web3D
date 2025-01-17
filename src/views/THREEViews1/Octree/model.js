import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//引入八叉树扩展库
import { Octree } from 'three/addons/math/Octree.js'
//引入可视化八叉树扩展库
import { OctreeHelper } from 'three/addons/helpers/OctreeHelper.js'
const Loader=new GLTFLoader()
const model=new THREE.Group()
Loader.load('../../../几何计算资源/地形.glb',(gltf)=>{
model.add(gltf.scene)
    //实例化八叉树
    const tree = new Octree()
    //把模型进行八叉树划分
    // console.log(model.children[0]);
    const boxs = tree.fromGraphNode(model.children[0])
    // console.log(boxs);
    //实例化可视化八叉树,并加入场景
    const boxVisible = new OctreeHelper(boxs)
    model.add(boxVisible)
})
export{model}