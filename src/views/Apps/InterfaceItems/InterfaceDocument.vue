<template>
    <div id="document">
        <div class="fixed">
            <el-button class="first" color="#8076c3" size="large" type="primary">运行</el-button>
            <el-button size="large">生成代码</el-button>
            <el-popconfirm title="确认删除该接口？" width="170" confirm-button-text="确定" cancel-button-text="取消"
                @confirm="handleDelete">
                <template #reference>
                    <el-button size="large">删除</el-button>
                </template>
            </el-popconfirm>
        </div>

        <div class="module-detail">
            <div class="title">{{ apiDetail?.summary }}</div>
            <div class="wrapper">
                <div class="method">{{ apiDetail?.method.toUpperCase() }}</div>
                <span class="url">{{ apiDetail?.path }}</span>
                <!-- <div class="state">已发布</div> -->
            </div>
            <!-- <div class="tags">
                <div class="tag__item">宠物</div>
            </div> -->
            <div class="info">
                <!-- <span class="thin">创建时间</span><span class="info__item">2023年7月27日</span> -->
                <span class="thin">修改时间</span><span class="info__item">{{ timeFormat(apiDetail?.time) }}</span>
                <span class="thin">修改者</span><span class="info__item">Arcobaleno</span>
                <!-- <span class="thin">创建者</span><span class="info__item">Arcobaleno</span> -->
                <!-- <span class="thin">责任人</span><span class="info__item">未设置</span> -->
                <!-- <span class="thin">目录</span><span class="info__item">示例项目</span> -->
            </div>
            <!-- <div class="description">
                <div class="title">接口说明</div>
                <div class="content">XXXXXXXXX</div>
            </div> -->
        </div>

        <!-- <div class="module-mock">
            <div class="title">Mock</div>
        </div> -->

        <div class="module-params">
            <div class="title">请求参数</div>

            <el-card class="box-card" v-if="pathParams?.length != 0">
                <template #header>
                    <div class="card-header">
                        <span>Path参数</span>
                        <el-button class="button" text>生成代码</el-button>
                    </div>
                </template>
                <div v-for="(parameter, index) in pathParams" :key="index" class="card__item">
                    <div class="param-detail">
                        <div class="param-name">{{ parameter?.name }}</div>
                        <div class="param-type">{{ parameter?.schema?.type }}</div>
                        <div class="param-required" :class="{ need: parameter?.required }">{{ parameter?.required ? '必需' :
                            '可选' }}</div>
                    </div>
                    <p class="param-desc">{{ parameter?.description }}</p>
                    <!-- <p class="param-case">
                        示例值：
                        <span class="value">1</span>
                    </p> -->
                </div>
            </el-card>

            <el-card class="box-card" v-if="queryParams?.length != 0">
                <template #header>
                    <div class="card-header">
                        <span>Query参数</span>
                        <el-button class="button" text>生成代码</el-button>
                    </div>
                </template>
                <div v-for="(parameter, index) in queryParams" :key="index" class="card__item">
                    <div class="param-detail">
                        <div class="param-name">{{ parameter?.name }}</div>
                        <div class="param-type">{{ parameter?.schema?.type }}</div>
                        <div class="param-required" :class="{ need: parameter?.required }">{{ parameter?.required ? '必需' :
                            '可选' }}</div>
                    </div>
                    <p class="param-desc">{{ parameter?.description }}</p>
                    <!-- <p class="param-case">
                        示例值：
                        <span class="value">1</span>
                    </p> -->
                </div>
            </el-card>

            <el-card class="box-card" v-if="headerParams?.length != 0">
                <template #header>
                    <div class="card-header">
                        <span>Header参数</span>
                        <el-button class="button" text>生成代码</el-button>
                    </div>
                </template>
                <div v-for="(parameter, index) in headerParams" :key="index" class="card__item">
                    <div class="param-detail">
                        <div class="param-name">{{ parameter?.name }}</div>
                        <div class="param-type">{{ parameter?.schema?.type }}</div>
                        <div class="param-required" :class="{ need: parameter?.required }">{{ parameter?.required ? '必需' :
                            '可选' }}</div>
                    </div>
                    <p class="param-desc">{{ parameter?.description }}</p>
                    <!-- <p class="param-case">
                        示例值：
                        <span class="value">1</span>
                    </p> -->
                </div>
            </el-card>

        </div>

        <div class="module-response" v-if="responses.length">
            <div class="title">返回响应</div>

            <el-tabs class="border-card" type="border-card">
                <el-tab-pane :label="`${response?.description}(${response?.code})`" v-for="(response, index) in responses" :key="index">
                    <div class="response-info">
                        <span class="thin">HTTP 状态码: </span><span class="response-info__item">{{ response?.code }}</span>
                        <span class="thin">内容格式: </span><span class="response-info__item">JSON</span>
                    </div>

                    <div class="response-content">
                        <el-table :data="[{}]" style="width: 100%" border>
                            <el-table-column prop="structure" label="数据结构" min-width="60%">

                                <div class="content-structure">
                                    <el-tree :data="response['application/json']" :props="defaultProps" default-expand-all>
                                        <template #default="{ node, data }">
                                            <span class="custom-tree-node">
                                                <span class="label-name">{{ data.name }}</span>
                                                <span class="label-type">{{ data.type }}</span>
                                                <span class="label-description">{{ data.description }}</span>
                                                <span class="label-required" :class="{ need: data.required }">{{
                                                    data.required ? '必需' : '可选'
                                                }}</span>
                                            </span>
                                        </template>
                                    </el-tree>
                                </div>

                            </el-table-column>

                            <!-- <el-table-column prop="example" label="示例" min-width="40%">
                                <div class="content-example">
                                    <pre>{{ JSON.stringify(responseExample, null, "    ") }}</pre>
                                </div>
                            </el-table-column> -->

                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { APIHistory, APItem } from '@/types/apis'
