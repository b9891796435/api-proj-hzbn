<template>
    <div class="api-list">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>接口管理（接口{{ apiList.length }}个）</span>
                </div>
            </template>
            <div class="card-table">
                <el-table :data="apiList" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" min-width="5%" />
                    <el-table-column prop="summary" label="接口名称" min-width="25%">
                        <template #default="scope"><span class="skip" @click="showAPIDetail(scope.row.aid)">{{
                            scope.row.details.summary }}</span></template>
                    </el-table-column>
                    <el-table-column prop="method" label="请求类型" min-width="15%" :filters="typeFilters" :filter-method="typeFilterHandler">
                        <template #default="scope"><span class="method" :class="`method-${scope.row.details.method}`">{{
                            scope.row.details.method.toUpperCase() }}</span></template>
                    </el-table-column>
                    <el-table-column prop="path" label="接口路径" min-width="15%">
                        <template #default="scope"><span class="skip" @click="showAPIDetail(scope.row.aid)">{{
                            scope.row.details.path }}</span></template>
                    </el-table-column>
                    <el-table-column prop="group" label="接口分组" min-width="20%">
                        <template #default="scope"><span>{{ scope.row.details.group }}</span></template>
                    </el-table-column>
                    <el-table-column prop="state" label="接口状态" min-width="20%">
                        <template #default="scope"><span>{{ scope.row.details.state }}</span></template>
                    </el-table-column>
                </el-table>
                <el-button class="button-delete" :class="{ disabled: deleteList.length === 0}" color="#8076c3" size="large" type="primary" @click="handleDelete">删除</el-button>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const store = useStore();
const router = useRouter();

const pid = 1;
const apiList = computed(() => store.state.apis.projectAPIs);

const typeFilters = [
    {text:'GET', value: 'GET'},
    {text:'POST', value: 'POST'},
    {text:'PUT', value: 'PUT'},
    {text:'DELETE', value: 'DELETE'},
];

let deleteList: number[] = reactive([]);

/* 获取当前项目的所有接口数据 */
const getData = () => {
    store.dispatch('getProjectAPIs', pid);
}

onMounted(() => {
    getData();
})

/* 单元格的行列索引赋值 */
const getRowIndex = (data: any) => {
    let { row, rowIndex } = data;
    // 利用单元格的className回调方法给行列索引赋值
    row.index = rowIndex;
    return '' + rowIndex;
}

/* 参数表格可编辑 */
const showAPIDetail = (aid: number) => {
    router.push(`/apiDetail/projects/${pid}/apis/${aid}`);
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
    let deletePromisesList = deleteList.map((aid: number) => store.dispatch('deleteAPI', { pid, aid }));
    console.log(deletePromisesList)
    Promise.all(deletePromisesList).then(() => {
        ElMessage({ message: '选中的接口已全部移动到回收站', type: 'success' });
        getData();
    }).catch(err => {
        ElMessage({ message: '删除时发生错误', type: 'error' });
    })
}
</script>

<style lang="less">
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
        pointer-events:none;
        opacity: 0.7;
    }

    .el-card {
        position: relative;
        
        .el-button.button-delete {
            color: white;
            margin: 10px 0;
            float: right;
        }
        .card-header {
            font-size: 22px;
            font-weight: 500;
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
}</style>