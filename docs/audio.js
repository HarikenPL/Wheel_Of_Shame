(function(root){'use strict';
// Menu music never plays during a roll. Audio media can be replaced in media/.
class MenuMusic {
  constructor(element,onChange=()=>{}){this.element=element;this.onChange=onChange;this.enabled=false;this.allowed=false;this.visible=true;this.blocked=false;this.pending=false;this.volume=.3;element.loop=true;element.volume=this.volume}
  get wantsPlayback(){return this.enabled&&this.allowed&&this.visible&&this.volume>0}
  get playing(){return this.wantsPlayback&&!this.element.paused}
  setEnabled(value){this.enabled=!!value;return this.sync()}
  setVolume(value){this.volume=Math.min(1,Math.max(0,Number(value)||0));this.element.volume=this.volume;return this.sync()}
  setContext(allowed,visible=true){this.allowed=!!allowed;this.visible=!!visible;return this.sync()}
  async sync(){
    if(!this.wantsPlayback){this.element.pause();this.element.currentTime=0;this.blocked=false;this.onChange();return}
    if(this.pending||!this.element.paused){this.onChange();return}
    this.pending=true;this.blocked=false;
    try{await this.element.play();if(!this.wantsPlayback){this.element.pause();this.element.currentTime=0}}
    catch{if(this.wantsPlayback)this.blocked=true}
    finally{this.pending=false;this.onChange()}
  }
}
root.WLMenuMusic=MenuMusic;
if(typeof module!=='undefined')module.exports=MenuMusic;

class WheelAudio {
  // Existing two-argument calls remain supported. File URLs work on GitHub Pages;
  // embedded data URLs keep the single-file local build functional.
  constructor(sample,factory=()=>new (root.AudioContext||root.webkitAudioContext)(),resultSample=null,fallbacks={}){
    this.sample=sample;this.resultSample=resultSample;this.fallbacks=fallbacks;
    this.factory=factory;this.ctx=null;this.buffer=null;this.resultBuffer=null;
    this.decode=null;this.resultDecode=null;this.nodes=new Set();
  }
  async load(source,fallback){
    const decode=async uri=>{
      let raw;
      if(uri.startsWith('data:')){
        const bytes=atob(uri.split(',')[1]);
        raw=Uint8Array.from(bytes,c=>c.charCodeAt(0)).buffer;
      }else{
        const response=await fetch(uri,{cache:'no-store'});
        if(!response.ok)throw Error('Cannot load audio asset: '+uri);
        raw=await response.arrayBuffer();
      }
      return this.ctx.decodeAudioData(raw);
    };
    try{return await decode(source)}
    catch{
      if(fallback&&fallback!==source){try{return await decode(fallback)}catch{}}
      return null;
    }
  }
  async unlock(){
    try{
      this.ctx=this.ctx||this.factory();
      const resumed=this.ctx.resume();
      if(!this.decode){
        this.decode=this.load(this.sample,this.fallbacks.tick).then(b=>{this.buffer=b});
      }
      if(this.resultSample&&!this.resultDecode){
        this.resultDecode=this.load(this.resultSample,this.fallbacks.reveal).then(b=>{this.resultBuffer=b});
      }
      let timer;
      try{await Promise.race([
        Promise.all([resumed,this.decode,this.resultDecode||Promise.resolve()]),
        new Promise(resolve=>{timer=setTimeout(resolve,400)})
      ])}finally{clearTimeout(timer)}
      return this.ctx.state==='running';
    }catch{return false}
  }
  track(node,gain){this.nodes.add(node);node.onended=()=>{this.nodes.delete(node);node.disconnect();gain.disconnect()}}
  playBuffer(buffer,volume,at){
    const c=this.ctx,g=c.createGain(),s=c.createBufferSource();s.buffer=buffer;
    g.gain.value=volume;s.connect(g);g.connect(c.destination);this.track(s,g);s.start(at);return true;
  }
  tick(){
    if(this.ctx?.state!=='running')return false;
    const c=this.ctx,at=c.currentTime;
    if(this.buffer)return this.playBuffer(this.buffer,.85,at);
    const g=c.createGain(),o=c.createOscillator();g.connect(c.destination);
    o.type='triangle';o.frequency.setValueAtTime(1100,at);o.frequency.exponentialRampToValueAtTime(220,at+.035);
    g.gain.setValueAtTime(.12,at);g.gain.exponentialRampToValueAtTime(.001,at+.045);
    o.connect(g);this.track(o,g);o.start(at);o.stop(at+.05);return true;
  }
  reveal(delay=0){
    if(this.ctx?.state!=='running')return false;
    const c=this.ctx,at=c.currentTime+delay;
    if(this.resultBuffer)return this.playBuffer(this.resultBuffer,.85,at);
    // Backward-compatible synthesized cue if the custom file is unavailable.
    for(const [i,f]of [523.25,659.25,783.99].entries()){
      const o=c.createOscillator(),g=c.createGain(),t=at+i*.085;o.type='sine';o.frequency.value=f;
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.12,t+.008);
      g.gain.exponentialRampToValueAtTime(.001,t+.32);
      o.connect(g).connect(c.destination);this.track(o,g);o.start(t);o.stop(t+.34);
    }return true;
  }
  stop(){for(const n of this.nodes){try{n.stop()}catch{}}}
}
root.WLWheelAudio=WheelAudio;
if(typeof module!=='undefined')module.exports.WheelAudio=WheelAudio;
})(globalThis);
