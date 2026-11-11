const assert=require('node:assert/strict');
const MenuMusic=require('../app/audio.js');
const fake=()=>({paused:true,currentTime:0,playCalls:0,pause(){this.paused=true},async play(){this.playCalls++;this.paused=false}});
(async()=>{
 const el=fake(),m=new MenuMusic(el);
 await m.setContext(true);assert(el.paused,'silent until user enables music');
 await m.setEnabled(true);assert(!el.paused,'music in main menu');
 await m.setContext(false);assert(el.paused,'character creation and other views stop music');assert.equal(el.currentTime,0);
 await m.setContext(true);assert(!el.paused,'return to menu restarts music');
 await m.setContext(true,false);assert(el.paused,'hidden tab silent');
 await m.setContext(true,true);assert(!el.paused,'visible menu resumes');
 await m.setVolume(0);assert(el.paused);await m.setVolume(.5);assert(!el.paused);assert.equal(el.volume,.5);
 await m.setEnabled(false);assert(el.paused);
 const blocked=fake();blocked.play=async()=>{throw Error('autoplay')};const b=new MenuMusic(blocked);await b.setContext(true);await b.setEnabled(true);assert(b.blocked,'autoplay rejection exposed to UI');
 blocked.play=async()=>{blocked.paused=false};await b.setEnabled(true);assert(b.playing&&!b.blocked,'retry from user gesture');
 let resolve;const delayed=fake();delayed.play=()=>new Promise(r=>{resolve=()=>{delayed.paused=false;r()}});const d=new MenuMusic(delayed);await d.setContext(true);const pending=d.setEnabled(true);await d.setContext(false);resolve();await pending;assert(delayed.paused,'late play promise cannot leak music into the wheel');
 console.log('PASS: menu-only music, mute, volume, hidden tab, autoplay rejection/retry and async navigation race.');
})().catch(e=>{console.error(e);process.exitCode=1});
