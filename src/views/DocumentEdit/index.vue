<template>
    <div id="document">
        <!-- <div class="fixed">
            <div class="method">GET</div>
            <input type="text" class="url">/pet/{petId}
            <button>保存</button>
            <button>运行</button>
            <button>删除</button>
        </div> -->
        <div class="module-detail">
            <div class="title">查询宠物详情</div>
            <div class="form">
                <label for="state">状态</label>
                <input id="state" type="text" class="state" value="已发布" />
                <label for="person">责任人</label>
                <input id="person" type="text" class="person" value="Arcobaleno" />
                <label for="tags">标签</label>
                <input id="tags" type="text" class="tags" />
                <div class="tags">
                    <div class="tag__item">宠物</div>
                </div>
                <label for="desc">说明</label>
                <input id="desc" type="textarea" class="desc" placeholder="支持Markdown格式" />
            </div>
        </div>

        <div class="module-params">
            <div class="title">请求参数</div>
            <div class="tab">
                <div class="tab__item__selected">Params</div>
                <div class="tab__item">Body</div>
                <div class="tab__item">Cookie</div>
                <div class="tab__item">Header</div>
            </div>
            <div class="container">
                <div class="subtitle">Query参数</div>
                <div class="param-form">
                    参数名、类型、示例值、说明
                </div>
                <div class="subtitle">Path参数</div>
                <div class="param-form">
                    参数名、类型、示例值、说明
                </div>
            </div>
        </div>

        <div class="module-response">
            <div class="title">返回响应</div>
            <div class="tab">
                <div class="tab__item__selected">成功(200)</div>
                <div class="tab__item">记录不存在(404)</div>
            </div>
            <div class="response-content">
                <div class="response-info">
                    <label for="code">HTTP 状态码</label>
                    <input id="code" type="number" class="code" value="200" />
                    <label for="name">名称</label>
                    <input id="name" type="text" class="name" value="成功" />
                    <label for="format">内容格式</label>
                    <input id="format" type="text" class="format" value="JSON" />
                </div>
                <div class="structure">
                    数据结构
                </div>
                <div class="delete">
                    删除响应
                </div>
                <!-- <el-button type="primary" plain>删除响应</el-button> -->
            </div>
        </div>

        <div class="module-example">
            <div class="title">响应示例</div>
            <div class="tab">
                <div class="tab__item__selected">成功示例</div>
                <div class="tab__item">异常示例</div>
            </div>
            <div class="example-content">

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
    }

    .subtitle {
        font-size: 20px;
    }

    .thin {
        color: #8b939b;
    }

    .fixed {
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
    }

    .module-detail {
        .form {
            display: flex;
            align-items: center;
            margin: 30px 0px 24px 0px;
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
    }

    .module-params {
        margin-top: 50px;
        .tab {
            height: 50px;
            line-height: 50px;
            display: flex;
            border-bottom: 1px solid #8b939b;

            .tab__item {
                padding: 0 16px;
                width: auto;
                font-weight: normal;
            }

            .tab__item__selected {
                padding: 0 16px;
                font-weight: 600;
                color: #847ac9;
                border-bottom: 2px solid #847ac9;
            }
        }

        .container {

            .subtitle {
                background-color: pink;
                line-height: 56px;
            }
            .param-form {

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

            .response-info {
                line-height: 60px;
                text-align: center;
                background-color: pink;
            }

            .structure {
                grid-area: structure;
                background-color: blue;
            }

            .delete {
                width: 100px;
                line-height: 30px;
                text-align: center;
                border-radius: 8px;
                border: 1px solid #847ac9;
                background-color: yellow;
                margin: 10px auto;
            }
        }
    }

    .module-example {
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

        .example-content {
            height: 300px;
            background-color: gray;
        }
    }
}
</style>