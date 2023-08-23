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
                                path: '/pet/{petId}',
                                method: 'get',
                                summary: '查询宠物详情',
                                state: 'published',
                                personInCharge: 'Arcobaleno',
                                personModify: 'Arcobaleno',
                                personCreate: 'Arcobaleno',
                                tags: '宠物;',
                                description: '由宠物ID获得宠物详情',
                                parameters: {
                                    query: [
                                        {
                                            name: 'key1',
                                            in: 'path',
                                            type: 'integer',
                                            value: '1',
                                            description: '宠物ID',
                                            required: true
                                        },
                                        {
                                            name: 'key2',
                                            in: 'path',
                                            type: 'string',
                                            value: 'value',
                                            description: '宠物ID',
                                            required: true
                                        }
                                    ],
                                    path: [
                                        {
                                            name: 'petId',
                                            in: 'path',
                                            type: 'integer',
                                            value: '1',
                                            description: '宠物ID',
                                            required: true
                                        },
                                    ],
                                    body: [],
                                    cookie: [],
                                    header: [],
                                },
                                responses: [
                                    {
                                        code: 200,
                                        description: '成功',
                                        content: {
                                            MIME: 'application/json',
                                            schema: '',
                                            example: {
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
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "aid": 1,
                            "details": {
                                path: '/pet/{petId}',
                                method: 'get',
                                summary: '查询宠物详情',
                                state: 'published',
                                personInCharge: 'Arcobaleno',
                                personModify: 'Arcobaleno',
                                personCreate: 'Arcobaleno',
                                tags: '宠物;',
                                description: '由宠物ID获得宠物详情',
                                parameters: {
                                    query: [
                                        {
                                            name: 'key1',
                                            in: 'path',
                                            type: 'integer',
                                            value: '1',
                                            description: '宠物ID',
                                            required: true
                                        },
                                        {
                                            name: 'key2',
                                            in: 'path',
                                            type: 'string',
                                            value: 'value',
                                            description: '宠物ID',
                                            required: true
                                        }
                                    ],
                                    path: [
                                        {
                                            name: 'petId',
                                            in: 'path',
                                            type: 'integer',
                                            value: '1',
                                            description: '宠物ID',
                                            required: true
                                        },
                                    ],
                                    body: [],
                                    cookie: [],
                                    header: [],
                                },
                                responses: [
                                    {
                                        code: 200,
                                        description: '成功',
                                        content: {
                                            MIME: 'application/json',
                                            schema: '',
                                            example: {
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
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        }
    }
]