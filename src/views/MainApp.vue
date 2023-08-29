<template>
    <div>
        <select-project :value="drawer"></select-project>
        <el-container>
            <el-header height="32px">
                <div>
                    会者不难API管理平台
                </div>
                <div class="userProfile">
                    <div>UID:{{ uid }}</div>
                </div>
            </el-header>
            <el-container style="border-top: solid #00000022 1px;">
                <el-aside width="84px">
                    <div class="menu">
                        <div @click="() => drawer = !drawer">
                            <el-icon>
                                <Switch />
                            </el-icon>
                            切换项目
                        </div>
                        <div @click="goAPI" :class="curr == ROUTE.INTERFACE_MANAGEMENT ? 'selected' : ''">
                            <el-icon>
                                <Files />
                            </el-icon>
                            接口管理
                        </div>
                        <div @click="goSetting" :class="curr == ROUTE.MEMBERS_MANAGEMENT ? 'selected' : ''">
                            <el-icon>
                                <Setting />
                            </el-icon>
                            项目设置
                        </div>
                        <div @click="goExit">
                            <el-icon>
                                <Close />
                            </el-icon>
                            退出登录
                        </div>
                    </div>
                </el-aside>
                <el-main style="padding: 0;">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router'
import router from '../router';
import SelectProject from './Apps/SelectProject.vue';
import { OAUTH } from '../constant/login'
import { ROUTE } from '../constant/route'
const uid = localStorage.getItem(OAUTH.UID);
const goSetting = () => {
    router.push({ name: ROUTE.MEMBERS_MANAGEMENT })
}
const goAPI = () => {
    router.push({ name: ROUTE.INTERFACE_MANAGEMENT })
};
const goExit = () => {
    localStorage.setItem(OAUTH.TOKEN, '');
    router.push({ name: ROUTE.LOGIN })
}
const curr = ref(ROUTE.INTERFACE_MANAGEMENT)
onBeforeRouteUpdate((to, _from, next) => {//Rust的不使用变量语法怎么在ts里也有用啊
    curr.value = to.name as ROUTE;
    next()
})
const drawer = ref(false);
</script>
<style scoped lang="less">
header {
    display: flex;
    text-align: left;
    font-size: 24px;
    margin: 8px 0 8px;
    align-items: center;
}
.userProfile{
    display: flex;
    margin-left: auto;
    div{
        margin: 0 8px;
    }
}

.menu {
    display: flex;
    flex-direction: column;
    border-right: solid #00000022 1px;
    height:100%;
    min-height: calc(100vh - 48px);
    background-color: #F9FAFB;
    text-align: center;
    user-select: none;
}

.menu>* {
    margin: 12px;
    padding: 12px;
    border-radius: 6px;
}

.menu>.selected,
.menu>:hover {
    background-color: #00000011;
}
</style>