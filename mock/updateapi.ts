import Mock from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'
// // 把JSON数据格式引入进来
// // webpack默认对外暴露的有：图片、JSON数据格式

export default [
    {
        url: '/mock/projects/1/apis/0',
        method: 'put',
        response: () => {
            return {
                code: 200,
                message: 'success',
                data: {
                    "aid": 1
                }
            }
        }
    }
]