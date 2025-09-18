<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Products</h3>
      <router-link to="/admin/products/new" class="btn btn-success">
        <i class="fas fa-plus"></i> Add Product
      </router-link>
    </div>

    <!-- Filters -->
    <div class="row mb-3">
      <div class="col-md-4">
        <input
          v-model="search"
          type="text"
          class="form-control"
          placeholder="Search by title or category..."
        />
      </div>
      <div class="col-md-4">
        <select v-model.number="selectedCategory" class="form-select">
          <option value="">All Categories</option>
          <option v-for="c in categories" :value="c.id" :key="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div class="col-md-4">
        <select v-model="sortKey" class="form-select">
          <option value="">Sort By</option>
          <option value=title>Title (A-Z)</option>
          <option value=price>Price (Low → High)</option>
        </select>
      </div>
    </div>

    <!-- Bulk Delete Button -->
    <div class="mb-2">
      <button
        class="btn btn-danger"
        :disabled="selectedProducts.length === 0"
        @click="bulkDelete"
      >
        <i class="fas fa-trash"></i> Delete Selected
        <span v-if="selectedProducts.length">({{ selectedProducts.length }})</span>
      </button>
    </div>

    <!-- Product Table -->
    <table class="table align-middle">
      <thead>
        <tr>
          <th><input type="checkbox" @change="toggleAll" :checked="allSelected" /></th>
          <th>Image</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Slug</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="p in paginatedProducts"
          :key="p.id"
          :class="{ 'table-active': selectedProducts.includes(p.id) }"
        >
          <td><input type="checkbox" :value="p.id" v-model="selectedProducts" /></td>
          <td>
            <img
              :src="p.image?.trim() ? p.image : 'https://via.placeholder.com/80x80.png?text=No+Image'"
              alt="Product"
              class="img-thumbnail"
              style="width: 60px; height: 60px; object-fit: cover;"
            />
          </td>
          <td>{{ p.title }}</td>
          <td>{{ getCategoryName(p.categoryId) }}</td>
          <td>₹{{ p.price }}</td>
          <td>{{ p.slug }}</td>
          <td>
            <router-link
              :to="`/admin/products/${p.id}/edit`"
              class="btn btn-sm btn-warning me-2"
              :class="{ invisible: selectedProducts.length > 0 }"
            >
              Edit
            </router-link>
            <button
              class="btn btn-sm btn-danger"
              @click="del(p.id)"
              :class="{ invisible: selectedProducts.length > 0 }"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr v-if="paginatedProducts.length === 0">
          <td colspan="7" class="text-center text-muted">No products found.</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <nav v-if="totalPages > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">Previous</button>
        </li>
        <li
          v-for="n in visiblePages"
          :key="n"
          class="page-item"
          :class="{ active: currentPage === n }"
        >
          <button class="page-link" @click="currentPage = n">{{ n }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import api from '../../api/mockApi'
import Swal from 'sweetalert2'

export default {
  name: 'AdminProductList',
  data() {
    return {
      products: [],
      categories: [],
      search: '',
      selectedCategory: '',
      sortKey: '',
      selectedProducts: [],
      currentPage: 1,
      perPage: 10
    }
  },
  async created() {
    this.products = await api.getProducts()
    this.categories = await api.getCategories()
  },
  computed: {
    filteredProducts() {
      const term = this.search.toLowerCase()
      return this.products.filter(p => {
        const titleMatch = p.title.toLowerCase().includes(term)
        const categoryName = this.categories.find(c => c.id === p.categoryId)?.name?.toLowerCase() || ''
        const categoryMatch = categoryName.includes(term)
        const categoryFilter = this.selectedCategory ? p.categoryId === this.selectedCategory : true
        return (titleMatch || categoryMatch) && categoryFilter
      })
    },
    sortedProducts() {
      let sorted = [...this.filteredProducts]
      if (this.sortKey === 'title') sorted.sort((a, b) => a.title.localeCompare(b.title))
      else if (this.sortKey === 'price') sorted.sort((a, b) => a.price - b.price)
      return sorted
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage
      return this.sortedProducts.slice(start, start + this.perPage)
    },
    totalPages() {
      return Math.ceil(this.sortedProducts.length / this.perPage) || 1
    },
    visiblePages() {
      const maxPages = 5
      let start = Math.max(1, this.currentPage - 2)
      let end = Math.min(this.totalPages, start + maxPages - 1)
      start = Math.max(1, end - maxPages + 1)
      const pages = []
      for (let i = start; i <= end; i++) pages.push(i)
      return pages
    },
    allSelected() {
      return this.paginatedProducts.every(p => this.selectedProducts.includes(p.id)) && this.paginatedProducts.length > 0
    }
  },
  methods: {
    getCategoryName(categoryId) {
      const cat = this.categories.find(c => c.id === categoryId)
      return cat ? cat.name : '-'
    },
    toggleAll(e) {
      if (e.target.checked) {
        const newIds = this.paginatedProducts.map(p => p.id)
        this.selectedProducts = Array.from(new Set([...this.selectedProducts, ...newIds]))
      } else {
        const paginatedIds = this.paginatedProducts.map(p => p.id)
        this.selectedProducts = this.selectedProducts.filter(id => !paginatedIds.includes(id))
      }
    },
    async del(id) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This product will be permanently deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      })

      if (result.isConfirmed) {
        this.products = this.products.filter(p => p.id !== id)
        this.selectedProducts = this.selectedProducts.filter(pid => pid !== id)
        await api.deleteProduct(id)
        Swal.fire('Deleted!', 'Product has been deleted.', 'success')
      }
    },
    async bulkDelete() {
      if (!this.selectedProducts.length) return
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `This will delete ${this.selectedProducts.length} product(s)!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete them!'
      })

      if (result.isConfirmed) {
        const idsToDelete = [...this.selectedProducts]
        this.products = this.products.filter(p => !idsToDelete.includes(p.id))
        this.selectedProducts = []
        for (const id of idsToDelete) await api.deleteProduct(id)
        Swal.fire('Deleted!', 'Selected products have been deleted.', 'success')
      }
    }
  }
}
</script>
