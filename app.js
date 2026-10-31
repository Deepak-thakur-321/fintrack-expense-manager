const K="fintrack_v3",$=i=>document.getElementById(i);
const I={home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',list:'<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',chart:'<path d="M5 20V11M12 20V4M19 20v-6"/>',sl:'<path d="M4 6h9M19 6h1M4 12h3M13 12h7M4 18h11M21 18h-1"/><circle cx="16" cy="6" r="2.2"/><circle cx="10" cy="12" r="2.2"/><circle cx="18" cy="18" r="2.2"/>',plus:'<path d="M12 5v14M5 12h14"/>',dl:'<path d="M17 7L7 17M17 17H7V7"/>',ur:'<path d="M7 17L17 7M7 7h10v10"/>',
food:'<path d="M6 3v7a2 2 0 0 0 2 2v9M10 3v7a2 2 0 0 1-2 2M18 21V3c-2 1-3 4-3 8h3"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="3"/><path d="M4 11h16M8 20v-3M16 20v-3"/>',bag:'<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8a3 3 0 0 1 6 0"/>',zap:'<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',play:'<circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z"/>',swap:'<path d="M7 7h13M16 3l4 4-4 4M17 17H4M8 13l-4 4 4 4"/>',grid:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',wallet:'<path d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z"/><path d="M4 7l12-3v3M16 14h4"/>',store:'<path d="M4 9l1-5h14l1 5M4 9v11h16V9M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9M10 20v-5h4v5"/>',
phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',cash:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/>',bank:'<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',pie:'<circle cx="12" cy="12" r="9"/><path d="M12 3v9h9"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',zero:'<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>',pct:'<path d="M5 19L19 5"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>',send:'<path d="M21 3L3 11l7 3 3 7 8-18z"/>',chev:'<path d="M6 9l6 6 6-6"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'};
const ic=(n,s=20)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;
const icons=()=>document.querySelectorAll("[data-i]").forEach(e=>{e.outerHTML=ic(e.dataset.i,+e.dataset.s||20)});
const CATS={Food:["food","#E8590C"],Travel:["bus","#4A4AF4"],Shopping:["bag","#D6336C"],Bills:["zap","#D9A400"],Health:["heart","#0E9F6E"],Entertainment:["play","#1C7ED6"],Lending:["swap","#F76707"],Salary:["wallet","#0E9F6E"],Stay:["home","#7C3AED"],"Added money":["wallet","#0E9F6E"],Refund:["swap","#0C8599"],Received:["wallet","#0E9F6E"],Bonus:["wallet","#7C3AED"],Freelance:["store","#0C8599"],Business:["store","#0C8599"],Other:["grid","#6B7084"]};
const EXP=["Food","Travel","Shopping","Bills","Health","Entertainment","Lending","Other"],INC=["Bonus","Business","Freelance","Other"],EXPT=["Food","Travel","Stay","Shopping","Entertainment","Health","Other"],INCT=["Added money","Refund","Received","Other"];
const MODES={UPI:"phone",Cash:"cash",Card:"card",Bank:"bank"},RATES=[5,12,18,28],MN=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const METHODS=[
{id:"50-30-20",n:"50/30/20 Rule",i:"pie",d:"50% needs, 30% wants, 20% savings.",f:(s,g)=>{const p=s-g;return`Needs up to ₹${rn(p*.625)} · Wants up to ₹${rn(p*.375)} · Saving ₹${rn(g)}`}},
{id:"envelope",n:"Envelope Method",i:"mail",d:"Split money into category envelopes.",f:(s,g)=>{const p=s-g;return`Food ₹${rn(p*.3)} · Travel ₹${rn(p*.2)} · Bills ₹${rn(p*.25)} · Other ₹${rn(p*.25)}`}},
{id:"pay-yourself",n:"Pay Yourself First",i:"wallet",d:"Save first, spend what's left.",f:(s,g)=>`Move ₹${rn(g)} to savings first, then spend the remaining ₹${rn(s-g)}`},
{id:"zero-based",n:"Zero-Based Budget",i:"zero",d:"Every rupee gets a job.",f:(s,g)=>`Savings ₹${rn(g)} + expenses ₹${rn(s-g)} = ₹0 left over`},
{id:"80-20",n:"80/20 Simple",i:"pct",d:"Save 20%, spend the rest freely.",f:(s,g)=>`Spend freely up to ₹${rn(s-g)} · Auto-save ₹${rn(g)}`}];
const rn=n=>Math.round(n).toLocaleString("en-IN");
const ld=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const today=()=>ld(new Date()),startOf=n=>{const d=new Date();return ld(new Date(d.getFullYear(),d.getMonth()-(n-1),1))};
const rs=n=>(n<0?"-":"")+"₹"+Math.abs(n).toLocaleString("en-IN",{maximumFractionDigits:2});
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const sum=(l,t)=>l.filter(x=>x.type===t).reduce((a,x)=>a+x.amount,0);
const gstAmt=t=>t.gst?t.amount-t.amount*100/(100+t.gst):0,inP=(t,n)=>ml(n).includes(t.date.slice(0,7));

