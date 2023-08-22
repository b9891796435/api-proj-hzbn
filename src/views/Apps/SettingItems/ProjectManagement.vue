<template>
    <div class="container">
        <el-descriptions border :column="2">
            <el-descriptions-item label="项目名称">
                你好
            </el-descriptions-item>
            <el-descriptions-item label="项目ID">
                056
            </el-descriptions-item>
            <el-descriptions-item label="项目简介">
                你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好
            </el-descriptions-item>
        </el-descriptions>
        <div class="operations">
            <el-button type="primary" style="width: 256px;">修改信息</el-button>
            <el-button type="danger" style="width: 256px;">删除项目</el-button>
        </div>
    </div>
</template>
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