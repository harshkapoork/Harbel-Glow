// src/utils/cart.js

const CART_KEY = 'vue_ecommerce_cart'

export function loadCart() {
  const data = localStorage.getItem(CART_KEY)
  return data ? JSON.parse(data) : []
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

// Public getter for cart
export function getCart() {
  return loadCart()
}

// Add item or increase qty if already in cart
export function addToCart(product) {
  let cart = loadCart()
  const existing = cart.find(i => i.id === product.id)
  if (existing) {
    existing.qty += 1
  } else {
    cart.push({ ...product, qty: 1 })
  }
  saveCart(cart)
  return cart
}

// Increase item qty
export function increaseItem(id) {
  let cart = loadCart()
  const item = cart.find(i => i.id === id)
  if (item) item.qty++
  saveCart(cart)
  return cart
}

// Decrease item qty (auto-remove at 0)
export function decreaseItem(id) {
  let cart = loadCart()
  const item = cart.find(i => i.id === id)
  if (item) {
    item.qty--
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id)
    }
  }
  saveCart(cart)
  return cart
}

// Remove an item completely
export function removeItem(id) {
  let cart = loadCart().filter(i => i.id !== id)
  saveCart(cart)
  return cart
}

// Clear entire cart
export function clearCart() {
  saveCart([])
  return []
}

// Calculate totals
export function getCartTotal(cart, discountRate = 0) {
  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0)
  const discount = subtotal * discountRate
  const total = subtotal - discount
  return { subtotal, discount, total }
}
