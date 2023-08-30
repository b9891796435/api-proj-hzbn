<template>
    <el-icon @click="openHistory">
        <Tickets />
    </el-icon>
    <el-tabs v-model="activeTab" class="document-tabs" @tab-click="changeRoute">
        <el-tab-pane label="文档" :name="ROUTE.INTERFACE_DOCUMENT">
            <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="修改文档" :name="ROUTE.INTERFACE_EDIT">
            <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="运行">
            <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="高级Mock" >
            <router-view></router-view>
        </el-tab-pane>
    </el-tabs>
    <el-drawer v-model="historyDrawerVisible" title="查看历史版本" direction="rtl" size="30%">
        <el-table :data="historyInfo" @row-click="handleHistoryClick">
            <el-table-column property="hid" label="版本ID" />
            <el-table-column property="username" label="修改者" />
            <el-table-column property="time" label="修改时间" />
        </el-table>
    </el-drawer>
    <el-dialog v-model="recoverDialogVisible" title="提示" width="30%">
        <span>确认恢复至该历史版本吗？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="recoverDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="recoverHistory">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ROUTE } from '@/constant/route.ts';
import { ElMessage } from 'element-plus'

interface History {
    hid: number,
    time: string,
    username: string
}

const router = useRouter();
const store = useStore();

const activeTab = ref(ROUTE.INTERFACE_DOCUMENT);
const historyDrawerVisible = ref(false);
const recoverDialogVisible = ref(false);
const recoverRow = ref();
const historyInfo = ref<History[]>([]);

const timeFormat = (rawTime: string) => {
    const dateObj = new Date(rawTime);
    const curTime = new Date();

    let seconds = Math.floor((curTime.getTime() - dateObj.getTime()) / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;
    let hours = Math.floor(minutes / 60);
    minutes %= 60;
    let days = Math.floor(hours / 24);
    hours %= 24;

    if (days >= 7) {
        return `${dateObj.getFullYear()}年${dateObj.getMonth()}月${dateObj.getDate()}日`;
    } else if (days > 0) {
        return `${days}天前`;
    } else if (hours > 0) {
        return `${hours}小时前`;
    } else if (minutes > 0) {
        return `${minutes}分钟前`;
    } else {
        return `${seconds}秒前`;
    }
}

const getHistory = () => {
    store.dispatch('getHistory', { pid: store.state.pid, aid: store.state.aid }).then(() => {
        historyInfo.value = store.state.apis.historyInfo;
        historyInfo.value.forEach(history => {
            history.time = timeFormat(history.time);
        })
    });
}

onMounted(() => {
    getHistory();
})

const changeRoute = (tab: any) => {
    router.push({
        name: tab.paneName,
        params: {
            pid: store.state.pid,
            aid: store.state.aid
        }
    })
}

/* 打开版本抽屉 */
const openHistory = () => {
    historyDrawerVisible.value = true;
}

/* 点击历史版本事件 */
const handleHistoryClick = (row: History) => {
    recoverDialogVisible.value = true;
    recoverRow.value = row;
}

/* 历史版本回滚事件 */
const recoverHistory = () => {
    let row = recoverRow.value;
    store.dispatch('recoverHistory', { pid: store.state.pid, aid: store.state.aid, hid: row.hid }).then(() => {
        ElMessage({ message: `已恢复至历史版本，当前历史版本标识：${row.hid}`, type: 'success' });
        getHistory();
    }).catch(() => {
        ElMessage({ message: `恢复失败`, type: 'error' });
    })
    recoverDialogVisible.value = false;
}

</script>

<style lang="less" scoped>
.el-icon {
    position: absolute;
    right: 30px;
    top: 80px;
    width: auto;
    z-index: 100;

    :hover {
        cursor: pointer;
    }
}

.document-tabs {
    padding: 20px;
}

:deep(.el-table__row:hover) {
    cursor: pointer;
    background-color: #ddd;
}
</style>