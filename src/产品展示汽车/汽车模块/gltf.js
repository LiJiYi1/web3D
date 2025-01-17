import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three'
import { createPoint } from './createPoints.js';
import { closeOpen } from './closeOpenDoor.js';
import { lensflare1,lensflare2 } from './light.js';
const loader=new GLTFLoader()
const model=new THREE.Group()
//纹理加载器
const textureLoader=new THREE.TextureLoader()
//环境纹理贴图加载器
const cubeTexture = new THREE.CubeTextureLoader().setPath('../../../环境贴图/环境贴图2/').load([
        'px.jpg',
        'nx.jpg',
        'py.jpg',
        'ny.jpg',
        'pz.jpg',
        'nz.jpg'
    ]);
//创建一个包围盒来测模型大小
const BOX=new THREE.Box3()
loader.load('../../../汽车产品展示资源/gltf/轿车.glb',(gltf)=>{
    //用包围盒看一下模型的大小。
    BOX.expandByObject(gltf.scene)
    // console.log(BOX);
    gltf.scene.traverse((obj)=>{
        //console.log(obj.name);
        
           if(obj.isMesh){//console.log(obj.name);
            //给轮胎设置法线贴图
            if(obj.name.slice(0,2)==='轮胎'){
                // console.log(obj.material);
                obj.material.normalMap=textureLoader.load('../../../汽车产品展示资源/没有办法导出法线贴图的轿车/Tyre_Normal.png')   
            }
            //金属材质设置金属度和粗糙度
            if(obj.name.slice(0,4)==='高光金属'){
                //console.log(obj.material);
                obj.material.metalness = 1
                obj.material.roughtness = 0.2
            }
            //设置后视镜反光效果
            if (obj.name.slice(0,3)==='后视镜'){
                obj.material=new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    metalness:1,
                    roughness:0,
                    envMap: cubeTexture,
                    envMapIntensity:1
                })
             }
            //给车壳设置清漆层
            if (obj.name.slice(0, 2) === '外壳'){
                 obj.material=new THREE.MeshPhysicalMaterial({
                    clearcoat:1
                 })
            }
            if (obj.name.slice(0, 2) === '玻璃') {
                   obj.material = new THREE.MeshPhysicalMaterial({
                       transmission: 1,
                       ior:1
                   })
            }
            obj.material.envMap = cubeTexture
            obj.material.envMapIntensity = 1
        }
        //车的颜色设置为绿色
        if (obj.isMesh && obj.name.slice(0, 2) === '外壳') {
            obj.material = obj.material.clone()
            obj.material.color.set(0, 1, 0)
        }
    })
   

    model.add(gltf.scene)
   
    //获得两个灯
    const light1 = gltf.scene.getObjectByName('镜头光晕1');
    const light2 = gltf.scene.getObjectByName('镜头光晕2')
    light1.add(lensflare1)
    light2.add(lensflare2)
    
    //通过封装的openClose方法在车门上创建点并且加入模型中正确位置
    //因为模型加载是异步的，所以要写在gltfLoader里面不然加载不出来
    createPoint(model)
    //控制车门开关的函数
    closeOpen(model)
})

export {model}