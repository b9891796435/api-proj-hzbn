// import requestsMock from './requestsMock.js';

// /* 获取项目所有接口 */
// // pid: 项目唯一标识
// export const reqProjectAPIs = (pid: number) => requestsMock({ url: `/projects/${pid}/apis`, method: 'get' });

// /* 修改指定接口信息 */
// // pid: 项目唯一标识  aid: 接口唯一标识
// export const reqUpdateAPI = (pid: number, aid: number, data: Object) => requestsMock({ url: `/projects/${pid}/apis/${aid}`, method: 'put', data });

// /* 删除接口至回收站 */
// // pid: 项目唯一标识  aid: 接口唯一标识
// export const reqDeleteAPI = (pid: number, aid: number) => requestsMock({ url: `/projects/${pid}/apis/${aid}`, method: 'delete'});

import requests from './requests.js'

/* 获取项目所有接口 */
// pid: 项目唯一标识
export const reqProjectAPIs = (pid: number) => requests({ url: `/projects/${pid}/apis`, method: 'get' });

/* 修改指定接口信息 */
// pid: 项目唯一标识  aid: 接口唯一标识
export const reqUpdateAPI = (pid: number, aid: number, data: Object) => requests({ url: `/projects/${pid}/apis/${aid}`, method: 'put', data });

/* 删除接口至回收站 */
// pid: 项目唯一标识  aid: 接口唯一标识
export const reqDeleteAPI = (pid: number, aid: number) => requests({ url: `/projects/${pid}/apis/${aid}`, method: 'delete'});
