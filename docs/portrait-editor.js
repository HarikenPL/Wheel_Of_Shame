/* Non-destructive portrait placement; pointer drag, pinch, wheel and resize handle. */
(function(root){'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const valid=l=>l&&[l.scale,l.x,l.y].every(Number.isFinite)&&l.scale>=.25&&l.scale<=4&&Math.abs(l.x)<=2&&Math.abs(l.y)<=2;
const layout=l=>valid(l)?{scale:l.scale,x:l.x,y:l.y}:{scale:1,x:0,y:0};
function fit(iw,ih,w,h,l){l=layout(l);const k=Math.min(w/iw,h/ih)*l.scale;return {w:iw*k,h:ih*k,x:(w-iw*k)/2+l.x*w,y:(h-ih*k)/2+l.y*h}}
function zoom(l,ratio,ax=.5,ay=.5){l=layout(l);const scale=clamp(l.scale*ratio,.25,4),r=scale/l.scale;return {scale,x:clamp(ax-.5-(ax-.5-l.x)*r,-2,2),y:clamp(ay-.5-(ay-.5-l.y)*r,-2,2)}}
async function image(src){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=src})}
function encode(im){const c=document.createElement('canvas'),ratio=Math.min(1,960/Math.max(im.width,im.height));c.width=Math.round(im.width*ratio);c.height=Math.round(im.height*ratio);const x=c.getContext('2d');x.fillStyle='#0b1720';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);for(const quality of [.86,.75,.6,.45,.3]){const src=c.toDataURL('image/jpeg',quality);if(src.length<=420000)return src}throw Error('image-size')}
function open(im,src,initial,lang,save){const pl=lang==='pl',d=document.createElement('dialog');let value=layout(initial);d.className='portrait-editor';d.innerHTML=`<h2>${pl?'Ustaw portret':'Position portrait'}</h2><p class="help">${pl?'Przesuwaj obraz. Powiększaj kółkiem myszy, dwoma palcami lub przeciągając narożnik ↔.':'Drag the image. Zoom with the mouse wheel, two fingers, or the ↔ corner handle.'}</p><div class="portrait-stage"><canvas width="600" height="900" tabindex="0" aria-label="${pl?'Portret: strzałki przesuwają, plus i minus powiększają':'Portrait: arrow keys move, plus and minus zoom'}"></canvas><button type="button" class="portrait-handle" aria-label="${pl?'Przeciągnij, aby zmienić rozmiar':'Drag to resize'}">↔</button></div><div class="card-actions"><button data-fit>${pl?'Pokaż cały obraz':'Show whole image'}</button><button data-minus aria-label="${pl?'Pomniejsz':'Zoom out'}">−</button><button data-plus aria-label="${pl?'Powiększ':'Zoom in'}">+</button><output data-scale></output></div><div class="card-actions"><button data-cancel>${pl?'Anuluj':'Cancel'}</button><button class="primary" data-save>${pl?'Zapisz portret':'Save portrait'}</button></div>`;document.body.append(d);
 const stage=d.querySelector('.portrait-stage'),canvas=d.querySelector('canvas'),ctx=canvas.getContext('2d'),handle=d.querySelector('.portrait-handle'),points=new Map();let gesture=null,resize=null;
 const point=e=>{const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height}};
 const center=()=>{const p=[...points.values()];return {x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2,d:Math.hypot((p[0].x-p[1].x)*600,(p[0].y-p[1].y)*900)}};
 function paint(){ctx.fillStyle='#0b1720';ctx.fillRect(0,0,600,900);const b=fit(im.width,im.height,600,900,value);ctx.drawImage(im,b.x,b.y,b.w,b.h);handle.style.left=clamp((b.x+b.w)/600*100,5,95)+'%';handle.style.top=clamp((b.y+b.h)/900*100,5,95)+'%';d.querySelector('[data-scale]').textContent=Math.round(value.scale*100)+'%'}
 function start(){gesture=points.size>=2?{...center(),base:{...value}}:null}
 canvas.onpointerdown=e=>{e.preventDefault();canvas.focus({preventScroll:true});canvas.setPointerCapture(e.pointerId);points.set(e.pointerId,point(e));start()};
 canvas.onpointermove=e=>{if(!points.has(e.pointerId))return;e.preventDefault();const old=points.get(e.pointerId),p=point(e);points.set(e.pointerId,p);if(points.size>=2){if(!gesture)start();const now=center();value=zoom(gesture.base,now.d/Math.max(gesture.d,1),gesture.x,gesture.y);value.x=clamp(value.x+now.x-gesture.x,-2,2);value.y=clamp(value.y+now.y-gesture.y,-2,2)}else{value.x=clamp(value.x+p.x-old.x,-2,2);value.y=clamp(value.y+p.y-old.y,-2,2)}paint()};
 function release(e){points.delete(e.pointerId);start()}
 canvas.onpointerup=release;canvas.onpointercancel=release;canvas.onlostpointercapture=release;
 canvas.addEventListener('wheel',e=>{e.preventDefault();const p=point(e);value=zoom(value,Math.exp(-e.deltaY*.0015),p.x,p.y);paint()},{passive:false});
 handle.onpointerdown=e=>{e.preventDefault();e.stopPropagation();handle.setPointerCapture(e.pointerId);const p=point(e);resize={p,base:{...value}}};
 handle.onpointermove=e=>{if(!resize)return;e.preventDefault();const p=point(e);value=zoom(resize.base,Math.exp((p.x-resize.p.x+p.y-resize.p.y)*1.6));paint()};
 handle.onpointerup=handle.onpointercancel=handle.onlostpointercapture=()=>resize=null;
 canvas.onkeydown=e=>{let handled=true;if(e.key==='ArrowLeft')value.x-=.02;else if(e.key==='ArrowRight')value.x+=.02;else if(e.key==='ArrowUp')value.y-=.02;else if(e.key==='ArrowDown')value.y+=.02;else if(e.key==='+'||e.key==='=')value=zoom(value,1.1);else if(e.key==='-')value=zoom(value,1/1.1);else handled=false;if(handled){e.preventDefault();value.x=clamp(value.x,-2,2);value.y=clamp(value.y,-2,2);paint()}};
 d.querySelector('[data-fit]').onclick=()=>{value=layout(null);paint()};d.querySelector('[data-plus]').onclick=()=>{value=zoom(value,1.1);paint()};d.querySelector('[data-minus]').onclick=()=>{value=zoom(value,1/1.1);paint()};
 d.querySelector('[data-cancel]').onclick=()=>d.close();d.onclose=()=>d.remove();d.querySelector('[data-save]').onclick=()=>{if(save(src,value)!==false)d.close()};paint();d.showModal();
}
root.WLPortraitEditor={valid,layout,fit,zoom,image,encode,open};
})(globalThis);
