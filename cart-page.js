function renderCart(){
  const container = document.getElementById('cartContent');
  if(!container) return;
  const items = window.Cart.read();

  if(!items.length){
    container.innerHTML = `
      <div class="cart-empty">
        <p>Your basket is empty.</p>
        <a class="btn" href="products.html">BROWSE PRODUCTS &rsaquo;</a>
      </div>`;
    return;
  }

  const hasPrices = items.some(i=>i.price!=null);

  const rows = items.map(i => `
    <div class="cart-row" data-id="${i.id}">
      <img src="${i.image}" alt="${i.name}">
      <div class="cart-row-info">
        <h3>${i.name}</h3>
        <div class="strength">${i.strength}</div>
        ${i.price!=null ? `<div class="price">&euro;${i.price} each</div>` : ''}
      </div>
      <div class="qty-stepper small">
        <button type="button" class="qty-btn cart-minus">&minus;</button>
        <input type="text" class="cart-qty-input" value="${i.qty}" inputmode="numeric">
        <button type="button" class="qty-btn cart-plus">&plus;</button>
      </div>
      ${i.price!=null ? `<div class="cart-row-total">&euro;${(i.price*i.qty).toFixed(0)}</div>` : '<div></div>'}
      <button type="button" class="cart-remove" aria-label="Remove">&times;</button>
    </div>`).join('');

  container.innerHTML = `
    <div class="cart-list">${rows}</div>
    <div class="cart-summary">
      ${hasPrices ? `<div class="cart-total-line"><span>Total</span><strong>&euro;${window.Cart.total().toFixed(0)}</strong></div>` : ''}
      <p class="smallnote">Checkout hands your order details to us directly — no online payment is processed on this site.</p>
      <div class="checkout-actions">
        <a class="btn" id="checkoutWhatsapp" href="#" target="_blank" rel="noopener">CHECKOUT VIA WHATSAPP</a>
        <button class="btn outline" id="checkoutTelegram" type="button">CHECKOUT VIA TELEGRAM</button>
      </div>
      <button class="clear-cart" id="clearCart" type="button">Clear basket</button>
    </div>`;

  container.querySelectorAll('.cart-row').forEach(row=>{
    const id = Number(row.dataset.id);
    const input = row.querySelector('.cart-qty-input');
    row.querySelector('.cart-minus').addEventListener('click', ()=>{
      const v = Math.max(1, (parseInt(input.value)||1) - 1);
      window.Cart.setQty(id, v);
      renderCart();
    });
    row.querySelector('.cart-plus').addEventListener('click', ()=>{
      const v = (parseInt(input.value)||1) + 1;
      window.Cart.setQty(id, v);
      renderCart();
    });
    input.addEventListener('change', ()=>{
      const v = Math.max(0, parseInt(input.value)||0);
      window.Cart.setQty(id, v);
      renderCart();
    });
    row.querySelector('.cart-remove').addEventListener('click', ()=>{
      window.Cart.remove(id);
      renderCart();
    });
  });

  document.getElementById('checkoutWhatsapp').href = window.Cart.whatsappLink();
  document.getElementById('checkoutTelegram').addEventListener('click', async ()=>{
    const text = window.Cart.orderText();
    try{
      await navigator.clipboard.writeText(text);
      alert('Order details copied. Opening Telegram — paste the message into the chat.');
    }catch(e){
      alert('Opening Telegram. Please note down your basket before sending, as it could not be auto-copied.');
    }
    window.open(window.Cart.telegramLink(), '_blank', 'noopener');
  });
  document.getElementById('clearCart').addEventListener('click', ()=>{
    if(confirm('Remove all items from your basket?')){
      window.Cart.clear();
      renderCart();
    }
  });
}

document.addEventListener('DOMContentLoaded', renderCart);
