import * as THREE from 'three'
// 初始化一个监听
const audioListener = new THREE.AudioListener();
// 开门音频
const open = new THREE.Audio(audioListener);
//关门音频
const  close=new THREE.Audio(audioListener)


// 初始化一个加载器
const loader = new THREE.AudioLoader();

// 加载开门资源
loader.load('../../../public/汽车产品展示资源/声音/open.wav',(audioBuffer)=>{
        // 给一个加载器对象设置音频对象的缓存
        open.setBuffer(audioBuffer);
    }
);
//加载关门资源
loader.load('../../../public/汽车产品展示资源/声音/close.wav', (audioBuffer) => {
    // 给一个加载器对象设置音频对象的缓存
    close.setBuffer(audioBuffer);
}
);
export {open,close}