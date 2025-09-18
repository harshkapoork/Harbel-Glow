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
          image: 'https://static.vecteezy.com/system/resources/previews/011/320/988/non_2x/big-sale-banner-design-with-podium-gradient-background-social-media-post-product-advertisement-design-special-discount-design-vector.jpg', 
          title: 'Big Sale 50% Off', 
          subtitle: 'Grab your favorite products now..', 
          link: '/products' 
        },
        { 
          image: 'https://as1.ftcdn.net/v2/jpg/05/15/52/04/1000_F_515520410_4tgxVXn5Jx664a6GISFGXWCYUncwuROq.jpg', 
          title: 'Exclusive Deals', 
          subtitle: 'Limited time offers', 
          link: '/products' 
        },
        { 
          image: 'https://img.freepik.com/premium-vector/sale-banner-percent-off-best-offer_419341-1170.jpg', 
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
