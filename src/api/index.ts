// import requests from './requests.js'
import requestsMock from './requestsMock.js';

/* 获取项目所有接口 */
// pid: 项目唯一标识
export const reqProjectAPIs = (pid: number) => requestsMock({ url: `/projects/${pid}/apis`, method: 'get' });
