import { fetchCards } from './api.js';
import { Card } from './producto.js';
import { renderCards, renderCartCount, showCheckout } from './ui.js';
import { renderCheckoutSummary, showPurchaseConfirmation } from './ui.js';
import { addToCart, getCart } from './changuito.js';

let allCards = [];

async function init() {
  const raw = await fetchCards();
  allCards = raw.map(data => new Card(data));
  populateFilter();
  renderCards(allCards);
  renderCartCount();
  renderCheckoutSummary();
  attachEvents();
}

function populateFilter() {
  const select = document.getElementById('filter-type');
  const types = ['All', ...new Set(allCards.map(c => c.type))];
  types.forEach(type => {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    select.appendChild(opt);
  });
}

function attachEvents() {
  // Añadir al carrito
  document.getElementById('cards-container').addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      const card = allCards.find(c => c.id == e.target.dataset.id);
      addToCart(card);
      renderCartCount();
      Toastify({ text: 'Añadido al carrito', duration: 2000 }).showToast();
    }
  });

    // Mostrar mensaje de éxito
Toastify({
  text: "✅ Agregada",
  duration: 3000,
  gravity: "bottom",
  position: "left",
  style: { background: "#222", color: "#fff" },
  offset: { x: 10, y: 20 }
}).showToast();

  // Buscar
  document.getElementById('search').addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    const filtered = allCards.filter(c => c.name.toLowerCase().includes(term));
    renderCards(filtered);
  });

  // Filtrar por tipo
  document.getElementById('filter-type').addEventListener('change', e => {
    const type = e.target.value;
    const filtered = type === 'All'
      ? allCards
      : allCards.filter(c => c.type === type);
    renderCards(filtered);
  });

  // Finalizar compra
  document.getElementById('cart-icon').addEventListener('click', showCheckout);
  document.getElementById('finish-purchase').addEventListener('click', () => {
    document.getElementById('checkout-modal');
    if (getCart().length === 0) {
      return Toastify({
        text: "El carrito está vacío",
        duration: 2000,
        backgroundColor: "#c62828"
      }).showToast();
    }
     const confirmationText = document
      .getElementById('purchase-confirmation')
      .textContent.trim();
    Toastify({
      text: confirmationText,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#2e7d32",
      close: true
    }).showToast();

    showPurchaseConfirmation();
  });
}



window.addEventListener('DOMContentLoaded', init);