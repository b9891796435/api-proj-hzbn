import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/apiDetail/projects/:pid/apis/:aid",
        name: "Document",
        component: () => import('@/views/Document/index.vue'),
    },
    {
        path: "/edit",
        name: "DocumentEdit",
        component: () => import('@/views/DocumentEdit/index.vue'),
    },
    {
        path: "/home",
        component: () => import('@/views/Home/index.vue'),
    },
    {
        path: '/apilist',
        component: () => import('@/views/APIList/index.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
