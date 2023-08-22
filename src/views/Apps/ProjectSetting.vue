<template>
    <el-container>
        <el-aside width="256px">
            <el-menu @select="handleOpen" style="min-height: calc(100vh - 48px);">
                <el-menu-item index="MembersManagement">
                    <el-icon>
                        <User />
                    </el-icon>成员管理
                </el-menu-item>
                <el-menu-item index="ProjectManagement"><el-icon>
                        <Files />
                    </el-icon>项目管理
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main style="padding: 0;"><router-view></router-view></el-main>
    </el-container>
</template>
<script lang="ts" setup>
import router from '../../router';
const handleOpen = (key: string) => {
    router.push({ name: key })
}
</script>