import { renderer } from "./renderer"
import { scene } from "./scene"
import { camera } from "./camera"
function loop() {
    renderer.render(scene, camera)
    requestAnimationFrame(loop)
}
loop()
window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
     camera.aspect = window.innerWidth / window.innerHeight
     camera.updateProjectionMatrix()
}
export { renderer }