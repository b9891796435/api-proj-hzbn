import Mock from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'
// // 把JSON数据格式引入进来
// // webpack默认对外暴露的有：图片、JSON数据格式

// // 生成请求的url
// // Mock.mock(请求地址,请求方式,请求的数据)
// Mock.mock('/mock/projects/1/apis', 'get', apiDetail);


export default [
    {
        url: '/mock/projects/1/apis',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'success',
                data: {
                    "apis": [
                        {
                            "aid": 0,
                            "details": {
                                "path": "/pet/{petId}",
                                "method": "get",
                                "summery": "查询宠物详情",
                                "parameters": [
                                    {
                                        "name": "petId",
                                        "in": "path",
                                        "description": "宠物ID",
                                        "required": true,
                                        "schema": {
                                            "type": "string"
                                        }
                                    },
                                ],
                                "responses": [
                                    {
                                        "code": 200,
                                        "description": "成功",
                                        "content": [
                                            {
                                                "MIME": "application/json",
                                                "schema": ""
                                            }
                                        ]
                                    }
                                ],
                            }
                        }
                    ]
                }
            }
        }
    }
]