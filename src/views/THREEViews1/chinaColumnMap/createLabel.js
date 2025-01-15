import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
function createLabel(name,x,y,z){
    const div = document.createElement('div')
    div.innerHTML = name
    div.style.backgroundColor = 'black'
    div.style.color = 'white'
    div.style.borderRadius = '3px'
    div.style.opacity = '0.7'
    const cssObj = new CSS2DObject(div)
    cssObj.position.set(x,y,z)
    return cssObj
}
export {createLabel}