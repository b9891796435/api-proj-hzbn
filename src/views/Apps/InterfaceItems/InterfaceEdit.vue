<template>
    <div id="document">
        <div class="fixed">
            <el-form :inline="true" :model="newFormData" class="form-inline" label-position="top">
                <el-select v-model="newFormData.method" clearable class="method method-get" style="width: 120px;">
                    <el-option style="color: #64a838; font-weight: 600;" label="GET" value="get" />
                    <el-option style="color: #eb913a; font-weight: 600;" label="POST" value="post" />
                    <el-option style="color: #448ef7; font-weight: 600;" label="PUT" value="put" />
                    <el-option style="color: #e76033; font-weight: 600;" label="DELETE" value="delete" />
                </el-select>
                <el-input v-model="newFormData.path" placeholder='接口路径，"/"起始' clearable class="url"
                    @input="handlePathInput" />

                <el-form-item class="button">
                    <el-button class="first" color="#8076c3" size="large" type="primary" @click="onSubmit">保存</el-button>
                    <el-button size="large" v-if="editType">运行</el-button>
                    <el-popconfirm title="确认删除该接口？" width="170" confirm-button-text="确定" cancel-button-text="取消"
                        @confirm="handleDelete">
                        <template #reference>
                            <el-button size="large" v-if="editType">删除</el-button>
                        </template>
                    </el-popconfirm>
                </el-form-item>
            </el-form>
        </div>

        <div class="module-detail">
            <div class="title">
                <el-input v-model="newFormData.summary" placeholder="未命名接口" clearable />
            </div>
            <!-- <div class="info">
                <el-form :inline="true" :model="newFormData" class="form-inline" label-position="top">
                    <el-form-item label="状态" prop="state">
                        <el-select v-model="newFormData.state" clearable style="width: 330px">
                            <el-option label="已发布" value="published" />
                            <el-option label="测试中" value="testing" />
                            <el-option label="将废弃" value="trash" />
                            <el-option label="开发中" value="developing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="责任人">
                        <el-input v-model="newFormData.personInCharge" clearable style="width: 330px" />
                    </el-form-item>
                    <el-form-item label="标签">
                        <el-input v-model="newFormData.tags" clearable style="width: 330px" />
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input v-model="newFormData.description" type="textarea" placeholder="支持MarkDown格式" clearable
                            style="width: 100%" />
                    </el-form-item>
                </el-form>
            </div> -->
        </div>

        <div class="module-params">
            <div class="title">请求参数</div>

            <el-tabs class="border-card" type="border-card">
                <el-tab-pane label="Params">
                    <div class="params-container">
                        <div class="subtitle">Query参数</div>
                        <div class="param-form">
                            <el-table :data="queryParams" style="width: 100%" @cell-click="editParams"
                                :row-class-name="getRowIndex">
                                <el-table-column prop="name" label="参数名" min-width="20%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.name" class="tableCell" placeholder="添加参数" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="type" label="类型" min-width="15%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.schema.type" class="tableCell" />
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column prop="value" label="示例值" min-width="20%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.value" class="tableCell" />
                                    </template>
                                </el-table-column> -->
                                <el-table-column prop="value" label="必需" min-width="10%">
                                    <template #default="scope">
                                        <el-switch v-model="scope.row.required" class="tableCell" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="desc" label="说明" min-width="35%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.description" class="tableCell" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="desc" label="" min-width="10%">
                                    <template #default="scope">
                                        <el-button @click="deleteParam(scope.row.name)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="subtitle">Path参数</div>
                        <div class="param-form non-editable">
                            <el-table :data="pathParams" style="width: 100%" @cell-click="editParams"
                                :row-class-name="getRowIndex">
                                <el-table-column prop="name" label="参数名" min-width="20%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.name" class="tableCell" disabled />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="type" label="类型" min-width="15%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.schema.type" class="tableCell" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="value" label="示例值" min-width="20%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.value" class="tableCell" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="desc" label="说明" min-width="35%">
                                    <template #default="scope">
                                        <input type="text" v-model="scope.row.description" class="tableCell" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="desc" label="" min-width="10%">

                                </el-table-column>
                            </el-table>
                        </div>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="Body">
                    请求体
                </el-tab-pane>
                <!-- <el-tab-pane label="Cookie">
                    <div class="param-form">
                        <el-table :data="newFormData.parameters.filter(param => param.in === 'cookie')" style="width: 100%" @cell-click="editParams"
                            :row-class-name="getRowIndex">
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
                                    <input type="text" v-model="scope.row.description" class="tableCell" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="desc" label="" min-width="10%">
                                <el-button>删除</el-button>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane> -->
                <el-tab-pane label="Header">
                    <div class="param-form">
                        <el-table :data="headerParams" style="width: 100%" @cell-click="editParams"
                            :row-class-name="getRowIndex">
                            <el-table-column prop="name" label="参数名" min-width="20%">
                                <template #default="scope">
                                    <input type="text" v-model="scope.row.name" class="tableCell" placeholder="添加参数" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="type" label="类型" min-width="15%">
                                <template #default="scope">
                                    <input type="text" v-model="scope.row.schema.type" class="tableCell" />
                                </template>
                            </el-table-column>
                            <!-- <el-table-column prop="value" label="示例值" min-width="20%">
                                <template #default="scope">
                                    <input type="text" v-model="scope.row.value" class="tableCell" />
                                </template>
                            </el-table-column> -->
                            <el-table-column prop="value" label="必需" min-width="10%">
                                <template #default="scope">
                                    <el-switch v-model="scope.row.required" class="tableCell" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="desc" label="说明" min-width="35%">
                                <template #default="scope">
                                    <input type="text" v-model="scope.row.description" class="tableCell" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="desc" label="" min-width="10%">
                                <template #default="scope">
                                    <el-button @click="deleteParam(scope.row.name)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="module-response">
            <div class="title">返回响应</div>

            <el-button class="button-response_add" @click="addResponseDialogVisible = true">
                + 添加响应
            </el-button>
            <el-dialog v-model="addResponseDialogVisible" title="添加响应">
                <el-form :model="newResponseForm" label-position="top">
                    <el-form-item label="HTTP状态码" required>
                        <el-input v-model="newResponseForm.code" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="名称" required>
                        <el-input v-model="newResponseForm.description" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="内容格式">
                        <el-select v-model="newResponseForm.MIME" value="application/json">
                            <el-option label="JSON" value="application/json" />
                            <el-option label="XML" value="text/xml" />
                        </el-select>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="addResponseDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="addResponse">
                            确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>
            <el-tabs class="border-card" type="border-card">
                <el-tab-pane :label="`${response?.description}(${response?.code})`" v-for="(response, index) in responses"
                    :key="index">
                    <div class="response-content">
                        <div class="response-info">

                            <el-form :inline="true" :model="newFormData" class="form-inline" label-position="right">
                                <el-form-item label="HTTP 状态码">
                                    <el-input v-model.number="newFormData.responses[index].code" clearable
                                        style="width: 240px" />
                                </el-form-item>
                                <el-form-item label="名称">
                                    <el-input v-model="newFormData.responses[index].description" clearable
                                        style="width: 240px" />
                                </el-form-item>
                                <el-form-item label="内容格式">
                                    <el-select v-model="newFormData.responses[index].content[0].MIME" clearable
                                        style="width: 240px">
                                        <el-option label="JSON" value="application/json" />
                                        <!-- <el-option label="XML" value="text/xml" /> -->
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="structure">
                            <el-card class="box-card">
                                <!-- <template #header>
                                    <div class="card-header">
                                        <span>通过JSON等导入</span>
                                    </div>
                                </template> -->
                                <div class="structure-content">

                                    <div class="param-form">
                                        <el-table :data="response?.['application/json']" style="width: 100%" row-key="id"
                                            :tree-props="{ children: 'children' }">
                                            <el-table-column prop="name" label="属性名" min-width="30%">
                                                <template #default="scope">
                                                    <input type="text" v-model="scope.row.name" class="tableCell"
                                                        placeholder="添加参数" style="display: inline-block;width: auto;" />
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="type" label="类型" min-width="10%">
                                                <template #default="scope">
                                                    <input type="text" v-model="scope.row.type" class="tableCell" />
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="required" label="必需" min-width="10%">
                                                <template #default="scope">
                                                    <el-switch v-model="scope.row.required" class="tableCell" />
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="description" label="中文名" min-width="20%">
                                                <template #default="scope">
                                                    <input type="text" v-model="scope.row.description" class="tableCell"
                                                        placeholder="中文名" />
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="" min-width="10%">
                                                <template #default="scope">
                                                    <el-tooltip class="box-item" effect="dark" content="添加子节点"
                                                        placement="top">
                                                        <el-button class="button-property_add"
                                                            @click="addProperty(scope.row, index, 'application/json')">
                                                            <el-icon>
                                                                <Plus />
                                                            </el-icon>
                                                        </el-button>
                                                    </el-tooltip>
                                                    <el-tooltip class="box-item" effect="dark" content="删除节点"
                                                        placement="top">
                                                        <el-button class="button-property_delete"
                                                            @click="deleteProperty(scope.row, index, 'application/json')">
                                                            <el-icon>
                                                                <Minus />
                                                            </el-icon>
                                                        </el-button>
                                                    </el-tooltip>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <el-button class="button-response_delete"
                                            @click="deleteResponse(index, 'application/json')">
                                            删除响应
                                        </el-button>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- <div class="module-example">
            <div class="title">响应示例</div>

            <el-tabs class="border-card" type="border-card">
                <el-tab-pane label="成功实例">
                    <div class="content-example">
                        <pre>{{ JSON.stringify(newFormData?.responses?.[0]?.content?.example, null, "    ") }}</pre>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="异常示例">
                    记录不存在(404)
                </el-tab-pane>
            </el-tabs>
        </div> -->

    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, getCurrentInstance, nextTick, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import { APItem } from '@/types/apis.ts';
