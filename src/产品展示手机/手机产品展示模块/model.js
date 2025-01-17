import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { camera } from './camera.js';
import { gui } from './scene.js';
// import * as dat from 'dat.gui'
// const gui=new dat.GUI()
const loader=new GLTFLoader()
const model=new THREE.Group()
const BOX=new THREE.Box3()
const textureCube = new THREE.CubeTextureLoader()
    .setPath('../../../手机产品展示资源/cube/MilkyWay/')
    .load(['dark-s_px.jpg', 'dark-s_nx.jpg', 'dark-s_py.jpg', 'dark-s_ny.jpg', 'dark-s_pz.jpg', 'dark-s_nz.jpg']);
const textureLoader=new THREE.TextureLoader()
loader.load('../../../手机产品展示资源/model/手机 copy.glb',(gltf)=>{
const baseTexture = textureLoader.load('../../../手机产品展示资源/model/basecolor.png')
const metalnessTexture = textureLoader.load('../../../手机产品展示资源/model/metallic.png')
const roughnessTexture = textureLoader.load('../../../手机产品展示资源/model/roughness.png')
const normalTexture = textureLoader.load('../../../手机产品展示资源/model/normal.png')
const alphaTexture = textureLoader.load('../../../手机产品展示资源/model/opacity.png')
baseTexture.flipY=false
metalnessTexture.flipY=false
roughnessTexture.flipY=false
normalTexture.flipY=false
alphaTexture.flipY=false
// console.log(gltf.scene);
gltf.scene.traverse((obj)=>{
if(obj.isMesh){
    BOX.expandByObject(obj)
    // console.log(BOX);
    // console.log(obj.material);
    obj.material.map = baseTexture
    obj.material.metalnessMap = metalnessTexture
    obj.material.roughnessMap = roughnessTexture
    obj.material.normalMap =  normalTexture
    obj.material.alphaMap = alphaTexture
    obj.material.envMap = textureCube
    obj.material.envMapIntensity= 1.9
}
})
model.add(gltf.scene)
    // console.log(model.getObjectByName('后置摄像头位置'));
    //获得手机后置摄像头
    const backCamera = model.getObjectByName('后置摄像头位置')
    //获得手机后置摄像头的位置
    const v = new THREE.Vector3()
    backCamera.getWorldPosition(v)
    //创建一个纹理
    const map = textureLoader.load('../../../手机产品展示资源/光点.png')
    //创建一个精灵对象
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: map,
        transparent: true
    }))
    //精灵对象位置设置，大小设置
    sprite.position.copy(v)
    sprite.scale.set(5, 5, 0)
    sprite.position.z -= 2
    sprite.position.x -= 8
    //透明度叠加问题解决。
    sprite.renderOrder = 1
    sprite.name='光点'
    //精灵对象加入模型
    model.add(sprite)

}
)
const light = {
    envMapIntensity: 0,
  
}
const modelRotate={
    rotate: false
}
const timer=setTimeout(()=>{
    gui.add(light, 'envMapIntensity', 0, 400).name('环境贴图强度').onChange((value) => {
        //这里模型换了一个模型，模型不具备PBR材质条件。注意即可。
        model.getObjectByName('华为手机').material.envMapIntensity = value
    })
    clearTimeout(timer)
},1)

const animate=null
// gui.add(modelRotate,'rotate')
//创建圆弧曲线
const curve = new THREE.EllipseCurve(
    0, 0,            // ax, aY
    66, 66,           // xRadius, yRadius
    Math.PI * 5/ 3, Math.PI * 4 / 3,  // aStartAngle, aEndAngle
    false,            // aClockwise
    0                 // aRotation
);
//拿到圆弧的顶点
const points=curve.getPoints(66)
//创建几何体
const geometry=new THREE.BufferGeometry()
geometry.setFromPoints(points)
const material=new THREE.MeshLambertMaterial({
    side:THREE.DoubleSide,
    color: 0x111111
})
const mesh=new THREE.Line(geometry,material)
mesh.rotateX(-Math.PI/2)
mesh.position.y-=75
model.add(mesh)
const fontLoader=new FontLoader()
fontLoader.load('../../../手机产品展示资源/fonts/gentilis_bold.typeface.json',(font)=>{
    // console.log(font);
    const shape= font.generateShapes('HUAWEI C4',10)
    const geometry=new THREE.ShapeGeometry(shape)
    const material=new THREE.MeshLambertMaterial(
        {
            side:THREE.DoubleSide
        }
    )
    const mesh=new THREE.Mesh(geometry,material)
    mesh.position.set(-36.1,-75,59)
    model.add(mesh)


})


export {model,modelRotate,camera}