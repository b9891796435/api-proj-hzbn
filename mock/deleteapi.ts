export default [
    {
        url: '/mock/projects/1/apis/0',
        method: 'delete',
        response: () => {
            return {
                code: 200,
                message: 'success'
            }
        }
    }
]