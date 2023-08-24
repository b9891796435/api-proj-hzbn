import { reqProjectAPIs, reqUpdateAPI, reqDeleteAPI } from "@/api";
import { ActionContext } from "vuex";
import { apis } from '@/tools/apis.ts';
import { APItem } from '@/types/apis';
import { ResponseCode } from '@/types/Response.ts';
// import { RootState } from "@/store";

/* 定义API接口对象类型 */
// export type APItem = {

// }
/* 定义API共享状态类型 */
export type APIState = {
    projectAPIs: APItem[],
}

/* 定义参数类型 */
export interface Params {
    pid: number,
    aid: number,
}


const state: APIState = {
    projectAPIs: [],
};


const mutations = {
    GETALL(state: APIState, projectAPIs: APItem[]) {
        state.projectAPIs = projectAPIs;
    }
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
        if (res.code === 200) {
            // 返回修改后的新接口aid
            return Promise.resolve(res.data.aid);
        } else {
            return Promise.reject(new Error('修改失败'));
        }
    },
    async createInterface({ commit }: any, { params, data }: any) {
        let { pid, aid } = params;
        let res: any = await apis.Projects.Project.Interface.createInterface(pid, data);
        if (res.code === 200) {
            // 返回修改后的新接口aid
            return Promise.resolve(res.data.aid);
        } else {
            return Promise.reject(new Error('新建失败'));
        }
    },
    async deleteInterface({ commit }: any, { pid, aid }: { pid: number, aid: number }) {
        let res: any = await apis.Projects.Project.Interface.deleteInterface(pid, aid);
        if (res.code !== 200) {
            return Promise.reject(new Error('删除失败'));
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