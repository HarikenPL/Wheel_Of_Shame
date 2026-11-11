const assert=require('node:assert/strict');
const {WheelAudio}=require('../app/audio.js');
function mock({badSample=false,blocked=false}={}){
 const nodes=[];const param=()=>({setValueAtTime(){},exponentialRampToValueAtTime(){},linearRampToValueAtTime(){}});
 const ctx={state:'suspended',currentTime:10,destination:{},async resume(){if(!blocked)this.state='running'},async decodeAudioData(){if(badSample)throw Error();return {sample:true}},createGain(){return {gain:param(),connect(){return this},disconnect(){}}}};
 const node=type=>{const n={type,frequency:param(),connect(){return this},disconnect(){},start(t){this.started=t},stop(){this.stopped=true}};nodes.push(n);return n};
 ctx.createBufferSource=()=>node('sample');ctx.createOscillator=()=>node('osc');return {ctx,nodes};
}
(async()=>{
 const env=mock(),audio=new WheelAudio('data:audio/wav;base64,AA==',()=>env.ctx);
 assert.equal(await audio.unlock(),true);assert(audio.tick());assert.equal(env.nodes[0].type,'sample');
 audio.reveal();assert.equal(env.nodes.length,4);assert.deepEqual(env.nodes.slice(1).map(n=>n.frequency.value),[523.25,659.25,783.99]);
 audio.stop();assert(env.nodes.every(n=>n.stopped));
 const bad=mock({badSample:true}),fallback=new WheelAudio('data:audio/wav;base64,AA==',()=>bad.ctx);assert(await fallback.unlock());assert(fallback.tick());assert.equal(bad.nodes.length,1,'fallback click exists even if sample decoding fails');
 const blocked=mock({blocked:true}),muted=new WheelAudio('data:audio/wav;base64,AA==',()=>blocked.ctx);assert.equal(await muted.unlock(),false);assert.equal(muted.tick(),false);assert.equal(muted.reveal(),false);
 console.log('PASS: gesture unlock, decoded spin clicks, result cue, mute cancellation and decode/block fallbacks.');
})().catch(e=>{console.error(e);process.exitCode=1});
