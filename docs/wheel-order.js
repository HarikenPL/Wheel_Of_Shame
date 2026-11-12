/* Display order never changes the stored draw or its odds. */
(function(root){'use strict';
const ranked=new Set(['strength','speed','durability','iq','combat','mastery','demon_rank','core']);
function height(o){
 const en=String(o.en||'').trim().replace(',','.');
 const pl=String(o.pl||'').trim().replace(',','.');
 let m=en.match(/^(\d+(?:\.\d+)?)\s*(ft|feet|m|cm)\b/i)||pl.match(/^(\d+(?:\.\d+)?)\s*(m|cm)\b/i);
 if(!m)return Infinity;
 return Number(m[1])*(m[2].toLowerCase()==='cm'?.01:/ft|feet/i.test(m[2])?.3048:1);
}
function ordered(pool,id){return id==='size'||id==='size_large'?pool.slice().sort((a,b)=>height(a)-height(b)):pool.slice()}
function level(result,character){
 if(!ranked.has(result.wheelId))return null;
 // The character's frozen season retains disabled/zero-chance levels too.
 const options=character.season.wheels.find(w=>w.id===result.wheelId)?.options||result.pool;
 const index=options.findIndex(o=>o.id===result.option.id),steps=options.length-1;
 if(index<0||steps<1)return null;
 return {index,steps,percent:index/steps*100};
}
root.WLWheelOrder={ordered,level,height};
})(globalThis);
