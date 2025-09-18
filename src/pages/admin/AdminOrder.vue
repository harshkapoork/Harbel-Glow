<template>
  <div>
    <h2>Orders</h2>
    <table class="table mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Address</th>
          <th>Items</th>
          <th>Total</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="o in orders" :key="o.id">
          <td>{{ o.id }}</td>
          <td>
            <strong>{{ o.customer.name }}</strong><br />
            <small>{{ o.customer.email }}</small><br />
            <small>{{ o.customer.phone }}</small>
          </td>
          <td>{{ o.customer.address }}</td>
          <td>
            <ul>
              <li v-for="i in o.items" :key="i.id">
                {{ i.title }} (x{{ i.qty }}) - ₹{{ i.price * i.qty }}
              </li>
            </ul>
          </td>
          <td>₹{{ o.total }}</td>
          <td>
            <span
              :class="['badge', o.status === 'pending' ? 'bg-warning' : 'bg-success']"
            >
              {{ o.status }}
            </span>
          </td>
          <td>
            <button
              class="btn btn-sm btn-success"
              @click="markAsShipped(o.id)"
              :disabled="o.status === 'shipped'"
            >
              Mark Shipped
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getOrders, updateOrderStatus } from '../../utils/Order'

export default {
  name: 'AdminOrders',
  data() {
    return { orders: [] }
  },
  created() {
    this.loadOrders()
  },
  methods: {
    loadOrders() {
      this.orders = getOrders()
    },
    markAsShipped(orderId) {
      updateOrderStatus(orderId, 'shipped')
      this.loadOrders()
    }
  }
}
</script>
