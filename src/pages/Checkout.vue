<template>
  <div class="row">
    <!-- LEFT: Checkout form -->
    <div class="col-md-7">
      <h2 class="mb-4">Checkout</h2>
      <form @submit.prevent="placeOrder">
        <div class="card p-4 shadow-sm">
          <h4 class="mb-3">Customer Information</h4>

          <div class="mb-3">
            <label class="form-label">Full Name</label>
            <input v-model="name" class="form-control" placeholder="John Doe" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control" placeholder="you@example.com" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Phone</label>
            <input v-model="phone" type="tel" class="form-control" placeholder="+91 9876543210" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Address</label>
            <textarea v-model="address" class="form-control" rows="3" placeholder="Street, City, Pincode" required></textarea>
          </div>

          <h4 class="mb-3">Payment</h4>
          <div class="form-check">
            <input v-model="paymentMethod" class="form-check-input" type="radio" value="cod" id="cod" required />
            <label class="form-check-label" for="cod">Cash on Delivery</label>
          </div>
          <div class="form-check">
            <input v-model="paymentMethod" class="form-check-input" type="radio" value="card" id="card" />
            <label class="form-check-label" for="card">Credit/Debit Card</label>
          </div>

          <button type="submit" class="btn btn-success mt-4 w-100">Place Order</button>
        </div>
      </form>
    </div>

    <!-- RIGHT: Order Summary -->
    <div class="col-md-5">
      <div class="card p-4 shadow-sm">
        <h4 class="mb-3">Order Summary</h4>
        <ul class="list-group mb-3">
          <li
            v-for="item in cart"
            :key="item.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{{ item.title }}</strong><br />
              <small>Qty: {{ item.qty }}</small>
            </div>
            <span>₹{{ (item.price * item.qty).toFixed(0) }}</span>
          </li>
        </ul>
        <div class="d-flex justify-content-between">
          <span><strong>Total</strong></span>
          <span><strong>₹{{ total.toFixed(0) }}</strong></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { clearCart, getCart } from '../utils/cart'
import { addOrder } from '../utils/Order'

export default {
  name: 'CheckoutPage',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
      paymentMethod: 'cod',
      cart: getCart()
    }
  },
  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    }
  },
  methods: {
    placeOrder() {
      const order = {
        customer: {
          name: this.name,
          email: this.email,
          phone: this.phone,
          address: this.address
        },
        paymentMethod: this.paymentMethod,
        items: this.cart,
        total: this.total,
        date: new Date().toLocaleString()
      }

      addOrder(order)
      clearCart()

      window.alert('Order placed — thank you!')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
