/* Full summary and compact final card share frozen traits, never probability scores. */
(function(root){'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={pl:{portrait:'Dodaj / zmień portret',edit:'Ustaw portret',remove:'Usuń portret',png:'Pobierz kartę PNG',final:'Karta końcowa',prompt:'Opis do obrazka',empty:'Twój portret',hint:'Dodaj ilustrację swojej postaci',level:'Poziom',error:'Nie udało się odczytać obrazu. Wybierz JPG, PNG lub WebP do 8 MB.',saved:'Portret zapisany.',exportError:'Nie udało się zapisać karty PNG.',innate:'Wrodzona moc',note:'Paski pokazują poziom cechy, nie szansę jej wylosowania.',none:'Brak',pending:'Jeszcze nie wylosowano'},en:{portrait:'Add / change portrait',edit:'Position portrait',remove:'Remove portrait',png:'Download card PNG',final:'Final card',prompt:'Image prompt',empty:'Your portrait',hint:'Add your character artwork',level:'Level',error:'Cannot read this image. Choose JPG, PNG or WebP up to 8 MB.',saved:'Portrait saved.',exportError:'Could not export card PNG.',innate:'Innate power',note:'Bars show trait level, not draw probability.',none:'None',pending:'Not rolled yet'}};
const safePortrait=v=>typeof v==='string'&&v.length<=420000&&/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(v);
const color=v=>/^#[a-f\d]{6}$/i.test(v||'')?v:'#5acbd6',named=(o,lang)=>o?.[lang]||o?.en||'';
function rows(c,lang){const out=c.results.map(r=>({title:named(r,lang)+(r.ordinal?' '+r.ordinal:'')+(r.suffix?' · '+named(r.suffix,lang):''),value:named(r.option,lang),color:color(r.color),level:WLWheelOrder.level(r,c)}));for(const p of WLEngine.powers(c).filter(p=>p.innate))out.push({title:labels[lang].innate,value:named(p.option,lang),color:'#2caeb4',level:null});return out}
const COMMON=[['race','Rasa','Race'],['alignment','Rola','Role'],['size','Wzrost','Size'],['strength','Siła','Strength'],['speed','Szybkość','Speed'],['durability','Wytrzymałość','Durability'],['iq','IQ','IQ'],['combat','Walka','Fight'],['weapon','Broń','Weapon'],['powers','Moce','Powers'],['trait','Cecha','Trait'],['weakness','Słabość','Weakness']];
function commonRows(c,lang){return COMMON.map(([id,pl,en])=>{const r=c.results.find(r=>r.key===id)||c.results.find(r=>r.wheelId===id),w=c.season.wheels.find(w=>w.id===id);let value=r?named(r.option,lang):labels[lang].pending;
 if(id==='race'){const rs=c.results.filter(r=>r.wheelId==='race'&&r.option.id!=='hybrid');if(rs.length)value=rs.map(r=>named(r.option,lang)).join(' + ')}
 if(id==='weapon'){const a=c.results.find(r=>r.wheelId==='artifact');if(a)value+=(r?' · ':'')+named(a.option,lang)}
 if(id==='powers'){const ps=WLEngine.powers(c);value=ps.length?ps.map(p=>named(p.option,lang)).join(' · '):c.results.some(r=>r.key==='power_count')&&!WLEngine.next(c)?labels[lang].none:labels[lang].pending}
 if(!r&&id!=='powers'&&w?.enabled===false)value=labels[lang].none;
 return {id,title:lang==='pl'?pl:en,value,color:color(r?.color||w?.color),level:r?WLWheelOrder.level(r,c):null};
 })}
function bar(r,L){return r.level?`<div class="fate-bar" role="meter" aria-label="${esc(r.title+' · '+r.value)}" aria-valuemin="0" aria-valuemax="${r.level.steps}" aria-valuenow="${r.level.index}" aria-valuetext="${r.level.index} / ${r.level.steps}" style="--trait-color:${r.color};--fill:${r.level.percent}%;--segments:${r.level.steps}"><span></span></div><small class="fate-level">${L.level} ${r.level.index} / ${r.level.steps}</small>`:''}
function portrait(c,L){const l=WLPortraitEditor.layout(c.portraitLayout);return `<div class="portrait-frame">${safePortrait(c.portrait)?`<img src="${c.portrait}" alt="${esc(c.name)}" style="transform:translate(${l.x*100}%,${l.y*100}%) scale(${l.scale})">`:`<div class="portrait-placeholder"><span aria-hidden="true">✦</span><strong>${L.empty}</strong><p>${L.hint}</p></div>`}</div>`}
function html(c,lang='pl',editable=false,mode='full'){const L=labels[lang],compact=mode==='compact',list=compact?commonRows(c,lang):rows(c,lang);
 return `<article class="fate-card ${compact?'reel-card':''}"><div class="fate-portrait">${portrait(c,L)}<div class="portrait-caption">THE WHEEL OF SHAME</div></div><div class="fate-details"><span class="fate-season">${esc(named(c.season,lang))}</span><h2>${esc(c.name)}</h2><p class="fate-owner">${esc(c.owner)}</p><div class="fate-traits">${list.map(r=>`<div class="fate-trait"><div class="fate-trait-label"><span>${esc(r.title)}</span><strong>${esc(r.value)}</strong></div>${bar(r,L)}</div>`).join('')}</div><p class="fate-note">${L.note}</p></div></article><div class="card-actions">${!compact?`<button type="button" data-final-card>${L.final}</button>`:''}<button type="button" data-image-prompt>${L.prompt}</button>${editable?`<button type="button" data-portrait>${L.portrait}</button>${safePortrait(c.portrait)?`<button type="button" data-edit-portrait>${L.edit}</button><button type="button" data-remove-portrait>${L.remove}</button>`:''}<input type="file" accept="image/jpeg,image/png,image/webp" data-portrait-file hidden>`:''}<button type="button" data-card-png>${L.png}</button></div>`;
}
function mount(host,c,{lang='pl',editable=false,onPortrait=()=>false,onFinal=()=>{},notify=()=>{},mode='full'}={}){
 host.innerHTML=html(c,lang,editable,mode);const L=labels[lang];
 host.querySelector('[data-card-png]').onclick=()=>exportPNG(c,lang).catch(()=>notify(L.exportError));
 host.querySelector('[data-image-prompt]').onclick=()=>WLImagePrompt.open(c,lang,notify);
 const final=host.querySelector('[data-final-card]');if(final)final.onclick=onFinal;
 if(!editable)return;const file=host.querySelector('[data-portrait-file]');host.querySelector('[data-portrait]').onclick=()=>file.click();
 const save=(src,layout)=>{const ok=onPortrait(src,layout);if(ok)notify(L.saved);return ok};
 const remove=host.querySelector('[data-remove-portrait]');if(remove)remove.onclick=()=>onPortrait(null,null);
 const edit=host.querySelector('[data-edit-portrait]');if(edit)edit.onclick=async()=>{try{const im=await WLPortraitEditor.image(c.portrait);WLPortraitEditor.open(im,c.portrait,c.portraitLayout,lang,save)}catch{notify(L.error)}};
 file.onchange=async()=>{const f=file.files?.[0];file.value='';if(!f)return;if(!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>8*1024*1024){notify(L.error);return}const url=URL.createObjectURL(f);try{const im=await WLPortraitEditor.image(url);if(!im.width||!im.height)throw Error();const src=WLPortraitEditor.encode(im);WLPortraitEditor.open(im,src,null,lang,save)}catch{notify(L.error)}finally{URL.revokeObjectURL(url)}};
}
function splitLines(ctx,text,width){const lines=[];let line='';for(const char of String(text)){const next=line+char;if(ctx.measureText(next).width>width&&line){lines.push(line.trim());line=char}else line=next}if(line)lines.push(line.trim());return lines.length?lines:['']}
async function exportPNG(c,lang){
 const L=labels[lang],list=commonRows(c,lang),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');canvas.width=1200;
 ctx.font='bold 25px sans-serif';const nameLines=splitLines(ctx,c.name,490);const measured=list.map(r=>({...r,lines:splitLines(ctx,r.value,490)}));
 const header=115+nameLines.length*44,rowsHeight=measured.reduce((n,r)=>n+30+r.lines.length*29+(r.level?39:0)+15,0);canvas.height=Math.max(1030,header+rowsHeight+100);
 ctx.fillStyle='#08151c';ctx.fillRect(0,0,1200,canvas.height);ctx.strokeStyle='#426773';ctx.lineWidth=2;ctx.strokeRect(18,18,1164,canvas.height-36);
 const frame={x:40,y:45,w:570,h:canvas.height-115};ctx.fillStyle='#102c36';ctx.fillRect(frame.x,frame.y,frame.w,frame.h);
 // Portrait uses a 2:3 stage in both HTML and PNG; all source ratios fit inside it.
 const pw=frame.w,ph=pw*1.5,py=frame.y+(frame.h-ph)/2;
 if(safePortrait(c.portrait)){const im=await WLPortraitEditor.image(c.portrait),b=WLPortraitEditor.fit(im.width,im.height,pw,ph,c.portraitLayout);ctx.save();ctx.beginPath();ctx.rect(frame.x,py,pw,ph);ctx.clip();ctx.drawImage(im,frame.x+b.x,py+b.y,b.w,b.h);ctx.restore()}else{ctx.fillStyle='#67d6df';ctx.font='140px Georgia';ctx.fillText('✦',250,py+420);ctx.font='24px sans-serif';ctx.fillText(L.empty,210,py+500)}
 ctx.font='17px sans-serif';ctx.fillStyle='#86d3da';ctx.fillText('THE WHEEL OF SHAME',58,canvas.height-44);
 const x=650,width=490;ctx.font='18px sans-serif';ctx.fillStyle='#86d3da';ctx.fillText(named(c.season,lang),x,64,width);ctx.font='bold 40px Georgia';ctx.fillStyle='#f4f6f5';let y=112;for(const line of nameLines){ctx.fillText(line,x,y,width);y+=44}ctx.font='19px sans-serif';ctx.fillStyle='#9ab7c1';ctx.fillText(c.owner,x,y,width);y+=42;
 for(const r of measured){ctx.fillStyle='#9ab7c1';ctx.font='18px sans-serif';ctx.fillText(r.title.toLocaleUpperCase(lang),x,y,width);y+=29;ctx.fillStyle='#f5f8f8';ctx.font='bold 25px sans-serif';for(const line of r.lines){ctx.fillText(line,x,y,width);y+=29}
 if(r.level){ctx.fillStyle='#263941';ctx.fillRect(x,y,490,16);ctx.fillStyle=r.color;ctx.fillRect(x,y,490*r.level.percent/100,16);ctx.fillStyle='#08151c';for(let i=1;i<r.level.steps;i++)ctx.fillRect(x+i*490/r.level.steps-1,y,2,16);ctx.font='14px sans-serif';ctx.fillStyle='#9ab7c1';ctx.fillText(`${r.level.index} / ${r.level.steps}`,x,y+34);y+=39}y+=16;
 }
 const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw Error();const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=(c.name.replace(/[^\p{L}\p{N}_-]/gu,'_')||'character')+'_card.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
root.WLCharacterCard={mount,html,rows,commonRows,safePortrait,exportPNG};
})(globalThis);
