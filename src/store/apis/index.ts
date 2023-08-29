import { reqProjectAPIs, reqUpdateAPI, reqDeleteAPI } from "@/api";
import { ActionContext } from "vuex";
import { apis } from '@/tools/apis.ts';
import { APItem } from '@/types/apis';
import { ResponseCode } from '@/types/Response.ts';
// import { RootState } from "@/store";

/* 定义API接口对象类型 */
// export type APItem = {

// }

export interface History {
    hid: number,
    time: string,
    username: string
}

/* 定义API共享状态类型 */
export type APIState = {
    projectAPIs: APItem[],
    historyInfo: History[],
}

/* 定义参数类型 */
export interface Params {
    pid: number,
    aid: number,
}


const state: APIState = {
    projectAPIs: [],
    historyInfo: [],
};


const mutations = {
    GETALL(state: APIState, projectAPIs: APItem[]) {
        state.projectAPIs = projectAPIs;
    },
    GETHISTORY(state: APIState, historyInfo: History[]) {
        state.historyInfo = historyInfo;
    },
};

const actions = {
    async getAll({ commit }: any, pid: number) {
        let res: any = await apis.Projects.Project.Interface.getAll(pid);
        if (res?.code == ResponseCode.SUCCESS) {
            commit('GETALL', res.data.apis);
            return 'ok';
        } else {
            return Promise.reject(new Error(res.description));
        }
    },
    async updateInterface({ commit }: any, { params, data }: any) {
        let { pid, aid } = params;
        let res: any = await apis.Projects.Project.Interface.updateInterface(pid, aid, data);
        if (res?.code == ResponseCode.SUCCESS) {
            return 'ok';
        } else {
            return Promise.reject(new Error('修改失败'));
        }
    },
    async createInterface({ commit }: any, { params, data }: any) {
        let { pid, aid } = params;
        let res: any = await apis.Projects.Project.Interface.createInterface(pid, data);
        if (res?.code == ResponseCode.SUCCESS) {
            // 返回修改后的新接口aid
            return Promise.resolve(res.data.aid);
        } else {
            return Promise.reject(new Error('新建失败'));
        }
    },
    async deleteInterface({ commit }: any, { pid, aid }: { pid: number, aid: number }) {
        let res: any = await apis.Projects.Project.Interface.deleteInterface(pid, aid);
        if (res?.code !== ResponseCode.SUCCESS) {
            return Promise.reject(new Error('删除失败'));
        }
    },
    async getHistory({ commit }: any, { pid, aid }: { pid: number, aid: number }) {
        let res: any = await apis.Projects.Project.Interface.getHistory(pid, aid);
        if (res?.code == ResponseCode.SUCCESS) {
            commit('GETHISTORY', res.data.apis);
            return 'ok';
        } else {
            return Promise.reject(new Error(res.description));
        }
    },
    async recoverHistory({ commit }: any, { pid, aid, hid }: { pid: number, aid: number, hid: number }) {
        let res: any = await apis.Projects.Project.Interface.recoverHistory(pid, aid, hid);
        if (res?.code == ResponseCode.SUCCESS) {
            return 'ok';
        } else {
            return Promise.reject(new Error('恢复版本失败'));
        }
    },
};

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}