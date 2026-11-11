const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const els=new Map(),storage=new Map(),session=new Map();const fakeCanvas=new Proxy({},{get:()=>()=>{}});
function el(id){if(!els.has(id))els.set(id,{id,value:'',checked:false,hidden:false,style:{},dataset:{},classList:{toggle(){}},setAttribute(){},getContext(){return fakeCanvas},pause(){this.paused=true},play(){this.paused=false;return Promise.resolve()},querySelector(){return el('child:'+id)},querySelectorAll(){return[]},addEventListener(){},showModal(){},close(){},reportValidity(){return true}});return els.get(id)}
const context={console,crypto:require('node:crypto').webcrypto,performance,setTimeout,clearTimeout,Blob,URL,location:{protocol:'file:',reload(){}},navigator:{},matchMedia:()=>({matches:true}),requestAnimationFrame:fn=>setTimeout(()=>fn(performance.now()+5000),0),confirm:()=>true,document:{addEventListener(){},documentElement:{lang:'pl',style:{setProperty(){}}},getElementById:el,querySelector:q=>el(q),querySelectorAll:()=>[],createElement:()=>({click(){}})},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},sessionStorage:{getItem:k=>session.get(k)||null,setItem:(k,v)=>session.set(k,v),removeItem:k=>session.delete(k)}};context.window={addEventListener(){}};vm.createContext(context);
for(const f of ['audio-assets.js','audio.js','data.js','engine.js'])vm.runInContext(fs.readFileSync(__dirname+'/../app/'+f,'utf8'),context);
let source=fs.readFileSync(__dirname+'/../app/app.js','utf8');source=source.replace(/\}\)\(\);\s*$/,'globalThis.TEST={get:()=>state,targetAngle,spinEnd,sectorIndex,validState,validCharacter,validConfig,commit,renderPlay,saveEditor,editor:()=>editor};})();');vm.runInContext(source,context);
for(let i=0;i<3;i++){el('playerName').value='ChangedNick'+i;el('characterName').value='Char'+i;el('createForm').onsubmit({preventDefault(){}});el('pause').onclick()}
assert.equal(context.TEST.get().characters.length,3);el('playerName').value='NewNick';el('characterName').value='Fourth';el('createForm').onsubmit({preventDefault(){}});assert.equal(context.TEST.get().characters.length,3,'nick rename cannot bypass quota');
const c=context.TEST.get().characters[0];while(context.WLEngine.next(c))context.WLEngine.roll(c);assert(context.TEST.validCharacter(c));assert(context.TEST.validState(context.TEST.get()));
const bad=JSON.parse(JSON.stringify(c));bad.results[0].option.en='Forged';assert(!context.TEST.validCharacter(bad),'reject modified imported result');const bad2=JSON.parse(JSON.stringify(c));bad2.results[0].key='other';assert(!context.TEST.validCharacter(bad2));
el('adminContent').hidden=true;el('loginName').value='admin';el('loginPass').value='wrong';el('loginForm').onsubmit({preventDefault(){}});assert.equal(el('adminContent').hidden,true);
el('loginPass').value='admin';el('loginForm').onsubmit({preventDefault(){}});assert.equal(el('adminContent').hidden,false,'demo login');
const editor=context.TEST.editor();editor.options[0].pl='';assert.equal(context.TEST.saveEditor(),false,'enforce PL name');editor.options[0].pl='Człowiek';editor.options[0].chance+=1;assert.equal(context.TEST.saveEditor(),false,'enforce 100%');editor.options[0].chance-=1;assert.equal(context.TEST.saveEditor(),true);
const persisted=JSON.parse(storage.get('wheel_lab_v2'));assert(context.TEST.validState(persisted));const rev=context.TEST.get().rev;storage.set('wheel_lab_v2',JSON.stringify({...persisted,rev:rev+1}));assert.equal(context.TEST.commit(()=>context.TEST.get().lang='en'),false,'prevent multi-tab overwrite');
console.log('PASS: local persistence, renamed-player quotas, complete backup validation, invalid import rejection, admin login, required translations, exact percentage sum, multi-tab conflict.');

// Clockwise travel through reversed sectors advances ascending rank indices.
for(const w of context.WL_DEFAULTS.seasons[0].wheels){
 const pool=w.options.filter(o=>o.enabled!==false&&o.chance>0);
 if(!pool.length)continue;
 const total=pool.reduce((a,o)=>a+o.chance,0),tau=2*Math.PI;
 for(let i=0;i<pool.length;i++)for(const start of [0,1,-7,19]){
  const target=context.TEST.targetAngle(pool,i),end=context.TEST.spinEnd(start,target);
  assert(end>start+tau*5.999,'six clockwise turns');
  const pointer=((-end%tau)+tau)%tau;
  const lower=pool.slice(i+1).reduce((a,o)=>a+o.chance,0)/total*tau;
  const upper=lower+pool[i].chance/total*tau;
  assert(pointer>=lower-1e-10&&pointer<=upper+1e-10,'pointer lands in chosen sector');
 }
}
const ranks=[{chance:40},{chance:35},{chance:25}];
assert(context.TEST.spinEnd(0,context.TEST.targetAngle(ranks,1))>context.TEST.spinEnd(0,context.TEST.targetAngle(ranks,0)),'higher rank is ahead during clockwise rotation');
for(let i=0;i<ranks.length;i++)assert.equal(context.TEST.sectorIndex(ranks,context.TEST.targetAngle(ranks,i)),i,'sound sector matches the chosen result');
console.log('PASS: spin direction and pointer alignment for every catalog sector.');
