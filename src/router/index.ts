import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
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
    {
        path: '/setting',
        name: 'setting',
        component: () => import('../views/SettingView.vue'),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;