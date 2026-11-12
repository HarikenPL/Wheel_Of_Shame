/* Replace only the matching file in media/ to change a cue. */
(function(root){'use strict';
class MediaCues{
 constructor(onError=()=>{}){this.onError=onError;this.timers=new Set();this.primed=false;this.pools={};for(const [key,url,count]of [['tick',WL_MEDIA.tick,5],['reveal',WL_MEDIA.reveal,1],['finale',WL_MEDIA.finale,1],['menu',WL_MEDIA.menu,1]]){this.pools[key]=Array.from({length:count},()=>{const a=document.createElement('audio');a.src=url;a.preload='auto';a.loop=false;a.volume=key==='finale'?.55:.85;return a})}this.cursor=0}
 setLevels(v){for(const [key,pool]of Object.entries(this.pools))for(const a of pool)a.volume=v.muted||(key==='menu'?!v.menuEnabled:!v.effects)?0:v[key]}
 async unlock(){if(this.primed)return true;this.primed=true;
 // Priming must not hold up the wheel on slow or unavailable media.
 const pending=Object.values(this.pools).flat().map(async a=>{a.muted=true;try{await a.play();a.pause();a.currentTime=0}catch{}finally{a.muted=false}});
 let timer;try{await Promise.race([Promise.all(pending),new Promise(resolve=>{timer=setTimeout(resolve,350)})])}finally{clearTimeout(timer);for(const a of Object.values(this.pools).flat()){a.pause();a.currentTime=0;a.muted=false}}return true}

 play(key,delay=0){if(delay){const timer=setTimeout(()=>{this.timers.delete(timer);this.play(key)},delay*1000);this.timers.add(timer);return}const pool=this.pools[key];if(!pool)return;const a=pool[key==='tick'?this.cursor++%pool.length:0];a.pause();a.currentTime=0;if(a.volume===0)return;const p=a.play();if(p?.catch)p.catch(()=>{if(key!=='tick')this.onError()})}
 tick(){this.play('tick')}
 reveal(delay=0){this.play('reveal',delay)}
 stop(){for(const timer of this.timers)clearTimeout(timer);this.timers.clear();for(const a of Object.values(this.pools).flat()){a.pause();a.currentTime=0}}
}
root.WLMediaCues=MediaCues;
})(globalThis);
