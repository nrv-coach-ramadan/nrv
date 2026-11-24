// Accounts + cross-device sync (Supabase Auth + Postgres with row-level security).
// Demo only: fictional data. Leave NRV_SYNC.url empty to switch accounts off (app stays single-device).
const CFG=window.NRV_SYNC||{};
const cloudAvail=()=>!!(CFG.url&&CFG.key);
const A={on:false,demo:false,sess:null,me:null,role:null,err:'',busy:false,tab:'l',f:{u:'',n:''},seen:{},cseen:{},dirty:{},chk:{},stash:null,t:null,msg:'',loading:false};
try{A.sess=JSON.parse(localStorage.getItem('nrv.sess')||'null')}catch(e){}
A.loading=cloudAvail()&&!!A.sess;
const CL={ar:{gTitle:'ادخل على NRV',tl:'دخول',tr:'حساب جديد',name:'الاسم',user:'اسم المستخدم (حروف إنجليزي صغيرة وأرقام و _ ، من 3 لـ 20)',pass:'كلمة السر (8 حروف أو أكتر)',login:'ادخل',reg:'سجّل كعميل',demo:'جرّب النسخة التجريبية بدون حساب',note:'تجربة: استخدم أسماء وبيانات وهمية بس.',acc:'حسابي',as:'داخل باسم',rC:'مدرب',rK:'عميل',out:'اخرج',link:'رابط التسجيل للعملاء',copy:'انسخ الرابط',copied:'اتنسخ',none:'لسه مفيش عملاء مسجلين',noneH:'ابعت الرابط للعميل. أول ما يسجّل هيظهر هنا وتقدر تعمله برنامجه.',wait:'جاري التحميل...',synced:'متزامن',offline:'مفيش اتصال، هيحاول تاني',updated:'اتحدّث من جهاز تاني',cDone:'تم',reload:'حدّث',
e:{bad:'اسم المستخدم أو كلمة السر غلط',taken:'اسم المستخدم ده مستخدم، جرّب غيره',user:'اسم المستخدم لازم يكون 3 لـ 20 حرف إنجليزي صغير أو رقم أو _',pass:'كلمة السر لازم 8 حروف على الأقل',name:'اكتب الاسم',net:'مفيش اتصال بالإنترنت',rate:'محاولات كتير، استنى دقيقة وجرّب تاني',off:'التسجيل مقفول حاليًا',other:'حصلت مشكلة، جرّب تاني'}},
en:{gTitle:'Sign in to NRV',tl:'Sign in',tr:'New account',name:'Name',user:'Username (lowercase English letters, digits and _, 3 to 20)',pass:'Password (8 or more characters)',login:'Sign in',reg:'Register as client',demo:'Try the local demo without an account',note:'Test version: use fictional names and data only.',acc:'My account',as:'Signed in as',rC:'Coach',rK:'Client',out:'Sign out',link:'Client registration link',copy:'Copy link',copied:'Copied',none:'No registered clients yet',noneH:'Send the link to your client. When they register they appear here and you can build their program.',wait:'Loading...',synced:'Synced',offline:'No connection, will retry',updated:'Updated from another device',cDone:'Done',reload:'Refresh',
e:{bad:'Wrong username or password',taken:'That username is taken, try another',user:'Username must be 3 to 20 lowercase English letters, digits or _',pass:'Password must be at least 8 characters',name:'Enter a name',net:'No internet connection',rate:'Too many attempts, wait a minute and retry',off:'Sign-up is currently closed',other:'Something went wrong, try again'}}};
const cl=()=>CL[lang]||CL.ar;
const TW={ar:{coachNote:'أي تعديل هنا بيظهر عند العميل على موبايله خلال ثواني. حسابات تجريبية، بيانات وهمية بس.',sampleProg:'',note:'نسخة تجريبية بحسابات حقيقية: استخدم أسماء وبيانات وهمية بس.',demo:'NRV'},en:{coachNote:'Any change here shows on the client phone within seconds. Test accounts, fictional data only.',sampleProg:'',note:'Test version with real accounts: use fictional names and data only.',demo:'NRV'}};
let TWbak=null;
function tweakT(on){if(on&&!TWbak){TWbak={};for(const l of['ar','en']){TWbak[l]={};for(const k in TW[l]){TWbak[l][k]=T[l][k];T[l][k]=TW[l][k]}}}else if(!on&&TWbak){for(const l of['ar','en'])for(const k in TW[l])T[l][k]=TWbak[l][k];TWbak=null}}
const cloudOn=()=>A.on;
const emailOf=u=>u+'@nrv-demo.test';
const base=()=>CFG.url.replace(/\/$/,'');
function saveSess(s){A.sess=s;try{if(s)localStorage.setItem('nrv.sess',JSON.stringify(s));else localStorage.removeItem('nrv.sess')}catch(e){}}
function setSess(r){const s={access_token:r.access_token,refresh_token:r.refresh_token,exp:Date.now()+(r.expires_in||3600)*1000-30000,uid:r.user&&r.user.id};saveSess(s);return s}
async function raw(path,opt,tok){const h=Object.assign({apikey:CFG.key,'Content-Type':'application/json'},opt.h||{});if(tok)h.Authorization='Bearer '+tok;const r=await fetch(base()+path,{method:opt.m||'GET',headers:h,body:opt.b?JSON.stringify(opt.b):undefined});let j=null;try{j=await r.json()}catch(e){}return{ok:r.ok,s:r.status,j}}
async function refresh(){if(!A.sess)return false;const r=await raw('/auth/v1/token?grant_type=refresh_token',{m:'POST',b:{refresh_token:A.sess.refresh_token}});if(!r.ok||!r.j||!r.j.access_token){return false}const u=A.sess.uid;setSess(r.j);A.sess.uid=A.sess.uid||u;return true}
async function api(path,opt){if(!A.sess)throw new Error('nosess');if(Date.now()>A.sess.exp&&!(await refresh())){cloudOut(true);throw new Error('expired')}let r=await raw(path,opt||{},A.sess.access_token);if(r.s===401&&(await refresh()))r=await raw(path,opt||{},A.sess.access_token);if(r.s===401){cloudOut(true);throw new Error('expired')}return r}
const errKey=(r)=>{const m=JSON.stringify(r.j||'');if(r.s===429)return'rate';if(/profiles_username|already registered|already exists|23505|Database error saving/i.test(m))return'taken';if(/invalid login|invalid_credentials/i.test(m))return'bad';if(/signup.*disabled|not allowed/i.test(m))return'off';return'other'};
function setErr(k){A.err=k?cl().e[k]||cl().e.other:''}
async function doAuth(kind){const u=(document.getElementById('cl-u')||{}).value||'',p=(document.getElementById('cl-p')||{}).value||'',n=((document.getElementById('cl-n')||{}).value||'').trim();A.f.u=u;A.f.n=n;const un=u.trim().toLowerCase();
 if(!/^[a-z0-9_]{3,20}$/.test(un)){setErr('user');return}
 if(kind==='r'&&!n){setErr('name');return}
 if(p.length<8){setErr('pass');return}
 A.busy=true;setErr('');render();
 try{let r;if(kind==='r'){r=await raw('/auth/v1/signup',{m:'POST',b:{email:emailOf(un),password:p,data:{display_name:n.slice(0,40)}}});if(r.ok&&!(r.j&&r.j.access_token)){setErr('other');A.busy=false;render();return}}
  else r=await raw('/auth/v1/token?grant_type=password',{m:'POST',b:{email:emailOf(un),password:p}});
  if(!r.ok||!r.j||!r.j.access_token){setErr(kind==='l'&&r.s>=400&&r.s<500&&r.s!==429?'bad':errKey(r));A.busy=false;render();return}
  setSess(r.j);A.f.u='';A.f.n='';await cloudEnter()}
 catch(e){setErr('net')}
 A.busy=false;render()}
