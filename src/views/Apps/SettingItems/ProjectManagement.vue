<template>
    <div class="container">
        <el-dialog v-model="dialogVisible" title="修改项目基本信息" width="30%">
            <el-form>
                <el-form-item label="项目名称">
                    <el-input v-model="infoForm.name" label="项目名称"></el-input>
                </el-form-item>
                <el-form-item label="项目简介">
                    <el-input v-model="infoForm.description" type="textarea" label="项目简介"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="setInfo">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-descriptions border :column="2">
            <el-descriptions-item label="项目名称">
                {{ detail.name }}
            </el-descriptions-item>
            <el-descriptions-item label="项目ID">
                {{ detail.pid }}
            </el-descriptions-item>
            <el-descriptions-item label="项目简介">
                {{ detail.description }}
            </el-descriptions-item>
        </el-descriptions>
        <div class="operations">
            <el-button type="primary" style="width: 256px;" @click="handleOpen">修改信息</el-button>
            <el-button type="danger" style="width: 256px;" @click="deleteProject">删除项目</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { apis } from '../../../tools/apis';
import { ResponseCode } from '../../../types/Response';
import { ElMessage, ElMessageBox } from 'element-plus';
import { storeMutation } from '../../../constant/store';
import router from '../../../router';
import { ROUTE } from '../../../constant/route';

const store = useStore();
const pid = computed(() => store.state.pid)
const detail = ref({
    pid: 0,
    description: '',
    name: '',
})
const getInfo = () => {
    apis.Projects.Project.getBasicInfo(pid.value).then(res => {
        if (res?.code == ResponseCode.SUCCESS) {
            if (!('description' in res.data)) {
                res.data.description = '';
            }
            detail.value = res.data
        }
    })
}
getInfo();
const dialogVisible = ref(false)
const infoForm = ref({
    description: '',
    name: ''
})
const handleOpen = () => {
    infoForm.value.description = detail.value.description;
    infoForm.value.name = detail.value.name;
    dialogVisible.value = true
}
const setInfo = () => {
    apis.Projects.Project.setBasicInfo(pid.value, infoForm.value).then(res => {
        if (res?.code == ResponseCode.SUCCESS) {
            ElMessage.success('修改成功');
            getInfo();
            dialogVisible.value = false;
        }
    })
}
const deleteProject = () => {
    ElMessageBox.confirm('该选项将会删除本项目，无法撤销，是否确定？').then(() => {
        return ElMessageBox.confirm('该选项无法撤销，请再次确认')
    }).then(() => {
        apis.Projects.Project.deleteProject(pid.value).then(res => {
            if (res?.code == ResponseCode.SUCCESS) {
                ElMessage.success('删除成功');
                store.commit(storeMutation.SELECT_PROJECT, { pid: null });
                router.push({ name: ROUTE.MAIN_APP })
            }
        })
    })
}
</script>
<style scoped>
.container {
    width: 800px;
    margin: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
}

.container>* {
    margin: 16px;
}

.operations {
    display: flex;
    align-items: self-end;
    justify-content: space-between;
}
</style>