import { apis } from '@/tools/apis.ts';
import { storeMutation } from '@/constant/store.ts';
import { ROUTE } from '@/constant/route.ts'

const instance = getCurrentInstance();
const store = useStore();
const router = useRouter();

onMounted(() => {

})

const aid = computed(() => router.currentRoute.value.params.apis || undefined);  // api标识
const addResponseDialogVisible = ref(false);
const newResponseForm = ref<{[key: string]: any}>({
    "MIME": "application/json"
});

interface paramType {
    name: string,
    in: string,
    description: string,
    required: boolean,
    schema: {
        type: string
    }
}
const oldFormData = ref();
const newFormData = ref({
    "path": "/projects/{pid}/apis",
    "summary": "新建接口",
    "parameters": [
        {
            "name": "pid",
            "in": "path",
            "description": "众团好马",
            "required": true,
            "schema": {
                "type": "number"
            }
        },
        {
            "name": "qr",
            "in": "query",
            "description": "即断真经行低",
            "required": true,
            "schema": {
                "type": "string"
            }
        },
        {
            "name": "api_key",
            "in": "header",
            "description": "",
            "required": true,
            "schema": {
                "type": "string"
            }
        }
    ],
    "method": "POST",
    "responses": [
        {
            "code": 200,
            "description": "成功",
            "content": [
                {
                    "MIME": "application/json",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "apis": {
                                "type": "array",
                                "format": "object",
                                "properties": {
                                    "aid": {
                                        "type": "integer"
                                    },
                                    "details": {
                                        "type": "object",
                                        "format": "APIHistory",
                                        "properties": {
                                            "path": {
                                                "type": "string",
                                                "description": "接口路径"
                                            },
                                            "method": {
                                                "type": "string",
                                                "description": "请求方式"
                                            },
                                            "summary": {
                                                "type": "string",
                                                "description": "接口概述"
                                            },
                                            "parameters": {
                                                "type": "array",
                                                "format": "object",
                                                "description": "请求参数",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "description": "参数键名",
                                                    },
                                                    "in": {
                                                        "type": "string",
                                                        "description": "入参位置",
                                                    },
                                                    "description": {
                                                        "type": "string",
                                                        "description": "参数描述",
                                                    },
                                                    "required": {
                                                        "type": "boolean",
                                                        "description": "是否必须",
                                                    },
                                                    "schema": {
                                                        "type": "object",
                                                        "description": "参数结构",
                                                        "properties": {
                                                            "type": {
                                                                "type": "string",
                                                                "description": "响应类型",
                                                            }
                                                        },
                                                        "required": [
                                                            "type"
                                                        ]
                                                    }
                                                },
                                                "required": [
                                                    "name",
                                                    "in",
                                                    "description",
                                                    "required",
                                                    "schema"
                                                ],
                                            },
                                            "responses": {
                                                "type": "array",
                                                "format": "object",
                                                "properties": {
                                                    "code": {
                                                        "type": "integer",
                                                        "description": "响应码",
                                                    },
                                                    "description": {
                                                        "type": "string",
                                                        "description": "响应描述",
                                                    },
                                                    "content": {
                                                        "type": "array",
                                                        "format": "object",
                                                        "description": "响应体",
                                                        "properties": {
                                                            "MIME": {
                                                                "type": "string",
                                                                "description": "mime类型",
                                                            },
                                                            "schema": {
                                                                "type": "string"
                                                            }
                                                        },
                                                        "required": [
                                                            "MIME",
                                                            "schema"
                                                        ],
                                                    }
                                                },
                                                "required": [
                                                    "code",
                                                    "description",
                                                    "content"
                                                ],
                                            },
                                            "hid": {
                                                "type": "integer",
                                            },
                                            "time": {
                                                "type": "integer",
                                                "description": "时间戳"
                                            },
                                            "uid": {
                                                "type": "integer",
                                                "description": "修改者"
                                            }
                                        },
                                        "required": [
                                            "path",
                                            "method",
                                            "summary",
                                            "parameters",
                                            "responses",
                                            "hid",
                                            "time",
                                            "uid"
                                        ],
                                    }
                                },
                                "required": [
                                    "aid",
                                    "details"
                                ],
                            },
                        },
                        "required": [
                            "apis"
                        ],
                    },
                },
                {
                    "MIME": "text/xml",
                    "schema": {
                        "type": "object",
                        "properties": {}
                    }
                },
                {
                    "MIME": "application/x-yaml",
                    "schema": {
                        "type": "object",
                        "properties": {}
                    }
                },
                {
                    "MIME": "multipart/form-data",
                    "schema": {
                        "type": "object",
                        "properties": {}
                    }
                }
            ]
        }
    ]
})
let oldFormString: string;
let newFormString: string;
let editFormChanged: boolean = false;