async function cloudEnter(){A.loading=true;try{
  const pr=await api('/rest/v1/profiles?select=id,username,display_name,role&id=eq.'+A.sess.uid);
  if(!pr.ok||!pr.j||!pr.j[0]){throw new Error('noprofile')}
  A.me=pr.j[0];A.role=A.me.role;
  if(!A.on){A.stash={P,S}}
  const rolePrev=A.role;
  P={client:A.me.id,progs:{},meals:{},role:rolePrev==='coach'?'coach':'client'};
  S={done:{},eaten:{},log:[]};A.seen={};A.cseen={};A.dirty={};A.chk={};
  clients.length=0;
  if(A.role==='client'){clients.push({id:A.me.id,name:{ar:A.me.display_name,en:A.me.display_name}})}
  A.on=true;A.demo=false;tweakT(true);
  await pull(true);
  if(A.role==='coach'&&clients.length&&!clients.find(c=>c.id===P.client))P.client=clients[0].id;
  if(A.role==='coach')useChk(P.client);
  A.err='';clearInterval(A.t);A.t=setInterval(poll,5000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)poll()})
 }catch(e){if(A.sess){cloudOut(true)}A.err=cl().e.other}
 A.loading=false}
function useChk(cid){const c=A.chk[cid];S=c&&c.done&&c.eaten&&Array.isArray(c.log)?{done:c.done,eaten:c.eaten,log:c.log}:{done:{},eaten:{},log:[]}}
function planOf(row){const d=(row&&row.data)||{};return{progs:Array.isArray(d.progs)?d.progs:[],meals:Array.isArray(d.meals)?d.meals:[]}}
async function pull(first){
 // Cheap polling: ask only for ids and updated_at, then download full rows only for what changed.
 if(A.role==='coach'){
  const [pr,pl,ck]=await Promise.all([api('/rest/v1/profiles?select=id,username,display_name&role=eq.client&order=created_at.asc'),api('/rest/v1/plans?select=client_id,updated_at'),api('/rest/v1/checkins?select=client_id,updated_at')]);
  if(!pr.ok||!pl.ok||!ck.ok)throw new Error('pull');
  const ids=pr.j.map(x=>x.id);
  const same=ids.length===clients.length&&ids.every((x,i)=>clients[i].id===x);
  let ch=first||!same;
  if(!same){clients.length=0;pr.j.forEach(x=>clients.push({id:x.id,name:{ar:x.display_name||x.username,en:x.display_name||x.username},username:x.username}));if(!clients.find(c=>c.id===P.client))P.client=clients[0]?clients[0].id:null}
  const pv={},cv={};pl.j.forEach(x=>pv[x.client_id]=x.updated_at);ck.j.forEach(x=>cv[x.client_id]=x.updated_at);
  const needP=ids.filter(id=>(pv[id]||'none')!==A.seen[id]&&!A.dirty[id]);
  const needC=ids.filter(id=>cv[id]&&cv[id]!==A.cseen[id]);
  const fetchIn=(t,l)=>l.length?api('/rest/v1/'+t+'?select=client_id,data,updated_at&client_id=in.('+l.join(',')+')'):Promise.resolve({ok:true,j:[]});
  const [fp,fc]=await Promise.all([fetchIn('plans',needP.filter(id=>pv[id])),fetchIn('checkins',needC)]);
  if(!fp.ok||!fc.ok)throw new Error('pull');
  needP.forEach(id=>{const row=fp.j.find(x=>x.client_id===id);const p=planOf(row);P.progs[id]=p.progs;P.meals[id]=p.meals;A.seen[id]=pv[id]||'none';ch=true});
  ids.forEach(id=>{if(!P.progs[id]){P.progs[id]=[];P.meals[id]=[]}});
  fc.j.forEach(x=>{A.chk[x.client_id]=x.data;A.cseen[x.client_id]=x.updated_at;if(x.client_id===P.client)useChk(P.client);ch=true});
  return ch}
 const id=A.me.id;
 const [pl,ck]=await Promise.all([api('/rest/v1/plans?select=updated_at&client_id=eq.'+id),api('/rest/v1/checkins?select=updated_at&client_id=eq.'+id)]);
 if(!pl.ok||!ck.ok)throw new Error('pull');
 let ch=first;const ver=pl.j[0]?pl.j[0].updated_at:'none';
 if(A.seen[id]!==ver){const r=ver==='none'?{ok:true,j:[]}:await api('/rest/v1/plans?select=data,updated_at&client_id=eq.'+id);if(!r.ok)throw new Error('pull');const p=planOf(r.j[0]);P.progs[id]=p.progs;P.meals[id]=p.meals;A.seen[id]=ver;ch=true;if(!first)A.msg='updated'}
 const cver=ck.j[0]?ck.j[0].updated_at:null;
 if(cver&&cver!==A.cseen[id]&&!A.dirty.chk){const r=await api('/rest/v1/checkins?select=data,updated_at&client_id=eq.'+id);if(!r.ok)throw new Error('pull');const c=r.j[0];if(c&&c.data&&c.data.done&&c.data.eaten&&Array.isArray(c.data.log)){S={done:c.data.done,eaten:c.data.eaten,log:c.data.log};ch=true}A.cseen[id]=c?c.updated_at:cver}
 if(!P.progs[id]){P.progs[id]=[];P.meals[id]=[]}
 return ch}
