import * as THREE from 'three'
import { Lensflare,LensflareElement } from 'three/addons/objects/Lensflare.js';
//获得光晕贴图
const textureLoader = new THREE.TextureLoader();
const textureFlare0 = textureLoader.load("../../../public/汽车产品展示资源/lensflare.jpg");
//创建两个光晕对象
const lensflare1 = new Lensflare();
lensflare1.addElement(new LensflareElement(textureFlare0, 512, 0));
const lensflare2 = new Lensflare();
lensflare2.addElement(new LensflareElement(textureFlare0, 512, 0));
//隐藏两个光晕
 lensflare1.visible=false
 lensflare2.visible=false
//车灯开关方法
function openLight(){
    lensflare1.visible = true
    lensflare2.visible = true
}
function closeLight(){
    lensflare1.visible = false
    lensflare2.visible = false
}
export {
    openLight,
    closeLight,
    lensflare1,
    lensflare2
}