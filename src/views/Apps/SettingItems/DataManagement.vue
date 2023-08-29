<template>
    <div>
        <el-dialog v-model="dialogVisible" title="导入数据" width="30%" :before-close="handleClose">
            <el-upload ref="upload" class="upload-demo" v-model:file-list="fileList" :on-exceed="handleExceed"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1" :auto-upload="false">
                <template #trigger>
                    <el-button type="primary">select file</el-button>
                </template>
                <template #tip>
                    <div class="el-upload__tip text-red">
                        仅支持Swagger 3.1格式
                    </div>
                </template>
            </el-upload>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="handleSubmit">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <ul>
            <li><el-button @click="() => dialogVisible = true">导入数据</el-button></li>
        </ul>
    </div>
</template>
  
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElMessage, ElMessageBox, genFileId } from 'element-plus'

import type { UploadInstance, UploadProps, UploadUserFile, UploadRawFile } from 'element-plus'
import { apis } from '@/tools/apis';
import { useStore } from 'vuex';
const store = useStore();
const pid = computed(() => {
    return store.state.pid
})
const fileList = ref<UploadUserFile[]>([
])
const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}
const dialogVisible = ref(false)
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
const handleSubmit = async () => {
    let swagger;
    try {
        try {
            swagger = JSON.parse(await (fileList.value[0].raw as any).text())
        } catch (e) {
            console.log(fileList.value)
            ElMessage.error('文件格式不属于json');
            return;
        }
        let interfaces = swagger.paths;
        let promises = []
        for (let i in interfaces) {
            for (let j in interfaces[i]) {
                let responses = [];

                for (let k in interfaces[i][j].responses) {
                    responses.push(Object.assign({}, interfaces[i][j].responses[k], { code: Number(k) }))
                }
                for (let k in responses) {
                    let contents = [];
                    for (let l in responses[k].content) {
                        contents.push(Object.assign({}, responses[k].content[l], { MIME: k }))
                    }
                    responses[k].content=contents
                }
                promises.push(apis.Projects.Project.Interface.createInterface(pid.value, {
                    path: i.replace(/\{([^}]+)\}/g, ":$1"),
                    method: j.toUpperCase(),
                    summary: interfaces[i][j].summary,
                    parameters: interfaces[i][j].parameters,
                    responses: responses,
                    hid: 0,
                    time: 0,
                    uid: 0
                }))
            }
        }
        Promise.all(promises).then(() => {
            ElMessage.success('导入成功')
            dialogVisible.value = false
        })
    } catch (e) {
        console.log(e)
        ElMessage.error('导入错误，请检查文件格式');
    }
}
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>