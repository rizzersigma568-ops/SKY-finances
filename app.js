const funds=[
{id:"in1",name:"HDFC Nifty 50 Index Fund",region:"India",type:"Index",expense:"0.20%",ret:"14.8%",aum:"₹18,240 Cr",bench:"NIFTY 50 TRI"},
{id:"in2",name:"Parag Parikh Flexi Cap Fund",region:"India",type:"Equity",expense:"0.62%",ret:"19.1%",aum:"₹86,510 Cr",bench:"NIFTY 500 TRI"},
{id:"in3",name:"SBI Short Duration Fund",region:"India",type:"Debt",expense:"0.42%",ret:"7.2%",aum:"₹12,880 Cr",bench:"CRISIL Short Duration"},
{id:"us1",name:"Vanguard S&P 500 ETF",region:"USA",type:"ETF",expense:"0.03%",ret:"16.4%",aum:"$610B",bench:"S&P 500"},
{id:"us2",name:"Vanguard Total Stock Market ETF",region:"USA",type:"ETF",expense:"0.03%",ret:"15.9%",aum:"$590B",bench:"CRSP US Total Market"},
{id:"us3",name:"Vanguard Total Bond Market ETF",region:"USA",type:"Bond",expense:"0.03%",ret:"5.1%",aum:"$335B",bench:"Bloomberg U.S. Aggregate"}
];
let compare=["in1","us1"], watch=["in2","us2"];
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
function drawHoldings(){
 $("#holdings").innerHTML='<div class="holding"><div><b>HDFC Nifty 50 Index Fund</b><small>42 units · INR</small></div><div>₹9,676</div><div>₹9,046 cost</div><div class="up">+₹630</div><span></span></div><div class="holding"><div><b>Vanguard S&P 500 ETF</b><small>8 shares · USD</small></div><div>$4,511</div><div>$3,746 cost</div><div class="up">+$765</div><span></span></div><div class="holding"><div><b>Vanguard Total Bond Market ETF</b><small>14 shares · USD</small></div><div>$1,305</div><div>$1,285 cost</div><div class="up">+$20</div><span></span></div>';
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
drawFunds();drawCompare();drawWatch();drawHoldings();