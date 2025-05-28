import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/music',
    name: 'music',
    meta: {
      keepAlive: true,
    },
    component: () => import('../views/MusicView.vue'),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
const routesTotal = routes.length - 1;
export {
  routesTotal
}