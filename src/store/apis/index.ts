import { reqProjectAPIs } from "@/api";
import { ActionContext } from "vuex";
import { RootState } from "@/store";

/* 定义API接口对象类型 */
export type APItem = {

}
/* 定义API共享状态类型 */
export type APIState = {
    projectAPIs: APItem[],
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
        if (res.code == 200) {
            commit('setProjectAPIs', res.data.apis);
            return 'ok';
        } else {
            return Promise.reject(new Error(res.description));
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