let polling=false;
async function poll(){if(!A.on||polling||document.hidden)return;polling=true;try{const ch=await pull(false);if(A.msg==='offline')A.msg='';if(ch){const a=document.activeElement;if(!(a&&/INPUT|SELECT|TEXTAREA/.test(a.tagName)))render()}}catch(e){if(A.on&&A.sess)A.msg='offline'}polling=false;stat()}
function stat(){const el=document.getElementById('cl-st');if(el)el.textContent=A.msg?cl()[A.msg]||'':''}
function syncDirty(kind){if(!A.on)return;
 if(A.role==='coach'){if(kind==='p'&&P.client){A.dirty[P.client]=1;clearTimeout(A.pt);A.pt=setTimeout(pushPlans,600)}}
 else{if(kind==='s'){A.dirty.chk=1;clearTimeout(A.ct);A.ct=setTimeout(pushChk,600)}}}
async function pushPlans(){const ids=Object.keys(A.dirty).filter(k=>k!=='chk');for(const id of ids){try{const r=await api('/rest/v1/plans?on_conflict=client_id',{m:'POST',h:{Prefer:'resolution=merge-duplicates,return=representation'},b:{client_id:id,data:{progs:P.progs[id]||[],meals:P.meals[id]||[]},updated_at:new Date().toISOString(),updated_by:A.me.id}});if(r.ok&&r.j&&r.j[0]){A.seen[id]=r.j[0].updated_at;delete A.dirty[id];A.msg='synced'}else A.msg='offline'}catch(e){A.msg='offline'}}stat()}
async function pushChk(){if(A.role==='coach')return;try{const r=await api('/rest/v1/checkins?on_conflict=client_id',{m:'POST',h:{Prefer:'resolution=merge-duplicates,return=representation'},b:{client_id:A.me.id,data:{done:S.done,eaten:S.eaten,log:S.log},updated_at:new Date().toISOString()}});if(r.ok){delete A.dirty.chk;A.msg='synced';if(r.j&&r.j[0])A.cseen[A.me.id]=r.j[0].updated_at}else A.msg='offline'}catch(e){A.msg='offline'}stat()}
function cloudOut(silent){clearInterval(A.t);clearTimeout(A.pt);clearTimeout(A.ct);const tok=A.sess&&A.sess.access_token;saveSess(null);if(tok&&!silent)raw('/auth/v1/logout',{m:'POST'},tok).catch(()=>{});A.on=false;tweakT(false);A.me=null;A.role=null;A.loading=false;if(A.stash){P=A.stash.P;S=A.stash.S;A.stash=null}clients.length=0;clients.push({id:'c1',name:{ar:'عميل تجريبي ١',en:'Demo client 1'}},{id:'c2',name:{ar:'عميل تجريبي ٢',en:'Demo client 2'}});if(!silent){A.demo=false;A.err=''}setTimeout(()=>{if(typeof render==='function')render()},0)}
function cloudSelect(cid){if(A.role==='coach'){useChk(cid)}}
const gate=()=>cloudAvail()&&!A.on&&!A.demo;
function langBtns(){return Object.keys(LANGS).map(k=>`<button data-lang="${k}" class="${k===lang?'on':''}" aria-label="${LANGS[k].name}">${k.toUpperCase()}</button>`).join('')}
function gateHtml(){const c=cl();
 if(A.loading)return `<div class="screen"><header class="top"><div class="logo">N</div><div class="tt"><div class="title">NRV</div></div><div class="langs">${langBtns()}</div></header><div class="body"><div class="card note">${c.wait}</div></div></div>`;
 const reg=A.tab==='r';
 return `<div class="screen"><header class="top"><div class="logo">N</div><div class="tt"><div class="title">${c.gTitle}</div></div><div class="langs">${langBtns()}</div></header><div class="body"><div class="tabs"><button data-sy="tab-l" class="${reg?'':'on'}">${c.tl}</button><button data-sy="tab-r" class="${reg?'on':''}">${c.tr}</button></div>
<div class="card form">${reg?`<label>${c.name}<input id="cl-n" maxlength="40" autocomplete="name" value="${esc(A.f.n)}"></label>`:''}<label>${c.user}<input id="cl-u" dir="ltr" autocapitalize="none" autocomplete="username" spellcheck="false" maxlength="20" value="${esc(A.f.u)}"></label><label>${c.pass}<input id="cl-p" type="password" dir="ltr" autocomplete="${reg?'new-password':'current-password'}"></label>${A.err?`<div class="k" style="color:#b3261e" role="alert">${esc(A.err)}</div>`:''}<button class="btn" data-sy="${reg?'register':'login'}"${A.busy?' disabled':''}>${reg?c.reg:c.login}</button></div>
<div class="note">${c.note}</div><button class="btn ghost" data-sy="demo">${c.demo}</button></div></div>`}
const regLink=()=>location.origin+location.pathname;
function emptyHtml(){const c=cl();return topbar('NRV',A.me?A.me.display_name:'')+`<div class="body"><div class="card note"><b>${c.none}</b><br>${c.noneH}</div>${syncCard()}</div>`}
function syncCard(){if(!cloudAvail())return'';const c=cl();
 if(!A.on)return'';
 const link=A.role==='coach'?`<div class="k">${c.link}</div><div class="qbig"><b dir="ltr" style="font-size:13px;word-break:break-all">${esc(regLink())}</b></div><button class="btn sec" data-sy="copy">${c.copy}</button>`:'';
 return `<div class="card form sync"><div class="name">${c.acc}</div><div class="k">${c.as}: <b>${esc(A.me.display_name||A.me.username)}</b> (${A.role==='coach'?c.rC:c.rK}) · <span dir="ltr">${esc(A.me.username)}</span></div>${link}<div class="k" id="cl-st">${esc(A.msg?c[A.msg]||'':'')}</div><button class="btn ghost" data-sy="logout">${c.out}</button></div>`}
async function syAct(a){
 if(a==='tab-l'||a==='tab-r'){A.tab=a==='tab-r'?'r':'l';A.err='';return}
 if(a==='login'||a==='register'){await doAuth(a==='register'?'r':'l');return}
 if(a==='demo'){A.demo=true;A.err='';return}
 if(a==='logout'){cloudOut(false);return}
 if(a==='copy'){try{await navigator.clipboard.writeText(regLink());A.msg='copied'}catch(e){}setTimeout(()=>{A.msg='';stat()},2000);return}}
function cloudBoot(){if(!cloudAvail())return;if(A.sess){cloudEnter().then(render)}}
document.addEventListener('keydown',ev=>{if(ev.key==='Enter'&&/^cl-[unp]$/.test(ev.target.id||'')){ev.preventDefault();doAuth(A.tab==='r'?'r':'l').then(render)}});
