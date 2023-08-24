<template>
    <el-tabs v-model="activeTab" class="document-tabs" @tab-click="changeRoute">
        <el-tab-pane label="文档" :name="ROUTE.INTERFACE_DOCUMENT">
            <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="修改文档" :name="ROUTE.INTERFACE_EDIT">
            <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="运行" name="run">
            <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="高级Mock" name="mock">
            <router-view></router-view>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ROUTE } from '@/constant/route.ts';

const router = useRouter();
const store = useStore();

const activeTab = ref(ROUTE.INTERFACE_DOCUMENT);
onMounted(() => {

})

const changeRoute = (tab, event) => {
    router.push({
        name: tab.paneName,
        params: {
            pid: store.state.pid,
            aid: store.state.aid
        }
    })
}

</script>

<style lang="less" scoped>
.document-tabs {
    padding: 20px;
}
</style>