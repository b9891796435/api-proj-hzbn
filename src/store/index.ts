import { createStore } from 'vuex'
import apis from './apis/index.ts'


export default createStore({
    state() {
        return {
            pid: null,
            aid: null
        }
    },
    mutations: {
        selectProject(state, payload) {
            state.pid = payload.pid
        },
        selectInterface(state, payload) {
            state.aid = payload.aid
        }
    },
    modules: {
        apis,
    }
})
