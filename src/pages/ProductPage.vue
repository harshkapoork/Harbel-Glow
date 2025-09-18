<template>
  <div v-if="product" class="container my-4">
    <div class="row">
      <!-- Product Images -->
      <div class="col-md-6 mb-3">
        <!-- Main Image -->
        <img 
          :src="currentImage || 'https://via.placeholder.com/400x400.png?text=No+Image'" 
          class="img-fluid rounded shadow-sm mb-3" 
          alt="Product"
          style="object-fit: cover; max-height: 400px; width: 100%;"
        />

        <!-- Thumbnails -->
        <div class="d-flex flex-wrap gap-2">
          <img 
            v-for="(img, idx) in product.images" 
            :key="idx" 
            :src="img || 'https://via.placeholder.com/100x100.png?text=No+Image'" 
            @click="currentImage = img" 
            class="img-thumbnail" 
            style="height: 80px; width: 80px; object-fit: cover; cursor: pointer;"
            :class="{'border-primary border-2': currentImage === img}"
          />
        </div>
      </div>

      <!-- Product Details -->
      <div class="col-md-6">
        <h2>{{ product.title }}</h2>
        <p class="text-muted" v-if="category">
          Category: <span class="badge bg-primary">{{ category.name }}</span>
        </p>
        <p class="lead">{{ product.description }}</p>
       <span class="text-danger text-decoration-line-through ">{{ product.price +250  }}</span> <h4 class="text-primary bold">₹{{ product.price }}</h4>

        <!-- Quantity Selector -->
        <div class="d-flex align-items-center mb-3">
          <label class="me-2">Quantity:</label>
          <button class="btn btn-outline-secondary btn-sm" @click="decreaseQty">-</button>
          <input type="number" v-model.number="qty" min="1" class="form-control form-control-sm mx-2" style="width:60px;">
          <button class="btn btn-outline-secondary btn-sm" @click="increaseQty">+</button>
        </div>

        <button class="btn btn-success btn-lg" @click="addToCart">
          <i class="fas fa-cart-plus"></i> Add {{ qty }} to cart
        </button>
      </div>
    </div>

    <!-- Related Products Carousel (same as before) -->
    <div v-if="related.length" class="mt-5">
      <h4>You Might Also Like</h4>
      <div class="related-carousel d-flex overflow-auto py-2">
        <div 
          v-for="p in related" 
          :key="p.id" 
          class="card me-3" 
          style="min-width: 180px; flex: 0 0 auto;"
        >
          <img 
            :src="p.image || 'https://via.placeholder.com/150x150.png?text=No+Image'" 
            class="card-img-top" 
            alt="Product" 
            style="height:150px; object-fit: cover;"
          />
          <div class="card-body d-flex flex-column">
            <h6 class="card-title">{{ p.title }}</h6>
            <p class="text-success mb-2">₹{{ p.price }}</p>
            <router-link 
              :to="{ name: 'Product', params: { id: p.id } }" 
              class="btn btn-outline-primary btn-sm mt-auto"
            >
              View
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p v-else class="alert alert-warning">Product not found</p>
</template>

<script>
import api from '../api/mockApi'
import { addToCart, loadCart, saveCart } from '../utils/cart'
import Swal from 'sweetalert2'

export default {
  name: 'ProductPage',
  props: ['id'],
  data() {
    return {
      product: null,
      category: null,
      currentImage: '',
      qty: 1,
      related: []
    }
  },
  async created() {
    this.product = await api.getProduct(this.id)
    if (this.product) {
      // Ensure product.images exists
      if (!this.product.images || !this.product.images.length) {
        this.product.images = [this.product.image]
      }
      this.currentImage = this.product.images[0]

      const categories = await api.getCategories()
      this.category = categories.find(c => c.id === this.product.categoryId)
      const allProducts = await api.getProductsByCategory(this.category.id)
      this.related = allProducts.filter(p => p.id !== this.product.id)
    }
  },
  methods: {
    addToCart() {
      if (!this.product) return
      let cart = loadCart()
      const existing = cart.find(i => i.id === this.product.id)
      if (existing) {
        existing.qty += this.qty
      } else {
        cart.push({ ...this.product, qty: this.qty })
      }
      saveCart(cart)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${this.product.title} added to cart!`,
        showConfirmButton: false,
        timer: 1200,
        toast: true
      })
    },
    increaseQty() { this.qty += 1 },
    decreaseQty() { if (this.qty > 1) this.qty -= 1 }
  }
}
</script>

<style scoped>
.card-title {
  font-weight: 600;
}
.related-carousel::-webkit-scrollbar {
  height: 8px;
}
.related-carousel::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.3);
  border-radius: 4px;
}
.related-carousel::-webkit-scrollbar-track {
  background: transparent;
}
.related-carousel {
  scroll-behavior: smooth;
}
.img-thumbnail.border-primary {
  border-width: 2px !important;
}
</style>
