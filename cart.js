/* Shared basket (client-side, persisted in this browser via localStorage) */
window.Cart = (function(){
  const KEY = 'xena_cart_v1';
  const WHATSAPP_NUMBER = '4915216767415';
  const TELEGRAM_USERNAME = 'XenaPeptide';

  function read(){
    try{ return JSON.parse(localStorage.getItem(KEY)) || []; }catch(e){ return []; }
  }

  function write(items){
    localStorage.setItem(KEY, JSON.stringify(items));
    updateBadge();
  }

  function add(product, qty){
    qty = qty || 1;
    const items = read();
    const existing = items.find(i=>i.id===product.id);

    if(existing){
      existing.qty += qty;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        strength: product.strength,
        price: product.price,
        image: product.image,
        qty: qty
      });
    }

    write(items);
  }

  function setQty(id, qty){
    let items = read();

    if(qty <= 0){
      items = items.filter(i=>i.id!==id);
    } else {
      const it = items.find(i=>i.id===id);
      if(it) it.qty = qty;
    }

    write(items);
  }

  function remove(id){
    write(read().filter(i=>i.id!==id));
  }

  function clear(){
    write([]);
  }

  function count(){
    return read().reduce((n,i)=>n+i.qty, 0);
  }

  function total(){
    return read().reduce(
      (sum,i)=> sum + (i.price!=null ? i.price*i.qty : 0),
      0
    );
  }

  function updateBadge(){
    document.querySelectorAll('.cart-count').forEach(el=>{
      el.textContent = count();
    });
  }

  function orderText(){
    const items = read();

    if(!items.length) return '';

    let lines = [
      'Hello XENA PEPTIDE, I would like to order:',
      ''
    ];

    items.forEach(i=>{
      const priceStr = i.price!=null
        ? ` — €${(i.price*i.qty).toFixed(0)}`
        : '';

      lines.push(
        `• ${i.name} ${i.strength} x${i.qty}${priceStr}`
      );
    });

    const hasPrices = items.some(i=>i.price!=null);

    if(hasPrices){
      lines.push(
        '',
        `Total: €${total().toFixed(0)}`
      );
    }

    lines.push(
      '',
      'Please confirm availability and next steps. Thank you.'
    );

    return lines.join('\n');
  }

  function whatsappLink(){
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderText())}`;
  }

  function telegramLink(){
    return `https://t.me/${TELEGRAM_USERNAME}`;
  }

  document.addEventListener('DOMContentLoaded', updateBadge);

  return {
    read,
    add,
    setQty,
    remove,
    clear,
    count,
    total,
    updateBadge,
    orderText,
    whatsappLink,
    telegramLink
  };
})();
