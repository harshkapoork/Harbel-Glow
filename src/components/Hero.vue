<template>
  <div>
    <!-- HERO / SALE CAROUSEL -->
    <section class="hero mb-4">
      <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div 
            class="carousel-item" 
            v-for="(banner, index) in banners" 
            :key="index"
            :class="{ active: index === 0 }"
          >
            <img 
              :src="banner.image" 
              class="d-block w-100" 
              :alt="banner.title"
              style="height: 300px; object-fit: cover;"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>{{ banner.title }}</h5>
              <p>{{ banner.subtitle }}</p>
              <router-link v-if="banner.link" :to="banner.link" class="btn btn-light btn-sm">
                Shop Now
              </router-link>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>

        <!-- Indicators -->
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
  </div>
</template>

<script>
export default {
  name: 'HomeHeroCarousel',
  data() {
    return {
      banners: [
        { 
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/34a17917926931.562c0f7f02c94.jpg', 
          title: 'Big Sale 50% Off', 
          subtitle: 'Grab your favorite products now', 
          link: '/products' 
        },
        { 
          image: 'https://via.placeholder.com/1200x300.png?text=Big+Sale+2', 
          title: 'Exclusive Deals', 
          subtitle: 'Limited time offers', 
          link: '/products' 
        },
        { 
          image: 'https://via.placeholder.com/1200x300.png?text=Big+Sale+3', 
          title: 'Trending Now', 
          subtitle: 'Check out our trending products', 
          link: '/products' 
        },
      ]
    }
  }
}
</script>

<style scoped>
.carousel-caption {
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>
