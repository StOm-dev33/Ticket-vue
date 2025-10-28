import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Login from './components/AuthLogin.vue'
import Signup from './components/AuthSignup.vue'
import Dashboard from './components/Dashboard.vue'
import Tickets from './components/Tickets.vue'
import './styles.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/auth/login', name: 'login', component: Login },
    { path: '/auth/signup', name: 'signup', component: Signup },
    { 
      path: '/dashboard', 
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('ticketapp_session')) next('/auth/login')
        else next()
      }
    },
    { 
      path: '/tickets', 
      component: Tickets,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('ticketapp_session')) next('/auth/login')
        else next()
      }
    }
  ]
})

createApp(App).use(router).mount('#app')