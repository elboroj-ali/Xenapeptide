/* Shared header + footer, injected into #site-header / #site-footer on every page */
(function(){
  const ICONS = {
    search:'<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
    user:'<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"></path></svg>',
    cart:'<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6"></path></svg>',
    whatsapp:'<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20l1.1-5.4A8.5 8.5 0 1 1 21 11.5Z"></path><path d="M8.5 9.5c0 3.5 2.5 6 6 6"></path></svg>',
    telegram:'<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"></path><path d="M22 2 15 22l-4-9-9-4Z"></path></svg>',
    ship:'<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z"></path></svg>',
    caret:'<svg class="caret" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"></path></svg>',
    burger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'
  };

  function productMenuItems(){
    const products = window.PRODUCTS || [];
    return products.slice(0,6).map(p =>
      `<a href="product.html?id=${p.id}">${p.name}<small>${p.strength}</small></a>`
    ).join('') + `<a class="view-all" href="index.html#products">View all products</a>`;
  }

  function dnaIcon(size){
    return `<svg width="${size}" height="${size*1.55}" viewBox="0 0 40 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dnaGoldX" x1="0" y1="0" x2="40" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#f6dfa0"/><stop offset="1" stop-color="#c78f2d"/>
        </linearGradient>
        <linearGradient id="dnaNavyX" x1="40" y1="0" x2="0" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#3a5a86"/><stop offset="1" stop-color="#0b2036"/>
        </linearGradient>
      </defs>
      <path d="M8 2 C26 12 14 20 8 26 C2 32 26 40 8 46 C2 50 8 56 8 60" stroke="url(#dnaGoldX)" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M32 2 C14 12 26 20 32 26 C38 32 14 40 32 46 C38 50 32 56 32 60" stroke="url(#dnaNavyX)" stroke-width="2.6" stroke-linecap="round"/>
      <line x1="10" y1="10" x2="30" y2="10" stroke="#e8c073" stroke-width="1.6"/>
      <line x1="9" y1="26" x2="31" y2="26" stroke="#e8c073" stroke-width="1.6"/>
      <line x1="10" y1="42" x2="30" y2="42" stroke="#e8c073" stroke-width="1.6"/>
      <circle cx="20" cy="3" r="2.3" fill="#f1cc78"/>
      <circle cx="6" cy="33" r="1.8" fill="#8a3b3b"/>
      <circle cx="34" cy="33" r="1.8" fill="#c78f2d"/>
    </svg>`;
  }

  function header(active){
    const nav = [
      {id:'home', label:'HOME', href:'index.html'},
      {id:'products', label:'PRODUCTS', href:'products.html', dropdown: productMenuItems()},
      {id:'research', label:'RESEARCH', href:'research.html'},
      {id:'quality', label:'QUALITY', href:'research.html', dropdown:
        `<a href="research.html">Lab Testing<small>Methods</small></a>`+
        `<a href="coa.html">Certificates of Analysis<small>COA</small></a>`
      },
      {id:'coa', label:'COA', href:'coa.html'},
      {id:'offers', label:'OFFERS', href:'offers.html'},
      {id:'about', label:'ABOUT', href:'about.html'},
      {id:'contact', label:'CONTACT', href:'contact.html'}
    ];

    const navHtml = nav.map(item=>{
      const isActive = item.id===active ? ' active' : '';

      if(item.dropdown){
        return `<span class="has-menu"><a class="${isActive.trim()}" href="${item.href}">${item.label}${ICONS.caret}</a><div class="dropdown">${item.dropdown}</div></span>`;
      }

      return `<a class="${isActive.trim()}" href="${item.href}">${item.label}</a>`;
    }).join('');

    return `
<div class="top">
  <span class="warn">FOR RESEARCH PURPOSES ONLY<span class="sep">|</span>NOT FOR HUMAN CONSUMPTION</span>

  <div class="top-links">
    <a href="https://wa.me/4915216767415" target="_blank" rel="noopener">
      ${ICONS.whatsapp}WhatsApp
    </a>

    <a href="https://t.me/XenaPeptide" target="_blank" rel="noopener">
      ${ICONS.telegram}Telegram
    </a>

    <a href="contact.html">
      ${ICONS.ship}Worldwide Shipping
    </a>
  </div>
</div>

<header>
  <a class="brand" href="index.html">
    <img class="brand-icon" src="images/xena-icon-transparent.png" alt="">
    <img class="brand-wordmark" src="images/xena-text-transparent.png" alt="XENA PEPTIDE">
  </a>

  <nav class="nav">${navHtml}</nav>

  <div class="icons">
    <button type="button" aria-label="Search">
      ${ICONS.search}
    </button>

    <button type="button" aria-label="Account">
      ${ICONS.user}
    </button>

    <span class="cart-wrap">
      <a href="cart.html" aria-label="Basket">
        ${ICONS.cart}
      </a>
      <span class="cart-count">0</span>
    </span>
  </div>

  <button class="burger" type="button" aria-label="Menu" onclick="location.href='index.html#products'">
    ${ICONS.burger}
  </button>
</header>`;
  }

  function footer(){
    return `<footer>&copy; 2026 XENA PEPTIDE &middot; RESEARCH USE ONLY &middot; NOT FOR HUMAN CONSUMPTION</footer>`;
  }

  document.addEventListener('DOMContentLoaded', function(){
    const h = document.getElementById('site-header');
    const f = document.getElementById('site-footer');

    if(h) h.outerHTML = header(document.body.getAttribute('data-page'));

    if(f) f.outerHTML = footer();

    if(window.Cart) window.Cart.updateBadge();
  });
})();
