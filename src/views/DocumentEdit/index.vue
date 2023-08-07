<template>
    <div id="document">
        <div class="fixed">
            <el-form :inline="true" :model="formData" class="form-inline" label-position="top">
                <el-select v-model="formData.method" clearable class="method" style="width: 120px;">
                    <el-option style="color: #64a838; font-weight: 600;" label="GET" value="get" />
                    <el-option style="color: #eb913a; font-weight: 600;" label="POST" value="post" />
                    <el-option style="color: #448ef7; font-weight: 600;" label="PUT" value="put" />
                    <el-option style="color: #e76033; font-weight: 600;" label="DELETE" value="delete" />
                </el-select>
                <el-input v-model="formData.path" value="/pet/{petId}" clearable class="url" @input="handlePathInput" />

                <el-form-item class="button">
                    <el-button class="first" color="#8076c3" size="large" type="primary" @click="onSubmit">保存</el-button>
                    <el-button size="large">运行</el-button>
                    <el-button size="large">删除</el-button>
                </el-form-item>

            </el-form>
        </div>

        <div class="module-detail">
            <div class="title">
                <el-input v-model="formData.summery" value="查询宠物详情" clearable />
            </div>
            <div class="info">
                <el-form :inline="true" :model="formData" class="form-inline" label-position="top">
                    <el-form-item label="状态" prop="state">
                        <el-select value="published" clearable style="width: 330px">
                            <el-option label="已发布" value="published" />
                            <el-option label="测试中" value="testing" />
                            <el-option label="将废弃" value="trash" />
                            <el-option label="开发中" value="developing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="责任人">
                        <!-- <el-input v-model="formData.person" value="Arcobaleno" clearable style="width: 330px" /> -->
                        <el-input value="Arcobaleno" clearable style="width: 330px" />
                    </el-form-item>
                    <el-form-item label="标签">
                        <!-- <el-input v-model="formData.tags" value="宠物;" clearable style="width: 330px" /> -->
                        <el-input value="宠物;" clearable style="width: 330px" />
                    </el-form-item>
                    <el-form-item label="说明">
                        <!-- <el-input v-model="formData.description" type="textarea" placeholder="支持MarkDown格式" clearable style="width: 100%" /> -->
                        <el-input type="textarea" placeholder="支持MarkDown格式" clearable style="width: 100%" />
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="module-params">
            <div class="title">请求参数</div>

            <el-tabs class="border-card" type="border-card">
                <el-tab-pane label="Params">
                    <div class="params-container">
                        <div class="subtitle">Query参数</div>
                        <div class="param-form">
                            <el-table :data="tableData" style="width: 100%" @cell-click="editParams"
                                :cell-class-name="getCellIndex">
                                <el-table-column prop="name" label="参数名" min-width="20%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.name" class="tableCell" placeholder="添加参数" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="type" label="类型" min-width="15%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.type" class="tableCell" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="value" label="示例值" min-width="20%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.value" class="tableCell" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="desc" label="说明" min-width="35%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.desc" class="tableCell" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="desc" label="" min-width="10%">
                                    <el-button>删除</el-button>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="subtitle">Path参数</div>
                        <div class="param-form non-editable">
                            <el-table :data="pathData" style="width: 100%" @cell-click="editParams"
                                :cell-class-name="getCellIndex">
                                <el-table-column prop="name" label="参数名" min-width="20%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.name" class="tableCell" disabled />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="type" label="类型" min-width="15%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.type" class="tableCell" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="value" label="示例值" min-width="20%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.value" class="tableCell" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="desc" label="说明" min-width="35%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.desc" class="tableCell" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="desc" label="" min-width="10%">
                                    
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="Body">
                    记录不存在(404)
                </el-tab-pane>
                <el-tab-pane label="Cookie">
                    记录不存在(404)
                </el-tab-pane>
                <el-tab-pane label="Header">
                    记录不存在(404)
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="module-response">
            <div class="title">返回响应</div>

            <el-tabs class="border-card" type="border-card">
                <el-tab-pane label="成功(200)">
                    <div class="response-content">
                        <div class="response-info">

                            <el-form :inline="true" :model="formData" class="form-inline" label-position="right">
                                <el-form-item label="HTTP 状态码">
                                    <el-input v-model.number="formData.responses[0].code" value="200" clearable
                                        style="width: 240px" />
                                </el-form-item>
                                <el-form-item label="名称">
                                    <el-input v-model="formData.responses[0].description" value="成功" clearable
                                        style="width: 240px" />
                                </el-form-item>
                                <el-form-item label="内容格式">
                                    <el-select value="json" clearable style="width: 240px">
                                        <el-option label="JSON" value="json" />
                                        <el-option label="XML" value="xml" />
                                        <el-option label="HTML" value="html" />
                                        <el-option label="Raw" value="raw" />
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="structure">
                            <el-card class="box-card">
                                <template #header>
                                    <div class="card-header">
                                        <span>通过JSON等导入</span>
                                    </div>
                                </template>
                                <div class="structure-content">
                                    <el-tree :data="dataStructure" :props="defaultProps" @node-click="handleNodeClick" />
                                </div>
                            </el-card>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="记录不存在(404)">
                    记录不存在(404)
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="module-example">
            <div class="title">响应示例</div>

            <el-tabs class="border-card" type="border-card">
                <el-tab-pane label="成功实例">
                    <div class="example-content">
                        <!-- <el-tree :data="dataStructure" :props="defaultProps" @node-click="handleNodeClick" /> -->
                    </div>
                </el-tab-pane>
                <el-tab-pane label="异常示例">
                    记录不存在(404)
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, computed, getCurrentInstance, nextTick } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const instance = getCurrentInstance();
const store = useStore();

