'use strict';
// Add a language by adding a key to LANGS and a matching entry to each string/data object below.
const LANGS={ar:{name:'العربية',dir:'rtl'},en:{name:'English',dir:'ltr'}};
const T={
 ar:{hello:'أهلاً يا بطل',demo:'NRV · عميل تجريبي',todayW:'تمرين النهارده',ex:'تمارين',todayF:'أكل النهارده',kcal:'سعر',lastW:'آخر وزن',kg:'كجم',cm:'سم',waist:'وسط',note:'نسخة تجريبية: كل الأرقام أمثلة، والحفظ على جهازك بس.',prog:'برنامجي',doneOf:(a,b)=>`${a} من ${b} خلصت`,day:'يوم',foodT:'أكلي',ofKcal:(a,b)=>`${a} من ${b} سعر`,protein:'بروتين',carb:'كارب',fat:'دهون',mealNote:'أرقام الأكل مثال تجريبي.',meas:'قياساتي',lastWeight:w=>`آخر وزن ${w} كجم`,dW:'تغيّر الوزن',dWa:'تغيّر الوسط',wChart:'الوزن بالكجم',newM:'قياس جديد',wIn:'الوزن (كجم)',aIn:'الوسط (سم)',save:'احفظ القياس',log:'السجل',reset:'رجّع القياسات للأمثلة',sure:'أكيد، امسح قياساتي',no:'لا',entry:n=>`قياس ${n}`,bad:'اكتب رقمين صحيحين للوزن والوسط.',nostore:'مش قادر يحفظ على الجهاز ده.',vid:n=>`مكان فيديو «${n}»`,vidSoon:'لسه مش مرفوع',nHome:'الرئيسية',nTrain:'التمرين',nFood:'الأكل',nMeas:'القياسات',lang:'Language',w:n=>`أسبوع ${n}`},
 en:{hello:'Hey champ',demo:'NRV · Demo client',todayW:"Today's workout",ex:'exercises',todayF:"Today's food",kcal:'kcal',lastW:'Last weight',kg:'kg',cm:'cm',waist:'Waist',note:'Demo version: all numbers are samples, saved on this device only.',prog:'My program',doneOf:(a,b)=>`${a} of ${b} done`,day:'Day',foodT:'My food',ofKcal:(a,b)=>`${a} of ${b} kcal`,protein:'Protein',carb:'Carbs',fat:'Fat',mealNote:'Meal numbers are demo samples.',meas:'My measurements',lastWeight:w=>`Last weight ${w} kg`,dW:'Weight change',dWa:'Waist change',wChart:'Weight in kg',newM:'New measurement',wIn:'Weight (kg)',aIn:'Waist (cm)',save:'Save measurement',log:'History',reset:'Reset measurements to samples',sure:'Yes, delete my entries',no:'No',entry:n=>`Entry ${n}`,bad:'Enter valid numbers for weight and waist.',nostore:"Can't save on this device.",vid:n=>`Video for "${n}"`,vidSoon:'Not uploaded yet',nHome:'Home',nTrain:'Training',nFood:'Food',nMeas:'Progress',lang:'اللغة',w:n=>`Week ${n}`}};