let pathParams = ref<paramType[]>([]);
let queryParams = computed(() => {
    return newFormData.value.parameters.filter(param => param.in === 'query').concat({
        "name": "",
        "in": "query",
        "description": "",
        "required": false,
        "schema": {
            "type": ""
        }
    });
});
let headerParams = computed(() => {
    return newFormData.value.parameters.filter(param => param.in === 'header').concat({
        "name": "",
        "in": "header",
        "description": "",
        "required": false,
        "schema": {
            "type": ""
        }
    });
});


const responses = computed(() => {
    return newFormData.value.responses.map((response) => {
        const standardResponse: { [key: string]: any } = {};
        standardResponse.code = response.code;
        standardResponse.description = response.description;
        for (const content of response.content) {
            let count = 0;
            function parseSchema(schema: { [key: string]: any }) {
                const arr = [];
                for (const property in schema) {
                    const newObj: { [key: string]: any } = {};
                    newObj.name = property;
                    newObj.required = true;
                    newObj.id = count++;

                    const propertyObj = schema[property];
                    for (const key in propertyObj) {
                        if (propertyObj.hasOwnProperty(key)) {
                            switch (key) {
                                case 'type':
                                case 'format':
                                case 'description':
                                    newObj[key] = propertyObj[key];
                                    break;
                                case 'properties':
                                    newObj.children = parseSchema(propertyObj[key]);
                                    break;
                                // case 'required':
                                //     newObj[key] = propertyObj[key].includes(property);
                                //     break;
                                default:
                                    break;
                            }
                        }
                    }
                    arr.push(newObj);
                }
                return arr;
            }

            const { MIME, schema } = content;
            
            standardResponse[MIME] = [];
            let rootObj: { [key: string]: any } = {};
            rootObj.name = '根节点';
            rootObj.id = count++;
            rootObj.type = schema.type;
            rootObj.required = true;
            if (schema.properties && Object.keys(schema.properties as object).length) {
                rootObj.children = parseSchema(schema.properties);
            }
            standardResponse[MIME].push(rootObj);
        }
        return standardResponse;
    });
});
watch(responses, (newVal) => {
    console.log(newVal);
}, {
    immediate:true
})