const pid = 1;  // 项目标识
const aid = ref(0);  // api标识
const oldFormData = computed(() => store.state.apis.projectAPIs?.[0]?.details);

const formData = reactive({
    path: '/pet/{petId}',
    method: 'get',
    summery: '查询宠物详情',
    // state: 'published',
    // person: 'Arcobaleno',
    // tags: '宠物;',
    // description: '',
    parameters: [
        {
            name: 'petId',
            in: 'path',
            description: '宠物ID',
            required: true,
            schema: {
                type: 'string'
            }
        }
    ],
    responses: [
        {
            code: 200,
            description: '成功',
            content: [
                {
                    MIME: 'application/json',
                    schema: ''
                }
            ]
        }
    ]
});

let oldFormString: string;
let newFormString: string;
let editFormChanged: boolean = false;

// 表单校验规则
// const rules = {
//     summery: [
//         {
//             required: true,
//             message: '请输入接口概述',
//             trigger: 'blur'
//         }
//     ],

// };


// Path参数从路由中获取
const pathData = ref();
const tableData = reactive([
    {
        name: 'petId',
        type: 'number',
        value: 1,
        desc: '宠物ID'
    },
    {
        name: 'petId',
        type: 'number',
        value: 1,
        desc: '宠物ID'
    },
    {
        name: '',
        type: '',
        value: '',
        desc: ''
    },
]);
let isTableRowEditable: boolean = true;

onMounted(() => {
    store.dispatch('getProjectAPIs', pid).then(() => {
        const methodElement = document.querySelector('.method');
        // 根据接口请求方式使用不同样式
        methodElement!.className = `method method-${oldFormData.value?.method}`;
        // 保存初始表单数据
        newFormString = oldFormString = JSON.stringify(oldFormData.value);
        // 获得路径中的参数
        pathData.value = getPathData(formData.path);
    });
})

watch(formData, (newVal) => {
    newFormString = JSON.stringify(newVal);
    if (newFormString === oldFormString) {
        editFormChanged = false;
    } else {
        editFormChanged = true;
    }
})


