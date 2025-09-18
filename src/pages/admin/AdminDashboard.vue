<template>
  <div class="container mt-4">
    <h2 class="mb-4">Admin Dashboard</h2>

    <!-- Summary Cards -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card text-white bg-primary mb-3">
          <div class="card-body">
            <h5 class="card-title">Products</h5>
            <p class="card-text display-6">{{ totalProducts }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-white bg-success mb-3">
          <div class="card-body">
            <h5 class="card-title">Categories</h5>
            <p class="card-text display-6">{{ totalCategories }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-white bg-warning mb-3">
          <div class="card-body">
            <h5 class="card-title">Recent Products</h5>
            <p class="card-text display-6">{{ recentProducts.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="nav nav-pills mb-4">
      <router-link 
        to="/admin/products" 
        class="nav-link" 
        :class="{ active: $route.path.startsWith('/admin/products') && !$route.path.endsWith('/new') }"
      >Products</router-link>
     <router-link class="nav-link" to="/admin/order"  :class="{ active: $route.path.endsWith('/order') && $route.path.includes('/order') }">Orders List</router-link>

      <router-link 
        to="/admin/products/new" 
        class="nav-link" 
        :class="{ active: $route.path.endsWith('/new') && $route.path.includes('/products') }"
      >Add Product</router-link>

      <router-link 
        to="/admin/categories/new" 
        class="nav-link" 
        :class="{ active: $route.path.includes('/categories') }"
      >Add Category</router-link>
    </nav>

    <!-- Categories List -->
    <div class="mb-4">
      <h4>Categories</h4>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in categories" :key="cat.id">
            <td>{{ cat.name }}</td>
            <td>{{ cat.slug }}</td>
            <td>
         <router-link 
  :to="`/admin/categories/${cat.id}/edit`" 
  class="btn btn-sm btn-warning me-2"
>Edit</router-link>

              <button @click="deleteCategory(cat.id)" class="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Recent Products List -->
    <div>
      <h4>Recent Products</h4>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="p in recentProducts" :key="p.id">
          <div>
            <img :src="p.image" alt="product" class="img-thumbnail me-2" style="width:100px; height:100px;">
            <strong>{{ p.title }}</strong> - {{ p.price }} ₹
            <small class="text-muted">({{ getCategoryName(p.categoryId) }})</small>
          </div>
          <div>
       <router-link 
  :to="`/admin/products/${p.id}/edit`" 
  class="btn btn-sm btn-warning me-2"
>Edit</router-link>

          </div>
        </li>
      </ul>
    </div>

    <!-- Child Routes -->
    <router-view />
  </div>
</template>

<script>
import api from '../../api/mockApi'

import Swal from 'sweetalert2'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      totalProducts: 0,
      totalCategories: 0,
      categories: [],
      recentProducts: []
    }
  },
  async created() {
    await this.loadDashboardData()
  },
  methods: {
    async loadDashboardData() {
      const products = await api.getProducts()
      const categories = await api.getCategories()

      this.totalProducts = products.length
      this.totalCategories = categories.length
      this.categories = categories
      this.recentProducts = products.slice(-5).reverse() // last 5 products
    },
    getCategoryName(id) {
      const cat = this.categories.find(c => c.id === id)
      return cat ? cat.name : 'Unknown'
    },
    async deleteCategory(id) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will delete the category!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      })

      if (result.isConfirmed) {
        try {
          await api.deleteCategory(id)
          Swal.fire('Deleted!', 'Category has been deleted.', 'success')
          this.loadDashboardData()
        } catch (err) {
          Swal.fire('Error', err.message || 'Something went wrong', 'error')
        }
      }
    }
  }
}
</script>