const days=[
{id:'d1',t:{ar:'صدر وترايسبس',en:'Chest & triceps'},ex:[['d1e1',{ar:'بنش بريس بالبار',en:'Barbell bench press'},'4 × 8',{ar:'نزّل البار لحد الصدر ببطء، راحة دقيقتين.',en:'Lower the bar to your chest slowly. Rest 2 minutes.'}],['d1e2',{ar:'انكلاين دمبل',en:'Incline dumbbell press'},'3 × 10',{ar:'كوع مفتوح حوالي 45 درجة.',en:'Elbows at about 45 degrees.'}],['d1e3',{ar:'تفتيح كابل',en:'Cable fly'},'3 × 12',{ar:'شدّ الصدر في آخر الحركة.',en:'Squeeze the chest at the end.'}],['d1e4',{ar:'ترايسبس حبل',en:'Rope triceps pushdown'},'3 × 12',{ar:'ثبّت الكوع جنب الجسم.',en:'Keep elbows pinned to your sides.'}]]},
{id:'d2',t:{ar:'ضهر وبايسبس',en:'Back & biceps'},ex:[['d2e1',{ar:'سحب أمامي واسع',en:'Wide-grip lat pulldown'},'4 × 10',{ar:'اسحب لحد أعلى الصدر.',en:'Pull to the upper chest.'}],['d2e2',{ar:'تجديف بالبار',en:'Barbell row'},'4 × 8',{ar:'ضهر مفرود، من غير هز.',en:'Flat back, no swinging.'}],['d2e3',{ar:'بايسبس دمبل',en:'Dumbbell curl'},'3 × 12',{ar:'نزول بطيء.',en:'Lower slowly.'}]]},
{id:'d3',t:{ar:'رجل وكتف',en:'Legs & shoulders'},ex:[['d3e1',{ar:'سكوات',en:'Squat'},'4 × 8',{ar:'الركبة في اتجاه الصوابع.',en:'Knees track over your toes.'}],['d3e2',{ar:'ليج برس',en:'Leg press'},'3 × 12',{ar:'من غير قفل كامل للركبة.',en:'Do not fully lock your knees.'}],['d3e3',{ar:'رفرفة جانبي',en:'Lateral raise'},'3 × 15',{ar:'وزن خفيف وتحكم.',en:'Light weight, full control.'}]]}];
const meals=[['m1',{ar:'فطار',en:'Breakfast'},'8:00',{ar:'3 بيضات، رغيف بلدي، خيار',en:'3 eggs, baladi bread, cucumber'},480,28,52,18],['m2',{ar:'غدا',en:'Lunch'},'2:00',{ar:'صدور فراخ مشوية 200 جم، أرز 150 جم، سلطة',en:'Grilled chicken breast 200 g, rice 150 g, salad'},650,52,70,12],['m3',{ar:'سناك قبل التمرين',en:'Pre-workout snack'},'5:30',{ar:'موزة وزبادي يوناني',en:'Banana and Greek yogurt'},250,18,36,4],['m4',{ar:'عشا',en:'Dinner'},'9:00',{ar:'تونة، بطاطا مشوية، خضار سوتيه',en:'Tuna, baked sweet potato, sauteed vegetables'},520,40,45,15]];
const sample=[{n:1,w:86.0,a:94,s:1},{n:2,w:85.2,a:93,s:1},{n:3,w:84.6,a:92,s:1}]; // s=1: sample weekly entry
const KEY='coach.v1',LKEY='coach.lang';
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!S.done||!Array.isArray(S.log)||S.log.some(e=>e.n===undefined))S={done:{},eaten:{},log:sample};
let lang='ar';try{const l=localStorage.getItem(LKEY);if(l&&LANGS[l])lang=l;}catch(e){}
let storageOk=true;
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){storageOk=false}};
const t=()=>T[lang];
const ico={home:'<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z"/>',train:'<path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12"/>',food:'<path d="M7 3v8a2 2 0 0 0 2 2v8M11 3v8M5 3v8M17 3c-2 2-2 6 0 8v10"/>',chart:'<path d="M4 20V4M4 20h16M8 15l4-4 3 3 5-6"/>'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const L=o=>o[lang];
const topbar=(ti,s)=>`<header class="top"><div class="logo">N</div><div class="tt"><div class="title">${esc(ti)}</div>${s?`<div class="sub">${esc(s)}</div>`:''}</div><div class="langs">${Object.keys(LANGS).map(k=>`<button data-lang="${k}" class="${k===lang?'on':''}" aria-label="${LANGS[k].name}">${k.toUpperCase()}</button>`).join('')}</div></header>`;
const bar=(v,m)=>`<div class="bar"><i style="width:${Math.min(100,v/m*100)}%"></i></div>`;
const allEx=days.flatMap(d=>d.ex);
const kTot=meals.reduce((n,m)=>n+m[4],0);
const kEat=()=>meals.filter(m=>S.eaten[m[0]]).reduce((n,m)=>n+m[4],0);
let route=(location.hash||'#/').slice(1)||'/',day='d1',opened=null,msg={w:'',a:'',sure:false};
const label=e=>e.s?t().w(e.n):t().entry(e.n);
function home(){const T_=t(),done=allEx.filter(e=>S.done[e[0]]).length,pct=Math.round(done/allEx.length*100);const nx=days.find(d=>d.ex.some(e=>!S.done[e[0]]))||days[0];const l=S.log[S.log.length-1];
return topbar(T_.hello,T_.demo)+`<div class="body"><a class="hero" href="#/training"><div><div class="k">${T_.todayW}</div><div class="h">${L(nx.t)}</div><div class="k">${nx.ex.length} ${T_.ex}</div></div><div class="ring" style="background:conic-gradient(#fff ${pct*3.6}deg,rgba(255,255,255,.3) 0)"><span>${pct}%</span></div></a>
<div class="grid"><a class="card" href="#/food"><div class="k">${T_.todayF}</div><div class="big">${kEat()}<small> / ${kTot}</small></div>${bar(kEat(),kTot)}<div class="k">${T_.kcal}</div></a>
<a class="card" href="#/measures"><div class="k">${T_.lastW}</div><div class="big">${l?l.w:'-'}<small> ${T_.kg}</small></div><div class="k">${l?T_.waist+' '+l.a+' '+T_.cm:''}</div></a></div>
<div class="note">${T_.note}</div></div>`}
function training(){const T_=t(),d=days.find(x=>x.id===day),done=d.ex.filter(e=>S.done[e[0]]).length;
return topbar(T_.prog,T_.doneOf(done,d.ex.length))+`<div class="body"><div class="tabs">${days.map((x,i)=>`<button class="${x.id===day?'on':''}" data-day="${x.id}">${T_.day} ${i+1}</button>`).join('')}</div><div class="h2">${L(d.t)}</div>`+
d.ex.map(e=>{const dn=!!S.done[e[0]];return `<div class="card ex${dn?' done':''}"><button class="check${dn?' on':''}" data-done="${e[0]}" aria-pressed="${dn}">${dn?'✓':''}</button><div><div class="name">${L(e[1])}</div><div class="k">${e[2]}</div></div><button class="pbtn" data-open="${e[0]}" aria-label="${esc(T_.vid(L(e[1])))}">▶</button>${opened===e[0]?`<div class="more"><div class="video"><span class="pl">▶</span><span>${esc(T_.vid(L(e[1])))}</span><span class="k">${T_.vidSoon}</span></div><div class="k">${L(e[3])}</div></div>`:''}</div>`}).join('')+`</div>`}
function food(){const T_=t(),tt=meals.reduce((a,m)=>[a[0]+m[5],a[1]+m[6],a[2]+m[7]],[0,0,0]);
return topbar(T_.foodT,T_.ofKcal(kEat(),kTot))+`<div class="body"><div class="card">${bar(kEat(),kTot)}<div class="macros"><span>${T_.protein} <b>${tt[0]}</b></span><span>${T_.carb} <b>${tt[1]}</b></span><span>${T_.fat} <b>${tt[2]}</b></span></div></div>`+
meals.map(m=>{const e=!!S.eaten[m[0]];return `<div class="card ex meal${e?' done':''}"><button class="check${e?' on':''}" data-eat="${m[0]}" aria-pressed="${e}">${e?'✓':''}</button><div><div class="name">${L(m[1])} <span class="k">${m[2]}</span></div><div class="k">${L(m[3])}</div></div><div class="kcal">${m[4]}<small>${T_.kcal}</small></div></div>`}).join('')+`<div class="note">${T_.mealNote}</div></div>`}
function chart(){const Lg=S.log;if(Lg.length<2)return '';const W=320,H=140,p=18,ws=Lg.map(e=>e.w),mn=Math.min(...ws)-.5,mx=Math.max(...ws)+.5;
const pts=Lg.map((e,i)=>[p+i*(W-2*p)/(Lg.length-1),H-p-(e.w-mn)/(mx-mn)*(H-2*p)]);
return `<div class="card"><div class="k">${t().wChart}</div><svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${t().wChart}" style="direction:ltr"><polyline fill="none" stroke="#0a84d6" stroke-width="3" stroke-linejoin="round" points="${pts.map(q=>q.join(',')).join(' ')}"/>${pts.map(q=>`<circle cx="${q[0]}" cy="${q[1]}" r="3.5" fill="#0a84d6"/>`).join('')}</svg></div>`}
function measures(){const T_=t(),Lg=S.log,f=Lg[0],l=Lg[Lg.length-1];
return topbar(T_.meas,l?T_.lastWeight(l.w):'')+`<div class="body">${Lg.length>=2?`<div class="grid"><div class="card"><div class="k">${T_.dW}</div><div class="big" dir="ltr">${(l.w-f.w).toFixed(1)}<small> ${T_.kg}</small></div></div><div class="card"><div class="k">${T_.dWa}</div><div class="big" dir="ltr">${l.a-f.a}<small> ${T_.cm}</small></div></div></div>`:''}${chart()}
<div class="card form"><div class="name">${T_.newM}</div><label>${T_.wIn}<input id="w" inputmode="decimal" value="${esc(msg.w)}"></label><label>${T_.aIn}<input id="a" inputmode="decimal" value="${esc(msg.a)}"></label><button class="btn" id="add">${T_.save}</button></div>
<div class="h2">${T_.log}</div>${[...Lg].reverse().map(e=>`<div class="card log"><div><div class="name">${esc(label(e))}</div><div class="k">${T_.waist} ${e.a} ${T_.cm}</div></div><div class="kcal">${e.w}<small>${T_.kg}</small></div></div>`).join('')}
<div class="actions">${msg.sure?`<button class="btn sec" id="reset">${T_.sure}</button><button class="btn ghost" id="no">${T_.no}</button>`:`<button class="btn ghost" id="ask">${T_.reset}</button>`}</div></div>`}
function render(){const T_=t(),r={'/':home,'/training':training,'/food':food,'/measures':measures}[route]||home;
document.documentElement.lang=lang;document.documentElement.dir=LANGS[lang].dir;
const nav=[['/','home',T_.nHome],['/training','train',T_.nTrain],['/food','food',T_.nFood],['/measures','chart',T_.nMeas]];
document.getElementById('app').innerHTML=`<div class="screen">${r()}${storageOk?'':`<div class="note">${T_.nostore}</div>`}</div><nav>${nav.map(n=>`<a href="#${n[0]}" class="${route===n[0]?'on':''}"><svg viewBox="0 0 24 24" aria-hidden="true">${ico[n[1]]}</svg><span>${n[2]}</span></a>`).join('')}</nav>`;}
window.addEventListener('hashchange',()=>{route=(location.hash||'#/').slice(1)||'/';opened=null;render();window.scrollTo(0,0)});
document.addEventListener('click',ev=>{const b=ev.target.closest('button');if(!b)return;
if(b.dataset.lang){lang=b.dataset.lang;try{localStorage.setItem(LKEY,lang)}catch(e){storageOk=false}}
else if(b.dataset.day){day=b.dataset.day;opened=null}
else if(b.dataset.done){S.done[b.dataset.done]=!S.done[b.dataset.done];save()}
else if(b.dataset.open){opened=opened===b.dataset.open?null:b.dataset.open}
else if(b.dataset.eat){S.eaten[b.dataset.eat]=!S.eaten[b.dataset.eat];save()}
else if(b.id==='add'){const w=parseFloat(document.getElementById('w').value.replace(',','.')),a=parseFloat(document.getElementById('a').value.replace(',','.'));
 if(!(w>20&&w<400&&a>20&&a<300)){alert(t().bad);return}
 const nn=Math.max(0,...S.log.map(e=>e.n))+1;S.log=[...S.log,{n:nn,w,a}].slice(-20);msg.w=msg.a='';save()}
else if(b.id==='ask')msg.sure=true;else if(b.id==='no')msg.sure=false;
else if(b.id==='reset'){S.log=sample;msg.sure=false;save()}else return;render()});
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
render();
