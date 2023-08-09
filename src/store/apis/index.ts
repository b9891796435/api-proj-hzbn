import { reqProjectAPIs, reqUpdateAPI, reqDeleteAPI } from "@/api";
import { ActionContext } from "vuex";
import { RootState } from "@/store";

/* 定义API接口对象类型 */
export type APItem = {

}
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
    setProjectAPIs(state: APIState, projectAPIs: APItem[]) {
        state.projectAPIs = projectAPIs;
    }
};

const actions = {
    async getProjectAPIs({ commit }: ActionContext<APIState, RootState>, pid: number) {
        let res: any = await reqProjectAPIs(pid);
        if (res.code === 200) {
            commit('setProjectAPIs', res.data.apis);
            return 'ok';
        } else {
            return Promise.reject(new Error(res.description));
        }
    },
    async updateAPI({ commit }: ActionContext<APIState, RootState>, { params, data }: any) {
        let { pid, aid } = params;
        let res: any = await reqUpdateAPI(pid, aid, data);
        if (res.code === 200) {
            // 返回修改后的新接口aid
            return Promise.resolve(res.data.aid);
        } else {
            return Promise.reject(new Error('修改失败'));
        }
    },
    async deleteAPI({ commit }: ActionContext<APIState, RootState>, { pid, aid }: { pid: number, aid: number }) {
        let res: any = await reqDeleteAPI(pid, aid);
        if (res.code !== 200) {
            return Promise.reject(new Error('删除失败'));
        }
    }
};

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}