let isTableRowEditable: boolean = true;
/* 获取当前页面类型，新建/编辑 */
const editType = computed(() => router.currentRoute.value.params.aid !== undefined);


/* 解析路径中的Path参数 */
const getPathData = (path: string): paramType[] => {
    let regexp = /{(\w+?)}/g;
    let params = path.match(regexp)?.map((param) => param.slice(1, param.length - 1));
    let result: paramType[] = [];
    params?.forEach(param => {
        result.push({
            name: param,
            in: 'path',
            description: '',
            required: true,
            schema: {
                type: ''
            }
        });
    });
    return result;
}

/* 处理路径输入事件 */
const handlePathInput = () => {
    pathParams.value = getPathData(newFormData.value.path);
}

/* 添加接口/修改接口 */
if (!editType.value) {
    editFormChanged = true;
    // 初始化path参数列表
    handlePathInput();
} else {
    store.state.apis.projectAPIs.forEach(api => {
        if (api.aid == router.currentRoute.value.params.aid) {
            newFormData.value = oldFormData.value = api.details;
            // 初始化path参数列表
            handlePathInput();
        }
    })
    nextTick(() => {
        const methodElement = document.querySelector('.method');
        // 根据接口请求方式使用不同样式
        methodElement!.className = `method method-${oldFormData.value.method}`;
        // 监听表单数据是否改变
        watch(newFormData, (newVal) => {

            newFormString = JSON.stringify(newVal);

            if (newFormString === oldFormString) {
                editFormChanged = false;
            } else {
                editFormChanged = true;
            }
        }, {
            deep: true,
        })
    })
}

