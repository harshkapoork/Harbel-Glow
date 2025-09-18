<template>
  <div>
    <!-- NAVBAR -->
    <header class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
      <div class="container-fluid">
        <!-- Brand -->
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/34/34627.png" 
            alt="logo" 
            width="30" 
            height="30" 
            class="me-2"
          />
          <span class="fw-bold">My Shop</span>
        </router-link>

        <!-- Mobile toggle -->
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Nav links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/catalog" class="nav-link" active-class="active">Catalog</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/cart" class="nav-link position-relative" active-class="active">
                Cart
                <!-- Cart badge -->
                <span 
                  v-if="cartCount > 0" 
                  class="position-absolute top-2 start-100 translate-middle badge rounded-pill border"
                >
                  {{ cartCount }}
                </span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin" class="nav-link" active-class="active">Admin</router-link>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <!-- MAIN -->
    <main class="container my-4">
      <router-view />
    </main>

    <!-- FOOTER -->
    <footer class="bg-light text-center py-3 mt-4 border-top">
      © {{ new Date().getFullYear() }} My Shop
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return { cartItems: [] }
  },
  created() {
    this.loadCart()
    // Listen for cart updates
    window.addEventListener("cart-updated", this.loadCart)
  },
  beforeUnmount() {
    window.removeEventListener("cart-updated", this.loadCart)
  },
  methods: {
    loadCart() {
      const stored = localStorage.getItem("cart")
      this.cartItems = stored ? JSON.parse(stored) : []
    }
  },
  computed: {
    cartCount() {
      return this.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
    }
  }
}
</script>

<style scoped>
.navbar .nav-link {
  font-weight: 500;
  transition: color 0.2s ease;
}
.navbar .nav-link:hover {
  color: #ffe082;
}
.navbar .nav-link.active {
  font-weight: 600;
  border-bottom: 2px solid #fff;
}
</style>
