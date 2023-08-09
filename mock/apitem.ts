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