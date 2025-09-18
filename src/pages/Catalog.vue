<template>
  <div class="row g-4 py-3">
    <!-- Categories Sidebar -->
    <div class="col-md-3">
      <h4 class="mb-3">Categories</h4>
      <ul class="list-group shadow-sm rounded">
        <li 
          class="list-group-item" 
          :class="{ active: selectedCategory === '' }"
        >
          <a href="#" @click.prevent="selectedCategory = ''">All Products</a>
        </li>
        <li v-for="c in categories" :key="c.id" 
            class="list-group-item d-flex justify-content-between align-items-center"
            :class="{ active: selectedCategory === c.id }"
        >
          <a href="#" @click.prevent="selectedCategory = c.id">{{ c.name }}</a>
          <span class="badge bg-primary rounded-pill">{{ countProducts(c.id) }}</span>
        </li>
      </ul>

      <!-- Search -->
      <input 
        v-model="searchTerm" 
        type="text" 
        class="form-control mt-3" 
        placeholder="Search products..."
      />

      <!-- Sort -->
      <select v-model="sortOrder" class="form-select mt-2">
        <option value="">Sort By</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>

    <!-- Products Grid -->
    <div class="col-md-9">
      <h4 class="mb-3">Products</h4>
      <div class="row g-4">
        <div v-if="filteredProducts.length === 0" class="text-center mt-5 col-12">
          <h5>No products found.</h5>
        </div>

        <div class="col-md-4" v-for="p in filteredProducts" :key="p.id">
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
  </div>
</template>

<script>
import api from '../api/mockApi'
import Swal from 'sweetalert2'
import { loadCart, saveCart } from '../utils/cart'

export default {
  name: 'CatalogPage',
  data() {
    return {
      categories: [],
      products: [],
      selectedCategory: '',
      searchTerm: '',
      sortOrder: ''
    }
  },
  async created() {
    this.categories = await api.getCategories()
    this.products = await api.getProducts()
  },
  computed: {
    filteredProducts() {
      let filtered = this.products

      if (this.selectedCategory) {
        filtered = filtered.filter(p => p.categoryId === this.selectedCategory)
      }

      if (this.searchTerm.trim()) {
        const term = this.searchTerm.toLowerCase()
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(term) || 
          p.description.toLowerCase().includes(term)
        )
      }

      if (this.sortOrder === 'low') filtered.sort((a,b)=>a.price-b.price)
      else if (this.sortOrder === 'high') filtered.sort((a,b)=>b.price-a.price)

      return filtered
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
    },
    countProducts(categoryId) {
      return this.products.filter(p => p.categoryId === categoryId).length
    }
  }
}
</script>

<style scoped>
/* Card hover effect */
.hover-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

/* Image container to crop images nicely */
.card-img-container {
  height: 200px;
  overflow: hidden;
}
.card-img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Active category highlight */
.list-group-item.active {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
.list-group-item.active a {
  color: white;
  text-decoration: none;
}

/* Smooth badge appearance */
.badge {
  font-size: 0.8rem;
}
</style>
