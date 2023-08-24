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