const curM=()=>today().slice(0,7);
const MAIN={id:"main",name:"Monthly Budget",type:"monthly"};
const STY={Trip:["send","#4A4AF4"],Event:["play","#D6336C"],Shopping:["bag","#E8590C"],Work:["store","#0C8599"],Other:["grid","#6B7084"]};
const TXS=id=>st.tx.filter(t=>(t.sp||"main")===id),TX=()=>TXS(st.cur);
function SP(){if(st.cur==="main")return MAIN;const x=st.spaces.find(q=>q.id===st.cur);if(x)return x;st.cur="main";return MAIN}
const isM=()=>SP().type==="monthly",sty=sp=>sp.type==="monthly"?["wallet","#4A4AF4"]:(STY[sp.type]||STY.Other),cats=t=>isM()?(t==="expense"?EXP:INC):(t==="expense"?EXPT:INCT);
function fund(sp){const l=TXS(sp.id),ex=sum(l,"expense"),funds=sp.budget+sum(l,"income");return{ex,funds,left:funds-ex}}
function spDays(sp,l){const f=[sp.created||today(),...l.map(t=>t.date)].sort()[0];return Math.max(1,Math.round((new Date(today()+"T00:00")-new Date(f+"T00:00"))/864e5)+1)}
function overOk(a){if(isM()){if(st.budget<=0)return true;const ex=sum(TX().filter(t=>inP(t,1)),"expense");return ex+a<=st.budget||confirm("This crosses your monthly budget. Add anyway?")}
 return a<=fund(SP()).left||confirm("This is more than the money left in this space. Add anyway?")}
function labels(a){["hLbl","hIL","hEL","hb1","hb2","bTtl"].forEach((id,i)=>$(id).textContent=a[i])}
function spChips(){const sp=SP();document.querySelectorAll(".spc").forEach(e=>e.innerHTML=ic(sty(sp)[0],16)+`<span class="spn">${esc(sp.name)}</span>`+ic("chev",14))}
function applySp(){const m=isM();["cInc","cSal","cMet","cQ3","cHM"].forEach(i=>$(i).style.display=m?"":"none");$("cSp").style.display=m?"none":"";$("cNS").style.display=(m&&!st.spaces.length)?"":"none";$("rT").textContent=m?"Income vs expense":"Budget overview"}
function openSpaces(){$("spList").innerHTML=[MAIN,...st.spaces].map(sp=>{let sub;if(sp.type==="monthly"){const a=stats(1);sub=rs(a.inc-a.ex)+" left this month"}else{const f=fund(sp);sub=rs(f.left)+" left of "+rs(f.funds)}
 const k=sty(sp);return`<button class="spi ${sp.id===st.cur?"on":""}" onclick="pickSp('${sp.id}')"><div class="ic" style="background:${k[1]}1F;color:${k[1]}">${ic(k[0],20)}</div><div class="rm"><b>${esc(sp.name)}</b><small>${sp.type==="monthly"?"Monthly salary budget":sp.type} · ${sub}</small></div><span class="dot"></span></button>`}).join("");$("spo").classList.add("show")}
function closeSp(){$("spo").classList.remove("show")}
function pickSp(id){st.cur=id;F="all";save();closeSp();nav("home")}
let NT="Trip";
function ntypes(){chips("nType",Object.keys(STY),NT,"setNT",v=>ic(STY[v][0],16)+v)}
function setNT(v){NT=v;ntypes()}
function openNew(){closeSp();NT="Trip";$("nName").value="";$("nBud").value="";$("nEnd").value="";ntypes();$("nsp").classList.add("show");setTimeout(()=>$("nName").focus(),120)}
function createSp(){const name=$("nName").value.trim(),b=num("nBud");if(!name)return toast("Enter a name");if(b<=0)return toast("Enter a budget");
 const id="s"+Date.now();st.spaces.push({id,name,type:NT,budget:b,end:$("nEnd").value||"",created:today()});st.cur=id;save();$("nsp").classList.remove("show");nav("home");toast("Space created")}
