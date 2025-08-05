
const STORAGE_KEY = 'pokemon_cart';

export function getCart() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveCart(cartArray) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartArray));
}

export function addToCart(card) {
  const cart = getCart();
  cart.push(card);
  saveCart(cart);
}

export function getTotal() {
  return getCart().reduce((sum, item) => sum + item.price, 0);
}