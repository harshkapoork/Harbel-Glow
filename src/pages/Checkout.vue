<template>
<div>
<h2>Checkout</h2>
<form @submit.prevent="placeOrder" class="mt-3">
<div class="mb-3">
<label class="form-label">Name</label>
<input v-model=name class="form-control" required />
</div>
<div class="mb-3">
<label class="form-label">Address</label>
<textarea v-model="address" class="form-control" required></textarea>
</div>
<button type="submit" class="btn btn-success">Place order</button>
</form>
</div>
</template>


<script>
import { clearCart } from '../utils/cart'


export default {
name: 'CheckoutPage',
data() {
return { name: '', address: '' }
},
methods: {
placeOrder() {
// In a real app, send order to backend
clearCart()
window.alert('Order placed — thank you!')
this.$router.push('/')
}
}
}
</script>