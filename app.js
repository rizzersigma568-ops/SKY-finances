const funds=[
{id:"in1",name:"HDFC Nifty 50 Index Fund",region:"India",type:"Index",expense:"0.20%",ret:"14.8%",aum:"₹18,240 Cr",bench:"NIFTY 50 TRI"},
{id:"in2",name:"Parag Parikh Flexi Cap Fund",region:"India",type:"Equity",expense:"0.62%",ret:"19.1%",aum:"₹86,510 Cr",bench:"NIFTY 500 TRI"},
{id:"in3",name:"SBI Short Duration Fund",region:"India",type:"Debt",expense:"0.42%",ret:"7.2%",aum:"₹12,880 Cr",bench:"CRISIL Short Duration"},
{id:"us1",name:"Vanguard S&P 500 ETF",region:"USA",type:"ETF",expense:"0.03%",ret:"16.4%",aum:"$610B",bench:"S&P 500"},
{id:"us2",name:"Vanguard Total Stock Market ETF",region:"USA",type:"ETF",expense:"0.03%",ret:"15.9%",aum:"$590B",bench:"CRSP US Total Market"},
{id:"us3",name:"Vanguard Total Bond Market ETF",region:"USA",type:"Bond",expense:"0.03%",ret:"5.1%",aum:"$335B",bench:"Bloomberg U.S. Aggregate"}
];
let compare=["in1","us1"], watch=["in2","us2"];
let portfolio=JSON.parse(localStorage.getItem("skyPortfolio")||"null")||[];
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
function show(view){$$(".screen").forEach(x=>x.classList.add("hidden"));$("#"+view).classList.remove("hidden");$$(".nav").forEach(x=>x.classList.toggle("active",x.dataset.view===view));$("#title").textContent={home:"Your global portfolio",explore:"Explore funds",compare:"Compare funds",portfolio:"Portfolio tracker",watchlist:"Your watchlist"}[view]}
function fund(id){return funds.find(x=>x.id===id)}
function drawFunds(){
 const q=($("#search")?.value||"").toLowerCase(),r=$("#region")?.value||"All",t=$("#type")?.value||"All";
 const list=funds.filter(f=>(r==="All"||f.region===r)&&(t==="All"||f.type===t)&&(f.name+" "+f.bench).toLowerCase().includes(q));
 $("#funds").innerHTML=list.map(f=>'<div class="fund"><div><b>'+f.name+'</b><small>'+f.region+' · '+f.type+' · '+f.bench+'</small></div><div><b>'+f.ret+'</b><small>return</small></div><div><b>'+f.expense+'</b><small>fee</small></div><div><b>'+f.aum+'</b><small>AUM</small></div><button class="link" data-add="'+f.id+'">'+(compare.includes(f.id)?"Added":"Compare")+'</button></div>').join("")||'<p class="note">No sample funds match those filters.</p>';
}
function drawCompare(){
 const sel=compare.map(fund).filter(Boolean);
 $("#compare-list").innerHTML='<div class="compare-pick">'+funds.map(f=>'<button class="'+(compare.includes(f.id)?"on":"")+'" data-pick="'+f.id+'">'+(compare.includes(f.id)?"✓ ":"")+f.name+'</button>').join("")+'</div>';
 if(!sel.length){$("#compare-table").innerHTML='<p class="note">Select up to four funds.</p>';return}
 let rows=[["Region","region"],["Category","type"],["Illustrative return","ret"],["Expense ratio","expense"],["AUM","aum"],["Benchmark","bench"]];
 $("#compare-table").innerHTML='<table class="compare-table"><thead><tr><th>Metric</th>'+sel.map(f=>'<th>'+f.name+'</th>').join("")+'</tr></thead><tbody>'+rows.map(x=>'<tr><td>'+x[0]+'</td>'+sel.map(f=>'<td>'+f[x[1]]+'</td>').join("")+'</tr>').join("")+'</tbody></table>';
}
function drawWatch(){
 $("#watch").innerHTML=watch.map(id=>{let f=fund(id);return '<div class="row"><div><b>'+f.name+'</b><small>'+f.region+' · '+f.type+'</small></div><b>'+f.ret+'</b><button class="link" data-unwatch="'+id+'">Remove</button></div>'}).join("")||'<p class="note">Your watchlist is empty.</p>';
}
function drawHome(){
 const total=portfolio.reduce((sum,p)=>sum+Number(p.amount||0),0);
 const india=portfolio.filter(p=>fund(p.fundId)?.region==="India").reduce((sum,p)=>sum+Number(p.amount||0),0);
 const usa=total-india;
 const indiaPct=total?Math.round(india/total*100):0;
 const usaPct=100-indiaPct;
 $("#home .stats").innerHTML=
 '<div class="card"><small>Total invested</small><strong>'+formatMoney(total)+'</strong><em>From your entries</em></div>'+
 '<div class="card"><small>Funds held</small><strong>'+portfolio.length+'</strong><em>Manual portfolio</em></div>'+
 '<div class="card"><small>India allocation</small><strong>'+indiaPct+'%</strong><em>By invested amount</em></div>'+
 '<div class="card"><small>USA allocation</small><strong>'+usaPct+'%</strong><em>By invested amount</em></div>';
 if(portfolio.length){
  $("#home .two").firstElementChild.innerHTML='<h3>Portfolio allocation</h3><div class="bar"><i class="india" style="width:'+indiaPct+'%"></i><i class="usa" style="width:'+usaPct+'%"></i></div><div class="split"><span>India '+indiaPct+'%</span><span>USA '+usaPct+'%</span></div>';
  $("#home .hero p").textContent="Your portfolio is set up. You can add or edit holdings from the Portfolio tab.";
 }
}
function formatMoney(n){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n)}
function drawHoldings(){
 if(!portfolio.length){
   $("#holdings").innerHTML='<div class="empty"><p>You have not added any investments yet.</p><button class="button primary" id="portfolio-setup">Set up my portfolio</button></div>'; 
   return;
 }
 $("#holdings").innerHTML=portfolio.map((p,i)=>{let f=fund(p.fundId);let currency=f.region==="India"?"INR":"USD";return '<div class="holding"><div><b>'+f.name+'</b><small>'+f.region+' · Invested '+currency+' '+Number(p.amount).toLocaleString("en-IN")+' · '+p.date+'</small></div><div>'+currency+'</div><div>'+f.type+'</div><div>'+f.bench+'</div><button class="link" data-remove-holding="'+i+'">Remove</button></div>'}).join("");
}'<div class="holding"><div><b>HDFC Nifty 50 Index Fund</b><small>42 units · INR</small></div><div>₹9,676</div><div>₹9,046 cost</div><div class="up">+₹630</div><span></span></div><div class="holding"><div><b>Vanguard S&P 500 ETF</b><small>8 shares · USD</small></div><div>$4,511</div><div>$3,746 cost</div><div class="up">+$765</div><span></span></div><div class="holding"><div><b>Vanguard Total Bond Market ETF</b><small>14 shares · USD</small></div><div>$1,305</div><div>$1,285 cost</div><div class="up">+$20</div><span></span></div>';
}
document.addEventListener("click",e=>{
 let n=e.target.closest(".nav");if(n){show(n.dataset.view);if(n.dataset.view==="explore")drawFunds();if(n.dataset.view==="compare")drawCompare();if(n.dataset.view==="watchlist")drawWatch();if(n.dataset.view==="portfolio")drawHoldings();return}
 let g=e.target.closest("[data-go]");if(g){show(g.dataset.go);if(g.dataset.go==="explore")drawFunds();return}
 let a=e.target.closest("[data-add]");if(a){if(!compare.includes(a.dataset.add)&&compare.length<4)compare.push(a.dataset.add);show("compare");drawCompare();return}
 let p=e.target.closest("[data-pick]");if(p){let id=p.dataset.pick;compare=compare.includes(id)?compare.filter(x=>x!==id):compare.concat(id).slice(-4);drawCompare();return}
 let w=e.target.closest("[data-unwatch]");if(w){watch=watch.filter(x=>x!==w.dataset.unwatch);drawWatch();return}
 if(e.target.id==="add"){watch.push("us3");drawHoldings();return}
});
$("#search").addEventListener("input",drawFunds);$("#region").addEventListener("change",drawFunds);$("#type").addEventListener("change",drawFunds);
$("#currency").addEventListener("click",function(){this.textContent=this.textContent.endsWith("INR")?"Base: USD":"Base: INR"});
function openSetup(){
 $("#setup-modal").classList.remove("hidden");
 $("#fund-count").value=Math.max(1,portfolio.length||1);
 renderHoldingFields();
}
function closeSetup(){ $("#setup-modal").classList.add("hidden"); }
function renderHoldingFields(){
 const count=Math.min(20,Math.max(1,Number($("#fund-count").value||1)));
 $("#holding-fields").innerHTML=Array.from({length:count},(_,i)=>{
   const old=portfolio[i]||{};
   return '<div class="holding-form"><div><div class="holding-number"><span>'+ (i+1) +'</span><b>Which fund?</b></div><select data-field="fund" class="setup-fund">'+funds.map(f=>'<option value="'+f.id+'" '+(f.id===old.fundId?"selected":"")+'>'+f.name+' — '+f.region+'</option>').join("")+'</select></div><div><label class="field-help">How much did you put in?</label><input data-field="amount" type="number" min="0" step="0.01" placeholder="Amount" value="'+(old.amount||"")+'"></div><div><label class="field-help">When did you invest?</label><input data-field="date" type="date" value="'+(old.date||"")+'"></div></div>';
 }).join("");
}
function savePortfolio(){
 const forms=$(".holding-form");
 const next=forms.map(form=>({fundId:form.querySelector('[data-field="fund"]').value,amount:Number(form.querySelector('[data-field="amount"]').value),date:form.querySelector('[data-field="date"]').value})).filter(x=>x.amount>0&&x.date);
 if(next.length!==forms.length){alert("Please choose a fund, enter an amount, and enter the investment date for every fund.");return}
 portfolio=next;
 localStorage.setItem("skyPortfolio",JSON.stringify(portfolio));
 closeSetup();drawHome();drawHoldings();show("home");
}
$("#fund-count").addEventListener("input",renderHoldingFields);
$("#setup-open").addEventListener("click",openSetup);
$("#setup-close").addEventListener("click",closeSetup);
$("#setup-cancel").addEventListener("click",closeSetup);
$("#setup-save").addEventListener("click",savePortfolio);
document.addEventListener("click",e=>{if(e.target.id==="portfolio-setup"){openSetup()}});
drawFunds();drawCompare();drawWatch();drawHoldings();drawHome();
if(!portfolio.length){setTimeout(openSetup,250)}