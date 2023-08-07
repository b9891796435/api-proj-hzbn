import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { ElMessage } from 'element-plus'


const requestsMock = axios.create({
    baseURL: '/mock',  // 修改为mock路径
    timeout: 5000
});

requestsMock.interceptors.request.use(config => {
    // const { user } = store.state
    // if (user && user.access_token) {
    //     config.headers.Authorization = user.access_token
    // }
    return config;
}, error => {
    return Promise.reject(error);
});

requestsMock.interceptors.response.use(response => {
    let { code, message } = response.data;
    if (code != 200) {
        ElMessage({ message: message || 'error', type: 'warning' });
    } 
    return response.data;
}, error => {
    return Promise.reject(error);
});

export default requestsMock;