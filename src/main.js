import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./pages/HomePage.vue')
    },
    {
        path: '/product-details/:id',
        name: 'ProductPage',
        component: () => import('./pages/ProductPage.vue'),
    },
    { 
        path: '/cart',
        name: 'CartPage',
        component: () => import('./pages/CartPage.vue')
    },
    { 
        path: '/results',
        name: 'Results',
        component: () => import('./pages/SearchedProductsPage.vue')
    },
    { 
        path: '/new-arrivals',
        name: 'New Arrivals Page',
        component: () => import('./pages/NewArrivalsPage.vue')
    },
    { 
        path: '/on-sale',
        name: 'On Sale Page',
        component: () => import('./pages/OnSalePage.vue')
    },
    { 
        path: '/register',
        name: 'Registration Page',
        component: () => import('./pages/RegistrationPage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition){
        return { top:0 }
        
    }
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
