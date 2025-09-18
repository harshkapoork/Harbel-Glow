// src/utils/Order.js

const ORDER_KEY = 'vue_ecommerce_orders'

// Get all orders
export function getOrders() {
  const data = localStorage.getItem(ORDER_KEY)
  return data ? JSON.parse(data) : []
}

// Save all orders
function saveOrders(orders) {
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders))
}

// Add a new order
export function addOrder(order) {
  let orders = getOrders()
  const newOrder = {
    id: Date.now(), // unique ID
    status: 'pending', // default status
    ...order
  }
  orders.push(newOrder)
  saveOrders(orders)
  return newOrder
}

// Update order status
export function updateOrderStatus(orderId, newStatus) {
  let orders = getOrders()
  orders = orders.map(o =>
    o.id === orderId ? { ...o, status: newStatus } : o
  )
  saveOrders(orders)
  return orders
}

// Clear all orders (for admin/testing)
export function clearOrders() {
  localStorage.removeItem(ORDER_KEY)
}
