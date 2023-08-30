import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from '../views/Login.vue';
import MainApp from '../views/MainApp.vue';
import InterfaceManagement from "../views/Apps/InterfaceManagement.vue";
import ProjectSetting from '../views/Apps/ProjectSetting.vue';
import MembersManagement from "../views/Apps/SettingItems/MembersManagement.vue";
import ProjectManagement from "../views/Apps/SettingItems/ProjectManagement.vue";
import InterfaceDocument from '../views/Apps/InterfaceItems/InterfaceDocument.vue';
import InterfaceEdit from '../views/Apps/InterfaceItems/InterfaceEdit.vue';
import DocumentTabs from '../views/Apps/DocumentTabs.vue';
import DataManagement from "@/views/Apps/SettingItems/DataManagement.vue";
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
            path: 'InterfaceManagement/projects/:pid?',
            name: ROUTE.INTERFACE_MANAGEMENT,
            component: InterfaceManagement,
        }, {
            path: 'InterfaceCreate',
            name: ROUTE.INTERFACE_CREATE,
            component: InterfaceEdit,
        }, {
            path: 'DocumentTabs/projects/:pid?/apis/:aid',
            name: ROUTE.DOCUMENT_TABS,
            component: DocumentTabs,
            redirect: {
                name: ROUTE.INTERFACE_DOCUMENT
            },
            children: [
                {
                    path: 'InterfaceDocument',
                    name: ROUTE.INTERFACE_DOCUMENT,
                    component: InterfaceDocument,
                }, {
                    path: 'InterfaceEdit',
                    name: ROUTE.INTERFACE_EDIT,
                    component: InterfaceEdit,
                }, 
            ]
        },
        {
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
            },{
                path:'DataManagement',
                name:ROUTE.DATA_MANAGEMENT,
                component:DataManagement
            }]
        }]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
