<template>
  <div class="py-3">
    <h2 class="mb-4">Category: {{ categoryName }}</h2>
    <div class="row g-4">
      <div v-if="products.length === 0" class="col-12 text-center mt-5">
        <h5>No products found in this category.</h5>
      </div>

      <div class="col-md-4" v-for="p in products" :key="p.id">
        <div class="card h-100 shadow-sm hover-card">
          <div class="card-img-container">
            <img 
              :src="p.image && p.image.trim() !== '' ? p.image : 'https://via.placeholder.com/200x200.png?text=No+Image'" 
              class="card-img-top" 
              alt="Product"
            />
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ p.title }}</h5>
            <p class="card-text text-muted">₹{{ p.price }}</p>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <router-link 
                :to="{ name: 'Product', params: { id: p.id } }" 
                class="btn btn-outline-primary btn-sm"
              >
                View
              </router-link>
              <button class="btn btn-primary btn-sm" @click="addToCart(p)">
                <i class="fas fa-cart-plus me-1"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/mockApi'
import { loadCart, saveCart } from '../utils/cart'
import Swal from 'sweetalert2'

export default {
  name: 'CategoryProducts',
  props: ['slug'],
  data() {
    return {
      products: [],
      categoryName: ''
    }
  },
  async created() {
    const cats = await api.getCategories()
    const c = cats.find(x => x.slug === this.slug)
    if (c) {
      this.categoryName = c.name
      this.products = await api.getProductsByCategory(c.id)
    }
  },
  methods: {
    addToCart(product) {
      let cart = loadCart()
      const index = cart.findIndex(i => i.id === product.id)
      if (index > -1) cart[index].qty += 1
      else cart.push({ ...product, qty: 1 })
      saveCart(cart)
      Swal.fire('Added!', `${product.title} added to cart.`, 'success')
    }
  }
}
</script>

<style scoped>
.hover-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.card-img-container {
  height: 200px;
  overflow: hidden;
}
.card-img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
