<template>
    <div>
        <el-drawer :model-value="drawer" title="选择项目" direction='ltr'
            @close="() => { drawerState = !drawerState; return false; }">
            <el-table :data="projs">
                <el-table-column prop="name" label="名称" />
                <el-table-column label="操作" width="120">
                    <template #default="scope">
                        <el-button link type="primary" size="small"
                            @click.prevent="store.commit(storeMutation.SELECT_PROJECT, { pid: scope.row.pid })">
                            选择
                        </el-button>
                        <el-button link type="primary" size="small" @click.prevent="console.log(scope)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table> </el-drawer>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { storeMutation } from '../../constant/store';
const store = useStore();
const props = defineProps(['value'])
const drawerState = ref(false)
const xor = (a: boolean, b: boolean) => (a && !b) || (!a && b);//取异或保证props或自带的drawer中任意一个变化即可对drawer
const drawer = computed(() => xor(props.value, drawerState.value))
const projs = [
    {
        "name": "同求近认了",
        "pid": 46
    },
    {
        "name": "收日高结",
        "pid": 9
    },
    {
        "name": "米划制看",
        "pid": 82
    },
    {
        "name": "两界声",
        "pid": 79
    },
    {
        "name": "月权法志之",
        "pid": 80
    }
]
</script>