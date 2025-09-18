<template>
  <div>
    <h2>Your Cart</h2>

    <div v-if="cart.length">
      <!-- Coupon code -->
      <div class="mt-4 mb-3">
        <div class="input-group w-50">
          <input  
            v-model="coupon"   
            type="text"   
            class="form-control"    
            placeholder="Enter coupon code" 
            @keyup.enter.prevent="applyCoupon"
          >
          <button 
            class="btn btn-outline-primary"  
            type="button"   
            @click="applyCoupon"> 
            Apply 
          </button>
        </div>
        <p v-if="discountAmount > 0" class="text-success mt-2">
          Coupon applied: -₹{{ discountAmount.toFixed(0) }}
        </p>
      </div>

      <!-- Cart table -->
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td>
              <img :src="item.image" alt="product" class="img-thumbnail me-2" style="width:90px; height:90px;">
              {{ item.title }}
            </td>
            <td>
              <div class="btn-group" role="group">
                <button class="btn btn-sm btn-outline-secondary" @click="decrease(item)">
                  <i class="fas fa-minus"></i>
                </button>
                <span class="px-2">{{ item.qty }}</span>
                <button class="btn btn-sm btn-outline-secondary" @click="increase(item)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </td>
            <td>₹{{ item.price.toFixed(0) }}</td>
            <td>₹{{ (item.price * item.qty).toFixed(0) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="3" class="text-end">Subtotal</th>
            <th>₹{{ subtotal.toFixed(0) }}</th>
          </tr>
          <tr>
            <th colspan="3" class="text-end">Discount</th>
            <th>-₹{{ discountAmount.toFixed(0) }}</th>
          </tr>
          <tr>
            <th colspan="3" class="text-end">Delivery Charges</th>
            <th>₹{{ deliveryCharges.toFixed(0) }}</th>
          </tr>
          <tr>
            <th colspan="3" class="text-end">GST/CGST</th>
            <th>₹{{ gstAmount.toFixed(0) }}</th>
          </tr>
          <tr>
            <th colspan="3" class="text-end">Grand Total</th>
            <th>₹{{ grandTotal.toFixed(0) }}</th>
          </tr>
        </tfoot>
      </table>

      <div class="d-flex justify-content-between align-items-center mt-3">
        <div>
          <button class="btn btn-outline-danger me-2" @click="clearAll">
            <i class="fas fa-trash"></i> Clear Cart
          </button>
          <router-link to="/checkout" class="btn btn-primary">Proceed to checkout</router-link>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <i class="fas fa-shopping-cart fa-5x text-muted mb-3"></i>
      <h4>Your cart is empty</h4>
      <router-link to="/" class="btn btn-outline-primary mt-3">
        <i class="fas fa-plus"></i> Add Products
      </router-link>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { loadCart, increaseItem, decreaseItem, removeItem, clearCart } from '../utils/cart'

export default {
  data() {
    return {
      cart: [],
      coupon: '',
      discountAmount: 0,
      deliveryCharges: 50,
      gstPercent: 5,
      // List of coupons directly in the page
      coupons: [
        { code: 'SAVE100', type: 'fixed', amount: 100 },
        { code: 'SAVE50', type: 'fixed', amount: 50 },
        { code: 'WELCOME200', type: 'fixed', amount: 200 }
      ]
    }
  },
  created() {
    this.cart = loadCart()
  },
  computed: {
    subtotal() {
      return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    },
    gstAmount() {
      return (this.subtotal - this.discountAmount + this.deliveryCharges) * (this.gstPercent / 100)
    },
    grandTotal() {
      return this.subtotal - this.discountAmount + this.deliveryCharges + this.gstAmount
    }
  },
  methods: {
    increase(item) { this.cart = increaseItem(item.id) },
    decrease(item) { this.cart = decreaseItem(item.id) },
    remove(item) { 
      this.cart = removeItem(item.id)
      Swal.fire('Removed!', 'Product removed from cart.', 'success') 
    },
    async clearAll() {
      const res = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will remove all items from your cart.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, clear it!',
        cancelButtonText: 'Cancel'
      })
      if (res.isConfirmed) {
        this.cart = clearCart()
        Swal.fire('Cleared!', 'Your cart is now empty.', 'success')
      }
    },
    applyCoupon() {
      if (!this.coupon.trim()) return

      const c = this.coupons.find(c => c.code.toLowerCase() === this.coupon.trim().toLowerCase())
      if (c && c.type === 'fixed') {
        this.discountAmount = c.amount
        Swal.fire('Success!', `Coupon applied: -₹${this.discountAmount}`, 'success')
      } else {
        this.discountAmount = 0
        Swal.fire('Oops!', 'Invalid coupon code.', 'error')
      }
    }
  }
}
</script>
