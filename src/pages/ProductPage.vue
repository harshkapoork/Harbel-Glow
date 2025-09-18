<template>
  <div v-if="product" class="container my-4">
    <div class="row">
      <!-- Product Images -->
      <div class="col-md-6 mb-3">
        <!-- Main Image -->
        <img 
          :src="currentImage || 'https://via.placeholder.com/400x400.png?text=No+Image'" 
          class="img-fluid rounded shadow-sm mb-3" 
          :alt="product.title || 'Product Image'"
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
            loading="lazy"
          />
        </div>
      </div>

      <!-- Product Details -->
      <div class="col-md-6">
        <h2>{{ product.title }}</h2>
        <p class="text-muted" v-if="category">
          Category: <span class="badge bg-primary">{{ category.name }}</span>
        </p>

        <!-- Price -->
        <span class="text-danger text-decoration-line-through">
          ₹{{ originalPrice }}
        </span>
        <h4 class="text-primary fw-bold">₹{{ product.price }}</h4>

        <!-- Tabs for More Information -->
        <ul class="nav nav-tabs mt-3" id="productTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#desc" type="button">
              Description
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#details" type="button">
              Details
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#usage" type="button">
              Usage
            </button>
          </li>
          <!-- NEW TAB -->
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#recent" type="button">
              Recently Added
            </button>
          </li>
        </ul>

        <div class="tab-content border p-3 rounded-bottom shadow-sm">
          <div class="tab-pane fade show active" id="desc">
            <p>{{ product.description }}</p>
          </div>
          <div class="tab-pane fade" id="details">
            <ul>
              <li><b>Weight:</b> {{ product.weight || 'N/A' }}</li>
              <li><b>Size:</b> {{ product.size || 'N/A' }}</li>
              <li><b>Manufacturer:</b> {{ product.manufacturer || 'N/A' }}</li>
              <li><b>Warranty:</b> {{ product.warranty || 'N/A' }}</li>
            </ul>
          </div>
          <div class="tab-pane fade" id="usage">
            <p>{{ product.usage || 'Follow instructions on packaging.' }}</p>
          </div>
          <!-- NEW Recently Added TAB -->
          <div class="tab-pane fade" id="recent">
            <p><b>Added On:</b> {{ product.addedOn || 'Unknown' }}</p>
            <p><b>Last Updated:</b> {{ product.updatedOn || 'Never Updated' }}</p>
            <p><b>Extra Notes:</b> {{ product.notes || 'No extra information available.' }}</p>
          </div>
        </div>

        <!-- Quantity Selector -->
        <div class="d-flex align-items-center my-3">
          <label class="me-2">Quantity:</label>
          <button class="btn btn-outline-secondary btn-sm" @click="decreaseQty">-</button>

          <input
            type="number"
            v-model.number="qty"
            min="1"
            @input="validateQty"
            class="form-control form-control-sm mx-2"
            style="width:60px;"
          />

          <button class="btn btn-outline-secondary btn-sm" @click="increaseQty">+</button>
        </div>

        <!-- Add to Cart -->
        <button class="btn btn-success btn-lg" @click="addToCart">
          <i class="fas fa-cart-plus"></i> Add {{ qty }} to cart
        </button>
      </div>
    </div>

    <!-- Related Products -->
<!-- Related Products -->
<div v-if="related.length" class="mt-5">
  <h4>You Might Also Like</h4>
  <div class="related-carousel d-flex overflow-auto py-2">
    <div 
      v-for="p in related" 
      :key="p.id" 
      class="card me-3" 
      style="min-width: 180px; flex: 0 0 auto;"
    >
      <!-- Entire card is clickable using router-link -->
      <router-link 
        :to="{ name: 'Product', params: { id: p.id } }" 
        class="text-decoration-none text-dark"
      >
        <img 
          :src="p.image || 'https://via.placeholder.com/150x150.png?text=No+Image'" 
          class="card-img-top" 
          :alt="p.title"
          style="height:150px; object-fit: cover;" 
          loading="lazy"
        />
        <div class="card-body d-flex flex-column">
          <h6 class="card-title">{{ p.title }}</h6>
          <p class="text-success mb-2">₹{{ p.price }}</p>
        </div>
      </router-link>
    </div>
  </div>
</div>

    <div v-else class="alert alert-info mt-4">No related products found.</div>
  </div>

  <p v-else class="alert alert-warning">Product not found</p>
</template>

<script>
import api from '../api/mockApi'
import { loadCart, saveCart } from '../utils/cart'
import Swal from 'sweetalert2'

export default {
  name: 'ProductPage',
  data() {
    return {
      product: null,
      category: null,
      currentImage: '',
      qty: 1,
      related: []
    }
  },
  computed: {
    productId() {
      // always get id from the current route
      return this.$route.params.id
    },
    originalPrice() {
      return this.product ? this.product.price + 250 : 0
    }
  },
  async created() {
    await this.loadProduct()
  },
  watch: {
    // watch route changes
    '$route.params.id': 'loadProduct'
  },
  methods: {
    async loadProduct() {
      const id = this.productId
      this.product = await api.getProduct(id)
      if (this.product) {
        if (!this.product.images || !this.product.images.length) {
          this.product.images = [this.product.image]
        }
        this.currentImage = this.product.images[0] || 'https://via.placeholder.com/400x400.png?text=No+Image'

        const categories = await api.getCategories()
        this.category = categories.find(c => c.id === this.product.categoryId)
        const allProducts = await api.getProductsByCategory(this.category.id)
        this.related = allProducts.filter(p => p.id !== this.product.id)

        if (!this.product.addedOn) this.product.addedOn = new Date().toLocaleDateString()
        if (!this.product.updatedOn) this.product.updatedOn = 'Not updated yet'
        this.qty = 1
      }
    },
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

  // Trigger global event to update cart badge
  window.dispatchEvent(new Event('cart-updated'))

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
    decreaseQty() { if (this.qty > 1) this.qty -= 1 },
    validateQty() { if (this.qty < 1) this.qty = 1 }
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
