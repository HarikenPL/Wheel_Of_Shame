(function(root){'use strict';
// Music is allowed only on the main menu; sound effects are independent.
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
  constructor(sample,factory=()=>new (root.AudioContext||root.webkitAudioContext)()){
    this.sample=sample;this.factory=factory;this.ctx=null;this.buffer=null;this.decode=null;this.nodes=new Set();
  }
  async unlock(){
    try{
      this.ctx=this.ctx||this.factory();
      const resumed=this.ctx.resume();
      if(!this.decode){
        const raw=atob(this.sample.split(',')[1]);
        this.decode=this.ctx.decodeAudioData(Uint8Array.from(raw,c=>c.charCodeAt(0)).buffer).then(b=>{this.buffer=b}).catch(()=>{});
      }
      // A blocked audio device must not stall a character roll.
      let timer;
      try{await Promise.race([Promise.all([resumed,this.decode]),new Promise(resolve=>{timer=setTimeout(resolve,400)})])}
      finally{clearTimeout(timer)}
      return this.ctx.state==='running';
    }catch{return false}
  }
  track(node,gain){this.nodes.add(node);node.onended=()=>{this.nodes.delete(node);node.disconnect();gain.disconnect()}}
  tick(){
    if(this.ctx?.state!=='running')return false;
    const c=this.ctx,g=c.createGain(),at=c.currentTime;g.connect(c.destination);
    if(this.buffer){const s=c.createBufferSource();s.buffer=this.buffer;g.gain.value=.85;s.connect(g);this.track(s,g);s.start(at)}
    else{const o=c.createOscillator();o.type='triangle';o.frequency.setValueAtTime(1100,at);o.frequency.exponentialRampToValueAtTime(220,at+.035);g.gain.setValueAtTime(.12,at);g.gain.exponentialRampToValueAtTime(.001,at+.045);o.connect(g);this.track(o,g);o.start(at);o.stop(at+.05)}
    return true;
  }
  reveal(delay=0){
    if(this.ctx?.state!=='running')return false;
    const c=this.ctx,at=c.currentTime+delay;
    // Original three-note result cue, independent of menu music.
    for(const [i,f]of [523.25,659.25,783.99].entries()){
      const o=c.createOscillator(),g=c.createGain(),t=at+i*.085;o.type='sine';o.frequency.value=f;
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.12,t+.008);g.gain.exponentialRampToValueAtTime(.001,t+.32);
      o.connect(g).connect(c.destination);this.track(o,g);o.start(t);o.stop(t+.34);
    }return true;
  }
  stop(){for(const n of this.nodes){try{n.stop()}catch{}}}
}
root.WLWheelAudio=WheelAudio;
if(typeof module!=='undefined')module.exports.WheelAudio=WheelAudio;
})(globalThis);