/* 单元格的行列索引赋值 */
const getRowIndex = (data: any) => {
    let { row, rowIndex } = data;
    // 利用单元格的className回调方法给行列索引赋值
    row.index = rowIndex;
    return '' + rowIndex;
}

/* 参数表格可编辑 */
const editParams = (row, column, cell, event) => {
    if (!isTableRowEditable) return;
    const editableCell = event.target.parentNode;
    if (editableCell) {
        editableCell.focus()
        // 如果点击了最后一列并且输入了数据，则新增一条数据
        editableCell.addEventListener('input', () => {
            if (row.in === 'query' && row.index === queryParams.value.length - 1) {
                newFormData.value.parameters.push({
                    name: '',
                    in: 'query',
                    description: '',
                    required: false,
                    schema: {
                        type: 'string'
                    }
                })
            }
            if (row.in === 'header' && row.index === headerParams.value.length - 1) {
                newFormData.value.parameters.push({
                    name: '',
                    in: 'header',
                    description: '',
                    required: false,
                    schema: {
                        type: 'string'
                    }
                })
            }
        })
    }
}

/* 删除参数事件 */
const deleteParam = (deleteParamName: string) => {
    const deleteIndex = newFormData.value.parameters.findIndex(param => param.name === deleteParamName);
    newFormData.value.parameters.splice(deleteIndex, 1);
}

/* 返回响应添加子节点事件 */
const addProperty = (row, index, MIME) => {
    const parentName = row.name;
    const contentArr = newFormData.value.responses[index].content;
    const contentIndex = contentArr.findIndex(content => content.MIME === MIME);

    function addChild(propertyObj, parentName) {
        for (const key in propertyObj) {
            if (propertyObj.hasOwnProperty(key)) {
                if (key === parentName) {
                    if (!propertyObj[key].properties) {
                        propertyObj[key].properties = {};
                    }
                    propertyObj[key].properties['字段名'] = {
                        "type": "",
                        "format": "",
                        "properties": {},
                        "required": []
                    };
                    break;
                } else if (propertyObj[key].hasOwnProperty('properties')) {
                    addChild(propertyObj[key].properties, parentName);
                }
            }
        }
        return;
    }

    if (parentName === '根节点') {
        newFormData.value.responses[index].content[contentIndex].schema.properties['字段名'] = {
            "type": "",
            "format": "",
            "properties": {},
            "required": []
        };
    } else {
        addChild(newFormData.value.responses[index].content[contentIndex].schema.properties, parentName);
    }
}

