<template>
  <div>
    <!-- HERO / SALE CAROUSEL -->
    <section class="hero mb-5">
      <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
        <div class="carousel-inner">
          <div 
            class="carousel-item" 
            v-for="(banner, index) in banners" 
            :key="index"
            :class="{ active: index === 0 }"
          >
            <img 
              :src="banner.image" 
              class="d-block w-100 hero-img" 
              :alt="banner.title"
            />
            <div class="carousel-caption d-none d-md-block">
              <h2>{{ banner.title }}</h2>
              <p>{{ banner.subtitle }}</p>
              <router-link v-if="banner.link" :to="banner.link" class="btn btn-light btn-lg">
                Shop Now
              </router-link>
            </div>
          </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>

        <div class="carousel-indicators">
          <button 
            v-for="(banner, index) in banners" 
            :key="'indicator-'+index"
            type="button"
            :data-bs-target="'#heroCarousel'"
            :data-bs-slide-to="index"
            :class="{ active: index === 0 }"
            aria-current="true"
            :aria-label="'Slide '+(index+1)"
          ></button>
        </div>
      </div>
    </section>

    <!-- PRODUCTS SECTIONS -->
    <section v-for="section in sections" :key="section.title" class="mb-5">
      <div class="container">
        <h3 class="mb-4">{{ section.title }}</h3>
        <div class="row g-4">
          <div v-if="section.products.length === 0" class="col-12 text-center text-muted py-3">
            No products found
          </div>
          <div class="col-md-3" v-for="p in section.products" :key="p.id">
            <div class="card h-100 shadow-sm hover-card">
                 <router-link :to="{ name: 'Product', params: { id: p.id } }" class="btn  btn-sm">
              <div class="card-img-container">
                <img 
                  :src="p.image || 'https://via.placeholder.com/200x200.png?text=No+Image'" 
                  class="card-img-top" 
                  alt="Product"
                />
              </div>
              </router-link>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ p.title }}</h5>
                <p class="card-text text-muted">₹{{ p.price }}</p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                  <router-link :to="{ name: 'Product', params: { id: p.id } }" class="btn btn-outline-primary btn-sm">View</router-link>
                  <button class="btn btn-primary btn-sm" @click="handleAddToCart(p)">
                    <i class="fas fa-cart-plus"></i> Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from '../api/mockApi'
import { addToCart, loadCart, saveCart } from '../utils/cart'
import Swal from 'sweetalert2'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default {
  name: 'HomePage',
  data() {
    return {
      banners: [
        { image: 'https://static.vecteezy.com/system/resources/previews/011/320/988/non_2x/big-sale-banner-design-with-podium-gradient-background-social-media-post-product-advertisement-design-special-discount-design-vector.jpg' , title: 'Big Sale 50% Off', subtitle: 'Grab your favorite products now', link: '/products' },
        { image: 'https://as1.ftcdn.net/v2/jpg/05/15/52/04/1000_F_515520410_4tgxVXn5Jx664a6GISFGXWCYUncwuROq.jpg', title: 'Exclusive Deals', subtitle: 'Limited time offers', link: '/products' },
        {  image: 'https://img.freepik.com/premium-vector/sale-banner-percent-off-best-offer_419341-1170.jpg', title: 'Trending Now', subtitle: 'Check out our trending products', link: '/products' }
      ],
      products: [],
      categories: []
    }
  },
  async created() {
    this.products = await api.getProducts()
    this.categories = await api.getCategories()
  },
  computed: {
    sections() {
      return [
        { title: 'Special Offers', products: this.products.slice(0, 4) },
        { title: 'Trending Products', products: this.products.slice(4, 8) },
        ...this.categories.map(cat => ({ title: cat.name, products: this.products.filter(p => p.categoryId === cat.id).slice(0, 4) }))
      ]
    }
  },
  methods: {
    handleAddToCart(product) {
      // Load current cart
      let cart = loadCart()
      const existing = cart.find(i => i.id === product.id)
      if (existing) {
        existing.qty += 1
      } else {
        cart.push({ ...product, qty: 1 })
      }
      saveCart(cart)

      // Show toast
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${product.title} added to cart!`,
        showConfirmButton: false,
        timer: 1200,
        toast: true
      })
    }
  }
}
</script>

<style scoped>
.carousel-caption {
  background: rgba(0, 0, 0, 0.45);
  padding: 1rem;
  border-radius: 0.5rem;
}
.hero-img {
  height: 350px;
  object-fit: cover;
}
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
