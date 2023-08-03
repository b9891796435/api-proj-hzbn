<template>
    <div id="document">
        <div class="fixed">
            <el-button class="run" color="#8076c3" size="large" type="primary">运行</el-button>
            <el-button size="large" >生成代码</el-button>
            <el-button size="large" >删除</el-button>
        </div>

        <div class="module-detail">
            <div class="title">查询宠物详情</div>
            <div class="wrapper">
                <div class="method">GET</div>
                <span class="url">/pet/{petId}</span>
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
                <div class="content">哈哈哈哈哈哈</div>
            </div>
        </div>

        <div class="module-mock">
            <div class="title">Mock</div>
        </div>

        <div class="module-params">
            <div class="title">请求参数</div>
            <div class="container">
                <div class="subtitle">Path参数</div>
                <div class="container__item">
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
                <div class="container__item">
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
            </div>
            <div class="container">
                <div class="subtitle">Body参数</div>
                <div class="container__item">
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
            </div>
        </div>

        <div class="module-response">
            <div class="title">返回响应</div>
            <div class="tab">
                <div class="tab__item">成功(200)</div>
            </div>
            <div class="response-content">
                <div class="response-info">
                    <span class="thin">HTTP 状态码: </span><span class="response-info__item">200</span>
                    <span class="thin">内容格式: </span><span class="response-info__item">JSON</span>
                </div>
                <div class="structure">
                    <p class="subtitle">数据结构</p>
                    <div class="structure-content">

                    </div>
                </div>
                <div class="example">
                    <p class="subtitle">示例</p>
                    <div class="example-content">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Ducument',

}
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
        .run {
            color: white;
        }
    }

    .module-detail {
        .wrapper {
            display: flex;
            align-items: center;
            margin: 30px 0px 24px 0px;

            .method {
                width: 58px;
                line-height: 30px;
                background-color: #64a838;
                color: white;
                text-align: center;
                font-weight: 600;
                border-radius: 8px;
                margin-right: 8px;
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
                background-color: #262536;
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
            .content {

            }
        }
    }

    .module-mock {
        margin-top: 30px;
    }

    .module-params {
        margin-top: 50px;

        .container {
            // display: grid;
            // grid-template: 60px 100px / 700px;
            // grid-template-areas:
            //     "subtitle"
            //     "detail";

            .subtitle {
                // grid-area: subtitle;
                background-color: #847ac9;
                line-height: 56px;
            }

            .container__item {
                padding-top: 25px;
                // grid-area: detail;
                background-color: yellow;
                margin-bottom: 30px;

                .param-detail {
                    display: flex;
                    align-items: center;
                    .param-name {
                        color: #59abfc;
                        background-color: #212b3d;
                        width: 64px;
                        line-height: 30px;
                        text-align: center;
                        border-radius: 8px;
                        margin-right: 9px;
                    }

                    .param-type {}

                    .param-required {
                        margin-left: 16px;
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

        .response-content {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: 66px 58px;
            grid-template-areas:
                "info info info info info"
                "structure structure structure example example";

            .response-info {
                grid-area: info;
                background-color: pink;
                line-height: 66px;

                .response-info__item {
                    margin-right: 66px;
                }
            }

            .structure {
                grid-area: structure;
                background-color: blue;

                .structure-content {}
            }

            .example {
                grid-area: example;
                background-color: yellow;

                .example-content {}
            }
        }
    }
}</style>