function spForm(){if(isM())return;const sp=SP();$("eName").value=sp.name;setN("eBud",sp.budget);$("eEnd").value=sp.end||""}
function saveSpace(){const sp=SP(),n=$("eName").value.trim(),b=num("eBud");if(!n)return toast("Enter a name");if(b<=0)return toast("Enter a budget");
 sp.name=n;sp.budget=b;sp.end=$("eEnd").value||"";save();render();toast("Space updated")}
function delSpace(){const sp=SP();if(!confirm('Delete "'+sp.name+'" and all its transactions?'))return;
 st.tx=st.tx.filter(t=>t.sp!==sp.id);st.spaces=st.spaces.filter(q=>q.id!==sp.id);st.cur="main";save();nav("home");toast("Space deleted")}
function ml(n){const d=new Date(),a=[];for(let k=n-1;k>=0;k--){const x=new Date(d.getFullYear(),d.getMonth()-k,1);a.push(x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0"))}return a}
function mall(){const a=[],c=curM();let [y,m]=st.since.split("-").map(Number);for(;;){const k=y+"-"+String(m).padStart(2,"0");if(k>c)break;a.push(k);if(++m>12){m=1;y++}}return a.length?a:[c]}
const salFor=m=>m<st.since?0:(st.sal[m]!=null?st.sal[m]:st.income);
function stats(n){const ms=n?ml(n):mall(),x=TXS("main").filter(t=>ms.includes(t.date.slice(0,7))),sal=ms.reduce((a,m)=>a+salFor(m),0);return{ms,x,sal,inc:sal+sum(x,"income"),ex:sum(x,"expense")}}
function load(){let s=null;try{s=JSON.parse(localStorage.getItem(K))}catch(e){}
 if(!s)return{init:false,income:0,goal:0,budget:0,method:"pay-yourself",tx:[],sal:{},since:curM(),spaces:[],cur:"main"};
 if(!s.tx){const tx=(s.expenses||[]).map(e=>({id:e.id,type:"expense",title:e.name,amount:e.amount,cat:e.cat,mode:"Cash",gst:0,date:e.date||today()}));
  s={init:!!s.initialized,income:s.salary||0,goal:s.savingsGoal||0,method:s.method||"pay-yourself",tx}}
 if(s.income==null)s.income=(s.budget||0)+(s.goal||0);
 if(!s.sal){s.sal={};const keep=[];s.tx.forEach(t=>{if(t.type==="income"&&t.cat==="Salary"&&t.title==="Salary"){const m=t.date.slice(0,7);s.sal[m]=(s.sal[m]||0)+t.amount}else keep.push(t)});s.tx=keep;
  s.since=[...s.tx.map(t=>t.date.slice(0,7)),...Object.keys(s.sal),curM()].sort()[0]}
 if(!s.since)s.since=curM();
 if(!s.spaces)s.spaces=[];if(!s.cur)s.cur="main";
 s.method=s.method||"pay-yourself";s.budget=Math.max(0,s.income-(s.goal||0));save(s);return s}
function save(s){localStorage.setItem(K,JSON.stringify(s||st))}
let st=load(),F="all",RP=1,ed=null,T={type:"expense",mode:"UPI",gst:0},M2=st.method;

function fi(el){let v=el.value.replace(/[^\d.]/g,"");const p=v.split(".");let i=p[0].replace(/^0+(?=\d)/,"");
 i=i?Number(i).toLocaleString("en-IN"):(p.length>1?"0":"");el.value=p.length>1?i+"."+p.slice(1).join("").slice(0,2):i}
const num=id=>parseFloat($(id).value.replace(/,/g,""))||0,setN=(id,v)=>{$(id).value=v?Number(v).toLocaleString("en-IN"):""};
function toast(m){const t=$("toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function nav(n){["home","tx","rep","set"].forEach(x=>{$("v_"+x).classList.toggle("on",x===n);$("n_"+x).classList.toggle("on",x===n)});
 if(n==="set"){setN("sInc",st.income);setN("sGoal",st.goal);M2=st.method;mgrid("stM");bud();salRender();spForm()}render();scrollTo(0,0)}
function bud(){const b=num("sInc")-num("sGoal");$("sBud").textContent=b>0?"Spendable budget: "+rs(b)+" per month":""}
document.addEventListener("input",e=>{if(e.target.id==="sInc"||e.target.id==="sGoal")bud()});
function mgrid(id){$(id).innerHTML=METHODS.map(m=>`<button class="mc ${M2===m.id?"on":""}" onclick="M2='${m.id}';mgrid('${id}')"><div class="ci">${ic(m.i,18)}</div><div><b>${m.n}</b><small>${m.d}</small></div></button>`).join("")}

function tile(c,s=42){const k=CATS[c]||CATS.Other;return`<div class="ic" style="background:${k[1]}1F;color:${k[1]};width:${s}px;height:${s}px">${ic(k[0],20)}</div>`}
function row(t){const i=t.type==="income";
 return`<div class="row" onclick="openSheet(${t.id})">${tile(t.cat)}<div class="rm"><b>${esc(t.title)}</b><small>${t.mode} · ${t.cat}${t.gst?" · GST "+t.gst+"%":""}</small></div><div class="amt ${i?"pos":"neg"}">${i?"+":"−"}${rs(t.amount)}</div></div>`}
const sorted=l=>[...l].sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id);
const empty=(i,m)=>`<div class="empty">${ic(i,34)}${m}</div>`;

function topHtml(l,ex){const by={};l.forEach(t=>by[t.cat]=(by[t.cat]||0)+t.amount);const tc=Object.entries(by).sort((a,b)=>b[1]-a[1]).slice(0,4);
 return tc.length?tc.map(([c,a])=>{const k=CATS[c]||CATS.Other,pc=ex>0?a/ex*100:0;return`<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">${tile(c,38)}<div style="flex:1;min-width:0"><div class="sp" style="margin-bottom:6px"><b style="font-size:14px">${c}</b><span class="mu"><b style="color:var(--ink)">${rs(a)}</b> · ${pc.toFixed(0)}%</span></div><div class="bar"><i style="width:${pc}%;background:${k[1]}"></i></div></div></div>`}).join(""):empty("chart","Add expenses to see where your money goes")}
function render(){spChips();applySp();if(isM())renderM();else renderSp();renderTx();renderRep()}
function renderM(){
 labels(["Balance this month","Income","Expense","Add income","Add expense","Monthly budget"]);
 const d=new Date(),h=d.getHours(),td=today();$("gr").textContent=h<12?"Good morning":h<17?"Good afternoon":"Good evening";
 const s1=stats(1),inc=s1.inc,ex=s1.ex;
 $("hBal").textContent=rs(inc-ex);$("hInc").textContent=rs(inc);$("hExp").textContent=rs(ex);
 const b=st.budget,p=b>0?Math.min(100,ex/b*100):0,bar=$("bBar");
 bar.style.width=p+"%";bar.style.background=p<60?"var(--ok)":p<85?"var(--warn)":"var(--bad)";
 $("bTxt").textContent=b>0?rs(ex)+" of "+rs(b)+" spent":"No budget set";$("bPct").textContent=b>0?p.toFixed(0)+"%":"";
 $("bLeft").textContent=b>0?(b-ex>=0?rs(b-ex)+" left":"Over by "+rs(ex-b)):"";
 $("bSave").textContent=st.goal>0?"Saved "+rs(Math.max(0,inc-ex))+" / "+rs(st.goal):"";
 const dim=new Date(d.getFullYear(),d.getMonth()+1,0).getDate(),left=dim-d.getDate()+1;
 $("bDay").textContent=b>0?(b>ex?"You can spend about "+rs(Math.round((b-ex)/left))+" per day for the next "+left+" day"+(left>1?"s":"")+".":"Your monthly budget is fully used."):"";
 const exs=TXS("main").filter(t=>t.type==="expense"),wk=ld(new Date(Date.now()-6*864e5));
 $("sT").textContent=rs(sum(exs.filter(t=>t.date===td),"expense"));$("sW").textContent=rs(sum(exs.filter(t=>t.date>=wk&&t.date<=td),"expense"));$("sA").textContent=rs(Math.round(ex/d.getDate()));
 $("topc").innerHTML=topHtml(s1.x.filter(t=>t.type==="expense"),ex);
 const s3=stats(3),pc3=s3.inc>0?Math.min(100,s3.ex/s3.inc*100):0,sv=s3.inc-s3.ex;
 $("q3i").textContent=rs(s3.inc);$("q3e").textContent=rs(s3.ex);$("q3s").textContent=rs(sv);$("q3s").className=sv>=0?"pos":"neg";
 $("q3b").style.width=pc3+"%";$("q3b").style.background=pc3<75?"var(--ok)":pc3<95?"var(--warn)":"var(--bad)";
 $("q3t").textContent="You spent "+pc3.toFixed(0)+"% of your income in the last 3 months.";
 const mt=METHODS.find(x=>x.id===st.method)||METHODS[2];$("mTitle").textContent=mt.n;$("mInfo").textContent=mt.f(st.income,st.goal);
 const r=sorted(TX()).slice(0,5);$("recent").innerHTML=r.length?r.map(row).join(""):empty("list","No transactions yet. Tap + to add your first one.")}
function renderSp(){const sp=SP(),l=TX(),f=fund(sp),td=today(),ex=l.filter(t=>t.type==="expense");
 labels(["Money left","Budget","Spent","Add money","Add expense","Budget used"]);
 $("gr").textContent=sp.type+(sp.end?" · till "+dl(sp.end):"");
 $("hBal").textContent=rs(f.left);$("hInc").textContent=rs(f.funds);$("hExp").textContent=rs(f.ex);
 const p=f.funds>0?Math.min(100,f.ex/f.funds*100):0,bar=$("bBar");bar.style.width=p+"%";bar.style.background=p<60?"var(--ok)":p<85?"var(--warn)":"var(--bad)";
 $("bTxt").textContent=rs(f.ex)+" of "+rs(f.funds)+" spent";$("bPct").textContent=p.toFixed(0)+"%";
 $("bLeft").textContent=f.left>=0?rs(f.left)+" left":"Over by "+rs(-f.left);$("bSave").textContent="";
 const days=spDays(sp,l);let msg;
 if(sp.end&&sp.end>=td){const n=Math.round((new Date(sp.end+"T00:00")-new Date(td+"T00:00"))/864e5)+1;msg=f.left>0?"You can spend about "+rs(Math.round(f.left/n))+" per day for the next "+n+" day"+(n>1?"s":"")+".":"Your budget is fully used."}
 else msg=f.left>0?"Average spend so far: "+rs(Math.round(f.ex/days))+" per day.":"Your budget is fully used.";
 $("bDay").textContent=msg;
 const wk=ld(new Date(Date.now()-6*864e5));
 $("sT").textContent=rs(sum(ex.filter(t=>t.date===td),"expense"));$("sW").textContent=rs(sum(ex.filter(t=>t.date>=wk&&t.date<=td),"expense"));$("sA").textContent=rs(Math.round(f.ex/days));
 $("topc").innerHTML=topHtml(ex,f.ex);
 const r=sorted(l).slice(0,5);$("recent").innerHTML=r.length?r.map(row).join(""):empty("list","No expenses yet. Tap + to add the first one.")}

function dl(s){const t=today(),y=ld(new Date(Date.now()-864e5));if(s===t)return"Today";if(s===y)return"Yesterday";const d=new Date(s+"T00:00");return d.getDate()+" "+MN[d.getMonth()]+" "+d.getFullYear()}
function renderTx(){const n=+$("fPer").value,md=$("fMode").value;let l=sorted(TX());
 if(n)l=l.filter(t=>inP(t,n));if(F!=="all")l=l.filter(t=>t.type===F);if(md)l=l.filter(t=>t.mode===md);
 const inV=F==="income",tot=sum(l,inV?"income":"expense"),cnt=l.filter(t=>t.type===(inV?"income":"expense")).length;
 $("hsL").textContent=inV?"Extra income received":"Total spent";$("hsT").textContent=rs(tot);
 let sub=cnt+(inV?" income entr"+(cnt===1?"y":"ies"):" expense"+(cnt===1?"":"s"));
 if(!inV&&F==="all"&&!md){if(isM()){const s=stats(n);sub+=" · Income "+rs(s.inc)+" · Left "+rs(s.inc-s.ex)}else{const f=fund(SP());sub+=" · Budget "+rs(f.funds)+" · Left "+rs(f.left)}}
 $("hsS").textContent=sub;
 if(!l.length){$("txList").innerHTML=empty("search","No transactions found");return}
 const de={},di={};l.forEach(t=>{if(t.type==="expense")de[t.date]=(de[t.date]||0)+t.amount;else di[t.date]=(di[t.date]||0)+t.amount});
 let h="",last="";l.forEach(t=>{if(t.date!==last){const r=de[t.date]?"Spent "+rs(de[t.date]):"Received "+rs(di[t.date]);h+=(last?"</div>":"")+`<div class="dl sp"><span>${dl(t.date)}</span><span>${r}</span></div><div class="card" style="margin-top:8px;padding:4px 14px">`;last=t.date}h+=row(t)});
 $("txList").innerHTML=h+"</div>"}
function setF(f,el){F=f;document.querySelectorAll("#v_tx .chip.on").forEach(x=>x.classList.remove("on"));el.classList.add("on");renderTx()}

function renderRep(){let exl;
 if(isM()){const P=[[1,"This month"],[3,"Last 3 months"],[6,"Last 6 months"],[12,"Last 1 year"]];
  $("ptab").innerHTML=P.map(([n,l])=>{const s=stats(n),net=s.inc-s.ex,pc=s.inc>0?Math.min(100,s.ex/s.inc*100):0,mc=s.ms.filter(m=>m>=st.since).length||1;
   return`<div class="pt ${RP===n?"on":""}" onclick="RP=${n};renderRep()"><div class="sp"><b>${l}</b><span class="mu">${mc} month${mc>1?"s":""} tracked</span></div><div class="p3"><div><small>Income</small><span class="pos">${rs(s.inc)}</span></div><div><small>Spent</small><span class="neg">${rs(s.ex)}</span></div><div><small>Saved</small><span class="${net>=0?"pos":"neg"}">${rs(net)}</span></div></div><div class="bar" style="margin-top:12px"><i style="width:${pc}%;background:${pc<75?"var(--ok)":pc<95?"var(--warn)":"var(--bad)"}"></i></div><div class="mu" style="margin-top:8px">Spent ${pc.toFixed(0)}% of income · Avg ${rs(s.ex/mc)} per month</div></div>`}).join("");
  const n=RP===1?6:RP,ms=ml(n),all=TXS("main");
  const dat=ms.map(k=>{const x=all.filter(t=>t.date.slice(0,7)===k);return[MN[+k.slice(5)-1],salFor(k)+sum(x,"income"),sum(x,"expense")]}),mx=Math.max(1,...dat.flatMap(a=>[a[1],a[2]]));
  $("chT").textContent="Month by month · last "+n+" months";
  $("chart").innerHTML=dat.map(([l,i,e])=>`<div><p><i style="height:${i/mx*100}%;background:var(--ok)"></i><i style="height:${e/mx*100}%;background:var(--pri)"></i></p><small>${l}</small></div>`).join("");
  exl=stats(RP).x.filter(t=>t.type==="expense")
 }else{const sp=SP(),l=TX(),f=fund(sp),pc=f.funds>0?Math.min(100,f.ex/f.funds*100):0,days=spDays(sp,l);exl=l.filter(t=>t.type==="expense");
  $("ptab").innerHTML=`<div class="pt on"><div class="sp"><b>${esc(sp.name)}</b><span class="mu">${days} day${days>1?"s":""}</span></div><div class="p3"><div><small>Budget</small><span class="pos">${rs(f.funds)}</span></div><div><small>Spent</small><span class="neg">${rs(f.ex)}</span></div><div><small>Left</small><span class="${f.left>=0?"pos":"neg"}">${rs(f.left)}</span></div></div><div class="bar" style="margin-top:12px"><i style="width:${pc}%;background:${pc<75?"var(--ok)":pc<95?"var(--warn)":"var(--bad)"}"></i></div><div class="mu" style="margin-top:8px">Spent ${pc.toFixed(0)}% of budget · Avg ${rs(f.ex/days)} per day</div></div>`;
  const dm={};exl.forEach(t=>dm[t.date]=(dm[t.date]||0)+t.amount);const dk=Object.keys(dm).sort().slice(-14),mx=Math.max(1,...dk.map(k=>dm[k]));
  $("chT").textContent="Spending by day";
  $("chart").innerHTML=dk.length?dk.map(k=>`<div><p><i style="height:${dm[k]/mx*100}%;background:var(--pri)"></i></p><small>${+k.slice(8)}</small></div>`).join(""):empty("chart","No spending yet")}
 const tot=sum(exl,"expense"),by={};exl.forEach(t=>by[t.cat]=(by[t.cat]||0)+t.amount);
 const g=exl.reduce((a,t)=>a+gstAmt(t),0);$("gstT").textContent=g>0?"GST paid "+rs(+g.toFixed(2)):"";
 const e=Object.entries(by).sort((a,b)=>b[1]-a[1]);
 $("cats").innerHTML=e.length?e.map(([c,a])=>{const k=CATS[c]||CATS.Other,pc=a/tot*100;return`<div style="margin-bottom:14px"><div class="sp" style="margin-bottom:6px"><span style="font-size:13px;font-weight:700">${c}</span><span class="mu"><b style="color:var(--ink)">${rs(a)}</b> · ${pc.toFixed(0)}%</span></div><div class="bar"><i style="width:${pc}%;background:${k[1]}"></i></div></div>`}).join(""):empty("chart","No spending in this period")}

function chips(el,list,sel,fn,f){$(el).innerHTML=list.map(v=>`<button class="chip ${v===sel?"on":""}" onclick="${fn}('${v}')" style="display:flex;align-items:center;gap:6px">${f(v)}</button>`).join("")}
function setType(t){T.type=t;$("tE").className=t==="expense"?"e":"";$("tI").className=t==="income"?"i":"";
 const l=cats(t),cur=$("fc").value;$("fc").innerHTML=l.map(c=>`<option>${c}</option>`).join("");$("fc").value=l.includes(cur)?cur:l[0]}
function setMode(m){T.mode=m;chips("fm",Object.keys(MODES),m,"setMode",v=>ic(MODES[v],16)+v)}
function setRate(r){T.gst=+r;calc()}
function calc(){const on=$("fg").checked,a=num("fa");$("fr").style.display=on?"flex":"none";
 if(!on){T.gst=0;$("gi").style.display="none";return}
 if(!T.gst)T.gst=18;chips("fr",RATES,T.gst,"setRate",v=>v+"%");$("fr").querySelectorAll(".chip").forEach(b=>b.onclick=()=>setRate(b.textContent.replace("%","")));
 const base=a*100/(100+T.gst),g=a-base,gi=$("gi");gi.style.display="block";
 gi.innerHTML=`Base <b>${rs(+base.toFixed(2))}</b> + GST ${T.gst}% <b>${rs(+g.toFixed(2))}</b> = <b>${rs(a)}</b>`}
function openSheet(id,type){ed=id||null;const t=id?st.tx.find(x=>x.id===id):null;
 T={type:t?t.type:(type||"expense"),mode:t?t.mode:"UPI",gst:t?t.gst:0};setType(T.type);setMode(T.mode);
 setN("fa",t?t.amount:"");$("ft").value=t?t.title:"";$("fd").value=t?t.date:today();
 if(t)$("fc").value=t.cat;$("fg").checked=isM()&&!!T.gst;$("gstw").style.display=isM()?"":"none";$("fdel").style.display=t?"block":"none";calc();
 $("sh").classList.add("show");if(!t)setTimeout(()=>$("fa").focus(),120)}
function closeSheet(){$("sh").classList.remove("show")}
function saveTx(){const a=num("fa"),title=$("ft").value.trim();
 if(a<=0)return toast("Enter a valid amount");if(!title)return toast("Enter a title");
 const o={type:T.type,title,amount:a,cat:$("fc").value,mode:T.mode,gst:$("fg").checked?T.gst:0,date:$("fd").value||today()};
 if(ed){const i=st.tx.findIndex(x=>x.id===ed);st.tx[i]={...st.tx[i],...o}}
 else{if(o.type==="expense"&&!overOk(a))return;
  st.tx.push({id:Date.now(),sp:st.cur,...o})}
 save();closeSheet();render();toast(ed?"Transaction updated":"Transaction saved")}
function delTx(){if(!confirm("Delete this transaction?"))return;st.tx=st.tx.filter(x=>x.id!==ed);save();closeSheet();render();toast("Transaction deleted")}

function salRender(){$("sSince").value=st.since;$("salList").innerHTML=mall().slice(-24).reverse().map(m=>`<div class="sr"><span>${MN[+m.slice(5)-1]} ${m.slice(0,4)}</span><input class="in" inputmode="decimal" data-m="${m}" value="${Number(salFor(m)).toLocaleString("en-IN")}" oninput="fi(this)"></div>`).join("")}
function saveSal(){document.querySelectorAll("#salList input").forEach(i=>{const v=parseFloat(i.value.replace(/,/g,""))||0;if(v===st.income)delete st.sal[i.dataset.m];else st.sal[i.dataset.m]=v});save();render();toast("Salaries saved")}
function setSince(){let v=$("sSince").value;if(!v)return;const f=TXS("main").map(t=>t.date.slice(0,7)).sort()[0];if(f&&v>f)v=f;if(v>curM())v=curM();st.since=v;save();salRender();render();toast("Start month updated")}
function saveSet(){const i=num("sInc"),g=num("sGoal");if(i<=0)return toast("Enter your income");if(g>=i)return toast("Savings goal must be less than income");
 if(i!==st.income){const c=curM();mall().forEach(m=>{if(m<c&&st.sal[m]==null)st.sal[m]=st.income});delete st.sal[c]}
 st.income=i;st.goal=g;st.budget=i-g;st.method=M2;save();render();salRender();toast("Saved · Budget "+rs(st.budget)+" per month")}
let OS=0,OI=0,OG=0;
function obRender(){const a='<div class="aw"><span>₹</span><input id="oIn" enterkeyhint="next" inputmode="decimal" placeholder="0" oninput="fi(this);obHint()"></div>';
 const S=[["What's your monthly income?","We use this to work out your monthly budget. You can change it anytime in Settings.",a],
 ["How much do you want to save each month?","This amount is set aside first. The rest becomes your spendable budget.",a+'<div class="mu" id="oHint" style="margin-top:14px;font-size:14px"></div>'],
 ["Choose a money method","Pick how you want to plan your spending. You can switch anytime.",'<div class="ml" id="obM"></div>']][OS];
 $("obStep").textContent="Step "+(OS+1)+" of 3";$("obDots").innerHTML=[0,1,2].map(i=>`<i class="${i<=OS?"on":""}"></i>`).join("");
 $("obT").textContent=S[0];$("obS").textContent=S[1];$("obB").innerHTML=S[2];
 $("obBack").style.display=OS?"block":"none";$("obNext").textContent=OS===2?"Start tracking":"Continue";
 if(OS<2){setN("oIn",OS?OG:OI);obHint();setTimeout(()=>{const e=$("oIn");if(e)e.focus()},80)}else mgrid("obM");vv()}
function obHint(){const h=$("oHint");if(!h)return;const b=OI-num("oIn");h.textContent=b>0?"Your spendable budget: "+rs(b)+" per month":""}
function obNext(){
 if(OS===0){const v=num("oIn");if(v<=0)return toast("Enter your monthly income");OI=v}
 else if(OS===1){const v=num("oIn");if(v<=0)return toast("Enter a savings goal");if(v>=OI)return toast("Savings goal must be less than income");OG=v}
 else return obDone();
 OS++;obRender();scrollTo(0,0)}
function obBack(){if(OS===1)OG=num("oIn")||OG;if(OS>0){OS--;obRender()}}
function obDone(){st.income=OI;st.goal=OG;st.budget=OI-OG;st.method=M2;st.init=true;
 st.since=curM();st.sal={};save();
 document.body.classList.remove("onb");render();scrollTo(0,0);toast("You're all set")}
function exportData(){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(st,null,2)],{type:"application/json"}));a.download="fintrack-backup.json";a.click()}
function importData(inp){const f=inp.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!Array.isArray(d.tx))throw 0;st=d;st.init=true;save();st=load();render();toast("Backup restored")}catch(e){toast("Invalid backup file")}};r.readAsText(f)}
function resetAll(){if(!confirm("Delete all data and reset?"))return;localStorage.removeItem(K);location.reload()}

document.addEventListener("keydown",e=>{if(e.key!=="Enter"||e.shiftKey)return;const id=e.target.id;
 if(id==="oIn"){e.preventDefault();obNext()}else if(id==="fa"){e.preventDefault();$("ft").focus()}else if(id==="ft"){e.preventDefault();saveTx()}});
function vv(){const v=window.visualViewport,o=$("ob");if(!v||!document.body.classList.contains("onb"))return;o.style.top=v.offsetTop+"px";o.style.bottom="auto";o.style.height=v.height+"px"}
if(window.visualViewport){visualViewport.addEventListener("resize",vv);visualViewport.addEventListener("scroll",vv)}
icons();render();if(!st.init){document.body.classList.add("onb");obRender()}
if("serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}));