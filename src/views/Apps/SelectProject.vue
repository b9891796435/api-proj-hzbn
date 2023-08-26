<template>
    <div>
        <el-dialog v-model="dialogVisible" title="新项目名" width="30%">
            <el-input v-model="newProjectName"></el-input>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleNewProject">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-drawer :model-value="drawerState" title="选择项目" direction='ltr'
            :before-close="(done) => { if (currPid != null) drawerState = !drawerState; else ElMessage.error('请选择要使用的项目'); done(true) }">
            <el-table :data="projs">
                <el-table-column prop="name" label="名称" />
                <el-table-column label="操作" width="120">
                    <template #default="scope">
                        <el-button link type="primary" size="small"
                            @click.prevent="store.commit(storeMutation.SELECT_PROJECT, { pid: scope.row.pid })">
                            选择
                        </el-button>
                        <el-button link type="primary" size="small" @click.prevent="deleteProject(scope.row.pid)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
                <template #append>
                    <div style="margin: 4px;text-align: center;">
                        <el-button link @click="dialogVisible = true">
                            <el-icon>
                                <Plus />
                            </el-icon>
                            添加项目
                        </el-button>
                    </div>
                </template>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="count" />
        </el-drawer>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { storeMutation } from '../../constant/store';
import { ElMessage, ElMessageBox } from 'element-plus';
import { apis } from '../../tools/apis';
import { ResponseCode } from '../../types/Response';
const store = useStore();
const currPid = computed(() => store.state.pid)
const props = defineProps(['value'])
const drawerState = ref(false)
if (currPid.value == null) {
    drawerState.value = true;
}

const projs = ref<{ name: string, pid: number }[]>([])
const count = ref(0);
const getProjs = (page: number = 0) => {
    apis.Projects.getAll({ page, per_page: 10 }).then(res => {
        if (res?.code == ResponseCode.SUCCESS) {
            projs.value = res.data.projects;
            count.value = res.data.count
        } else {
            ElMessage.error(res?.message);
        }
    })
}
watch(() => props.value, () => {
    if (drawerState.value == false) {
        drawerState.value = true;
        getProjs()
    }
})
watch(() => currPid.value, (value) => {
    if (value == null) {
        drawerState.value = true;
        getProjs()
    }
})
const dialogVisible = ref(false);
const newProjectName = ref('');
const handleNewProject = () => {
    apis.Projects.create({ name: newProjectName.value }).then(res => {
        if (res?.code == ResponseCode.SUCCESS) {
            ElMessage.success('创建成功');
            dialogVisible.value = false;
            getProjs(0);
        } else {
            ElMessage.error(res?.message);
        }
    })
}
const deleteProject = (pid: number) => {
    ElMessageBox.confirm('该选项将会删除本项目，无法撤销，是否确定？').then(() => {
        return ElMessageBox.confirm('该选项无法撤销，请再次确认')
    }).then(() => {
        apis.Projects.Project.deleteProject(pid).then(res => {
            if (res?.code == ResponseCode.SUCCESS) {
                ElMessage.success('删除成功');
                store.commit(storeMutation.SELECT_PROJECT, { pid: null });
            } else {
                ElMessage.error(res?.message);
            }
        })
    })
}
getProjs();
</script>