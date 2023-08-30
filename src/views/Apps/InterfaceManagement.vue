<template>
    <!-- <el-container>
        <el-aside width="256px" style="position: relative;">
            <el-button type="primary" style="position: absolute;right: 4px;top: 4px;z-index: 10;">新建接口</el-button>
            <el-table :data="apiData" :row-class-name="tableRowClassName" @row-click="selectAPI">
                <el-table-column prop="details.method" label="方法" width="84" />
                <el-table-column prop="details.summary" label="简介" width="172" />
            </el-table>
        </el-aside>
        <el-main>你好</el-main>
    </el-container> -->
    <div class="api-list">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>接口管理（接口{{ apiData.length }}个）</span>
                    <el-button class="button-create" type="primary" color="#8076c3" size="large"
                        @click="createInterface">新建接口</el-button>
                </div>
            </template>
            <div class="card-table">
                <el-table :data="apiData" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" min-width="5%" />
                    <el-table-column prop="summary" label="接口名称" min-width="25%">
                        <template #default="scope"><span class="skip" @click="selectAPI(scope.row)">{{
                            scope.row.details.summary }}</span></template>
                    </el-table-column>
                    <el-table-column prop="method" label="请求类型" min-width="15%" :filters="typeFilters"
                        :filter-method="typeFilterHandler">
                        <template #default="scope"><span class="method" :class="`method-${scope.row.details.method}`">{{
                            scope.row.details.method.toUpperCase() }}</span></template>
                    </el-table-column>
                    <el-table-column prop="path" label="接口路径" min-width="15%">
                        <template #default="scope"><span class="skip" @click="selectAPI(scope.row)">{{
                            scope.row.details.path }}</span></template>
                    </el-table-column>
                    <el-table-column prop="group" label="接口分组" min-width="20%">
                        <template #default="_scope"><span>项目A</span></template>
                    </el-table-column>
                    <el-table-column prop="state" label="接口状态" min-width="20%">
                        <template #default="_scope"><span>开发中</span></template>
                    </el-table-column>
                </el-table>
                <el-button class="button-delete" color="#8076c3" size="large" type="primary"
                    @click="handleDelete">删除</el-button>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { APItem } from '@/types/apis';
import { storeMutation } from '@/constant/store.ts';
import { apis } from '@/tools/apis.ts';
import { ROUTE } from '@/constant/route.ts'

const store = useStore();
const router = useRouter();

const curPid = computed(() => store.state.pid);
const apiData = ref<APItem[]>([])

const typeFilters = [
    { text: 'GET', value: 'GET' },
    { text: 'POST', value: 'POST' },
    { text: 'PUT', value: 'PUT' },
    { text: 'DELETE', value: 'DELETE' },
];

let deleteList: number[] = reactive([]);

/* 获取当前项目的所有接口数据 */
const getApis = () => {
    store.dispatch('getAll', store.state.pid as number).then(() => {
        apiData.value = store.state.apis.projectAPIs;
        console.log(apiData.value);
    })
}

watch(curPid, (newVal) => {
    router.push({
        name: ROUTE.INTERFACE_MANAGEMENT,
        params: {
            pid: newVal
        }
    });
    getApis();
})

onMounted(() => {
    if (store.state.pid) {
        getApis();
    }
})

/* 新建接口 */
const createInterface = () => {
    router.push({
        name: ROUTE.INTERFACE_CREATE,
        params: {
            pid: store.state.pid
        }
    })
}

/* 选择接口 */
const selectAPI = (row: APItem) => {
    store.commit(storeMutation.SELECT_INTERFACE, { aid: row.aid });
    router.push({
        name: ROUTE.DOCUMENT_TABS,
        params: {
            pid: store.state.pid,
            aid: row.aid
        }
    })
}

/* 设置请求类型的过滤方法 */
const typeFilterHandler = (value: string, row: any, column: any) => {
    const property = column['property'];
    return row.details[property].toLowerCase() === value.toLowerCase();
}

/* 收集选中的API标识列表 */
const handleSelectionChange = (value: any) => {
    deleteList = value.map((item: any): number => item.aid);
}

/* 处理删除事件 */
const handleDelete = () => {
    if (!deleteList.length) return;
    let deletePromisesList = deleteList.map((aid: number) => {
        apis.Projects.Project.Interface.deleteInterface(store.state.pid as number, aid as number);
    });
    Promise.all(deletePromisesList).then(() => {

        for (let i = 0; i < 10; i++) {
            getApis();
        }
        ElMessage({ message: '选中的接口已全部移动到回收站', type: 'success' });
    }).catch(err => {
        ElMessage({ message: err, type: 'error' });
    })
}
</script>
<style lang="less">
.APIRowSelected {
    --el-table-tr-bg-color: var(--el-border-color-dark);
}

.api-list {
    .method {
        font-weight: 600;
    }

    .method-get {
        color: #64a838;
    }

    .method-post {
        color: #eb913a;
    }

    .method-put {
        color: #448ef7;
    }

    .method-delete {
        color: #e76033;
    }

    .disabled {
        cursor: default;
        pointer-events: none;
        opacity: 0.7;
    }

    .el-card {
        position: relative;

        .el-button.button-delete,
        .el-button.button-create {
            color: white;
        }

        .el-button.button-delete {
            margin: 10px 0;
            float: right;
        }

        .card-header {
            font-size: 22px;
            font-weight: 500;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .card-table {
            span {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            span.skip:hover {
                color: #847ac9;
                cursor: pointer;
            }

            .el-table {
                :deep(.el-table__inner-wrapper) {
                    box-sizing: border-box;
                    border: 1px solid #eaeaea;
                    border-radius: 8px;
                }

                :deep(.el-table__inner-wrapper::before) {
                    content: none;
                }

                .cell {

                    .el-checkbox {

                        .el-checkbox__input.is-checked,
                        .el-checkbox__input.is-indeterminate {
                            .el-checkbox__inner {
                                background-color: #847ac9;
                                border-color: #847ac9;
                            }
                        }

                        .el-checkbox__inner:hover {
                            border-color: #847ac9;
                        }
                    }
                }
            }
        }
    }
}
</style>