<template>
    <div class="container">
        <div class="title">
            欢迎使用会者不难API管理系统
        </div>
        <el-tabs style="width: 80%;">
            <el-tab-pane label="登录"><login-form></login-form></el-tab-pane>
            <el-tab-pane label="注册"><sign-up-form></sign-up-form></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue';
import SignUpForm from '../components/SignUpForm.vue'
</script>
<style scoped>
.container {
    box-shadow: rgba(22, 14, 45, 0.02) 0px 0px 40px,
        rgba(22, 14, 45, 0.06) 0px 0px 104px;
    position: fixed;
    width: 500px;
    height: 400px;
    background-color: #fff;
    left: calc(50vw - 250px);
    top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title {
    font-size: 24px;
    margin: 32px
}
</style>
<style>
.container .el-tabs__nav-scroll {

    display: flex;
    justify-content: center;
}
</style>