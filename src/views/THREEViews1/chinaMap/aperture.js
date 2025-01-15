import * as THREE from 'three'
const loader = new THREE.TextureLoader()
const texture = loader.load('../../../public/地图大屏可视化资源/光圈贴图.png')
function createAperture(x, y, z) {
    const plane = new THREE.PlaneGeometry(1.2, 1.2)
    const material = new THREE.MeshBasicMaterial({
        color:0xf00000,
        map: texture,
        transparent: true
    })
    const aperture = new THREE.Mesh(plane, material)
    aperture.position.set(x, y, z)
    return aperture
}
export { createAperture}