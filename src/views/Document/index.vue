<template>
    <div id="document">
        <div class="fixed">
            <el-button class="first" color="#8076c3" size="large" type="primary">运行</el-button>
            <el-button size="large">生成代码</el-button>
            <el-button size="large">删除</el-button>
        </div>

        <div class="module-detail">
            <div class="title">{{ apiDetail?.summery }}</div>
            <div class="wrapper">
                <div class="method">{{ apiDetail?.method.toUpperCase() }}</div>
                <span class="url">{{ apiDetail?.path }}</span>
                <div class="state">已发布</div>
            </div>
            <div class="tags">
                <div class="tag__item">宠物</div>
            </div>
            <div class="info">
                <span class="thin">创建时间</span><span class="info__item">2023年7月27日</span>
                <span class="thin">修改时间</span><span class="info__item">7天前</span>
                <span class="thin">修改者</span><span class="info__item">Arcobaleno</span>
                <span class="thin">创建者</span><span class="info__item">Arcobaleno</span>
                <span class="thin">责任人</span><span class="info__item">未设置</span>
                <span class="thin">目录</span><span class="info__item">示例项目</span>
            </div>
            <div class="description">
                <div class="title">接口说明</div>
                <div class="content">XXXXXXXXX</div>
            </div>
        </div>

        <div class="module-mock">
            <div class="title">Mock</div>
        </div>

        <div class="module-params">
            <div class="title">请求参数</div>

            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>Path参数</span>
                        <el-button class="button" text>生成代码</el-button>
                    </div>
                </template>
                <div v-for="(parameter, index) in apiDetail?.parameters" :key="index" class="card__item">
                    <div class="param-detail">
                        <div class="param-name">{{ parameter?.name }}</div>
                        <div class="param-type">{{ parameter?.schema?.type }}</div>
                        <div :class="{required: parameter?.required}">{{ parameter?.required ? '必需' : '可选' }}}</div>
                    </div>
                    <p class="param-desc">{{ parameter?.description }}</p>
                    <p class="param-case">
                        示例值：
                        <span class="value">1</span>
                    </p>
                </div>
            </el-card>

            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>Body参数</span>
                        <el-button class="button" text>生成代码</el-button>
                    </div>
                </template>
                <div v-for="o in 1" :key="o" class="card__item">
                    <div class="param-detail">
                        <div class="param-name">petId</div>
                        <div class="param-type">string</div>
                        <div class="param-required">必需</div>
                    </div>
                    <p class="param-desc">宠物ID</p>
                    <p class="param-case">
                        示例值：
                        <span class="value">1</span>
                    </p>
                </div>
            </el-card>

        </div>

        <div class="module-response">
            <div class="title">返回响应</div>

            <el-tabs class="border-card" type="border-card">
                <el-tab-pane label="成功(200)">
                    <div class="response-content">
                        <div class="response-info">
                            <span class="thin">HTTP 状态码: </span><span class="response-info__item">200</span>
                            <span class="thin">内容格式: </span><span class="response-info__item">JSON</span>
                        </div>
                        <div class="structure">
                            <el-card class="box-card">
                                <template #header>
                                    <div class="card-header">
                                        <span>数据结构</span>
                                    </div>
                                </template>
                                <div class="structure-content">
                                    <el-tree :data="dataStructure" :props="defaultProps" @node-click="handleNodeClick" />
                                </div>
                            </el-card>
                        </div>
                        <div class="example">
                            <el-card class="box-card">
                                <template #header>
                                    <div class="card-header">
                                        <span>示例</span>
                                    </div>
                                </template>
                                <div class="example-content">

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
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

interface Tree {
    label: string
    children?: Tree[]
}

const defaultProps = {
    children: 'children',
    label: 'label'
}

const store = useStore();
const instance = getCurrentInstance();

const pid = 1;  // 项目标识
const aid = 0;  // api标识
const apiDetail = computed(() => store.state.apis.projectAPIs?.[0]?.details);
onMounted(() => {
    store.dispatch('getProjectAPIs', pid).then(() => {
        const methodElement = document.querySelector('.method');
        methodElement!.className = `method method-${apiDetail.value?.method}`;
    });
})

/* 
const dataStructure: Tree[] = [
    {
        label: "songs",
        children: [
            {
                label: "name"
            },
            {
                label: "id"
            },
            {
                label: "ar",
                children: [
                    {
                        label: "id"
                    },
                    {
                        label: "name"
                    },
                    {
                        label: "tns"
                    },
                    {
                        label: "alias"
                    }
                ]
            },
            {
                label: "alia"
            },
            {
                label: "al",
                children: [
                    {
                        label: "id"
                    },
                    {
                        label: "name"
                    },
                    {
                        label: "picUrl"
                    }
                ]
            },
            {
                label: "dt"
            },
            {
                label: "mv"
            },
            {
                label: "publishTime"
            }
        ]
    },
    {
        label: "code"
    }
] */
</script>

<style lang="less" scoped>
#document {
    font-size: 18px;
    padding: 20px;

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
        width: 90%;
        position: fixed;
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
                padding-top: 25px;
                margin-bottom: 30px;

                .param-detail {
                    display: flex;
                    align-items: center;

                    .param-name {
                        color: #59abfc;
                        background-color: rgba(89, 171, 252, 0.3);
                        width: 64px;
                        line-height: 30px;
                        text-align: center;
                        border-radius: 8px;
                        margin-right: 9px;
                    }

                    .param-type {
                        margin-right: 16px;
                    }

                    .required {
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

            .response-content {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-template-rows: 66px auto;
                grid-template-areas:
                    "info info info info info"
                    "structure structure structure example example";

                .response-info {
                    grid-area: info;
                    line-height: 66px;

                    .response-info__item {
                        margin-right: 66px;
                    }
                }

                .structure {
                    grid-area: structure;

                    .structure-content {}
                }

                .example {
                    grid-area: example;

                    .example-content {}
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