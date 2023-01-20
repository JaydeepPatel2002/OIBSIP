import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/foodorder',
    name: 'foodorder',
    component: () => import('../views/FoodOrder.vue')
  },
  {
    path: '/employee',
    name: 'employee',
    component: () => import('../views/Employee.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
