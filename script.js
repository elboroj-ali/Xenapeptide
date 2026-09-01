const products = window.PRODUCTS || [];

function cardHtml(p){
  const isNew = p.id > 25;
  return `<article class="card">
    ${isNew ? '<span class="new">New</span>' : ''}
    <a href="product.html?id=${p.id}">
      <img src="${p.image}" alt="${p.name} ${p.strength}" loading="lazy">
      <div class="card-body">
        <h3>${p.name}</h3>
        <div class="strength">${p.strength}</div>
        ${p.price!=null?`<div class="price">&euro;${p.price}</div>`:''}
        <div class="research">View research information &rarr;</div>
      </div>
    </a>
    <button class="add-basket" type="button" data-id="${p.id}">Add to Basket</button>
  </article>`;
}

function wireAddButtons(root){
  root.querySelectorAll('.add-basket').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = Number(btn.dataset.id);
      const p = products.find(x=>x.id===id);
      if(!p || !window.Cart) return;
      window.Cart.add(p, 1);
      showToast(`${p.name} added to basket`);
    });
  });
}

function showToast(msg){
  let t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(()=> t.classList.remove('show'), 2200);
}

/* Featured carousel on homepage: newest products first */
const carousel = document.getElementById('featuredCarousel');
if(carousel){
  const featured = [...products].sort((a,b)=>b.id-a.id).slice(0,10);
  carousel.innerHTML = featured.map(cardHtml).join('');
  wireAddButtons(carousel);
  const prev = document.querySelector('.arrow.prev');
  const next = document.querySelector('.arrow.next');
  const scrollAmt = () => carousel.clientWidth * 0.9;
  if(prev) prev.addEventListener('click', ()=> carousel.scrollBy({left:-scrollAmt(), behavior:'smooth'}));
  if(next) next.addEventListener('click', ()=> carousel.scrollBy({left:scrollAmt(), behavior:'smooth'}));
}

/* Full catalog grid (products.html) */
const grid = document.getElementById('productGrid');
if(grid){
  grid.innerHTML = products.map(cardHtml).join('');
  wireAddButtons(grid);
}

/* Single product detail page */
const detail = document.getElementById('productDetail');
if(detail){
  const id = Number(new URLSearchParams(location.search).get('id')) || 1;
  const p = products.find(x=>x.id===id) || products[0];
  detail.innerHTML = `<div><img src="${p.image}" alt="${p.name} ${p.strength}"></div>
  <div>
    <span class="eyebrow">RESEARCH CATALOG ${String(p.id).padStart(2,'0')}</span>
    <h1>${p.name}</h1>
    <h2>${p.strength}</h2>
    ${p.price!=null?`<div class="price">&euro;${p.price}</div>`:''}
    <div class="qty-row">
      <div class="qty-stepper">
        <button type="button" class="qty-btn" id="qtyMinus">&minus;</button>
        <input type="text" id="qtyInput" value="1" inputmode="numeric">
        <button type="button" class="qty-btn" id="qtyPlus">&plus;</button>
      </div>
      <button class="btn add-basket-detail" type="button" id="addBasketDetail">Add to Basket</button>
    </div>
    <div class="research-box"><h2>What is ${p.name}?</h2><p>${p.whatIs}</p></div>
    <div class="research-box"><h2>Significance in scientific research</h2><p>${p.significance}</p></div>
    <div class="research-box"><h2>Brief summary</h2><p>${p.summary}</p></div>
    <div class="research-box"><h2>Research-use notice</h2><p>This catalogue is informational and research-oriented. It is not medical advice, diagnosis, treatment guidance, or a claim that any research material is safe or effective for human use.</p></div>
  </div>`;
  document.title = `${p.name} ${p.strength} — XENA PEPTIDE`;

  const qtyInput = document.getElementById('qtyInput');
  document.getElementById('qtyMinus').addEventListener('click', ()=>{
    qtyInput.value = Math.max(1, (parseInt(qtyInput.value)||1) - 1);
  });
  document.getElementById('qtyPlus').addEventListener('click', ()=>{
    qtyInput.value = (parseInt(qtyInput.value)||1) + 1;
  });
  document.getElementById('addBasketDetail').addEventListener('click', ()=>{
    const qty = Math.max(1, parseInt(qtyInput.value)||1);
    window.Cart.add(p, qty);
    showToast(`${p.name} added to basket`);
  });
}

/* Scroll-reveal for sections/cards */
(function(){
  const targets = document.querySelectorAll('.reveal, .reveal-stagger');
  if(!targets.length) return;
  if(!('IntersectionObserver' in window)){
    targets.forEach(t=>t.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15, rootMargin:'0px 0px -40px 0px'});
  targets.forEach(t=>io.observe(t));
  // safety fallback: never leave content permanently invisible
  setTimeout(()=>targets.forEach(t=>t.classList.add('in-view')), 2500);
})();

/* Subtle cursor parallax on the hero icon (desktop pointer only) */
(function(){
  const hero = document.querySelector('.hero');
  const icon = document.querySelector('.hero-icon-wrap');
  if(!hero || !icon || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  hero.addEventListener('mousemove', (e)=>{
    const r = hero.getBoundingClientRect();
    const px = (e.clientX - r.left)/r.width - 0.5;
    const py = (e.clientY - r.top)/r.height - 0.5;
    icon.style.setProperty('--mx', (px*10).toFixed(1)+'px');
    icon.style.setProperty('--my', (py*8).toFixed(1)+'px');
  });
  hero.addEventListener('mouseleave', ()=>{
    icon.style.setProperty('--mx','0px');
    icon.style.setProperty('--my','0px');
  });
})();
