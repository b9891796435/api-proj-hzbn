import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Document",
        component: () => import('@/views/Document/index.vue'),
    },
    {
        path: "/edit",
        name: "DocumentEdit",
        component: () => import('@/views/DocumentEdit/index.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
