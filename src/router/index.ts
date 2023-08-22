import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from '../views/Login.vue';
import MainApp from '../views/MainApp.vue';
import InterfaceManagement from "../views/Apps/InterfaceManagement.vue";
import ProjectSetting from '../views/Apps/ProjectSetting.vue';
import MembersManagement from "../views/Apps/SettingItems/MembersManagement.vue";
import ProjectManagement from "../views/Apps/SettingItems/ProjectManagement.vue";
import { ROUTE } from '../constant/route'

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: ROUTE.LOGIN,
        component: Login,
    },
    {
        path: "/MainApp",
        name: ROUTE.MAIN_APP,
        component: MainApp,
        children: [{
            path: '',
            name: 'InterfaceManagement',
            component: InterfaceManagement
        }, {
            path: 'ProjectSetting',
            name: ROUTE.PROJECT_SETTING,
            component: ProjectSetting,
            children: [{
                path: 'MembersManagement',
                name: ROUTE.MEMBERS_MANAGEMENT,
                component: MembersManagement
            }, {
                path: 'ProjectManagement',
                name: ROUTE.PROJECT_MANAGEMENT,
                component: ProjectManagement
            }]
        },]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
