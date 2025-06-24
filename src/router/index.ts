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
        children: [
            {
                path: '',
                name: 'musicView',
                component: () => import('../views/MusicView.vue'),
            },
            {
                path: 'musicLayoutView',
                name: 'MusicLayoutView',
                component: () => import('../views/MusicLayoutView.vue'),
            },
        ],
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
const routesTotal = routes.length - 2;
export default router;

export { routesTotal }