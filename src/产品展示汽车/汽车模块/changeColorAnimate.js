import { TWEEN } from "./openCloseAnimation.js"
//创建一个数组储存动画，便于后面拼接动画
let tweenArr=[]
function colorChange(model){
console.log(model);
//创建一个对象，为tween动画库做准备
let color={
    r:0,
    g:1,
    b:0
}
const tween1=new TWEEN.Tween(color).to({
    r:0.502,
    g:0.502,
    b:0.502
},2000).onUpdate((object)=>{
    model.traverse((obj) => {
        if (obj.isMesh && obj.name.slice(0, 2) === '外壳') {
            obj.material = obj.material.clone()
            obj.material.color.set(object.r, object.g, object.b)
        }
    })
})
const tween2 = new TWEEN.Tween(color).to({
        r: 0.502,
        g: 0.502,
        b: 0.502
    }, 2000).onUpdate((object) => {
        model.traverse((obj) => {
            if (obj.isMesh && obj.name.slice(0, 2) === '外壳') {
                obj.material = obj.material.clone()
                obj.material.color.set(object.r, object.g, object.b)
            }
        })
    })
const tween3 = new TWEEN.Tween(color).to({
        r: 1,
        g: 0,
        b: 0
    }, 2000).onUpdate((object) => {
    model.traverse((obj) => {
            if (obj.isMesh && obj.name.slice(0, 2) === '外壳') {
                obj.material = obj.material.clone()
                obj.material.color.set(object.r, object.g, object.b)
            }
        })
})
const tween4 = new TWEEN.Tween(color).to({
        r: 1,
        g: 0,
        b: 0
    }, 2000).onUpdate((object) => {
        model.traverse((obj) => {
            if (obj.isMesh && obj.name.slice(0, 2) === '外壳') {
                obj.material = obj.material.clone()
                obj.material.color.set(object.r, object.g, object.b)
            }
        })
    })
const tween5 = new TWEEN.Tween(color).to({
        r: 0,
        g: 0,
        b: 0
    }, 2000).onUpdate((object) => {
        model.traverse((obj) => {
            if (obj.isMesh && obj.name.slice(0, 2) === '外壳') {
                obj.material = obj.material.clone()
                obj.material.color.set(object.r, object.g, object.b)
            }
        })
    })
const tween6 = new TWEEN.Tween(color).to({
        r: 0,
        g: 0,
        b: 0
    }, 2000).onUpdate((object) => {
        model.traverse((obj) => {
            if (obj.isMesh && obj.name.slice(0, 2) === '外壳') {
                obj.material = obj.material.clone()
                obj.material.color.set(object.r, object.g, object.b)
            }
        })
    })
const tween7 = new TWEEN.Tween(color).to({
        r: 1,
        g: 1,
        b: 1
    }, 2000).onUpdate((object) => {
        model.traverse((obj) => {
            if (obj.isMesh && obj.name.slice(0, 2) === '外壳') {
                obj.material = obj.material.clone()
                obj.material.color.set(object.r, object.g, object.b)
            }
        })
    })
const tween8 = new TWEEN.Tween(color).to({
        r: 1,
        g: 1,
        b: 1
    }, 2000).onUpdate((object) => {
        model.traverse((obj) => {
            if (obj.isMesh && obj.name.slice(0, 2) === '外壳') {
                obj.material = obj.material.clone()
                obj.material.color.set(object.r, object.g, object.b)
            }
        })
    })
tweenArr=[tween1,tween2,tween3,tween4,tween5,tween6,tween7,tween8]
 for(let i=0;i<tweenArr.length-1;i++){
     tweenArr[i].chain(tweenArr[i+1])
}
return tween1
}
export {
colorChange
}