import { ROUTE } from '@/constant/route.ts'

const defaultProps = {
    children: 'children',
    label: 'name'
}

const store = useStore();
const router = useRouter();

const apiDetail = ref<APIHistory>();
const responses = ref([]);
const pathParams = computed(() => apiDetail.value?.parameters.filter(param => param.in === 'path'));
const queryParams = computed(() => apiDetail.value?.parameters.filter(param => param.in === 'query'));
const headerParams = computed(() => apiDetail.value?.parameters.filter(param => param.in === 'header'));

onMounted(() => {
    store.state.apis.projectAPIs.forEach(api => {
        if (api.aid == router.currentRoute.value.params.aid) {
            apiDetail.value = api.details;
            const methodElement = document.querySelector('.method');
            methodElement!.className = `method method-${apiDetail.value?.method.toLowerCase()}`;

            responses.value = apiDetail.value!.responses.map((response) => {
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

                    const MIME = content.MIME;
                    const schema = JSON.parse(content.schema);

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
        }
    })
})


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

/* 转换时间格式 */
const timeFormat = (rawTime) => {
    const dateObj = new Date(rawTime);
    const curTime = new Date();

    let seconds = Math.floor((curTime.getTime() - dateObj.getTime()) / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;
    let hours = Math.floor(minutes / 60);
    minutes %= 60;
    let days = Math.floor(hours / 24);
    hours %= 24;

    if (days >= 7) {
        return `${dateObj.getFullYear()}年${dateObj.getMonth()}月${dateObj.getDate()}日`;
    } else if (days > 0) {
        return `${days}天前`;
    } else if (hours > 0) {
        return `${hours}小时前`;
    } else if (minutes > 0) {
        return `${minutes}分钟前`;
    } else {
        return `${seconds}秒前`;
    }
}

/* 存储返回响应的数据结构 */
const responseStructure: Tree[] = [
    {
        label: "code",
        type: "integer",
        required: true,
    },
    {
        label: "data",
        type: "object",
        required: true,
        children: [
            {
                label: "id",
                type: "integer",
                description: "宠物ID编号",
                required: true,
            },
            {
                label: "category",
                type: "object",
                description: "分组",
                required: true,
                children: [
                    {
                        label: 'id',
                        type: "integer",
                        description: "分组ID编号",
                        required: false,
                    },
                    {
                        label: 'name',
                        type: "string",
                        description: "分组名称",
                        required: false,
                    }
                ]
            },
            {
                label: "name",
                type: "string",
                description: "名称",
                required: true,
            },
            {
                label: "photoUrls",
                type: "array",
                description: "照片URL",
                required: true,
            },
            {
                label: "tags",
                type: "array",
                description: "标签",
                required: true,
                children: [
                    {
                        label: 'id',
                        type: "integer",
                        description: "标签ID编号",
                        required: false,
                    },
                    {
                        label: 'name',
                        type: "string",
                        description: "标签名称",
                        required: false,
                    }
                ]
            },
            {
                label: "status",
                type: "string",
                description: "宠物销售状态",
                required: true,
            }
        ]
    }
]

/* 存储返回响应的示例 */
const responseExample = {
    "code": 0,
    "data": {
        "name": "Hello Kity",
        "photoUrls": [
            "http://dummyimage.com/400x400"
        ],
        "id": 3,
        "category": {
            "id": 71,
            "name": "Cat"
        },
        "tags": [
            {
                "id": 22,
                "name": "Cat"
            }
        ],
        "status": "sold"
    }
}
</script>

<style lang="less" scoped>
#document {
    font-size: 18px;
    padding: 20px;
    position: relative;

    .title {
        font-size: 22px;
        font-weight: 500;
    }

    .subtitle {
        font-size: 20px;
    }

    .thin {
        color: #8b939b;
    }

    .fixed {
        z-index: 100;
        width: 100%;
        position: absolute;
        top: 10px;
        right: 20px;
        display: flex;
        justify-content: flex-end;

        .first {
            color: white;
        }
    }

    .module-detail {
        .wrapper {
            display: flex;
            align-items: center;
            margin: 30px 0px 24px 0px;

            .method {
                line-height: 30px;
                color: white;
                text-align: center;
                font-weight: 600;
                border-radius: 8px;
                margin-right: 5px;
                padding: 0px 16px;
            }

            .method-get {
                background-color: #64a838;
            }

            .method-post {
                background-color: #eb913a;
            }

            .method-put {
                background-color: #448ef7;
            }

            .method-delete {
                background-color: #e76033;
            }

            .url {}

            .state {
                width: 115px;
                text-align: center;
                margin-left: 20px;
            }
        }

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

        .info {
            margin-top: 20px;

            .info__item {
                display: inline-block;
                margin: 0px 36px 0px 12px;
            }
        }

        .description {
            margin-top: 30px;

            .content {}
        }
    }

    .module-mock {
        margin-top: 30px;
    }

    .module-params {
        margin-top: 50px;

        .box-card {
            margin-top: 10px;

            .card-header {
                position: relative;

                .button {
                    position: absolute;
                    right: 0;
                    background-color: #eaeaea;
                }
            }

            .card__item {
                margin-bottom: 20px;

                .param-detail {
                    display: flex;
                    align-items: center;

                    .param-name {
                        color: #59abfc;
                        background-color: rgba(89, 171, 252, 0.3);
                        padding: 2px 8px;
                        text-align: center;
                        border-radius: 8px;
                        margin-right: 9px;
                    }

                    .param-type {
                        margin-right: 16px;
                    }

                    .param-required {
                        border: 1px solid #eaeaea;
                        border-radius: 5px;
                        padding: 2px 8px;
                    }

                    .need {
                        border: 1px solid transparent;
                        color: #cb741a;
                    }
                }

                .param-desc {
                    color: #8b939b;
                }

                .param-case {
                    margin-top: 16px;
                    color: #8b939b;

                    .value {
                        display: inline-block;
                        margin-left: 12px;
                        line-height: 28px;
                        width: 32px;
                        border: 1px solid #eaeaea;
                        text-align: center;
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

            .response-info {
                grid-area: info;
                line-height: 66px;

                .response-info__item {
                    margin-right: 66px;
                }
            }

            .response-content {
                .el-table {
                    :deep(.el-table__header .cell) {
                        font-size: 18px;
                        font-weight: 400;
                        color: black;
                    }

                    :deep(.el-table__row .el-table__cell) {
                        vertical-align: text-top;
                    }
                }

                .content-structure {
                    .el-tree {
                        .custom-tree-node {
                            font-size: 16px;

                            .label-name {
                                color: #59abfc;
                                background-color: rgba(89, 171, 252, 0.3);
                                padding: 2px 8px;
                                text-align: center;
                                border-radius: 8px;
                                margin-right: 9px;
                            }

                            .label-type {
                                color: black;
                                margin-right: 9px;
                            }

                            .label-description {
                                color: #8b939b;
                            }

                            .label-required {
                                position: absolute;
                                right: 0;
                                border: 1px solid #eaeaea;
                                border-radius: 5px;
                                padding: 2px 8px;
                            }

                            .need {
                                border: 1px solid transparent;
                                color: #cb741a;
                            }
                        }

                        :deep(.el-tree-node__content) {
                            margin-top: 20px;
                        }
                    }
                }

                .content-example {
                    color: black;
                    font-size: 16px;
                }
            }
        }

        .tab {
            height: 45px;
            line-height: 45px;
            display: flex;

            .tab__item {
                padding: 0 12px;
                width: auto;
                font-weight: normal;
                background-color: gray;
            }

            .tab__item__selected {
                padding: 0 12px;
                font-weight: 600;
                background-color: white;
            }
        }
    }
}</style>