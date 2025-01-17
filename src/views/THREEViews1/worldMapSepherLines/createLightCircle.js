import * as THREE from 'three'
function createLightCircle(R){
    const map=new THREE.TextureLoader().load('../../../地球大屏可视化资源/地球光圈.png')
    const material = new THREE.SpriteMaterial({ 
        color:0x00ff00,
        map: map })
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(R*3.1,R*3.1,1)
    return  sprite
}
export {createLightCircle}