<template>
    <div>
        <el-form>
            <el-form-item>
                <el-input placeholder="用户名" v-model="formState.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="密码" v-model="formState.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%;" @click="toLogin">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { apis } from '../tools/apis';
import { ResponseCode } from '../types/Response';
import { ElMessage } from 'element-plus';
import { OAUTH } from '../constant/login';
import router from '../router';
import { ROUTE } from '../constant/route';
const formState = ref({
    username: '',
    password: '',
})
const toLogin = () => apis.register(formState.value).then(res => {
    if (res.code == ResponseCode.SUCCESS) {
        ElMessage.success('注册成功');
        localStorage.setItem(OAUTH.TOKEN, res.data?.token as string)
        router.push({ name: ROUTE.INTERFACE_MANAGEMENT })
    } else {
        ElMessage.error(res.message);
    }
})
</script>
