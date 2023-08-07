import axios from "axios"
import { ElMessage } from 'element-plus'

const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
});

requests.interceptors.request.use(config => {
    // const { user } = store.state
    // if (user && user.access_token) {
    //     config.headers.Authorization = user.access_token
    // }
    return config;
}, error => {
    return Promise.reject(error);
});

requests.interceptors.response.use(response => {
    let { status, message } = response.data;
    if (response.status != 200) {
        ElMessage({ message: message || 'error', type: 'warning' });
    }
    return response.data;
}, error => {
    return Promise.reject(error);
});

export default requests;