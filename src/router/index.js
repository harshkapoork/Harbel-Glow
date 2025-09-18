import Home from '../pages/Home.vue'
import Catalog from '../pages/Catalog.vue'
import ProductPage from '../pages/ProductPage.vue'
import CategoryProducts from '../pages/CategoryProduct.vue'
import Cart from '../pages/Cart.vue'
import Checkout from '../pages/Checkout.vue'


// Admin
import AdminDashboard from '../pages/admin/AdminDashboard.vue'
import AdminProductList from '../pages/admin/AdminProductList.vue'
import AdminProductForm from '../pages/admin/AdminProductForm.vue'
import AdminCategoryList from '@/pages/admin/AdminCategoryList.vue'
import AdminCategoryForm from '../pages/admin/AdminCategoryForm.vue'


export default [
{ path: '/', name: 'Home', component: Home },
{ path: '/catalog', name: 'Catalog', component: Catalog },
{ path: '/product/:id', name: 'Product', component: ProductPage, props: true },
{ path: '/category/:slug', name: 'CategoryProducts', component: CategoryProducts, props: true },
{ path: '/cart', name: 'Cart', component: Cart },
{ path: '/checkout', name: 'Checkout', component: Checkout },


// Admin area (no auth for starter)
{
path: '/admin',
name: 'AdminDashboard',
component: AdminDashboard,
children: [
{ path: 'products', name: 'AdminProductList', component: AdminProductList },
{ path: 'products/new', name: 'AdminProductNew', component: AdminProductForm },
{ path: 'products/:id/edit', name: 'AdminProductEdit', component: AdminProductForm, props: true },
{ path: 'categories/new', name: 'AdminCategoryNew', component: AdminCategoryForm },
{ path: 'categories', name: 'AdminCategoryList', component: AdminCategoryList },
{ path: 'categories/:id/edit', name: 'AdminCategoryEdit', component: AdminCategoryForm, props: true }

]
}
]