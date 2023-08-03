<template>
    <div id="document">
        <div class="fixed">
            <el-form :inline="true" :model="formInline" class="form-inline" label-position="top">
                <el-select v-model="formInline.method" clearable class="method" style="width: 120px;">
                    <el-option style="color: #64a838; font-weight: 600;" label="GET" value="get" />
                    <el-option style="color: #eb913a; font-weight: 600;" label="POST" value="post" />
                    <el-option style="color: #448ef7; font-weight: 600;" label="PUT" value="put" />
                    <el-option style="color: #e76033; font-weight: 600;" label="DELETE" value="delete" />
                </el-select>
                <el-input v-model="formInline.url" value="/pet/{petId}" clearable class="url" />

                <el-form-item class="button">
                    <el-button class="first" color="#8076c3" size="large" type="primary" @submit="onSubmit">保存</el-button>
                    <el-button size="large">运行</el-button>
                    <el-button size="large">删除</el-button>
                </el-form-item>

            </el-form>
        </div>

        <div class="module-detail">
            <div class="title">
                <el-input v-model="formInline.name" value="查询宠物详情" clearable />
            </div>
            <div class="info">
                <el-form :inline="true" :model="formInline" class="form-inline" label-position="top">
                    <el-form-item label="状态" prop="state">
                        <el-select v-model="formInline.state" clearable style="width: 330px">
                            <el-option label="已发布" value="published" />
                            <el-option label="测试中" value="testing" />
                            <el-option label="将废弃" value="trash" />
                            <el-option label="开发中" value="developing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="责任人">
                        <el-input v-model="formInline.person" value="Arcobaleno" clearable style="width: 330px" />
                    </el-form-item>
                    <el-form-item label="标签">
                        <el-input v-model="formInline.tags" value="宠物;" clearable style="width: 330px" />
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input v-model="formInline.description" type="textarea" placeholder="支持MarkDown格式" clearable
                            style="width: 100%" />
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
                            <el-table :data="tableData" style="width: 100%">
                                <el-table-column prop="name" label="参数名" width="270" />
                                <el-table-column prop="type" label="类型" width="150" />
                                <el-table-column prop="value" label="示例值" width="280" />
                                <el-table-column prop="desc" label="说明" />
                            </el-table>
                        </div>
                        <div class="subtitle">Path参数</div>
                        <div class="param-form">

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

                            <el-form :inline="true" :model="formInline" class="form-inline" label-position="right">
                                <el-form-item label="HTTP 状态码">
                                    <el-input v-model="formInline.response.code" value="200" clearable
                                        style="width: 240px" />
                                </el-form-item>
                                <el-form-item label="名称">
                                    <el-input v-model="formInline.response.name" value="成功" clearable style="width: 240px" />
                                </el-form-item>
                                <el-form-item label="内容格式">
                                    <el-select v-model="formInline.response.format" clearable style="width: 240px">
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
import { reactive } from 'vue'

const formInline = reactive({
    user: '',
    region: '',
    date: '',
    state: 'published',
    method: 'get',
    url: '/pet/{petId}',
    response: {
        code: 200,
        name: '成功',
        format: 'json'
    }
});

// const tableData = reactive({

// });

const onSubmit = () => {
    console.log('submit!')
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

            .param-form {}
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
                        .el-select {
                            
                        }
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