/* 返回响应删除节点事件 */
const deleteProperty = (row, index, MIME) => {
    const name = row.name;
    const contentArr = newFormData.value.responses[index].content;
    const contentIndex = contentArr.findIndex(content => content.MIME === MIME);

    function removeChild(parentObj, name) {
        for (const key in parentObj) {
            if (parentObj.hasOwnProperty(key)) {
                if (key === name) {
                    delete parentObj[key];
                    break;
                } else if (parentObj[key].hasOwnProperty('properties')) {
                    removeChild(parentObj[key].properties, name);
                }
            }
        }
        return;
    }

    removeChild(newFormData.value.responses[index].content[contentIndex].schema.properties, name);
}

/* 新增响应事件 */
const addResponse = () => {
    const newResponse: {[key:string]: any} = {};
    newResponse.code = parseInt(newResponseForm.value.code);
    newResponse.description = newResponseForm.value.description;
    newResponse.content = [];

    const newContent: {[key:string]: any} = {};
    newContent.MIME = newResponseForm.value.MIME;
    newContent.schema = {
        type: 'object',
        properties: {}
    };
    newResponse.content.push(newContent);
    newFormData.value.responses.push(newResponse);

    addResponseDialogVisible.value = false;
}

/* 删除响应事件 */
const deleteResponse = (index, MIME) => {
    const contentArr = newFormData.value.responses[index].content;
    const contentIndex = contentArr.findIndex(content => content.MIME === MIME);
    delete newFormData.value.responses[index].content[contentIndex].schema.properties;
}

/* 表单提交事件 */
const onSubmit = async () => {
    let newaid: number | undefined = parseInt(router.currentRoute.value.params.apis as string) || undefined;
    if (editFormChanged) {
        // const parameters = [];

        // newFormData.value.parameters.forEach(param => {
        //     if (param.in !== 'path' || !param.name) {
        //         parameters.push(param);
        //     }
        // })
        // newFormData.value.parameters = parameters.concat(pathParams.value);
        // console.log(newFormData.value.parameters)

        newFormData.value.responses.forEach(response => {
            response.content.forEach(content => {
                content.schema = JSON.stringify(content.schema);
            })
        })

        // 提交表单
        if (!editType.value) {
            newaid = await store.dispatch('createInterface', { params: { pid: store.state.pid }, data: newFormData.value });
        } else {
            newaid = await store.dispatch('updateInterface', { params: { pid: store.state.pid, aid: aid.value }, data: newFormData });
        }
    }

    // 更新接口id信息并跳转
    store.commit(storeMutation.SELECT_INTERFACE, { aid: newaid })
    router.push({
        name: ROUTE.INTERFACE_DOCUMENT,
        params: {
            pid: store.state.pid,
            aid: newaid
        }
    })
    // 保存修改的接口数据
    oldFormString = newFormString;
    ElMessage({ message: '保存成功！', type: 'success' });
};

/* 接口删除事件 */
const handleDelete = () => {
    store.dispatch('deleteInterface', { pid: store.state.pid, aid: store.state.aid }).then(() => {
        ElMessage({ message: '已移动到回收站', type: 'success' });
        router.push({
            name: ROUTE.INTERFACE_MANAGEMENT,
            params: {
                pid: store.state.pid
            }
        });
    });
}
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
        position: sticky;
        top: 0;
        z-index: 100;
        width: calc(100% - 20px);
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

    .param-form {
        .el-switch {
            --el-switch-on-color: #847ac9;
        }

        :deep(.el-switch.is-checked .el-switch__core) {
            background-color: #847ac9;
        }

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

        .button-response_delete {
            margin-top: 20px;
            margin-left: 50%;
            transform: translate(-50%, 0);
            color: #847ac9;
            border-radius: 8px;
            border: 1px solid #847ac9;
            cursor: pointer;
        }
    }

    .module-detail {
        margin-top: 20px;

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
        position: relative;

        .button-response_add {
            position: absolute;
            right: 20px;
            top: 50px;
            z-index: 2;
        }

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

                        .structure-content {

                            .el-button {
                                display: inline-block;
                            }

                            :deep(.el-table__body .el-table__row:first-child) {

                                .button-property_delete {
                                    display: none;
                                }
                            }
                        }
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

            .content-example {
                color: black;
                font-size: 16px;
            }
        }
    }

}
</style>