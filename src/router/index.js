import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('../views/Register.vue') },
  { path: '/findBackPW', name: 'findBackPW', component: () => import('../views/FindBackPW.vue') },
  { path: '/home', component: () => import('../views/Home.vue'),
    children: [
      { path: '/', redirect: { path: '/news' } },
      { path: '/news', name: 'News', component: () => import('../components/News.vue') },
      { path: '/search', component: () => import('../views/Search.vue'),
        children: [
          { path: '/sick', name: "Sick", component: () => import('../components/Sick.vue') },
          { path: '/book', name: "Book", component: () => import('../components/Book.vue') },
          { path: '/drug', name: "Drug", component: () => import('../components/Drug.vue') },
        ] },
      { path: '/steward', name: 'Steward', component: () => import('../views/Steward.vue') },
      { path: '/about', name: 'About', component: () => import('../views/About.vue') },
    ]
  },      
  { path: '/newsInformation', name: 'NewsInformation', component: () => import('../components/NewsInformation.vue') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
