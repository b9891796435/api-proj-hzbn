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
                    <el-button type="primary" @click="commitEditRole">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="inviteVisible" title="邀请成员" width="30%">
            <el-form>
                <el-form-item label="用户uid">
                    <el-input v-model="inviteForm.uid"></el-input>
                </el-form-item>
                <el-form-item label="赋予权限">
                    <el-radio-group v-model="inviteForm.role">
                        <el-radio :label="0" size="large">可读</el-radio>
                        <el-radio :label="1" size="large">可写</el-radio>
                        <el-radio :label="2" size="large">管理员</el-radio>
                        <el-radio :label="3" size="large">所有者</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="inviteVisible = false">取消</el-button>
                    <el-button type="primary" @click="commitInvite">
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
                    <el-button link type="primary" size="small" @click.prevent="() => handleEditRole(scope.row.uid)">
                        修改权限
                    </el-button>
                    <el-button link type="primary" size="small" @click.prevent="() => handleDelete(scope.row.uid)">
                        移除成员
                    </el-button>
                </template>
            </el-table-column>
            <template #append>
                <div style="margin: 4px;">
                    <el-button link @click="handleInvite">
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
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, ref, watch } from 'vue'
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
watch(() => pid.value, () => {
    getMembers();
})
const roleRender = (role: 0 | 1 | 2 | 3) => {
    switch (role) {
        case 0: return '可读'
        case 1: return '可写'
        case 2: return '管理员'
        case 3: return '所有者'
    }
}
const dialogVisible = ref(false);
const selectedUser = ref(0);
const roleState = ref(0);
const handleEditRole = (uid: number) => {
    selectedUser.value = uid;
    roleState.value = 0;
    dialogVisible.value = true;
}
const handleDelete = (uid: number) => {
    ElMessageBox.confirm('确定移除此成员吗？').then(res => {
        return res + uid
    })
}
const commitEditRole = () => {
    apis.Projects.Project.editMemberRole(pid.value, selectedUser.value).then(res => {
        if (res?.code == ResponseCode.SUCCESS) {
            ElMessage.success('修改成功');
            getMembers();
        }
    })
}
const inviteVisible = ref(false);
const inviteForm = ref({
    uid: '',
    role: 0
})
const handleInvite = () => {
    inviteForm.value = {
        uid: '',
        role: 0
    };
    inviteVisible.value = true
}
const commitInvite = () => {
    apis.Projects.Project.inviteMember(pid.value, Number(inviteForm.value.uid), inviteForm.value.role).then(res => {
        if (res?.code == ResponseCode.SUCCESS) {
            ElMessage.success('邀请成功')
        }
    })
}
</script>