/* Pure archive policy; never acts on active characters. */
(function(root){'use strict';
const DAY=86400000,defaults=()=>({enabled:false,everyDays:7,olderDays:30,keepNewest:50,maxDelete:100,lastRun:0});
function policy(p){const d=defaults();d.enabled=p?.enabled===true;for(const [k,min,max]of [['everyDays',1,365],['olderDays',0,3650],['keepNewest',0,5000],['maxDelete',1,5000]])if(Number.isInteger(p?.[k]))d[k]=Math.max(min,Math.min(max,p[k]));if(Number.isFinite(p?.lastRun)&&p.lastRun>=0)d.lastRun=p.lastRun;return d}
function candidates(chars,p,now=Date.now()){p=policy(p);return chars.filter(c=>c.deleted).sort((a,b)=>(Date.parse(b.deletedAt)||now)-(Date.parse(a.deletedAt)||now)).slice(p.keepNewest).filter(c=>Number.isFinite(Date.parse(c.deletedAt))&&now-Date.parse(c.deletedAt)>=p.olderDays*DAY).reverse().slice(0,p.maxDelete)}
function due(p,now=Date.now()){p=policy(p);return p.enabled&&now-p.lastRun>=p.everyDays*DAY}
function migrate(state,now=Date.now()){
 let changed=false;const stamp=new Date(now).toISOString();for(const c of state.characters)if(c.deleted&&!Number.isFinite(Date.parse(c.deletedAt))){c.deletedAt=stamp;changed=true}
 if(!state.archivePolicy){state.archivePolicy=defaults();changed=true}
 if(!state.migrations?.general038){
  for(const s of state.config.seasons){s.universe={id:'general',pl:'Uniwersum ogólne',en:'General Universe'};const w=s.wheels.find(w=>w.id==='alignment');if(w?.options.some(o=>o.id==='anti_hero')){w.options=w.options.filter(o=>o.id!=='anti_hero');WLEngine.normalize(w.options);s.revision++}}
  state.migrations={...state.migrations,general038:true};changed=true;
 }return changed;
}
root.WLArchive={defaults,policy,candidates,due,migrate};
})(globalThis);
