import * as THREE from 'three'
const spriteArr = []
function createPoint(model){
//利用for循环创建一个精灵图数组,存放一堆精灵图
const material=new THREE.SpriteMaterial()
const textureLoader=new THREE.TextureLoader()
const texture=textureLoader.load('../../../汽车产品展示资源/光点.png')
material.map=texture
for(let i=0;i<5;i++){
const sprite=new THREE.Sprite(material)
sprite.scale.set(30,30,0)
spriteArr.push(sprite)
}
//console.log(spriteArr);
//拿到四个车门
const leftFront=model.getObjectByName('左前门')
const leftBack = model.getObjectByName('左后门')
const rightFront = model.getObjectByName('右前门')
const rightBack=model.getObjectByName('右后门')
const backban=model.getObjectByName('后备箱')
//四个车门模型里每个都存在一个光标的空object,我们可以把光点放入这个空object中方便操作。
leftBack.getObjectByName('左后光标').add(spriteArr[0])
leftFront.getObjectByName('左前光标').add(spriteArr[1])
rightFront.getObjectByName('右前光标').add(spriteArr[2])
rightBack.getObjectByName('右后光标').add(spriteArr[3])
backban.getObjectByName('后备箱光标').add(spriteArr[4])


}
export{createPoint,spriteArr}