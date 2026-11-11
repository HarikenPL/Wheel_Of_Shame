/* Pure rules engine shared by the browser and tests. */
(function(root){'use strict';
const clone=x=>JSON.parse(JSON.stringify(x));
const id=()=>typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
const enabled=w=>w&&w.enabled!==false;
const active=w=>w.options.filter(o=>o.enabled!==false&&o.chance>0);
const wheel=(c,key)=>c.season.wheels.find(w=>w.id===key);
const result=(c,key)=>c.results.find(r=>r.key===key);
const races=c=>{const r=result(c,'race');return r?.option.id==='hybrid'?['race_1','race_2'].map(k=>result(c,k)?.option.id).filter(Boolean):r?[r.option.id]:[]};
function powers(c){const out=[];const seen=new Set();for(const r of c.results){if(r.option.grant){const p=wheel(c,'powers')?.options.find(o=>o.id===r.option.grant);if(p&&!seen.has(p.id)){out.push({option:p,key:'innate_'+p.id,innate:true});seen.add(p.id)}}if(r.wheelId==='powers'&&!seen.has(r.option.id)){out.push({option:r.option,key:r.key,innate:false});seen.add(r.option.id)}}return out}
function triggered(c,w){if(!w.source)return true;const ids=w.source==='race'?races(c):c.results.filter(r=>r.wheelId===w.source).map(r=>r.option.id);return w.triggers.some(t=>ids.includes(t))}
function steps(c){const out=[];const add=(w,key=w.id,filter=()=>true,extra={})=>{if(enabled(w))out.push({key,wheelId:w.id,pl:w.pl,en:w.en,color:w.color,pool:active(w).filter(filter),...extra})};
for(const w of c.season.wheels){if(!enabled(w)||w.mode!=='main'||!triggered(c,w))continue;
if(w.id==='powers'){
 const n=result(c,'power_count')?.option.count||0;
 for(let i=0;i<n;i++){const key='power_'+i;const used=new Set(powers(c).filter(p=>p.innate||Number(p.key.split('_')[1])<i).map(p=>p.option.id));add(w,key,o=>!used.has(o.id),{ordinal:i+1})}
}else if(w.id==='mastery'){
 for(const p of powers(c))add(w,'mastery_'+p.key,()=>true,{suffix:p.option});
}else if(w.id==='size'&&races(c).some(r=>['giant','dragon'].includes(r))&&enabled(wheel(c,'size_large'))){add(wheel(c,'size_large'),'size')}
else if(w.id==='weakness'){add(w,w.id,o=>!o.requiresPower||powers(c).length>0)}
else{add(w)}
if(w.id==='race'&&result(c,'race')?.option.id==='hybrid'){
 add(w,'race_1',o=>o.id!=='hybrid',{ordinal:1});add(w,'race_2',o=>o.id!=='hybrid'&&o.id!==result(c,'race_1')?.option.id,{ordinal:2});
}
for(const branch of c.season.wheels.filter(b=>b.mode==='branch'&&b.source===w.id&&triggered(c,b)))add(branch);
}return out}
function next(c){for(const s of steps(c)){if(!result(c,s.key)&&s.pool.length)return s}return null}
function choose(pool,rng=Math.random){const total=pool.reduce((a,o)=>a+o.chance,0);if(total<=0)throw Error('Empty pool');let n=rng()*total;for(const o of pool){n-=o.chance;if(n<0)return o}return pool.at(-1)}
function roll(c,rng=Math.random){const s=next(c);if(!s)throw Error('Finished');const o=choose(s.pool,rng);const r={key:s.key,wheelId:s.wheelId,pl:s.pl,en:s.en,suffix:s.suffix?clone(s.suffix):null,ordinal:s.ordinal||null,option:clone(o),at:new Date().toISOString(),pool:clone(s.pool),color:s.color};c.results.push(r);c.reveal=true;if(!next(c))c.completedAt=new Date().toISOString();return r}
function newCharacter(season,name,owner,guestId){return {id:id(),name,owner,guestId,season:clone(season),results:[],createdAt:new Date().toISOString(),completedAt:null,reveal:false,deleted:false}}
function normalize(options){const sum=options.reduce((a,o)=>a+(o.enabled===false?0:Math.max(0,Number(o.chance)||0)),0);const on=options.filter(o=>o.enabled!==false);if(!on.length)throw Error('At least one enabled option is required');on.forEach(o=>o.chance=+(sum?Math.max(0,Number(o.chance)||0)/sum*100:100/on.length).toFixed(6));on.at(-1).chance=+(on.at(-1).chance+100-on.reduce((a,o)=>a+o.chance,0)).toFixed(6);options.filter(o=>o.enabled===false).forEach(o=>o.chance=0);return options}
function validateSeason(s){const errors=[];if(!s||!s.id||!s.pl?.trim()||!s.en?.trim()||!Array.isArray(s.wheels)||!s.wheels.length)return ['Season: PL, EN and wheels are required.'];const ids=new Set();if(s.wheels.length>80)errors.push('Maximum 80 wheels.');for(const w of s.wheels){if(!w.id||ids.has(w.id))errors.push('Duplicate wheel ID.');ids.add(w.id);if(!w.pl?.trim()||!w.en?.trim())errors.push(w.id+': PL + EN required.');if(!/^#[0-9a-f]{6}$/i.test(w.color||''))errors.push(w.id+': invalid color.');if(!['main','branch','pool'].includes(w.mode))errors.push(w.id+': invalid mode.');if(!Array.isArray(w.options)||w.options.length>250){errors.push(w.id+': invalid options.');continue}const oi=new Set();for(const o of w.options){if(!o.id||oi.has(o.id))errors.push(w.id+': duplicate option ID.');oi.add(o.id);if(!o.pl?.trim()||!o.en?.trim()||o.pl.length>100||o.en.length>100)errors.push(w.id+': every option needs PL and EN (max 100).');if(typeof o.chance!=='number'||!Number.isFinite(o.chance)||o.chance<0||o.chance>100)errors.push(w.id+': chance must be 0–100.');if(o.count!=null&&(!Number.isInteger(o.count)||o.count<0||o.count>5))errors.push(w.id+': power count 0–5.');if(o.grant&&!s.wheels.find(x=>x.id==='powers')?.options.some(p=>p.id===o.grant))errors.push(w.id+': unknown granted power '+o.grant)}if(enabled(w)){const total=active(w).reduce((a,o)=>a+o.chance,0);if(Math.abs(total-100)>.0001)errors.push(w.en+': total '+total.toFixed(3)+'%, expected 100%.')}
if(w.mode==='branch'&&(!w.source||!Array.isArray(w.triggers)||!w.triggers.length))errors.push(w.id+': choose a source and triggers.');if(w.source){const parent=s.wheels.find(x=>x.id===w.source);if(!parent||parent.mode!=='main')errors.push(w.id+': source must be a main wheel.');else if(!w.triggers.every(t=>parent.options.some(o=>o.id===t)))errors.push(w.id+': missing trigger option.')}
}
const mains=s.wheels.filter(w=>w.mode==='main'&&enabled(w)).map(w=>w.id);for(const [a,b]of[['race','size'],['power_count','powers'],['powers','mastery'],['powers','weakness']])if(mains.includes(a)&&mains.includes(b)&&mains.indexOf(a)>mains.indexOf(b))errors.push(a+' must precede '+b+'.');
if(!s.wheels.some(w=>enabled(w)&&w.mode==='main'&&!w.source))errors.push('Keep at least one unconditional main wheel.');for(const w of s.wheels){if(w.mode==='main'&&w.source&&s.wheels.findIndex(p=>p.id===w.source)>=s.wheels.indexOf(w))errors.push(w.id+': source must precede this wheel.')}const race=s.wheels.find(w=>w.id==='race');if(race&&enabled(race)&&active(race).some(o=>o.id==='hybrid')&&active(race).filter(o=>o.id!=='hybrid').length<2)errors.push('Hybrid needs two other active races.');return [...new Set(errors)]}
root.WLEngine={clone,id,wheel,result,races,powers,steps,next,choose,roll,newCharacter,normalize,validateSeason,triggered};if(typeof module!=='undefined')module.exports=root.WLEngine;
})(globalThis);
