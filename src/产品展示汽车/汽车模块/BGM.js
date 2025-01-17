import * as THREE from 'three'
// 初始化一个监听
const audioListener = new THREE.AudioListener();
// 初始化音频对象
const backGround = new THREE.Audio(audioListener);
// 初始化一个加载器
const loader = new THREE.AudioLoader();
// 加载资源
loader.load('/../汽车产品展示资源/声音/背景.mp3',(audioBuffer)=>{
        // 给一个加载器对象设置音频对象的缓存
        backGround.setBuffer(audioBuffer);
    },



);

export {backGround}