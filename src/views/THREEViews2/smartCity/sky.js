import * as THREE from 'three'
const geometry=new THREE.SphereGeometry(5000,32,16)
const texture=new THREE.TextureLoader().load('../../../智慧城市资源/星空贴图(1).jpg')
texture.wrapS=THREE.RepeatWrapping
texture.wrapT=THREE.RepeatWrapping
texture.repeat.set(3,1)
const material=new THREE.MeshLambertMaterial({
map:texture,
side:THREE.BackSide,
})
const sky=new THREE.Mesh(geometry,material)
sky.position.set(13524770.770778058, 3664150.4907626663, -10)
export {sky}