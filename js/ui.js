import { addToCart, getCart, getTotal } from './changuito.js';

export function renderCards(cards) {
  const container = document.getElementById('cards-container');
  container.innerHTML = '';
  cards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${card.image}" alt="${card.name}" />
      <h3>${card.name}</h3>
      <p>${card.getInfo()}</p>
      <button data-id="${card.id}">Añadir al carrito</button>
    `;
    container.appendChild(div);
  });
}

export function renderCartCount() {
  const count = getCart().length;
  document.getElementById('cart-count').textContent = count;
}

export function showCheckout() {
  const modal = document.getElementById('checkout-modal');
  const summaryDiv = document.getElementById('checkout-summary');
  summaryDiv.innerHTML = `
    Cantidad de ítems: ${getCart().length}<br/>
    Total: $${getTotal()}
  `;
  //modal.classList.remove('hidden');
}

export function renderCheckoutSummary() {
  const summaryDiv = document.getElementById('checkout-summary');
  const items = getCart().length;
  const total = getTotal();
  summaryDiv.innerHTML = `
    <p>Cantidad de ítems: ${items}</p>
    <p>Total: $${total}</p>
  `;
}

export function showPurchaseConfirmation() {
  const msg = document.getElementById('purchase-confirmation');
  msg.classList.remove('hidden');
}
