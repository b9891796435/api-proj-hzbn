<template>
    <el-container>
        <el-aside width="256px">
            <el-menu @select="handleOpen" style="min-height: calc(100vh - 48px);">
                <el-menu-item :index="ROUTE.MEMBERS_MANAGEMENT">
                    <el-icon>
                        <User />
                    </el-icon>成员管理
                </el-menu-item>
                <el-menu-item :index="ROUTE.PROJECT_MANAGEMENT"><el-icon>
                        <Files />
                    </el-icon>项目管理
                </el-menu-item>
                <el-menu-item :index="ROUTE.DATA_MANAGEMENT"><el-icon>
                        <Files />
                    </el-icon>数据管理
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main style="padding: 0;"><router-view></router-view></el-main>
    </el-container>
</template>
<script lang="ts" setup>
import router from '../../router';
import { ROUTE } from '@/constant/route'
const handleOpen = (key: string) => {
    router.push({ name: key })
}
</script>