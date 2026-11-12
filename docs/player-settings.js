(function(root){'use strict';
const defaults=()=>({muted:false,menuEnabled:true,effects:true,menu:.3,tick:.85,reveal:.85,finale:.55});
function sanitize(value){const d=defaults();for(const k of ['muted','menuEnabled','effects'])if(typeof value?.[k]==='boolean')d[k]=value[k];for(const k of ['menu','tick','reveal','finale'])if(Number.isFinite(value?.[k]))d[k]=Math.max(0,Math.min(1,value[k]));return d}
class Preferences{
 constructor(store,legacy={}){this.store=store;this.legacy=legacy;this.owner=null;this.value=defaults()}
 key(id){return 'wheel_lab_player_audio_v1:'+encodeURIComponent(id||'visitor')}
 select(id,inherit=false){const previous=this.value;this.owner=id;let found;try{found=JSON.parse(this.store.get(this.key(id))||'null')}catch{}this.value=sanitize(found||(inherit?previous:{}));if(inherit&&!found)this.save();return this.value}
 migrate(id){let found;try{found=this.store.get(this.key(id))}catch{}this.select(id);if(!found){this.value=sanitize(this.legacy);this.save()}return this.value}
 save(){try{this.store.set(this.key(this.owner),JSON.stringify(this.value));return true}catch{return false}}
}
function open(prefs,{lang='pl',owner='',apply,preview,stop,notify}){
 const en=lang==='en',L=(a,b)=>en?b:a,d=document.createElement('dialog');d.className='settings-dialog';
 const labels={menu:L('Muzyka menu','Menu music'),tick:L('Klikanie koła','Wheel ticks'),reveal:L('Ujawnienie cechy','Trait reveal'),finale:L('Muzyka finałowa','Finale music')};
 d.innerHTML=`<h2>${L('Twoje ustawienia dźwięku','Your audio settings')}</h2><p class="help" data-owner></p><label class="check"><input type="checkbox" data-pref="muted">${L('Wycisz wszystko','Mute all')}</label><label class="check"><input type="checkbox" data-pref="menuEnabled">${L('Muzyka w menu','Menu music enabled')}</label><label class="check"><input type="checkbox" data-pref="effects">${L('Efekty i muzyka finałowa','Effects and finale enabled')}</label>${Object.entries(labels).map(([k,label])=>`<div class="audio-setting"><label>${label}<input data-volume="${k}" type="range" min="0" max="100" step="1"></label><output data-output="${k}"></output><button type="button" data-preview="${k}">${L('Odsłuch','Preview')}</button></div>`).join('')}<p class="help">${L('Tylko ten gracz w tej przeglądarce. Administrator nie ustala Twojej głośności. Zmiany zapisują się od razu.','Only this player in this browser. The administrator does not set your volume. Changes save immediately.')}</p><div class="toolbar"><button data-stop>${L('Zatrzymaj odsłuch','Stop preview')}</button><button data-reset>${L('Przywróć domyślne','Reset defaults')}</button><button data-close class="primary">${L('Gotowe','Done')}</button></div>`;
 d.querySelector('[data-owner]').textContent=L('Gracz: ','Player: ')+owner;
 const render=()=>{for(const el of d.querySelectorAll('[data-pref]'))el.checked=prefs.value[el.dataset.pref];for(const el of d.querySelectorAll('[data-volume]')){const v=Math.round(prefs.value[el.dataset.volume]*100);el.value=v;d.querySelector('[data-output="'+el.dataset.volume+'"]').textContent=v+'%'}};
 const save=()=>{if(!prefs.save())notify(L('Nie udało się zapisać ustawień.','Could not save preferences.'));apply();render()};
 d.oninput=e=>{if(e.target.dataset.volume){prefs.value[e.target.dataset.volume]=Number(e.target.value)/100;save()}};
 d.onchange=e=>{if(e.target.dataset.pref){prefs.value[e.target.dataset.pref]=e.target.checked;save()}};
 d.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.preview)preview(b.dataset.preview);if(b.hasAttribute('data-stop'))stop();if(b.hasAttribute('data-reset')){prefs.value=defaults();save()}if(b.hasAttribute('data-close'))d.close()};
 d.addEventListener('close',()=>{stop(true);d.remove()});document.body.append(d);render();d.showModal();return d;
}
root.WLPlayerSettings={Preferences,defaults,sanitize,open};
})(globalThis);
