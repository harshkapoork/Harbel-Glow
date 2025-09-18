import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'

//import bootstrap//
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'bootstrap'

//..............//
// import fort-awesome for icons
import '@fortawesome/fontawesome-free/css/all.min.css'
//
const router = createRouter({
history: createWebHistory(),
routes
})


const app = createApp(App)
app.use(router)
app.mount('#app')