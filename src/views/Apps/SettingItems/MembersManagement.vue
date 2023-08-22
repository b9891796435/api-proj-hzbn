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
        </el-table>
    </div>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus';
import { ref } from 'vue'
const members = [
    {
        "role": "0",
        "username": "叶平",
        "uid": 61
    },
    {
        "role": "1",
        "username": "袁明",
        "uid": 83
    },
    {
        "role": "2",
        "username": "万静",
        "uid": 91
    },
    {
        "role": "1",
        "username": "宋艳",
        "uid": 41
    },
    {
        "role": "0",
        "username": "乔伟",
        "uid": 14
    }
]
const roleRender = (role: '0' | '1' | '2' | '3') => {
    switch (role) {
        case '0': return '可读'
        case '1': return '可写'
        case '2': return '管理员'
        case '3': return '所有者'
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