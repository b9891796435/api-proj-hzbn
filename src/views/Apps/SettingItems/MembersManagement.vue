<template>
    <div>
        <el-dialog v-model="dialogVisible" title="修改权限" width="30%">
            <el-radio-group v-model="roleState">
                <el-radio label="0" size="large">可读</el-radio>
                <el-radio label="1" size="large">可写</el-radio>
                <el-radio label="2" size="large">管理员</el-radio>
                <el-radio label="3" size="large">所有者</el-radio>
            </el-radio-group>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-table :data="members">
            <el-table-column prop="username" label="成员用户名"></el-table-column>
            <el-table-column label="权限">
                <template #default="scope">
                    {{
                        roleRender(scope.row.role)
                    }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="() => handleOpen(scope.row.uid)">
                        修改权限
                    </el-button>
                    <el-button link type="primary" size="small" @click.prevent="() => handleDelete(scope.row.uid)">
                        移除成员
                    </el-button>
                </template>
            </el-table-column>
            <template #append>
                <div style="margin: 4px;">
                    <el-button link @click="dialogVisible = true">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        邀请成员
                    </el-button>
                </div>
            </template>
        </el-table>
    </div>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus';
import { computed, ref } from 'vue'
import { apis } from '../../../tools/apis';
import { useStore } from 'vuex';
import { ResponseCode } from '../../../types/Response';
const store = useStore();
const pid = computed(() => store.state.pid)
const members = ref<{ role: 0 | 1 | 2 | 3, username: string, uid: number }[]>([])
const getMembers = () => {
    apis.Projects.Project.getAllMembers(pid.value as number).then(res => {
        if (res?.code == ResponseCode.SUCCESS) {
            members.value = res.data.members
        }
    })
}
getMembers()
const roleRender = (role: 0 | 1 | 2 | 3) => {
    switch (role) {
        case 0: return '可读'
        case 1: return '可写'
        case 2: return '管理员'
        case 3: return '所有者'
    }
}
const dialogVisible = ref(false);
const dialogTarget = ref(0);
const roleState = ref('0')
const handleOpen = (uid: number) => {
    dialogTarget.value = uid;
    roleState.value = '0'
    dialogVisible.value = true;
}
const handleDelete = (uid: number) => {
    ElMessageBox.confirm('确定移除此成员吗？').then(res => {
        return res + uid
    })
}
</script>