import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: window.lang_prefix + "/",
    name: 'home',
    component:() => import('@/views/Home.vue'),
  },
  {
    path: '*', 
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
