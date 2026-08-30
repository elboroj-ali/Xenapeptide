let data={brand:"XENA PEPTIDE",currency:"EUR",discountLabel:"SPECIAL OFFER",products:[]};
async function init(){const local=localStorage.getItem("xenaProducts");if(local){try{data=JSON.parse(local)}catch(e){}}else{const r=await fetch("products.json");data=await r.json()}render()}
function esc(s){return String(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll('"',"&quot;")}
function render(){document.getElementById("editor").innerHTML=data.products.map((p,i)=>`<div class="admin-card"><div class="admin-grid">
<label>Name<input data-i="${i}" data-k="name" value="${esc(p.name)}"></label>
<label>Amount<input data-i="${i}" data-k="amount" value="${esc(p.amount)}"></label>
<label>Price (€)<input type="number" step="0.01" data-i="${i}" data-k="price" value="${p.price||0}"></label>
<label>Discount %<input type="number" min="0" max="100" data-i="${i}" data-k="discount" value="${p.discount||0}"></label>
<label>Image path<input data-i="${i}" data-k="image" value="${esc(p.image)}"></label>
<label>Badge<input data-i="${i}" data-k="badge" value="${esc(p.badge||"Research")}"></label>
</div><button class="remove" onclick="removeProduct(${i})">Remove product</button></div>`).join("")}
document.addEventListener("input",e=>{if(e.target.dataset.i!==undefined){let i=+e.target.dataset.i,k=e.target.dataset.k;data.products[i][k]=(k==="price"||k==="discount")?Number(e.target.value):e.target.value}})
function removeProduct(i){data.products.splice(i,1);render()}
document.getElementById("add").onclick=()=>{data.products.push({id:"product-"+Date.now(),name:"New Product",amount:"",price:0,discount:0,image:"images/your-image.jpg",badge:"Research"});render()}
document.getElementById("save").onclick=()=>{localStorage.setItem("xenaProducts",JSON.stringify(data));alert("Saved on this device.")}
document.getElementById("export").onclick=()=>{const b=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="products.json";a.click();URL.revokeObjectURL(a.href)}
document.getElementById("import").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{data=JSON.parse(await f.text());render()}catch(err){alert("Invalid JSON file")}}
init();
