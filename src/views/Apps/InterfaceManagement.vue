<template>
    <el-container>
        <el-aside width="256px" style="position: relative;">
            <el-button type="primary" style="position: absolute;right: 4px;top: 4px;z-index: 10;">新建接口</el-button>
            <el-table :data="apiData" :row-class-name="tableRowClassName" @row-click="selectAPI">
                <el-table-column prop="details.method" label="方法" width="84" />
                <el-table-column prop="details.summary" label="简介" width="172" />
            </el-table>
        </el-aside>
        <el-main>你好</el-main>
    </el-container>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed, ref } from 'vue';
import { APItem } from '../../types/apis';
import { storeMutation } from '../../constant/store';
import { apis } from '../../tools/apis';
import { ResponseCode } from '../../types/Response';
const store = useStore();
const apiData = ref<APItem[]>([])
const getApis = () => {
    apis.Projects.Project.Interface.getAll(store.state.pid as number).then(res => {
        if (res?.code == ResponseCode.SUCCESS) {
            apiData.value = res.data.apis
        }
    })
}
getApis();
const currAid = computed(() => store.state.aid)
const tableRowClassName: (arg0: { row: APItem }) => string = ({ row }) => {
    return row.aid == currAid.value ? 'APIRowSelected' : '';
};
const selectAPI = (row: APItem) => {
    store.commit(storeMutation.SELECT_INTERFACE, { aid: row.aid })
}
</script>
<style>
.APIRowSelected {
    --el-table-tr-bg-color: var(--el-border-color-dark);
}
</style>