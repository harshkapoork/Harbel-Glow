<template>
  <div>
    <h3>{{ isEdit ? 'Edit Category' : 'New Category' }}</h3>

    <!-- Form -->
    <form @submit.prevent="save" class="mt-3 mb-4">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input
          v-model="form.name"
          class="form-control"
          required
          placeholder="Category name"
          @input="generateSlug"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Slug</label>
        <input
          v-model="form.slug"
          class="form-control"
          required
          placeholder="category-slug"
        />
        <div class="form-text">
          Slug should be URL-friendly (e.g., "electronics", "books")
        </div>
      </div>

      <button type="submit" class="btn btn-success">
        {{ isEdit ? 'Update' : 'Add Category' }}
      </button>
      <button
        v-if="isEdit"
        type="button"
        class="btn btn-secondary ms-2"
        @click="cancelEdit"
      >
        Cancel
      </button>
    </form>

    <!-- Category List -->
    <h4>Category List</h4>
    <table class="table table-bordered">
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
            <button class="btn btn-warning btn-sm me-2" @click="editCategory(cat)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteCategory(cat.id)">Delete</button>
          </td>
        </tr>
        <tr v-if="categories.length === 0">
          <td colspan="3" class="text-center">No categories found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../../api/mockApi'
import Swal from 'sweetalert2'

export default {
  name: 'AdminCategoryForm',
  data() {
    return {
      form: { name: '', slug: '' },
      categories: [],
      editId: null,
    }
  },
  computed: {
    isEdit() {
      return this.editId !== null
    }
  },
  async created() {
    await this.loadCategories()
  },
  methods: {
    async loadCategories() {
      this.categories = await api.getCategories()
    },
    generateSlug() {
      if (!this.form.slug) {
        this.form.slug = this.form.name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9\-]/g, '')
      }
    },
    async save() {
      try {
        if (this.isEdit) {
          await api.updateCategory(this.editId, { ...this.form })
          Swal.fire('Updated!', 'Category has been updated.', 'success')
        } else {
          await api.addCategory({ ...this.form })
          Swal.fire('Added!', 'Category has been added.', 'success')
        }

        this.form = { name: '', slug: '' }
        this.editId = null
        await this.loadCategories()
      } catch (err) {
        Swal.fire('Error', err.message || 'Something went wrong', 'error')
      }
    },
    editCategory(cat) {
      this.form = { ...cat }
      this.editId = cat.id
    },
    cancelEdit() {
      this.form = { name: '', slug: '' }
      this.editId = null
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
        await api.deleteCategory(id)
        Swal.fire('Deleted!', 'Category has been deleted.', 'success')
        await this.loadCategories()
      }
    }
  }
}
</script>
