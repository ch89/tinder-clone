import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/matches',
      name: 'matches',
      component: () => import('../views/Matches.vue')
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('../views/Chat.vue')
    }
  ]
})

export default router