const getPathData = (path: string): Object[] => {
    let regexp = /{(\w+?)}/g;
    let params = path.match(regexp)?.map((param) => param.slice(1, param.length - 1));
    let result: Object[] = [];
    params?.forEach(param => {
        result.push({
            name: param,
            type: '',
            value: '',
            desc: ''
        });
    });
    return result;
}

const handlePathInput = () => {
    pathData.value = getPathData(formData.path);
}

const editParams = (row, column, cell, event) => {
    if (!isTableRowEditable) return;
    // 在下一个tick时进行编辑
    nextTick(() => {
        const editableCell = cell.getElementsByTagName('input')[0];  // 获取当前单元格的可编辑元素
        console.log(event)
        if (editableCell) {
            editableCell.focus()
            // 如果点击了最后一列并且输入了数据，则新增一条数据
            editableCell.addEventListener('input', () => {
                if (row.index === tableData.length - 1) {
                    tableData.push({
                        name: '',
                        type: '',
                        value: '',
                        desc: ''
                    })
                }
            })
        }
    })
}

const getCellIndex = (data: any) => {
    let { row, column, rowIndex, columnIndex } = data;
    // 利用单元格的className回调方法给行列索引赋值
    row.index = rowIndex;
    column.index = columnIndex;
}

const onSubmit = async () => {
    let newaid: number = aid.value;
    if (editFormChanged) {
        // 校验表单
        // const formRef = instance?.refs.form;
        // formRef.validate((valid) => {
        //     if (valid) {

        //     }
        // })
        // 提交表单
        newaid = await store.dispatch('updateAPI', { params: { pid, aid: aid.value }, data: formData });
    }

    // 更新接口id信息
    aid.value = newaid;
    // 保存修改的接口数据
    oldFormString = newFormString;
    ElMessage({ message: '保存成功！', type: 'success' });
};

</script>

