<template>
  <div>
    <h3>{{ isEdit ? 'Edit' : 'New' }} Product</h3>
    <form @submit.prevent="save" class="mt-3">

      <div class="mb-3">
        <label class="form-label">Title</label>
        <input v-model="form.title" class="form-control" required @input="generateSlug" />
      </div>

      <div class="mb-3">
        <label class="form-label">Slug</label>
        <input v-model="form.slug" class="form-control" placeholder="product-slug" required />
        <div class="form-text">Slug will be used in URLs, e.g., "wireless-headphones"</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Price</label>
        <input v-model.number="form.price" class="form-control" type="number" min="0" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Category</label>
        <select v-model="form.categoryId" class="form-select" required>
          <option disabled value="">-- Select Category --</option>
          <option v-for="c in categories" :value="c.id" :key="c.id">{{ c.name }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea v-model="form.description" class="form-control"></textarea>
      </div>

      <!-- Image upload / URL -->
      <div class="mb-3">
        <label class="form-label">Image</label>
        <input v-model="form.image" class="form-control mb-2" placeholder="Paste image URL (optional)" />
     
        <input type="file" class="form-control" accept="image/*" @change="handleFileUpload" />
           <label class="form-label">More Images</label>
           <input v-model="form.image" class="form-control mb-2" placeholder="Paste image URL (optional)" />
           <input v-model="form.image" class="form-control mb-2" placeholder="Paste image URL (optional)" />
           <input v-model="form.image" class="form-control mb-2" placeholder="Paste image URL (optional)" />
           <input v-model="form.image" class="form-control mb-2" placeholder="Paste image URL (optional)" />
        <div v-if="form.image" class="mt-2">
          <img :src="form.image" alt="Preview" class="img-thumbnail" style="max-width: 150px;" />
        </div>
      </div>

      <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update' : 'Add Product' }}</button>
    </form>
  </div>
</template>

<script>
import api from '../../api/mockApi'
import Swal from 'sweetalert2'

export default {
  name: 'AdminProductForm',
  props: ['id'],
  data() {
    return {
      form: { title: '', slug: '', price: 0, categoryId: '', description: '', image: '' },
      categories: []
    }
  },
  computed: {
    isEdit() { return !!this.id }
  },
  async created() {
    this.categories = await api.getCategories()
    if (this.isEdit) {
      const p = await api.getProduct(this.id)
      if (p) this.form = { ...p }
    }
  },
  methods: {
    generateSlug() {
      if (!this.isEdit || !this.form.slug) {
        this.form.slug = this.form.title
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9\-]/g, '')
      }
    },
    handleFileUpload(e) {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        this.form.image = reader.result
      }
      reader.readAsDataURL(file)
    },
    async save() {
      try {
        if (this.isEdit) {
          await api.updateProduct(this.id, this.form)
          Swal.fire('Updated!', 'Product has been updated.', 'success')
        } else {
          await api.addProduct(this.form)
          Swal.fire('Added!', 'Product has been added.', 'success')
        }
        this.$router.push('/admin/products')
      } catch (err) {
        Swal.fire('Error', err.message || 'Something went wrong', 'error')
      }
    }
  }
}
</script>
