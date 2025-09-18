<template>
  <div>
    <h3>Categories</h3>
    <router-link to="/admin/categories/new" class="btn btn-success mb-3">Add Category</router-link>
    <table class="table">
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
            <router-link :to="`/admin/categories/${cat.id}/edit`" class="btn btn-primary btn-sm me-2">Edit</router-link>
            <button @click="remove(cat.id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../../api/mockApi'
import Swal from 'sweetalert2'

export default {
  data() {
    return { categories: [] }
  },
  async created() {
    this.categories = await api.getCategories()
  },
  methods: {
    async remove(id) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      })
      if (result.isConfirmed) {
        const data = await api.deleteCategory(id)
        this.categories = await api.getCategories()
        Swal.fire('Deleted!', 'Category has been deleted.', 'success')
      }
    }
  }
}
</script>