<style lang="less" scoped>
#document {
    font-size: 18px;
    padding: 20px;

    .title {
        font-size: 22px;
    }

    .subtitle {
        font-size: 20px;
    }

    .thin {
        color: #8b939b;
    }

    .fixed {
        position: fixed;
        top: 0;
        z-index: 100;
        width: calc(100% - 40px);
        height: 76px;
        background-color: white;
        display: flex;
        align-items: center;

        .form-inline {
            position: relative;
            width: 100%;

            .method {
                :deep(.el-input__inner) {
                    height: 50px;
                    font-weight: 600;
                    color: #64a838;
                    text-align: center;
                }
            }

            .url {
                flex: 1;
                margin-right: 10px;

                :deep(.el-input__wrapper) {
                    height: 50px;
                    width: auto;
                }
            }

            .button {
                position: relative;
                right: 0px;
                height: 50px;
                margin: 0px;

                :deep(.el-form-item__content) {
                    display: flex;
                    height: 100%;
                }

                .first {
                    color: white;
                }
            }
        }



    }


    .module-detail {
        margin-top: 80px;

        .tags {
            .tag__item {
                width: 58px;
                line-height: 30px;
                background-color: rgba(132, 122, 201, 0.3);
                color: #847ac9;
                text-align: center;
                border-radius: 8px;
            }
        }

        .title {

            :deep(.el-input__inner) {
                border: none;
                font-size: 22px;
                color: black;
                font-weight: 600;
                padding: 20px 0px;
            }
        }

        .info {
            width: 100%;
            margin: 30px 0px 24px 0px;

            :deep(.el-form-item:nth-child(4)) {
                width: 100%;
                margin: 0px;
            }
        }
    }

    .module-params {
        margin-top: 50px;

        .border-card {
            margin-top: 10px;
            border: none;

            :deep(.el-tabs__header) {
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #8b939b;
            }

            :deep(.el-tabs__item) {
                height: 100%;
                padding: 0 16px;
                width: auto;
                font-weight: normal;
                background-color: transparent;
                border: none;
            }

            :deep(.el-tabs__item:hover) {
                color: #847ac9;
            }

            :deep(.is-active) {
                font-weight: 600;
                color: #847ac9;
                border-bottom: 2px solid #847ac9;
            }
        }

        .params-container {

            .subtitle {
                line-height: 56px;
            }

            .param-form {
                .tableCell {
                    box-sizing: border-box;
                    border: none;
                    outline: none;
                }

                .el-table {
                    :deep(.el-table__inner-wrapper) {
                        box-sizing: border-box;
                        border: 1px solid #eaeaea;
                        border-radius: 8px;

                    }

                    :deep(.el-table__inner-wrapper::before) {
                        content: none;
                    }

                    :deep(.el-table__body .el-table__row:last-child) {
                        .el-button {
                            display: none;
                        }
                    }

                    :deep(.el-table__body .el-table__cell:last-child:hover) {
                        box-sizing: border-box;
                        border: 1px solid transparent;
                    }

                    :deep(.el-table__body .el-table__cell) {
                        box-sizing: border-box;
                        border: 1px solid transparent;
                        border-bottom: 1px solid #eaeaea;
                    }

                    :deep(.el-table__body .el-table__cell:hover) {
                        border: 1px solid #847ac9;
                    }

                    :deep(.el-table__body .el-table__cell:focus) {
                        border: 1px solid #847ac9;
                    }

                    :deep(.el-table__body .el-table__cell input) {
                        width: 100%;
                    }
                }
            }
            .non-editable {
                .el-table {
                    :deep(.el-table__body .el-table__cell:first-child) {
                        cursor: not-allowed;
                        input {
                            pointer-events: none;
                            user-select: none;
                        }
                    }
                }
            }
        }
    }

    .module-response {
        margin-top: 20px;

        .border-card {
            margin-top: 10px;
            border: none;

            :deep(.el-tabs__header) {
                height: 50px;
                line-height: 50px;
                border: none;
            }

            :deep(.el-tabs__item) {
                height: 100%;
                padding: 0 16px;
                width: auto;
                font-weight: normal;
                background-color: #eaeaea;
                border-radius: 5px 5px 0px 0px;
                margin: 0px;
                margin-right: 5px;
                border: 1px solid #eaeaea;
            }

            :deep(.is-active) {
                font-weight: 450;
                color: black;
                background-color: white;
                border: 1px solid #eaeaea;
                border-bottom: none;
            }

            :deep(.el-tabs__content) {
                border: 1px solid #eaeaea;
            }


            .response-content {
                .response-info {
                    line-height: 60px;
                    text-align: center;

                    .form-inline {
                        .el-select {}
                    }
                }

                .structure {
                    .box-card {
                        .card-header span {
                            line-height: 30px;
                            background-color: rgba(132, 122, 201, 0.3);
                            color: #847ac9;
                            text-align: center;
                            border-radius: 5px;
                            padding: 5px 10px;
                            font-size: 16px;
                        }

                        .structure-content {}
                    }
                }
            }
        }
    }

    .module-example {
        margin-top: 20px;

        .border-card {
            margin-top: 10px;
            border: none;

            :deep(.el-tabs__header) {
                height: 50px;
                line-height: 50px;
                border: none;
            }

            :deep(.el-tabs__item) {
                height: 100%;
                padding: 0 16px;
                width: auto;
                font-weight: normal;
                background-color: #eaeaea;
                border-radius: 5px 5px 0px 0px;
                margin: 0px;
                margin-right: 5px;
                border: 1px solid #eaeaea;
            }

            :deep(.is-active) {
                font-weight: 450;
                color: black;
                background-color: white;
                border: 1px solid #eaeaea;
                border-bottom: none;
            }

            :deep(.el-tabs__content) {
                border: 1px solid #eaeaea;
            }

            .example-content {
                height: 300px;
                background-color: #eaeaea;
            }
        }
    }

}
</style>