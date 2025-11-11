<template>
  <div>
<marquee class=" bg-dark text-white" behavior="" loop="infinite" direction="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, cum! 

</marquee>
  </div>
  <div>
    <!-- NAVBAR -->
    <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top shadow-sm" role="navigation">
      <div class="container-fluid">
        <!-- Brand -->
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/34/34627.png"
            alt="logo"
            width="32"
            height="32"
            class="me-2"
          />
          <span class=" text-black">Nature's Lap</span>
        </router-link>

        <!-- Mobile toggle (uses Vue state, not Bootstrap JS) -->
        <button
          class="navbar-toggler ms-auto"
          type="button"
          :aria-expanded="mobileNavOpen ? 'true' : 'false'"
          aria-controls="mainNavbar"
          @click="toggleNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Overlay shown when mobile menu open -->
        <div
          v-if="mobileNavOpen"
          class="mobile-nav-overlay"
          @click="closeNav"
          aria-hidden="true"
        ></div>

        <!-- Nav links (collapses on small screens via Vue) -->
        <transition name="slide-fade">
          <div
            v-show="mobileNavOpen || !isMobile"
            id="mainNavbar"
            class="navbar-collapse"
            :class="{ 'show-mobile': mobileNavOpen }"
          >
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <router-link to="/" class="nav-link" exact-active-class="active" @click.native="closeNavIfMobile">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/catalog" class="nav-link" exact-active-class="active" @click.native="closeNavIfMobile">Catalog</router-link>
              </li>
  <li class="nav-item">
                <router-link to="/admin" class="nav-link" exact-active-class="active" @click.native="closeNavIfMobile">Admin</router-link>
              </li>

              <li class="nav-item">
                <router-link to="/cart" class="nav-link position-relative" exact-active-class="active" @click.native="closeNavIfMobile">
                  <i class="fas fa-shopping-cart me-1"></i>
                  Cart
                  <!-- Cart badge -->
                  <span
                    v-if="cartCount > 0"
                    class="cart-badge badge rounded-pill"
                    aria-live="polite"
                  >
                    {{ cartCount }}
                  </span>
                </router-link>
              </li>
            
            </ul>
          </div>
        </transition>
      </div>
    </header>

    <!-- MAIN -->
    <main class="container my-4">
      <router-view />
    </main>

    <!-- FOOTER -->
    <footer class="bg-light text-center py-3 mt-4 border-top">
      © {{ year }} My Shop
    </footer>
  </div>
</template>

<script>
import { loadCart } from './utils/cart' // App.vue is in src/, utils/cart.js in src/utils/

export default {
  name: 'App',
  data() {
    return {
      cartItems: [],
      mobileNavOpen: false,
      isMobile: false
    }
  },
  computed: {
    cartCount() {
      // support different cart item keys: qty or quantity
      return this.cartItems.reduce((sum, item) => sum + (item.qty || item.quantity || 1), 0)
    },
    year() {
      return new Date().getFullYear()
    }
  },
  created() {
    this.handleResize()
    this.loadCart()
    // Listen for cart updates from other parts of app
    window.addEventListener('cart-updated', this.loadCart)
    // Close mobile nav on route change
    this.unwatch = this.$watch('$route', () => {
      this.closeNav()
    })
    // Watch for resize to adjust behavior
    window.addEventListener('resize', this.handleResize)
    // close on ESC
    window.addEventListener('keydown', this.onKeyDown)
  },
  beforeUnmount() {
    window.removeEventListener('cart-updated', this.loadCart)
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('keydown', this.onKeyDown)
    if (this.unwatch) this.unwatch()
  },
  methods: {
    loadCart() {
      // loadCart returns an array
      try {
        this.cartItems = loadCart() || []
      } catch (e) {
        this.cartItems = []
      }
    },
    toggleNav() {
      this.mobileNavOpen = !this.mobileNavOpen
      // prevent background scroll when mobile menu open
      document.documentElement.style.overflow = this.mobileNavOpen ? 'hidden' : ''
    },
    closeNav() {
      if (this.mobileNavOpen) {
        this.mobileNavOpen = false
        document.documentElement.style.overflow = ''
      }
    },
    closeNavIfMobile() {
      if (this.isMobile) this.closeNav()
    },
    handleResize() {
      this.isMobile = window.innerWidth < 992 // breakpoint similar to Bootstrap lg
      if (!this.isMobile) {
        this.mobileNavOpen = false
        document.documentElement.style.overflow = ''
      }
    },
    onKeyDown(e) {
      if (e.key === 'Escape') this.closeNav()
    }
  }
}
</script>

<style scoped>
/* Navbar visuals */
.navbar {
  padding: 0.5rem 1rem;
}

/* Cart badge */
.cart-badge {

  color: white;
  position: absolute;
  font-weight: bold;
  top: 6px;
  right: -8px;
  font-size: 0.75rem;
  padding: 0.25rem 0.45rem;

}

/* Mobile overlay */
.mobile-nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1040;
}

/* Mobile show: make menu full-width panel from right */
.navbar-collapse {
  transition: none;
}

/* Desktop: standard collapse */
@media (min-width: 992px) {
  .navbar-collapse {
    display: flex !important;
    align-items: center;
  }
}

/* Mobile panel styling */
@media (max-width: 991.98px) {
  .navbar-collapse {
    position: fixed;
    top: 56px; /* height of navbar */
    right: 0;
    width: 260px;
    height: calc(100% - 56px);
    background: #0d6efd; /* same as .bg-primary */
    padding: 1rem;
    z-index: 1050;
    box-shadow: -8px 0 24px rgba(0,0,0,0.2);
    transform: translateX(100%);
    opacity: 0;
  }
  .navbar-collapse.show-mobile {
    transform: translateX(0);
    opacity: 1;
  }

  .navbar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-link {
    color: #fff !important;
    padding: 0.75rem 0.5rem;
    border-radius: 6px;
    font-size: 1.05rem;
  }

  .nav-link:hover {
    background: rgba(255,255,255,0.08);
  }

  .nav-link.active {
    background: rgba(255,255,255,0.12);
    font-weight: 600;
  }

  .navbar-toggler {
    border: none;
    background: rgba(255,255,255,0.08);
  }
}

/* transition for panel */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 250ms ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
