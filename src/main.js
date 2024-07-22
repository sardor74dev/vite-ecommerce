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
        component: () => import('./pages/HomePage.vue'),
        meta: {
            title: 'Home | SHOP.CO'
        }
    },
    {
        path: '/product-details/:id',
        name: 'ProductPage',
        component: () => import('./pages/ProductPage.vue'),
        meta: {
            requiresAuth: true
        }
    },
    { 
        path: '/cart',
        name: 'CartPage',
        component: () => import('./pages/CartPage.vue'),
        meta: {
            requiresAuth: true
        }
    },
    { 
        path: '/results',
        name: 'Results',
        component: () => import('./pages/SearchedProductsPage.vue'),
        meta: {
            title: 'Results | SHOP.CO'
        }
    },
    { 
        path: '/new-arrivals',
        name: 'New Arrivals Page',
        component: () => import('./pages/NewArrivalsPage.vue'),
        meta: {
            title: 'New Arrivals | SHOP.CO'
        }
    },
    { 
        path: '/on-sale',
        name: 'On Sale Page',
        component: () => import('./pages/OnSalePage.vue'),
        meta: {
            title: 'On Sale | SHOP.CO'
        }
    },
    { 
        path: '/register',
        name: 'Registration Page',
        component: () => import('./pages/RegistrationPage.vue'),
        meta: {
            title: 'Registration | SHOP.CO'
        }
    },
    { 
        path: '/login',
        name: 'Login Page',
        component: () => import('./pages/LoginPage.vue'),
        meta: {
            title: 'Login | SHOP.CO'
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition){
        return { top:0 }
        
    }
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('authToken')
    if(to.matched.some(record => record.meta.requiresAuth) && isAuthenticated){
        next({
            name: 'Login Page',
            query: {
                redirect: to.fullPath
            }
        })
    } else {
        next()
    }
})

router.beforeEach((to, from, next) => {
    if(to.meta.title){
        document.title = to.meta.title
    } else {
        document.title = 'SHOP.CO'
    } next()
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
