const demoGames = [
 {title:"Polytrack",category:"Racing",status:"Available",url:"https://app-polytrack.kodub.com/0.5.0/"},
 {title:"Smash Karts",category:"Arcade",status:"Available",url:"https://smashkarts.io/"},
 {title:"Townscaper",category:"Sandbox",status:"Available",url:"https://oskarstalberg.com/Townscaper/"},
 {title:"Counter-Strike Surf",category:"Action",status:"Available",url:"https://surfd.net/"},
 {title:"NZ:P",category:"Action",status:"Available",url:"https://nzp.gay/"}
];
const demoUsers = [
 {name:"ashur",role:"Admin",status:"Active",created:"Sep 12, 2026"},
 {name:"vault_guest_42",role:"Member",status:"Active",created:"Oct 14, 2026"},
 {name:"pixelpilot",role:"Member",status:"Active",created:"Oct 10, 2026"},
 {name:"nightowl",role:"Member",status:"Inactive",created:"Sep 29, 2026"},
 {name:"test_account",role:"Moderator",status:"Active",created:"Sep 18, 2026"}
];
let games = [...demoGames];
let logEntries = [
 ["Game entry added","Polytrack · Games catalog","12 min ago","Success"],
 ["New account registered","vault_guest_42 · Users","38 min ago","Success"],
 ["Website link updated","Website catalog","2 hours ago","Success"],
 ["Database check completed","Realtime Database · Healthy","Today","Success"]
];
const $ = s => document.querySelector(s);
function toast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),2600)}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderGames(){const q=($("#gameSearch")?.value||"").toLowerCase();const cat=$("#categoryFilter")?.value||"all";const filtered=games.filter(g=>(g.title+" "+g.category).toLowerCase().includes(q)&&(cat==="all"||g.category===cat));$("#gameCount").textContent=`${filtered.length} entr${filtered.length===1?"y":"ies"}`;$("#gamesBody").innerHTML=filtered.map((g,i)=>`<tr><td><div class="game-name"><span class="game-badge">${escapeHtml(g.title.charAt(0).toUpperCase())}</span><strong>${escapeHtml(g.title)}</strong></div></td><td class="muted-cell">${escapeHtml(g.category)}</td><td><span class="table-status">${escapeHtml(g.status)}</span></td><td><a href="${escapeHtml(g.url)}" target="_blank" rel="noopener" style="color:#bda0ff;text-decoration:none">Open ↗</a></td><td><button class="row-action" data-remove="${games.indexOf(g)}" title="Remove demo row">⋯</button></td></tr>`).join("")||'<tr><td colspan="5" class="muted-cell">No games match that search.</td></tr>'}
function renderUsers(){const q=($("#userSearch")?.value||"").toLowerCase();$("#usersBody").innerHTML=demoUsers.filter(u=>u.name.toLowerCase().includes(q)).map(u=>`<tr><td><div class="game-name"><span class="game-badge">${escapeHtml(u.name[0].toUpperCase())}</span><strong>${escapeHtml(u.name)}</strong></div></td><td>${escapeHtml(u.role)}</td><td><span class="table-status" style="${u.status==="Inactive"?"color:#f6c57c;background:#ffbd4b0c;border-color:#ffbd4b22":""}">${escapeHtml(u.status)}</span></td><td class="muted-cell">${escapeHtml(u.created)}</td><td><button class="row-action" data-user="${escapeHtml(u.name)}" title="Demo user action">⋯</button></td></tr>`).join("")}
function renderLog(){$("#logBody").innerHTML=logEntries.map(e=>`<tr><td>${escapeHtml(e[0])}</td><td class="muted-cell">${escapeHtml(e[1])}</td><td class="muted-cell">${escapeHtml(e[2])}</td><td><span class="table-status">${escapeHtml(e[3])}</span></td></tr>`).join("")||'<tr><td colspan="4" class="muted-cell">Demo log cleared.</td></tr>'}
function showView(name){document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===`view-${name}`));document.querySelectorAll(".side-link").forEach(b=>b.classList.toggle("selected",b.dataset.view===name));$("#crumb").textContent=({dashboard:"Dashboard",games:"Games",users:"Users",diagnostics:"Diagnostics",storage:"Storage",activity:"Activity log"})[name]||"Dashboard";if(name==="games")renderGames();if(name==="users")renderUsers();if(name==="activity")renderLog();window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll(".side-link").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
document.querySelectorAll("[data-jump]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.jump)));
$("#gameSearch").addEventListener("input",renderGames);$("#categoryFilter").addEventListener("change",renderGames);$("#userSearch").addEventListener("input",renderUsers);
$("#gamesBody").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;const i=Number(b.dataset.remove);if(confirm(`Remove ${games[i].title} from this temporary demo?`)){games.splice(i,1);renderGames();toast("Removed from demo list")}})
$("#usersBody").addEventListener("click",e=>{const b=e.target.closest("[data-user]");if(b)toast(`User actions for ${b.dataset.user} are not connected in this prototype.`)});
$("#addGameBtn").addEventListener("click",()=>$("#gameDialog").showModal());
$("#gameForm").addEventListener("submit",e=>{e.preventDefault();const title=$("#newTitle").value.trim(),category=$("#newCategory").value,url=$("#newUrl").value.trim();if(!title||!url)return;games.unshift({title,category,status:"Available",url});$("#gameDialog").close();$("#gameForm").reset();renderGames();showView("games");toast("Game added to the temporary demo")});
$("#refreshBtn").addEventListener("click",()=>{toast("Demo dashboard refreshed");$("#refreshBtn").textContent="✓ Refreshed";setTimeout(()=>$("#refreshBtn").innerHTML="↻ <span>Refresh data</span>",1500)});
$("#runChecks").addEventListener("click",()=>{const out=$("#checkOutput");out.textContent="Running demo checks…";setTimeout(()=>{out.textContent="[PASS] Interface loaded\n[PASS] Demo catalog rendered\n[PASS] Navigation handlers active\n[SKIP] Firebase connection — not configured in prototype\n[SKIP] Authentication / permissions — not configured\n\nFinished: 3 passed, 2 skipped.";toast("Demo checks complete")},550)});
$("#exportUsers").addEventListener("click",()=>{const csv="username,role,status,created\n"+demoUsers.map(u=>[u.name,u.role,u.status,u.created].join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="vault-demo-users.csv";a.click();URL.revokeObjectURL(a.href);toast("Exported demo user list")});
$("#clearLog").addEventListener("click",()=>{logEntries=[];renderLog();toast("Cleared the temporary demo log")});
$("#clock").textContent=new Intl.DateTimeFormat(undefined,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date());
renderGames();renderUsers();renderLog();
